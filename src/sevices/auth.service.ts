import { prisma } from "../database/database";
import { HttpException } from "../exceptions/httpException";
import { User } from "@prisma/client";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

// usar un patron: singlenton
//const prisma = new PrismaClient()
const TOKEN_PASSWORD = process.env.TOKEN_PASSWORD || 'pass'
const TOKEN_SECRET = process.env.TOKEN_SECRET || "defaultSecret";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "defaultRefreshSecret";

export class AuthService {
    static async register(user: User) {
        // ver si el usuario no existe
        // SELECT id,nombre FROM user WHERE email=user.email
        const findUser = await prisma.user.findUnique({where: {email: user.email}})
        if (findUser) throw new HttpException(409, `User ${user.email} already exists`)

        // encriptar el password
        const passwordEncrypted = await bcrypt.hash(user.password, 10)
        user.password=''
        // guardar el usuario en la bd
        // INSERT INTO user (name, password, email) VALUES (?,?,?)
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

    static async login(email: string, password: string) {
        // Lógica para verificar el usuario
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || user.password !== password) {
            throw new Error('Invalid credentials');
        }

        // Generación de los tokens
        const accessToken = jwt.sign({ id: user.id }, TOKEN_SECRET, { expiresIn: "3h" });
        const refreshToken = jwt.sign({ id: user.id }, REFRESH_SECRET, { expiresIn: "7d" });

        return { accessToken, refreshToken };
    }
}

