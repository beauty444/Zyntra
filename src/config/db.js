// src/config/db.js

import mysql from 'mysql2/promise';
import { logger } from './logger.js';
import { initEntities } from "./entities/index.js" // adjust path if needed

let pool;

/**
 * Connect to the database and initialize the pool
 */
export async function connectDB() {
  if (pool) return pool;

  // Use process.env instead of env
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: Number(process.env.DB_CONN_LIMIT || 10),
    queueLimit: 0,
  });

  // Create database if not exists
  await pool.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``);

  // Ping DB to check health
  const [rows] = await pool.query('SELECT 1 AS ok');
  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error('DB health check failed');
  }

  // Initialize entities/tables
  await initEntities();

  logger.info('✅ Database connected and entities initialized');
  return pool;
}

/**
 * Helper to run a function with a DB connection
 */
export async function withConnection(run) {
  if (!pool) await connectDB(); // ensure pool exists
  const connection = await pool.getConnection();
  try {
    return await run(connection);
  } finally {
    connection.release();
  }
}

export { pool };
export default pool;
