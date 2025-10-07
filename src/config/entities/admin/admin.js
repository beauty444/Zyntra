import { pool } from "../../../config/db.js";

export const createAdminTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS admins (
      id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
      username VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
};
