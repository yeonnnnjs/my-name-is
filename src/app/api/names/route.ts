import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/db";
import { Sort } from "mongodb";

const ITEMS_PER_PAGE = 40;

export const GET = async (req: NextRequest) => {
  try {
    const client = await clientPromise;
    const db = client.db("v1");
    const collection = db.collection("names");

    const searchParams = req.nextUrl.searchParams;

    const searchBy = searchParams.get("searchBy");
    const searchValue = searchParams.get("searchValue");

    const sortBy = searchParams.get("sortBy");
    const sortOrder = searchParams.get("sortOrder");
    const page = parseInt(searchParams.get("page") || "1");

    const query =
      searchBy && searchValue
        ? {
            [searchBy]: { $regex: searchValue, $options: "i" },
          }
        : {};

    const sort = sortBy
      ? {
          [sortBy]: sortOrder === "desc" ? -1 : 1,
        }
      : {
          name: 1,
        };

    const items = await collection
      .find(query)
      .sort(sort as Sort)
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE)
      .toArray();

    return NextResponse.json(items);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { name, email } = await req.json();
    if (!email) {
      return NextResponse.json(
        { error: "이메일 주소를 입력해주세요" },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db("v1");
    const namesCollection = db.collection("names");
    const verifyCollection = db.collection("verify");

    // 이메일 인증 여부 확인
    const item = await verifyCollection.findOne({ email, isVerify: true });
    if (!item) {
      return NextResponse.json(
        { error: "인증되지 않은 이메일입니다." },
        { status: 400 },
      );
    }

    // 저장
    const data = {
      name,
      email,
    };
    await namesCollection.createIndex({ name: 1 }, { unique: true });
    await namesCollection.insertOne(data);

    // 인증 정보 삭제
    await db.collection("verify").deleteOne({ email });

    return NextResponse.json(true);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to insert data" },
      { status: 500 },
    );
  }
};
