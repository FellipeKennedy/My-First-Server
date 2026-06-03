import express from 'express'
import Post from '../../../models/Post.js'
import User from '../../../models/User.js'
import { authPost, authToken } from '../../../middlewares/Auth.js'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post("/", authToken, authPost, async(req, res) =>{
  const { user, comment } = req.body
  const authHeader = req.headers["authorization"]
  const authorization =  authHeader.split(" ")
  const token = req.cookies.token || authorization[1]

  try{
    const decodedToken = jwt.verify(token, process.env.SECRETJWT)
    const userExists = await User.findOne({_id: decodedToken.id})
    if(!userExists){
      return res.status(401).json({err: "Unauthorized"})
    }

    await Post.create({user: decodedToken.id, comment: comment})
    return res.status(200).json({msg: "Post Created"})
    
  } catch {
    return res.status(500).json({err: "Post não criado, tente novamente mais tarde"})
  }
})

export default router
