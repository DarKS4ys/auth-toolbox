import * as z from "zod"

export const NewPasswordSchema = z.object({
    password: z.string().min(7, {
        message: "Minimum 7 characters required",  // Custom error message for invalid email
    }),
})

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Invalid email",  // Custom error message for invalid email
    }),
})

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Invalid email",  // Custom error message for invalid email
    }),
    password: z.string().min(1, {
        message: "Password is required"
    }),
    code: z.optional(z.string())
})

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Invalid email",  // Custom error message for invalid email
    }),
    password: z.string().min(7, {
        message: "Minimum 7 characters required"
    }),
    name: z.string().min(1, {
        message: "Name is required"
    })
})