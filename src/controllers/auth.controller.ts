import { AuthService } from "@/sevices/auth.service";
import { UserService } from "@/sevices/user.service";
import express, {Response, Request} from 'express'

export class AuthController{
    static async register(req:Request, res:Response){
        try{
            const userData = req.body
            console.log(userData)
            const newUser = await AuthService.register(userData)
            res.status(201).json({message:'User register succesfully', newUser})
        }catch(error){
            res.status(409).json({message: 'Fallo al registrar el usuario'+error})
        }
    }
    static async login(req:Request, res:Response){
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
            res.status(409).json({message: 'Fallo al logear el usuario'+error})
        }
    }
}