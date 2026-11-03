<<<<<<< HEAD
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import express from 'express'
import cookieParser from 'cookie-parser'
import SignUpRoute from './routes/public/SignUp.js'
import rateLimiter from './middlewares/RateLimit.js'
import Cors from './middlewares/Cors.js'
import HealthRoute from './routes/public/Health.js'
import LoginRoute from './routes/public/Login.js'
import UpdateRoute from './routes/private/UserRoutes/Update.js'
import DeleteRoute from './routes/private/UserRoutes/Delete.js'
import CreatePostRoute from './routes/private/PostsRoutes/CreatePost.js'
import DeletePostRoute from './routes/private/PostsRoutes/DeletePost.js'
=======
import { createServer } from 'node:https'
import { readFileSync } from 'node:fs'
import app from './app.js'
>>>>>>> 79d3f5c (feat: some routes updated and added, but not finalized)

const server = createServer({key: readFileSync("./private.key"), cert: readFileSync("./certificate.crt")}, app)

<<<<<<< HEAD
// Configurations
dotenv.config()
const server = express()
server.use(rateLimiter)
server.use(express.json())
server.use(Cors)
server.use(cookieParser())


// declaring environment variables:
const PORT = process.env.PORT
const DB_URL = process.env.DB_URL

// Database Connect
mongoose.connect(DB_URL).then(()=>{console.log("Database conected")})

// Routes
server.use("/health", HealthRoute)
server.use("/users", SignUpRoute)
server.use("/", LoginRoute)
server.use("/users", UpdateRoute)
server.use("/users", DeleteRoute)
server.use("/posts", CreatePostRoute)

// Running server
server.listen(PORT, ()=>{
    console.log("Server running")
=======
server.listen(3443, ()=>{
  console.log("running HTTPS at 3443")
>>>>>>> 79d3f5c (feat: some routes updated and added, but not finalized)
})

