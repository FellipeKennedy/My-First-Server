import { Router } from 'express'
import { authToken } from '../../../middlewares/Auth.js'
import Post from '../../../models/Post.js'

const router = Router()

router.get("/", authToken, async (req, res)=>{
  let limit = req.headers.limit

  if(!limit){
    limit = 5
  }

  try{
    const posts = await Post.find().limit(limit)

    return res.status(200).json(posts)
  } catch (err){
    res.status(500).send("Internal Server Error")
  }
})

export default router
