import { Router } from 'express'

const router = Router()

router.head("/", (req, res)=>{
  return res.status(200).end()

})

export default router
