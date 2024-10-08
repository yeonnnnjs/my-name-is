import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/db";

export const POST = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("v1");
    const generatedNamesCollection = db.collection("generated_names");
    const items = await generatedNamesCollection
      .aggregate([{ $sample: { size: 1 } }])
      .toArray();

    const response = NextResponse.json(items[0].name);
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate",
    );
    response.headers.set("Expires", "0");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("X-Accel-Expires", "0");
    response.headers.set("Surrogate-Control", "no-store");
    response.headers.set("CDN-Cache-Control", "no-store");
    response.headers.set("Vercel-CDN-Cache-Control", "no-store");
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
};
