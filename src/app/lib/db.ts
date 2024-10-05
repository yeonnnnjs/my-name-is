import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const options = {};

if (!uri) {
  throw new Error("Please add your DB URI to .env.local");
}

const client: MongoClient = new MongoClient(uri, options);
const clientPromise: Promise<MongoClient> = client.connect();

export default clientPromise;
