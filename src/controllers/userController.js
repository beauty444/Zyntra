import { apiResponse, apiHandler } from "../utils/api.util.js";
import * as userServices from "../services/user.service.js";
import { ADD_SUCCESS, CUSTOM_SUCCESS, DELETE_SUCCESS, FETCH, LOGIN, UPDATE_SUCCESS } from "../utils/message.util.js";



export const registerUser = apiHandler(async (req, res) => {
  const { full_name, email, password } = req.body;
  await userServices.registerUserService(full_name, email, password, res);
  return apiResponse(CUSTOM_SUCCESS, "User registered successfully", null, res);
});

export const verifyOTP = apiHandler(async (req, res) => {
  const { email, otp } = req.body;
  await userServices.verifyOTPService(email, otp);
  return apiResponse(CUSTOM_SUCCESS, "OTP verified successfully", null, res);
});

export const resendOTP = apiHandler(async (req, res) => {
  const { email } = req.body;
  await userServices.resendOTPService(email, res);
  return apiResponse(CUSTOM_SUCCESS, "OTP sent successfully", null, res);
});

export const loginUser = apiHandler(async (req, res) => {
  const { email, password } = req.body;
  const token = await userServices.loginUserService(email, password);
  return apiResponse(LOGIN, "User", token, res);
});

export const forgotPassword = apiHandler(async (req, res) => {
  const { email } = req.body;
  await userServices.forgotPasswordService(email, res);
  return apiResponse(CUSTOM_SUCCESS, "Password reset email sent", null, res);
});

export const resetPassword = apiHandler(async (req, res) => {
  const { email, newPassword, otp } = req.body;
  await userServices.resetPasswordService(email, otp, newPassword);
  return apiResponse(CUSTOM_SUCCESS, "Password reset successfully", null, res);
});

export const changePassword = apiHandler(async (req, res) => {
  const { old_password, new_password } = req.body;
  const user_id = req.user?.user_id || req.body.user_id;
  await userServices.changePasswordService(user_id, old_password, new_password);
  return apiResponse(CUSTOM_SUCCESS, "Password changed successfully", null, res);
});

export const updateUserProfile = apiHandler(async (req, res) => {
  let data = req.body;
  data.user_id = req.user?.user_id || req.body.user_id;
  data.profile_image = req.file ? req.file.filename : null;

  await userServices.updateUserProfileService(data);
  return apiResponse(UPDATE_SUCCESS, "User Profile", null, res);
});

export const getUserProfile = apiHandler(async (req, res) => {
  const userData = await userServices.getUserProfileService(req.user?.user_id || req.query.user_id);
  return apiResponse(FETCH, "User Profile", userData, res);
});
