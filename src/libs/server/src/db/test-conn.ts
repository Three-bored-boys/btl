import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
  try {
    await client.connect();
    const res = await client.query("SELECT NOW();");
    console.log("Connected successfully:", res.rows[0]);
  } catch (err) {
    console.error("Connection error:", err);
  } finally {
    await client.end();
  }
}

void testConnection();
