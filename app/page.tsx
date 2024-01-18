import {Poppins} from "next/font/google"
import {cn} from "@/lib/utils"
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { LoginButton } from "@/components/Auth/LoginButton"

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

export default function Home() {
  return (
    <main className='text-white flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800'>
      <div className='space-y-6 text-center'>
        <h1 className={cn('text-6xl font-semibold drop-shadow-md', font.className)}>🔐 Auth</h1>
        <p className='text-lg '>A simple authentication toolbox</p>
        <div>

          {/* If you dont want it to be a modal, just remove the mode prop. */}

          <LoginButton mode="modal" asChild>
            <Button variant="secondary" size="lg">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  )
}