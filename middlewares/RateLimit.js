import rateLimit, { ipKeyGenerator } from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  standardHeaders: true,
  statusCode: 429,
  message: "BLOCKED",
  /*keyGenerator: (req)=>{
    return ipKeyGenerator(req)
  }*/
})

export default limiter
