import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        trim: true,
        maxlength: 100,
        unique: true,
        required: true
    },
    
    password:{
        type: String,
        minlength: 8,
        select: false,
        unique: false,
        required: true
    },
    
    role:{
        type: String,
        required: true,
        select: false,
        trim: true,
        unique: false,
        default: "user"
    }
})

const User = mongoose.model("User", userSchema)
export default User
