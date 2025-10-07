import express from 'express';
import { validate } from '../middlewares/validation.middleware.js';
import {  changePasswordSchema, forgotPasswordSchema, loginUserSchema, registerUserSchema, resendOTPSchema, resetPasswordSchema, verifyOTPSchema } from '../validations/user.validation.js';
import { single } from '../middlewares/multer.middleware.js';
import { registerUser, verifyOTP, resendOTP, loginUser, forgotPassword, resetPassword, changePassword, updateUserProfile, getUserProfile } from '../controllers/userController.js';

const app = express();

// =====================================AUTH=====================================

app.post('/register', validate(registerUserSchema, 'body'), registerUser);
app.post('/verify-otp', validate(verifyOTPSchema, 'body'), verifyOTP);
app.post('/resend-otp', validate(resendOTPSchema, 'body'), resendOTP);
app.post('/login', validate(loginUserSchema, 'body'), loginUser);
app.post('/forgot-password', validate(forgotPasswordSchema, 'body'), forgotPassword);
app.post('/reset-password', validate(resetPasswordSchema, 'body'), resetPassword);

// =====================================PROFILE=====================================

app.post('/change-password', validate(changePasswordSchema, 'body'), changePassword);
app.post('/profile', single("", "profile_image"), updateUserProfile);
app.get('/profile', getUserProfile);

export default app;
