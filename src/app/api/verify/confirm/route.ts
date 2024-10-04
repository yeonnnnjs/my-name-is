import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/db";

export const POST = async (req: NextRequest) => {
  try {
    const { email, code } = await req.json();

    const client = await clientPromise;
    const db = client.db("v1");
    const collection = db.collection("verify");
    await collection.createIndex({ email: 1 }, { unique: true });
    const result = await collection.findOne({ email, code });
    if (!result) {
      return NextResponse.json(false, { status: 400 });
    }

    const expireAt = new Date(Date.now() + 60 * 60 * 1000);
    const data = {
      email,
      code,
      isVerify: true,
      expireAt: expireAt,
    };
    await db
      .collection("verify")
      .updateOne({ email }, { $set: data }, { upsert: true });

    return NextResponse.json(true);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to insert data" },
      { status: 500 },
    );
  }
};
