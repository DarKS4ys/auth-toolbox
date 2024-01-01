import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email:string, token: string) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`

    await resend.emails.send({
        from: "onboarding@resend.dev", // change to new one with domain
        to: email,
        subject: "Confirm your email for Auth Toolbox",
        html: `<p>Click <a href="${confirmLink}">here</a> to verify your email</p>`
    })
}