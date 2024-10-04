import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/db";

export const POST = async (req: NextRequest) => {
  try {
    const { password, names, author } = await req.json();

    const client = await clientPromise;
    const db = client.db("v1");
    const namesCollection = db.collection("names");

    if (password != process.env.DATA_ACCESS_PASSWORD) {
      return NextResponse.json(
        { error: "Failed to insert data" },
        { status: 400 },
      );
    }
    // 저장
    const data = names.map((name: string) => {
      return { name, email: author };
    });

    await namesCollection.createIndex({ name: 1 }, { unique: true });
    await namesCollection.insertMany(data);

    return NextResponse.json(true);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to insert data" },
      { status: 500 },
    );
  }
};
