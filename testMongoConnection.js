const { MongoClient } = require('mongodb');

const MONGO_URI_TEST = process.env.MONGO_URI_TEST;
if (!MONGO_URI)
  throw new Error('⚠️ MONGO_URI_TEST is not defined in environment variables');


const client = new MongoClient(MONGO_URI_TEST);

async function testConnection() {
  try {
    await client.connect();
    console.log("✅ Connected successfully to MongoDB Atlas");
    const db = client.db("shoppingdb");
    const collections = await db.listCollections().toArray();
    console.log("📁 Collections:", collections.map(c => c.name));
  } catch (err) {
    console.error("❌ Connection failed:", err);
  } finally {
    await client.close();
  }
}

testConnection();