import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./db"
import { getUserById } from "@/data/user"
import type { UserRole } from "@prisma/client"
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {

    // ? For customizing the signIn function of auth.js
    async signIn({ user, account }) {
      if(account?.provider !== "credentials") return true

      const existingUser = await getUserById(user.id)

      // & Prevent sign-in without email verification (we also have another check in the server-actions)
      if (!existingUser?.emailVerified) return false

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

        if(!twoFactorConfirmation) return false

        
        // & MAYBE HAVE IP BASED STUFF OR LIKE AN EXPIRATION TIME ON THE TWOFACTORCONFIRMATION?        
        // & Delete 2FA confirmation for next sign in ⤵️
        await db.twoFactorConfirmation.delete({
          where: {id: twoFactorConfirmation.id}
        })
      }

      return true
    },

    // ? For adding custom stuff with the info coming from the jwt token
    async session({session,token}) {
      if(token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole
      }

      if (session.user) {
        session.user.twoFactor = !!token.twoFactor || false
      }

      return session
    },

    // ? For adding custom stuff to jwt later to be used for session and other custom stuff
    async jwt({token}) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      token.role = existingUser.role

      token.twoFactor = existingUser.isTwoFactorEnabled || false
      
      return token
    }
  },

  // ? For automatically verifying the email when an auth provider is used (linkAccount event is only triggered if auth provider is used)
  events: {
    async linkAccount({user}) {
      await db.user.update({
        where: {id: user.id},
        data: {emailVerified: new Date()}
      })
    }
  },

  // ? For when something unexpected happens, auth.js should now where to go and that we have a custom page setup
  pages: {
    signIn: '/auth/login',
    error: '/auth/error'
  },

  adapter: PrismaAdapter(db), // ? Prisma adapter (very important)
  session: {strategy: "jwt"}, // ? Enables the use of jwt so we dont store and fetch sessions in db, making the app faster
  ...authConfig,
})