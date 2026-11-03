import Post from '../../../models/Post.js'
import { authToken, authDeletePost } from '../../../middlewares/Auth.js'
import { Router } from 'express'

const router = Router()

router.delete("/:id", authToken, authDeletePost, async (req, res)=>{
  const postId = req.params.id
  try{
    const post = await Post.findById(postId)
    
    if(!post){
      return res.status(401).send("no post found with this is")
    }
  } catch (err) {
    return res.status(400).send("invalid post ID")
  }

  try{
    await Post.findByIdAndDelete(postId)
    res.status(204).send()
    return;
  } catch (err){
    console.log(err)
    return res.status(500).send("error in deleting post, try again later")
  }
})

export default router
