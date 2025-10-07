import { z } from 'zod';

export const registerUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export const verifyOTPSchema = z.object({});
export const resendOTPSchema = z.object({});
export const loginUserSchema = z.object({});
export const forgotPasswordSchema = z.object({});
export const resetPasswordSchema = z.object({});
export const changePasswordSchema = z.object({});
