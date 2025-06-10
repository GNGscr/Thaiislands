import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) throw new Error('MONGO_URI not found in .env.local');

let cached = global.mongoose || { conn: null, promise: null };

async function dbConnect() {
    if (cached.conn) return cached.conn;
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // dbName: 'islandsdb', // ציין את שם ה־Database כאן
        });
    }
    cached.conn = await cached.promise;
    global.mongoose = cached;
    return cached.conn;
}

export default dbConnect;
