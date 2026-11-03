import dotenv from 'dotenv'
import mongoose from 'mongoose'
import express from 'express'
import cookieParser from 'cookie-parser'
import SignUpRoute from './routes/public/SignUp.js'
import rateLimiter from './middlewares/RateLimit.js'
import Cors from './middlewares/Cors.js'
import HeadRoute from './routes/public/HeadRoute.js'
import HealthRoute from './routes/public/Health.js'
import LoginRoute from './routes/public/Login.js'
import UpdateRoute from './routes/private/UserRoutes/Update.js'
import DeleteRoute from './routes/private/UserRoutes/Delete.js'
import CreatePostRoute from './routes/private/PostsRoutes/CreatePost.js'
import DeletePostRoute from './routes/private/PostsRoutes/DeletePost.js'
import GetPostsRoute from './routes/private/PostsRoutes/GetPosts.js'

// Configurations
dotenv.config()
const app = express()
app.use(rateLimiter)
app.use(express.json())
app.use(Cors)
app.use(cookieParser())


// declaring environment variables:
const PORT = process.env.PORT
const DB_URL = process.env.DB_URL

// Database Connect
try{
  mongoose.connect(DB_URL).then(()=>{console.log("Database conected")})
} catch (err) {
  console.log(err)
}

// Routes
app.use("/", HeadRoute)
app.use("/health", HealthRoute)
app.use("/users", SignUpRoute)
app.use("/", LoginRoute)
app.use("/users", UpdateRoute)
app.use("/users", DeleteRoute)
app.use("/posts", CreatePostRoute)
app.use("/posts", DeletePostRoute)
app.use("/posts", GetPostsRoute)

// Running app
app.listen(PORT, ()=>{
    console.log("Server running")
})

export default app
