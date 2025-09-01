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

  //  username:{
  //           type: String,
  //           ref:'Author'
  //       }

    // username:{

    // }
  //   reactions: {
  //   like: { type: Number, default: 0 },
  //   dislike: { type: Number, default: 0 },
  //   love: { type: Number, default: 0 },
  //   laugh: { type: Number, default: 0 },
  //   sad: { type: Number, default: 0 },
  //   angry: { type: Number, default: 0 },
  // }

    // comment: {
    //     type: String,   
    //     required: false,
    //     trim: true,
    //     maxlength: 200 // Optional: Limit the length of the comment 
    // }
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
    versionKey: false // Disable the __v fiel
  });

  reactionSchema.virtual('authors', {
    ref: 'Author',
    localField: 'authorId',           //connect reactionSchema to author schema with its id
    foreignField: '_id',                // then can access 
  })

reactionSchema.set('toobject', {virtuals: true})
reactionSchema.set('toJSON', {virtuals: true})

export const Reactions = mongoose.model('Reaction', reactionSchema);