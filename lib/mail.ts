import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY)

const domain = process.env.NEXT_PUBLIC_APP_URL

// & IN THE FUTURE ADD REACT EMAIL WITH TAILWIND, SO EMAILS DONT LOOK BAD

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
    await resend.emails.send({
        from: "support@stoiccord.com",
        to: email,
        subject: "2FA Code for Auth Toolbox",
        html: `<p>Your 2FA code: ${token}</p>`
    })
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `${domain}/auth/new-password?token=${token}`

    await resend.emails.send({
        from: "support@stoiccord.com",  // ? change to new one with domain
        to: email,
        subject: "Reset your password for Auth Toolbox",
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`
    })
}

export const sendVerificationEmail = async (email:string, token: string) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`

    await resend.emails.send({
        from: "support@stoiccord.com",  // ? change to new one with domain
        to: email,
        subject: "Confirm your email for Auth Toolbox",
        html: `<p>Click <a href="${confirmLink}">here</a> to verify your email</p>`
    })
}