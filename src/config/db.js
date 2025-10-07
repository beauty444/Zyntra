import mysql from "mysql2/promise";
import { logger } from "./logger.js";
import { initEntities } from "./entities/index.js";
import dotenv from "dotenv";

dotenv.config();

let pool;

export async function connectDB() {
  if (pool) return pool;

  // Step 1: Create temporary connection (no database selected)
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || "",
    port: Number(process.env.DB_PORT) || 3306,
  });

  // Step 2: Create the database if not exists
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``);
  console.log(`✅ Database "${process.env.DB_NAME}" checked/created`);

  await connection.end();

  // Step 3: Create connection pool (now that DB exists)
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: Number(process.env.DB_CONN_LIMIT) || 10,
    queueLimit: 0,
  });

  // Step 4: Test the pool connection
  const testConn = await pool.getConnection();
  await testConn.ping();
  testConn.release();
  console.log("✅ Database connected successfully");

  // Step 5: Initialize entities/tables
  await initEntities();
  logger.info("✅ Entities initialized");

  return pool;
}

export async function withConnection(run) {
  if (!pool) await connectDB();
  const connection = await pool.getConnection();
  try {
    return await run(connection);
  } finally {
    connection.release();
  }
}

export { pool };
export default pool;