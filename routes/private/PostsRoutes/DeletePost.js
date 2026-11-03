import express from 'express'
<<<<<<< HEAD

const router = express.Router()

router.delete("/", (req, res)=>{
  res.send("Delete Post Route Acessed")
=======
import Post from '../../../models/Post.js'
import { authToken, authDeletePost } from '../../../middlewares/Auth.js'

const router = express.Router()

router.delete("/:id", authToken, authDeletePost, async (req, res)=>{
  const postId = req.params.id
  if(!postId){
    return res.status(401).send("no post ID found")
  }

  const post = await Post.findById(postId)

  if(!post){
    return res.status(401).send("no post found with this is")
  }

  try{
    await Post.findByIdAndDelete(postId)
    res.status(204).send()
    return;
  } catch (err){
    console.log(err)
    return res.status(500).send("error in deleting post, try again later")
  }
>>>>>>> 79d3f5c (feat: some routes updated and added, but not finalized)
})

export default router
