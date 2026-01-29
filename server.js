import User from './models/User.js'
import Post from  './models/Post.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser"


dotenv.config()
const server = express()
server.use(express.json())
server.use(cors())
server.use(cookieParser())
const PORT = process.env.PORT
const DB_URL = process.env.DB_URL
mongoose.connect(DB_URL).then(()=> console.log("Database Conectado")).catch((err)=> console.log(err))

function authToken(req, res, next){
    const token = req.cookies.token 
    
    if(!token){ 
        res.status(401).json({error: "Token nao encontrado"}) 
        return;
    }
    try{
        const usertk = jwt.verify(token, process.env.SECRETJWT)
    
        if(!usertk.id){
            res.status(401).json({error: "Usuário não identificado"})
            return;
        }

        if(!usertk.email){
            res.status(401).json({error: "Usuário não identificado"})
            return;
        }

        req.user = usertk
        next()
    } catch (err){
        return res.status(500).json({error: "Falha do servidor ao processar identidicação do usuário, por favor tente novamente mais tarde"})
    }
}

server.post("/user/register", async(req, res)=>{
    const {email, password} = req.body
    if(!req.body.email){
        res.status(401).json({error: "email is required!"})
        return;
    }
    
    if(!req.body.password){
        res.status(401).json({error: "password is required!"})
        return;
    }

    if(!req.body.email.includes("@")){
        res.status(401).json({error: "email is not valid"})
        return;
    }
    
    if(!req.body.email.includes(".")){
        res.status(401).json({error: "email is not valid"})
        return;
    }
    
    const userExist = await User.findOne({email: req.body.email})
    if(userExist){
        res.status(401).json({error: "User is already created"})
    } else{
        try{
            const pwd = req.body.password
            const password = await bcrypt.hash(pwd, 11)
            const user = await User.create({email, password})
            
            const token = jwt.sign({
                id: user._id,
                email: user.email
            }, process.env.SECRETJWT)
            res.cookie("token", token, {
                httpOnly: true,
                expiresin: "1h"
            })
            res.header("Authorization", `Bearer ${token}`);
            res.status(201).json({token: token, msg: "User created!"}).redirect(301, )
        } catch(err){
            res.status(500).json({error: "Error in create user"})
            console.log(err)
        }
    }
})

server.get("/users/", authToken , async (req, res)=>{
    
    const user = await User.findOne({_id: req.user.id})
    console.log(req)
    res.json({msg:"Token validado!", user: user})
})


server.listen(PORT, ()=>{
    console.log("Tudo rodando")
})
