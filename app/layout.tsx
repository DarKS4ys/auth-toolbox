import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Auth Toolbox',
  description: 'This is the ultimate formula for authentication with Next.JS and its latest features.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await auth()
  // ! THESE ARE NOT NECESSARY, ONLY FOR FETCHING SESSION IN CLIENT COMPONENTS !!! (the session provider and the async in the function)

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <Toaster/>
          {children}
        </body>
      </html>
    </SessionProvider>
  )
}
