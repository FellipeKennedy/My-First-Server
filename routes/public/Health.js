import express from 'express'
import mongoose from 'mongoose'


const router = express.Router()

router.get("/", async (req, res)=>{
  try{
    const ping = await mongoose.connection.db.command({ ping: 1 })
    if(!ping){
      return res.status(500).json({err: "Database not working"})
    }

    if(ping.ok !== 1){
      return res.status(500).json({err: "Database not working"})
    }

    return res.status(200).json({msg: "Server and Database ON", ping: ping})
  } catch (err) {
    return res.status(500).json({err: err})
  }
})

export default router
