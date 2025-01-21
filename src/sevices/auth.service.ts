import { PrismaClient, User } from "@prisma/client";
import bcrypt from 'bcrypt';
const prisma = new PrismaClient()
export class AuthService{
    static async register(user:User){
        //ver si el usuario no existe
        // select * from users where email= user.email
        const findUser = await prisma.user.findUnique(
            {
                where:{
                    email:user.email
                }
            }
        )
        if(findUser)throw new Error(`User ${user.email} already exists`)

        //encriptar el password
        const passwordEncrypted = await bcrypt.hash(user.password, 10)
        
        //guardar el usuario en la bd
        return await prisma.user.create({
            data:{
                ...user,
                password: passwordEncrypted,
                role: null
            },
            omit:{
                password:true
            }
        })
    }
}