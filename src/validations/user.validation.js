import { z } from 'zod';

export const registerUserSchema = z.object({
  full_name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6)
});

export const verifyOTPSchema = z.object({
  email: z.string().email(),
  otp: z.union([z.string(), z.number()])
});

export const resendOTPSchema = z.object({
  email: z.string().email()
});

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const forgotPasswordSchema = z.object({
  email: z.string().email()
});

export const resetPasswordSchema = z.object({
  email: z.string().email(),
  otp: z.union([z.string(), z.number()]),
  newPassword: z.string().min(6)
});

export const changePasswordSchema = z.object({
  old_password: z.string().min(6),
  new_password: z.string().min(6)
});





