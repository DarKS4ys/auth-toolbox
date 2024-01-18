import { UserRole } from '@prisma/client';
import * as z from 'zod';

export const NewPasswordSchema = z.object({
  password: z.string().min(7, {
    message: 'Minimum 7 characters required', // Custom error message for invalid email
  }),
});

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string()),
    password: z.optional(z.string().min(7)),
    newPassword: z.optional(z.string().min(7)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: 'New password is required!',
      path: ['newPassword'],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: 'Password is required!',
      path: ['password'],
    }
  );

export const ResetSchema = z.object({
  email: z.string().email({
    message: 'Invalid email', // Custom error message for invalid email
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Invalid email', // Custom error message for invalid email
  }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: 'Invalid email', // Custom error message for invalid email
  }),
  password: z.string().min(7, {
    message: 'Minimum 7 characters required',
  }),
  name: z.string().min(1, {
    message: 'Name is required',
  }),
});
