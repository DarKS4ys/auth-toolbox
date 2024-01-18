import { UserInfo } from "@/components/UserInfo"
import { currentUser } from "@/lib/auth"

const ServerPage = async () => {
    const user = await currentUser()
    return (
        <div className="w-full px-8">
            <UserInfo label="💻 Server component" user={user}/>
        </div>
    )
}

export default ServerPage