import express from 'express'
import User from '../../../models/User.js'
import { authToken, authUpdatePatch, authUpdatePut } from '../../../middlewares/Auth.js'

const router = express.Router()

router.put("/:id", authUpdatePut, async(req, res)=>{
  return res.send("PUT acessed")

})

router.patch("/:id", authToken, authUpdatePatch, async(req, res)=>{
  const {update: option} = req.body
  const id = req.params.id
  try{
    User.findByIdAndUpdate(id, {
      option
    }, {new: true, runValidation: true})
    return res.status(200).json({msg: "User updated"})
  } catch (err) {
    return res.status(500).json({err: err})
  }
})


export default router
