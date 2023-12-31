import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./db"
import { getUserById } from "@/data/user"
import type { UserRole } from "@prisma/client"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async signIn({ user, account }) {
      if(account?.provider !== "credentials") return true

      const existingUser = await getUserById(user.id)

      // Prevent sign-in without email verification
      if (!existingUser?.emailVerified) return false

      //TODO ADD 2FA CHECK

      return true
    },

    /* NOTE: For adding custom stuff with the info coming from the jwt token */
    async session({session,token}) {
      if(token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole
      }

      return session
    },

    /* NOTE: For adding custom stuff to jwt later to be used for session */
    async jwt({token}) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if(!existingUser) return token

      token.role = existingUser.role

      return token
    }
  },

  /* NOTE: For automatically verifying the email when auth provider used */
  events: {
    async linkAccount({user}) {
      await db.user.update({
        where: {id: user.id},
        data: {emailVerified: new Date()}
      })
    }
  },

  /* NOTE: For when something unexpected happens, auth.js should now where to go */
  pages: {
    signIn: '/auth/login',
    error: '/auth/error'
  },

  adapter: PrismaAdapter(db), // Prisma adapter (very important)
  session: {strategy: "jwt"}, // Enables the use of jwt so we dont store sessions in db
  ...authConfig,
})