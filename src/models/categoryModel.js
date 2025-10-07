import db from "../config/db.js";
import { ApiError } from "../utils/api.util.js";
import { DB_ERROR } from "../utils/message.util.js";


export const addCategoryModel = async (data) => {
  try {
    return await db.query(
      `INSERT INTO categories (name, image_url) VALUES (?, ?)`,
      [data.name, data.image_url]
    );
  } catch (error) {
    throw new ApiError(DB_ERROR, "Adding Category", error, false);
  }
};


export const deleteCategoryModel = async (category_id) => {
  try {
    return await db.query(
      `DELETE FROM categories WHERE id = ?`,
      [category_id]
    );
  } catch (error) {
    throw new ApiError(DB_ERROR, "Deleting Category", error, false);
  }
};

