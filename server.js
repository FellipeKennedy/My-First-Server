import { createServer } from 'node:https'
import { readFileSync } from 'node:fs'
import app from './app.js'

const server = createServer({
  key: readFileSync("./private.key"),
  cert: readFileSync("./certificate.crt")
}, app)

server.listen(3443, ()=>{
  console.log("HTTPS running at 3443")
})
