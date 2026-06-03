import express from 'express'
import { authBody } from '../../middlewares/Auth.js'
import User from '../../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post("/", authBody, async(req, res)=>{
  const user = await User.findOne({email: req.body.email})
  if(user){
    res.status(401).json({err: "User already exist"})
    return;
  }

  try{
    const email = req.body.email
    const pwd = req.body.password
    const password = await bcrypt.hash(pwd, 11)
    const user = await User.create({email, password})

    const token = jwt.sign({
      id: user._id,
      email: user.email
      }, process.env.SECRETJWT)

      res.status(201).cookie("token", token, {
        httpOnly: true,
        expiresin: "1h"
      })
      return res.json({token: token, msg: "User created"})
    } catch(err){
      return res.status(500).json({error: "Error in create user, please try again later"})
      console.log(err)
    }
})

export default router
