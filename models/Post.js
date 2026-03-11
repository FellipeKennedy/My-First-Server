import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    trim: true,
    select: false,
  },

  comment:{
    type: String,
    minlength: 1,
    maxlength: 500,
    required: true,
    trim: true
  }
}, {
  timestamps: true
})

const Post = mongoose.model("Post", postSchema)
export default Post
