import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    type: {
        type: String,
        enum: ['like', 'dislike', 'love', 'laugh', 'sad', 'angry'],
        required: true
    },
    comment: {
        type: String,   
        required: false,
        trim: true,
        maxlength: 200 // Optional: Limit the length of the comment 
    }
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
    versionKey: false // Disable the __v fiel
    });

export const Reactions = mongoose.model('Reactions', reactionSchema);