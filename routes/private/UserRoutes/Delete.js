import express from 'express'
import { authToken } from '../../../middlewares/Auth.js'
import User from '../../../models/User.js'

const router = express.Router()

router.delete("/:id", authToken, async(req, res)=>{
  const id = req.params.id
  
  if(!id){
    return res.status(401).json({err: "Invalid parameter"})
  }

  const user = await User.findOne({_id: id})
  console.log(user)
  if(!user){
    return res.status(401).json({err: "User not found"})
  }

  try{
    await User.findByIdAndDelete({_id: id})
    return res.status(204).send()
  } catch (err) {
   console.log(err)
   return res.status(500).json({err: "Internal Server Error, please try again later"})
  }
})

export default router
