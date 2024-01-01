'use server';

import { getUserByEmail } from '@/data/user';
import { signIn } from '@/lib/auth';
import { sendTwoFactorTokenEmail, sendVerificationEmail } from '@/lib/mail';
import { generateTwoFactorToken, generateVerificationToken } from '@/lib/tokens';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema } from '@/schemas';
import { AuthError } from 'next-auth';
import * as z from 'zod';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.password || !existingUser.email) {
    return { error: "Email does not exist"}
  }

  // & Checks if the user's email is verified, and not allows them to log in before verifying.
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email)

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    )

    return { success: "Confirmation email sent!"}
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    const twoFactorToken = await generateTwoFactorToken(existingUser.email)

    await sendTwoFactorTokenEmail(
      twoFactorToken.email,
      twoFactorToken.token
    )

    // ? lets the app know that the user has 2FA to change the UI accordingly on login
    return { twoFactor: true }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials' };
        default:
          return { error: 'Something went wrong' };
      }
    }

    throw error;
  }
};
