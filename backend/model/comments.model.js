import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        require: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    comment: String
}, {
   timestamps: true 
})

export const Comments = mongoose.model('Comment', commentsSchema)