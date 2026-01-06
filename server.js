import User from './model/User.js'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
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
            await User.create({email, password})
            
            
            const token = jsonwebtoken.sign({
                id: User._id,
                role: "user"
            }, process.env.SECRETJWT)
            res.cookie("token", token, {
                httpOnly: true
                expireIn: "1h"
            })
            res.status(201).json({msg: "User created!"})
        } catch(err){
            res.status(500).json({error: "Error in create user"})
            console.log(err)
        }
    }
})

server.post("/auth/dashboard", async (req, res)=>{
    const {token} = req.cookies
    try{
        const jwtAuthObj = jsonwebtoken.verify(req.cookies.token, process.env.SECRETJWT)
        
        
    } catch (err) =>{
        conaole.log("JWT errado bro")
    }
    
    
    
    console.log(req.cookies.token)
})




server.listen(PORT, ()=>{
    console.log("Tudo rodando")
})
