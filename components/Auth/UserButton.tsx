"use client"

import { FaUser } from "react-icons/fa"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import useCurrentUser from "@/hooks/use-current-user"
import LogoutButton from "./LogoutButton"
import { ExitIcon } from "@radix-ui/react-icons"
import Image from "next/image"

export default function UserButton() {
    const user = useCurrentUser()
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Avatar>
                {/* <AvatarImage src={ user?.image || undefined}/> */}
                {user?.image &&
                    <Image alt="User Image" src={user?.image} width={100} height={100}/>
                }
                <AvatarFallback className="bg-sky-500" >
                    <FaUser/>
                </AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end">
            <LogoutButton>
                <DropdownMenuItem>
                <ExitIcon className="h-4 w-4 mr-2"/>
                Logout
                </DropdownMenuItem>
            </LogoutButton>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
