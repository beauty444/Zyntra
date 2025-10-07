// utils/api.util.js

import { ApiError } from "./error.util.js" // Make sure the relative path is correct
// adjust path if needed

/**
 * Handles API responses in a consistent format
 * @param {string} code - custom status code (e.g., SUCCESS, CREATED, etc.)
 * @param {string} message - user-friendly message
 * @param {object|null} data - optional data payload
 * @param {object} res - Express response object
 */
export const apiResponse = (code, message, data = null, res) => {
  return res.status(200).json({
    success: true,
    code,
    message,
    data,
  });
};

/**
 * Global async handler for controller functions.
 * Automatically catches async/await errors and forwards to next() middleware.
 * @param {Function} fn - async controller function
 */
export const apiHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    // Handle known operational errors (ApiError)
    if (error instanceof ApiError) {
      return res.status(error.status).json({
        success: false,
        code: error.code,
        message: error.publicMessage,
      });
    }

    // Handle unexpected/unhandled errors
    console.error("Unexpected Error:", error);

    return res.status(500).json({
      success: false,
      code: "INTERNAL_ERROR",
      message: "Something went wrong. Please try again later.",
    });
  }
};
