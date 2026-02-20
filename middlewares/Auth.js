import cookieParser from "cookie-parser"
import jwt from 'jsonwebtoken'
import express from 'express'
import User from '../models/User.js'


export function authToken(req, res, next){
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
        return res.status(500).json({msg: "Falha do servidor ao processar identidicação do usuário, por favor tente novamente mais tarde", error: err})
    }
}

export async function authBodySignUp(req, res, next){
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
    res.status(401).json({error: "User already exists"})
    return;
  }

  next()
}

export async function authBodyLogin(req, res, next){
  
}
