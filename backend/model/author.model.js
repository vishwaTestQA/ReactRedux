import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, // Removes whitespace from both ends of the string
        minlength: 3, // Minimum length for username
        maxLength: 20, // Maximum length for username
        match: /^[a-zA-Z0-9]+$/, // Regex to allow only alphanumeric characters
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Minimum length for password
        select: false, // Exclude password from query results by default
    },
    profilePicture: {
        type: Object,   // URL or path to the profile picture
        default: {}, // Default profile picture if none is provided
    },
    bio: {
        type: String,
        maxLength: 200, // Maximum length for bio
        default: '', // Default bio if none is provided
    },
    roles:{
    User:{
      type:Number,
      default: 2001
    },
    Editor: Number,
    Admin: Number,
   },
    refreshToken: [String] // Array to store refresh tokens, allowing multiple tokens for the user
}, {
  timestamps: true, // This will add createdAt and updatedAt fields
  versionKey: false // This will remove the __v field
  });

  authorSchema.method.toJSON = function() {
    const userObject = this.toObject();
    delete userObject.password; // Exclude password from the JSON representation
    return userObject;
}

  const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9]+$/; // Regex to allow only alphanumeric characters
    return regex.test(username);
  }

  authorSchema.methods.validateUsername = function() {
    return validateUsername(this.username);
    }

//That authorSchema.pre('save', ...) 
// is a Mongoose middleware hook that runs 
// before a document is saved to MongoDB.
  authorSchema.pre('save', function(next) {
    if (!validateUsername(this.username)) {
        return next(new Error('Username can only contain alphanumeric characters.'));
        }
    next();
    });

    authorSchema.pre('findOneAndUpdate', function(next) {
    const update = this.getUpdate();     
    if (update && update.username && !validateUsername(update.username)) {
        return next(new Error('Username can only contain alphanumeric characters.'));
    }       
    next();
    });

    authorSchema.pre('updateOne', function(next) {
    const update = this.getUpdate();    
    if (update && update.username && !validateUsername(update.username)) {
        return next(new Error('Username can only contain alphanumeric characters.'));
    }   
    next();
    });

    authorSchema.pre('findOneAndReplace', function(next) {
    const replacement = this.getReplacement();
    if (replacement && replacement.username && !validateUsername(replacement.username)) {
        return next(new Error('Username can only contain alphanumeric characters.'));
    }   
    next();
    }); 

    authorSchema.pre('replaceOne', function(next) {
    const replacement = this.getReplacement();
    if (replacement && replacement.username && !validateUsername(replacement.username)) {
        return next(new Error('Username can only contain alphanumeric characters.'));
    }
    next();
    });

    authorSchema.pre('insertMany', function(next) {
    const users = this.getDocuments();
    for (const user of users) {
        if (!validateUsername(user.username)) {
            return next(new Error('Username can only contain alphanumeric characters.'));
        }
    } 
    next();
    });

    

export const Author = mongoose.model('Author', authorSchema);