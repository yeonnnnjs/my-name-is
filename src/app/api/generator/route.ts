import { NextResponse } from 'next/server';
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
    console.log(error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
