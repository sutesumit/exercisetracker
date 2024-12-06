import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    username: {
        type: String
    }
})

export const User = mongoose.model('User', userSchema)

const exerciseSchema = mongoose.Schema({
    userId : {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date
    }
})

export const Exercise = mongoose.model('Exercise', exerciseSchema)


