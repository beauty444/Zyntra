import db from "../config/db.js";
import { ApiError, apiError } from "../utils/error.util.js";
import { DB_ERROR } from "../utils/message.util.js";

export const getUserByEmail = async (email) => {
  try {
    return await db.query(`SELECT * FROM users WHERE email = ?`, [email]);
  } catch (error) {
    throw new ApiError(DB_ERROR, "Checking User", error, false);
  }
};

export const getUserByUserId = async (user_id) => {
  try {
    return await db.query(
      `
      SELECT 
        u.*,
        (SELECT COUNT(*) FROM followings f1 WHERE f1.follower_id = u.user_id) AS following_count,
        (SELECT COUNT(*) FROM followings f2 WHERE f2.followed_id = u.user_id) AS follower_count
      FROM users u
      WHERE u.user_id = ?
      `,
      [user_id]
    );
  } catch (error) {
    throw new ApiError(DB_ERROR, "Fetching user by ID", error, false);
  }
};

export const markUserVerified = async (email) => {
  try {
    return await db.query(`UPDATE users SET is_verified = 1 WHERE email = ?`, [email]);
  } catch (error) {
    throw new ApiError(DB_ERROR, "Marking User Verified", error, false);
  }
}

export const updateUserOTP = async (email, otp) => {
  try {
    return await db.query(`UPDATE users SET otp = ? WHERE email = ?`, [otp, email]);
  } catch (error) {
    throw new ApiError(DB_ERROR, "Updating User OTP", error, false);
  }
}

export const updateUserPassword = async (email, password) => {
  try {
    return await db.query(`UPDATE users SET password = ? WHERE email = ?`, [password, email]);
  } catch (error) {
    throw new ApiError(DB_ERROR, "Updating User Password", error, false);
  }
}

