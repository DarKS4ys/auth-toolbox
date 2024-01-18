import {db} from "@/lib/db"
import bcrypt from 'bcryptjs';

export const getUserByEmail = async (email:string) => {
    try {
        const user = await db.user.findUnique({where: {email}})

        return user
    } catch {
        return null
    }
}

export const getUserById = async (id:string) => {
    try {
        const user = await db.user.findUnique({where: {id}})

        return user
    } catch {
        return null
    }
}

export const validatePassword = async (storedPasswordHash: string, enteredPassword: string) => {
    try {
        const isPasswordValid = await bcrypt.compare(enteredPassword, storedPasswordHash);
        
        return isPasswordValid;
    } catch (error) {
        return null;
    }
}