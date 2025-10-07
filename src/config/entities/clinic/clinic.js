import { pool } from "../../../config/db.js";

export const createClinicTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS clinic (
      id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
      user_id VARCHAR(36) UNIQUE NOT NULL,
      clinic_name VARCHAR(255) NOT NULL,
      address VARCHAR(500),
      contact_person VARCHAR(200),
      contact_phone VARCHAR(50),
      data_usage_consent TINYINT(1) DEFAULT 0,
      report_consent TINYINT(1) DEFAULT 0,
      supplier_communication_consent TINYINT(1) DEFAULT 0,
      escrow_consent TINYINT(1) DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);
};
