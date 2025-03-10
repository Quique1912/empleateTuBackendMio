import express, {Response, Request} from 'express'
import authRouter from './routes/auth.routes'
import userRouter from './routes/user.routes'
import offerRouter from './routes/offer.routes'
import categoryRouter from './routes/category.routes'

import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import compression from 'compression'
import cookieParser  from 'cookie-parser'
import cors  from 'cors'
import morgan from 'morgan'

const app = express()

/* app.use(async (req, res, next) => {
    await libsql.sync()
    next()
  }) */


app.use(cookieParser())
//todo limitar cors
//cambiar la url cuando deploy
app.use(cors({
    origin: ['http://localhost:5173', 'https://empleate-tu-frontend-mio.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json())
app.use(helmet())
app.use(compression())
app.use(morgan('tiny'))
const limiter = rateLimit({
    max: 1000,
    windowMs: 1000 * 15 * 60 // 15 minutos
})
app.use(limiter)

app.use('/api/auth',authRouter)
app.use('/api/users',userRouter)
app.use('/api/offers', offerRouter)
app.use('/api/categories', categoryRouter)

app.get('/', (req:Request, res:Response)=>{
    res.send('Bienvenido al backend (api rest)')
})

app.post("/login", (req, res) => {
    const { email, password } = req.body;
  
    // Simulación de autenticación correcta
    if (email === "test@example.com" && password === "123456") {
      res.json({ token: "ejemplo_de_token" });
    } else {
      res.status(401).json({ error: "Credenciales incorrectas" });
    }
  });
  

export default app