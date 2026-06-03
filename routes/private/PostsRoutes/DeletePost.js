import express from 'express'

const router = express.Router()

router.delete("/", (req, res)=>{
  res.send("Delete Post Route Acessed")
})

export default router
