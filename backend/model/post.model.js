import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true  // Reference to the Author model
        },

    reactions:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reaction',
    }
})

const Post = mongoose.model()