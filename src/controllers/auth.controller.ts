import { AuthService } from '@/sevices/auth.service';
import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken'; // ✅ Importar jwt correctamente
import { token } from 'morgan';

const TOKEN_SECRET = process.env.TOKEN_SECRET || "defaultSecret";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "defaultRefreshSecret";
const TOKEN_PASSWORD = process.env.TOKEN_PASSWORD || "";

export class AuthController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const userData = req.body;
            const newUser = await AuthService.register(userData);
            res.status(201).json({ message: "User registered successfully", newUser });
        } catch (error) {
            next(error);
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const { accessToken, refreshToken } = await AuthService.login(email, password);

            res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })


            res.cookie("refreshToken", refreshToken, {
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            });

            res.status(201).json({ message: "Login successfully" });
        } catch (error) {
            next(error);
        }
    }

    static async logout(req: Request, res: Response, next: NextFunction) {
        try {
            res.clearCookie("token");
            res.clearCookie("refreshToken");
            res.status(204).json({ message: "Logout successfully" });
        } catch (error) {
            next(error);
        }
    }

    // En tu controlador AuthController:
static async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json({ error: "No refresh token provided" });

        // Verificar el refresh token
        const decoded = jwt.verify(refreshToken, REFRESH_SECRET) as { id: number };

        // Crear un nuevo access token
        const newAccessToken = jwt.sign({ id: decoded.id }, TOKEN_SECRET, { expiresIn: "3h" });

        // Crear un nuevo refresh token
        const newRefreshToken = jwt.sign({ id: decoded.id }, REFRESH_SECRET, { expiresIn: "7d" });

        // Establecer el nuevo refresh token en la cookie
        // En AuthController, al enviar las cookies
        res.cookie('token', token, {
            httpOnly: true,  // Evita que el token sea accesible desde JS (mejor para seguridad)
            secure: process.env.NODE_ENV === 'production' ? true : false,  // Solo en HTTPS en producción
            sameSite: 'strict',  // Evita que las cookies se envíen en peticiones cruzadas
        });
        res.cookie("refreshToken", refreshToken, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' ? true : false
            , // Solo en HTTPS en producción
            sameSite: "strict",  // Evita que las cookies se envíen en peticiones cruzadas
        });
  

        return res.json({ message: "Token refreshed", token: newAccessToken });
    } catch (error) {
        console.error("Refresh token error:", error);
        res.clearCookie("refreshToken"); // Eliminar el refresh token si es inválido
        return res.status(403).json({ error: "Refresh token expired or invalid" });
    }
}


    static async getAuthenticatedUser(req: Request, res:Response, next: NextFunction){
        try{
            const token = req.cookies.token
            if(!token) res.status(401).json({message: "No autenticado"})
            const decoded = jwt.verify(token, TOKEN_PASSWORD)
            res.status(200).json(decoded)
        }catch(error){
            next(error)
        }
    }
    
    
    
}
