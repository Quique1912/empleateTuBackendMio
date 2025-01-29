import { AuthService } from "@/sevices/auth.service";
import { UserService } from "@/sevices/user.service";
import express, {Response, Request, NextFunction} from 'express'

export class AuthController{
    static async register(req:Request, res:Response, next:NextFunction){
        try{
            const userData = req.body
            console.log(userData)
            const newUser = await AuthService.register(userData)
            res.status(201).json({message:'User register succesfully', newUser})
        }catch(error){
            next(error)
        }
    }
    static async login(req:Request, res:Response, next:NextFunction){
        try{
            const userData = req.body
            console.log(userData)
            const token = await AuthService.login(userData.email, userData.password)
            res.cookie('token', token,{
                maxAge: 60*60*1000, // 1 hora de caducidad
                httpOnly: true, // no se puede acceder mediante javascript
                secure: false, //solo se envia si usas https
                sameSite: 'strict' // Evita ataques CSRF
            })
            res.status(201).json({message:'User login succesfully', token})
        }catch(error){
            next(error)
        }
    }
}