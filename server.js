import dotenv from 'dotenv'
import mongoose from 'mongoose'
import express from 'express'
import cookieParser from 'cookie-parser'
import SignUpRoute from './routes/public/SignUp.js'
import rateLimiter from './middlewares/RateLimit.js'
import Cors from './middlewares/Cors.js'

/*Configs*/
dotenv.config()
const server = express()
server.use(rateLimiter)
server.use(express.json())
server.use(Cors)
server.use(cookieParser())


/*Declarando variáveis de ambiente*/
const PORT = process.env.PORT
const DB_URL = process.env.DB_URL

/*Conectando banco de Dados*/
mongoose.connect(DB_URL).then(()=> console.log("Database Conectado")).catch((err)=> console.log(err))

/*   Routes   */
server.use("/users", SignUpRoute)



server.listen(PORT, ()=>{
    console.log("Tudo rodando")
})
