import { NextRequest, NextResponse } from 'next/server';
import clientPromise from "@/app/lib/db";
import nodemailer from 'nodemailer';

export const POST = async (req: NextRequest) => {
  try {
    const { email } = await req.json();
    const code =  Math.floor(100000 + Math.random() * 900000).toString();

    // 인증 정보 5분 후 삭제
    const expireAt = new Date(Date.now() + 5 * 60 * 1000);
    const data = {
      email,
      code,
      isVerify: false,
      expireAt: expireAt,
    }
    const client = await clientPromise;
    const db = client.db('v1');
    const collection = db.collection('verify');
    await collection.createIndex({ email: 1 }, { unique: true })
    await collection.createIndex({ "expireAt": 1 }, { expireAfterSeconds: 0 });
    await collection.updateOne(
      { email },
      { $set: data },
      { upsert: true }
    )

    // 이메일 전송
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: "[my-generator-is] 이메일 인증",
      text: `히히 인증 코드 발사~! => ${code}`,
    });

    return NextResponse.json(true);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to insert data' }, { status: 500 });
  }
}
