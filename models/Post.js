import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  comment:{
    type: String,
    minlenght: 1,
    maxlenght: 100,
    required: true,
    trim: false
  },

  createdAt: {
    type: Date,
    default: Date.now()
  }
})

const Post = mongoose.model("Post", postSchema)
export default Post
