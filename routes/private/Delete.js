import express from 'express'
import { authBody, authToken } from '../../middlewares/Auth.js'
import User from '../../models/User.js'

const router = express.Router()

router.delete("/:id", async(req, res)=>{
  const id = req.params.id
  
  if(!id){
    return res.status(401).json({err: "Invalid parameter"})
  }

  const user = await User.find({_id: id})
  console.log(user)
  if(!user){
    return res.status(401).json({err: "User not found"})
  }

  try{
    await User.delete({_id: id})
    return res.status(204).json({msg: "User deleted"})
  } catch (err) {
    return res.status(500).json({err: "Internal Server Error, please try again later"})
  }
})

export default router
