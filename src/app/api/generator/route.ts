import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/app/lib/db';

export const GET = async () => {
  try {
    const client = await clientPromise;
    const db = client.db('v1');
    const generatedNamesCollection = db.collection('generated_names');
    const items = await generatedNamesCollection
      .aggregate([{ $sample: { size: 1 } }])
      .toArray();

    return NextResponse.json(items[0].name);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const { password, names } = await req.json();

    const client = await clientPromise;
    const db = client.db('v1');
    const generatedNamesCollection = db.collection('generated_names');

    if(password != process.env.DATA_ACCESS_PASSWORD) {
      return NextResponse.json({ error: 'Failed to insert data' }, { status: 400 });
    }
    // 저장
    const data = names.map((name) => {
      return {name};
    })

    await generatedNamesCollection.createIndex({ name: 1 }, { unique: true })
    await generatedNamesCollection.insertMany(data);

    return NextResponse.json(true);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to insert data' }, { status: 500 });
  }
}
