"use server"

import * as z from 'zod'

import { ResetSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"
import { sendPasswordResetEmail } from "@/lib/mail"
import { generatePasswordResetToken } from './../lib/tokens';

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(values)

    if(!validatedFields.success) {
        return { error: "Invalid email!" }
    } 

    const {email} = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if (!existingUser) {
        return { error: "Email not found!" }
    }

    // ! COMMENT THIS BLOCK OUT IF YOU WANT THE NON VERIFIED USERS TO RESET THEIR PASSWORDS.
    if (existingUser && !existingUser.emailVerified) { 
        return { error: "This account's email is not verified!" } 
    }
    // ! COMMENT THIS BLOCK OUT IF YOU WANT THE NON VERIFIED USERS TO RESET THEIR PASSWORDS.

    const passwordResetToken = await generatePasswordResetToken(email)

    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token
    )

    return { success: "Reset email sent!" }
}