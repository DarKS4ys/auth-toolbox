"use client"

import type { UserRole } from "@prisma/client"
import FormError from "./FormError";
import { useCurrentRole } from "@/hooks/use-current-role";

interface RoleGateClientProps {
    children: React.ReactNode;
    allowedRole: UserRole;
}

export const RoleGateClient = ({
    children,
    allowedRole
}: RoleGateClientProps) => {
    const role = useCurrentRole();
    
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