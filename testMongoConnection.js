const { MongoClient } = require('mongodb');

// ה-URI שלך עם סיסמה תקינה (מוצפנת ב-URL encoding!)
const uri = "mongodb+srv://daniel-admin:vJNJ9KWrqHwiGRTE@cluster0.xa234xv.mongodb.net/shoppingdb?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

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