import express from 'express'
import { authBody } from '../../middlewares/Auth.js'
import User from '../../models/User.js'


const router = express.Router()

router.post("/auth/login", authBody, async(req, res)=>{
  const userExist = await User.findOne({email: req.body.email})
  if(!userExist){
    return res.status(401).json({error: "User not exists"})
  }
  console.log(req.user)
})

export default router

