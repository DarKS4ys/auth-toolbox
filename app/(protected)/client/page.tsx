"use client"

import { UserInfo } from "@/components/UserInfo"
import useCurrentUser from "@/hooks/use-current-user"

const ClientPage = () => {
    const user = useCurrentUser()
    return (
        <div className="w-full px-8">
            <UserInfo label="📱 Client component" user={user}/>
        </div>
    )
}

export default ClientPage