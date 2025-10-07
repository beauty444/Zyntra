import { comparePassword, hashPassword } from "../utils/password.util.js";
import * as userModels from "../models/user.model.js";
import { ApiError, apiError } from "../utils/error.util.js";
import { CUSTOM_ERROR, EXISTS, INVALID, NOT_FOUND } from "../utils/message.util.js";
import { isEmpty } from "../utils/misc.util.js";
import jwt from 'jsonwebtoken';
import { forgotPasswordEmail, sendVerificationEmail } from "../utils/email.util.js";

export const registerUserService = async (full_name, email, password, res) => {
  const [hashedPassword, [existingUser]] = await Promise.all([
    hashPassword(password),
    userModels.getUserByEmail(email),
  ]);

  if (!isEmpty(existingUser)) {
    throw new ApiError(EXISTS, "User");
  }

  const otp = Math.floor(1000 + Math.random() * 9000);

  await Promise.all([
    userModels.createUser(full_name, email, hashedPassword, otp),
    sendVerificationEmail({ email, otp, res }),
  ]);
};

export const verifyOTPService = async (email, otp) => {
  const [existingUser] = (await userModels.getUserByEmail(email))[0] || [];
  if (isEmpty(existingUser)) throw new ApiError(NOT_FOUND, "User");
  if (existingUser.otp !== otp) throw new ApiError(INVALID, "OTP");
  await userModels.markUserVerified(email);
};

export const resendOTPService = async (email, res) => {
  const [existingUser] = (await userModels.getUserByEmail(email))[0] || [];
  if (isEmpty(existingUser)) return;
  const otp = Math.floor(1000 + Math.random() * 9000);
  await Promise.all([
    userModels.updateUserOTP(email, otp),
    sendVerificationEmail({ email, otp, res }),
  ]);
};

export const forgotPasswordService = async (email, res) => {
  const existingUser = await userModels.getUserByEmail(email);
  if (isEmpty(existingUser)) return;
  const otp = Math.floor(1000 + Math.random() * 9000);
  await Promise.all([
    userModels.updateUserOTP(email, otp),
    forgotPasswordEmail({ email, otp, res }),
  ]);
};

export const resetPasswordService = async (email, otp, password) => {
  const [existingUser] = (await userModels.getUserByEmail(email))[0] || [];
  if (isEmpty(existingUser)) throw new ApiError(NOT_FOUND, "User");
  if (existingUser.otp !== otp) throw new ApiError(INVALID, "OTP");
  const hashedPassword = await hashPassword(password);
  await userModels.updateUserPassword(email, hashedPassword);
};

export const changePasswordService = async (user_id, old_password, new_password) => {
  const [existingUser] = (await userModels.getUserByUserId(user_id))[0] || [];
  if (isEmpty(existingUser)) throw new ApiError(NOT_FOUND, "User");
  const isPasswordValid = await comparePassword(old_password, existingUser.password);
  if (!isPasswordValid) throw new ApiError(INVALID, "Password");
  const hashedPassword = await hashPassword(new_password);
  await userModels.updateUserPassword(existingUser.email, hashedPassword);
};

export const loginUserService = async (email, password) => {
  const [existingUser] = (await userModels.getUserByEmail(email))[0] || [];
  if (isEmpty(existingUser)) throw new ApiError(NOT_FOUND, "User");
  if (!existingUser.is_verified) throw new ApiError(CUSTOM_ERROR, "User not verified");
  const isPasswordValid = await comparePassword(password, existingUser.password);
  if (!isPasswordValid) throw new ApiError(INVALID, "Password");
  const userData = {
    user_id: existingUser.user_id,
    full_name: existingUser.full_name,
    email: existingUser.email,
  };
  const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
  return token;
};

export const updateUserProfileService = async (data) => {
  try {
    const { pulse_interest_ids, user_id } = data;

    const userData = await userModels.getUserByUserId(user_id);
    if (isEmpty(userData)) {
      throw new ApiError(NOT_FOUND, "User");
    }

    if (!data.profile_image) {
      data.profile_image = userData[0].profile_image;
    } else {
      if (userData[0].profile_image) {
        await deleteImage(userData[0].profile_image);
      }
    }

    // Extract and remove pulse_interest_ids from user update payload
    if (pulse_interest_ids) {
      await addEditUserPulseInterestsService(user_id, pulse_interest_ids);
    }

    await userModels.updateUserProfileModel(data);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(UPDATE_ERROR, "Update profile", error, false);
  }
};

export const getUserProfileService = async (user_id) => {
  try {
    const user = await userModels.getUserByUserId(user_id);

    if (isEmpty(user)) {
      throw new ApiError(NOT_FOUND, "User not found");
    }

    const userData = user[0];
    delete userData?.password;
    delete userData?.otp;

    userData.interests = await userModels.getUserPulseInterestModel(user_id);

    // Process the profile image path
    userData.profile_image = CustomImagePath(userData.profile_image);

    return userData;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(FETCH, "Fetching user profile failed", error, false);
  }
};