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
    image: {
        url: { type: String, default: null },
        public_id: { type: String, default: null }
    }

    // username:{
    //         type: String,
    //         ref:'Author'
    //     }
    // reactions:[{
    //     type: mongoose.Schema.Types.ObjectId,
    //    Comm ref: 'Reaction',
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

  postSchema.virtual('authors', {
    ref: 'Author',
    localField: 'authorId',           //connect reactionSchema to author schema with its id
    foreignField: '_id',                // then can access 
  })

  postSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',      //In post model each posts generates an _id so its a local field for post model
    foreignField: 'postId'  // when creating each comment we setting postId, so postId is exist in comment model
  })                         // using this we connecting both collections


//   postSchema.virtual('authors', {
//     ref: 'Author',
//     localField: 'username',
//     foreignField: 'username',
//   })

postSchema.set('toobject', {virtuals: true})
postSchema.set('toJSON', {virtuals: true})

export const Post = mongoose.model('Post', postSchema);