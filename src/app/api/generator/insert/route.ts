import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/db";

export const POST = async (req: NextRequest) => {
  try {
    const { password, names } = await req.json();

    const client = await clientPromise;
    const db = client.db("v1");
    const generatedNamesCollection = db.collection("generated_names");

    if (password != process.env.DATA_ACCESS_PASSWORD) {
      return NextResponse.json(
        { error: "Failed to insert data" },
        { status: 400 },
      );
    }
    // 저장
    const data = names.map((name: string) => {
      return { name };
    });

    await generatedNamesCollection.createIndex({ name: 1 }, { unique: true });
    await generatedNamesCollection.insertMany(data);

    return NextResponse.json(true);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to insert data" },
      { status: 500 },
    );
  }
};
