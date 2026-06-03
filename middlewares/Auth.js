import cookieParser from "cookie-parser"
import jwt from 'jsonwebtoken'
import express from 'express'
import User from '../models/User.js'

// Middleware: -- Token authentication --
export function authToken(req, res, next){
    const authHeader = req.headers["authorization"]

    if(!authHeader){
      res.status(401).json({error: "Token não encontrado"})
      return;
    }

    const authorization =  authHeader.split(" ")
    const token = req.cookies.token || authorization[1]

    if(!token){
        res.status(401).json({error: "Token não encontrado"})
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
        return res.status(500).json({msg: "Falha do servidor ao processar identificação do usuário, por favor tente novamente mais tarde", error: err})
    }
}

// Middleware: -- SignUp/Login BODY verification --
export function authBody(req, res, next){
  const {email, password} = req.body

  if(!req.body){
    return res.status(401).json({err: "invalid request"})
  }

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

  next()
}


export function authUpdatePatch(req, res, next){
  const id = req.params.id
  const {update: optionToUpdate} = req.body

  if(!id){
    return res.status(401).json({err: "Need the User ID"})
  }

  if(!optionToUpdate){
    return res.status(401).json({err: "Not found option to update"})
  }

  const allowedFields = ["email", "password"]

  for (let key in optionToUpdate) {
    if (!allowedFields.includes(key)) {
      return res.status(401).json({ err: "Fields not allowed" });
    }
  }
  next()
}

export function authUpdatePut(req, res, next){
  const {updates: optionsToUpdate} = req.body
  res.send(optionsToUpdate) 
}



export function authPost(req, res, next){
  const { user, comment } = req.body

  if(!user || !comment){
    return res.status(401).json({err: "No data found to create post"})
  }

  next()
}
