import { pool } from "../../../config/db.js";

export const createSupplierTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS suppliers (
      id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
      user_id VARCHAR(36),
      name VARCHAR(150) NOT NULL,
      email VARCHAR(150) UNIQUE,
      phone VARCHAR(50),
      verified TINYINT(1) DEFAULT 0,
      business_docs TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX (user_id),
      CONSTRAINT fk_supplier_user FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    ) ENGINE=InnoDB
    DEFAULT CHARSET=utf8mb4
    COLLATE=utf8mb4_unicode_ci;
  `);
};
