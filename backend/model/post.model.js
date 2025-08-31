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

    // reactions:[{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Reaction',
    //     default: undefined,
    // }]
}, {
    timestamps: true
})

postSchema.virtual('reactions', {
    ref: 'Reaction',
    localField: '_id',
    foreignField: 'postId'
})

postSchema.set('toobject', {virtuals: true})
postSchema.set('toJSON', {virtuals: true})

export const Post = mongoose.model('Post', postSchema);