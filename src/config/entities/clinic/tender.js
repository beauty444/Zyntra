// src/entities/tender.js
import { pool } from "../../../config/db.js";

export const createTenderTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tenders (
      id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
      clinic_id VARCHAR(36) NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      status ENUM('draft','open','closed','awarded') DEFAULT 'draft',
      deadline DATETIME,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (clinic_id) REFERENCES clinic(id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);
};
