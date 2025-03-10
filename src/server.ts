import app from './app'
import { ErrorMiddleware } from './middlewares/error.middleware'
import cookieParser from 'cookie-parser'
const PORT = process.env.PORT || 3000
app.use(ErrorMiddleware)
app.listen(PORT, ()=>{
    console.log("Servidor encendido en el puerto"+PORT)
})

app.use(cookieParser())


