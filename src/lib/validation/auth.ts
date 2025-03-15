import * as z from "zod";
import { AUTH_MESSAGES } from "../../constants/Messages";

export const signUpSchema = z.object({
  email: z
    .string({ required_error: AUTH_MESSAGES.VALIDATION.EMAIL_REQUIRED })
    .min(1, AUTH_MESSAGES.VALIDATION.EMAIL_REQUIRED)
    .email(AUTH_MESSAGES.VALIDATION.INVALID_EMAIL),
  password: z
    .string({ required_error: AUTH_MESSAGES.VALIDATION.PASSWORD_REQUIRED })
    .min(1, AUTH_MESSAGES.VALIDATION.PASSWORD_REQUIRED)
    .min(8, AUTH_MESSAGES.VALIDATION.PASSWORD_MIN_LENGTH)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      AUTH_MESSAGES.VALIDATION.PASSWORD_REQUIREMENTS
    ),
  fullName: z
    .string({ required_error: AUTH_MESSAGES.VALIDATION.NAME_REQUIRED })
    .min(1, AUTH_MESSAGES.VALIDATION.NAME_REQUIRED),
  terms: z
    .boolean({ required_error: AUTH_MESSAGES.VALIDATION.TERMS_REQUIRED })
    .refine((val) => val === true, {
      message: AUTH_MESSAGES.VALIDATION.TERMS_REQUIRED,
    }),
});

export const signInSchema = z.object({
  email: z
    .string({ required_error: AUTH_MESSAGES.VALIDATION.EMAIL_REQUIRED })
    .min(1, AUTH_MESSAGES.VALIDATION.EMAIL_REQUIRED)
    .email(AUTH_MESSAGES.VALIDATION.INVALID_EMAIL),
  password: z
    .string({ required_error: AUTH_MESSAGES.VALIDATION.PASSWORD_REQUIRED })
    .min(1, AUTH_MESSAGES.VALIDATION.PASSWORD_REQUIRED),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string({ required_error: AUTH_MESSAGES.VALIDATION.PASSWORD_REQUIRED })
      .min(1, AUTH_MESSAGES.VALIDATION.PASSWORD_REQUIRED)
      .min(8, AUTH_MESSAGES.VALIDATION.PASSWORD_MIN_LENGTH)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        AUTH_MESSAGES.VALIDATION.PASSWORD_REQUIREMENTS
      ),
    confirmPassword: z
      .string({ required_error: "Please confirm your password" })
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: AUTH_MESSAGES.VALIDATION.EMAIL_REQUIRED })
    .min(1, AUTH_MESSAGES.VALIDATION.EMAIL_REQUIRED)
    .email(AUTH_MESSAGES.VALIDATION.INVALID_EMAIL),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
