import rateLimit, { ipKeyGenerator } from 'express-rate-limit'
import express from 'express'

const limiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 30,
  standardHeaders: true,
  statusCode: 429,
  message: "BLOCKED",
  keyGenerator: (req)=>{
    ipKeyGenerator(req)
  }
})

export default limiter
