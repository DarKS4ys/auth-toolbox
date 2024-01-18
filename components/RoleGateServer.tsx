import type { UserRole } from "@prisma/client"
import FormError from "./FormError";
import { currentRole } from "@/lib/auth";

interface RoleGateServerProps {
    children: React.ReactNode;
    allowedRole: UserRole;
}

export const RoleGateServer = async ({
    children,
    allowedRole
}: RoleGateServerProps) => {
    const role = await currentRole();
    
    if (role !== allowedRole) {
        return (
            <FormError message="You do not have permission to view this content!"/>
        )
    }

    return (
        <>
            {children}
        </>
    )
}