// src/entities/bid.js
import { pool } from "../../../config/db.js";

export const createBidTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS bids (
      id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
      supplier_id VARCHAR(36),
      tender_id VARCHAR(36),
      amount DECIMAL(12,2),
      status ENUM('submitted','revised','won','lost') DEFAULT 'submitted',
      bafo_amount DECIMAL(12,2),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX (supplier_id),
      INDEX (tender_id)
    ) ENGINE=InnoDB
    DEFAULT CHARSET=utf8mb4
    COLLATE=utf8mb4_unicode_ci;
  `);
};

