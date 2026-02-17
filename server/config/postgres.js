import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

pool
  .connect()
  .then(() => console.log("✅ Neon PostgreSQL connected"))
  .catch((err) =>
    console.error("❌ PostgreSQL connection error:", err.message),
  );

export default pool;
