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

  commentsSchema.virtual('authors', {
    ref: 'Author',
    localField: 'authorId',           //connect reactionSchema to author schema with its id
    foreignField: '_id',                // then can access 
  })

commentsSchema.set('toobject', {virtuals: true})
commentsSchema.set('toJSON', {virtuals: true})

export const Comments = mongoose.model('Comment', commentsSchema)