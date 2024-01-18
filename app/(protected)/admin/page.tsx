"use client"

import { admin } from "@/actions/admin";
import FormSuccess from "@/components/FormSuccess";
import { RoleGateClient } from "@/components/RoleGateClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

const AdminPage = () => {

    const onServerActionClick = async () => {
        const data = await admin()

        if (data.error) {
            toast.error(data.error)
        }

        if (data.success) {
            toast.success(data.success)
        }
    }
    
    const onApiRouteClick = async () => {
        const response = await fetch('/api/admin')

        if (response.ok) {
            toast.success("Allowed API Route!")
        } else {
            toast.error("Forbidden API Route!")
        }

    }

    return (
        <Card className="w-full max-w-[600px] px-8">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">🔑 Admin</p>
            </CardHeader>
            <CardContent className="space-y-4">

                {/*! Anything placed inside of this will only be accesible by the allowed role defined below. */}
                <RoleGateClient allowedRole={UserRole.ADMIN}>
                    <FormSuccess message="You are allowed to see this content!"/>
                </RoleGateClient>

                <div className="flex gap-4 items-center justify-between rounded-lg border p-3 ">
                    <p >Admin-only API route</p>
                    <Button onClick={onApiRouteClick}>Click to test</Button>
                </div>
                <div className="flex gap-4 items-center justify-between rounded-lg border p-3">
                    <p >Admin-only Server Action</p>
                    <Button onClick={onServerActionClick}>Click to test</Button>
                </div>

            </CardContent>
        </Card>
    )
}

export default AdminPage;