import { useSession } from "next-auth/react";

const useCurrentUser = () => {
    const session = useSession()

    return session.data?.user
}

export default useCurrentUser;