import NewPasswordForm from "@/components/Auth/NewPasswordForm";
import { redirect } from "next/navigation";

interface NewPasswordPageProps {
    searchParams: {token: string}
}

export default function NewPasswordPage({
    searchParams: {token}
}: NewPasswordPageProps) {

    if (!token) {
        redirect('/auth/login') // ? Redirects the user if there is no token
    }

  return <NewPasswordForm token={token}/>
}
