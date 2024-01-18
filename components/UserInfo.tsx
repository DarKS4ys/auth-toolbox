import { ExtendedUser } from '@/@types/next-auth';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { FaUser } from 'react-icons/fa';
import Image from 'next/image';

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card className="w-full max-w-[600px] mx-auto shadow-md">
      <CardHeader>
        <p className="font-semibold text-center text-2xl">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">ID</p>
          <p className="truncate text-xs max-w-[180px] font-mono bg-slate rounded-md">
            {user?.id}
          </p>
        </div>
        <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Name</p>
          <p className="truncate text-xs max-w-[180px] font-mono bg-slate rounded-md">
            {user?.name}
          </p>
        </div>
        <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Email</p>
          <p className="truncate text-xs max-w-[180px] font-mono bg-slate rounded-md">
            {user?.email}
          </p>
        </div>
        <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Role</p>
          <p className="truncate text-xs max-w-[180px] font-mono bg-slate rounded-md">
            {user?.role}
          </p>
        </div>
        <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Two Factor</p>
          <Badge variant={user?.isTwoFactorEnabled ? 'success' : 'destructive'}>
            {user?.isTwoFactorEnabled ? 'ON' : 'OFF'}
          </Badge>
        </div>
        
        {user?.image && (
        <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Profile Picture</p>
          {/*           <Avatar>
            <AvatarImage src={user?.image || undefined} />
            <AvatarFallback className="bg-sky-500">
              <FaUser />
            </AvatarFallback>
          </Avatar> */}
            <Image
              alt="User Image"
              src={user?.image}
              width={100}
              height={100}
              className="object-cover w-12 h-12 rounded-lg"
            />
        </div>
        )}
      </CardContent>
    </Card>
  );
};
