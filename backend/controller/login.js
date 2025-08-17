// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Author } from '../model/author.model.js';

const login = async (req, res) => {
//   Simulate a login authentication process

  const { username, password } = req?.body;

  if(!username || !password){
    return res.status(400).json({ message: 'Username and password are required' });
  }

  //When our author schema has a property password:{select:false} 
  // Mongoose does not return the password field (for security reasons). 
  // so we can select it explicitly using .select('+password')
  // This is useful when we want to retrieve the password field for authentication purposes.
  const foundUser = await Author.findOne({username}).select('+password');

  if(!foundUser) {
    return res.status(404).json({ message: 'User not found' });
  }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if(!isPasswordValid) { 
        return res.status(401).json({ message: 'Invalid password' });
    }

    // Create a JWT token for the user
    const accessToken = jwt.sign(
        {
        id: foundUser._id,
        username: foundUser.username
       }, 
       process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: '1h'}
    );

    const refreshToken = jwt.sign(
        {id: foundUser._id, username: foundUser.username},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '2h'}
    )

    res.cookie('jwt', refreshToken,{
        httpOnly: true, // This makes the cookie inaccessible to JavaScript (helps prevent XSS attacks)
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'None', // Helps prevent CSRF attacks
        maxAge: 24 * 60 * 60 * 2, // 2 hours in milliseconds
    })
    
    res.status(201).json({
        message: 'User logged in successfully',
        user: {
            // id: savedAuthor._id,
            username: foundUser.username,
            profilePicture: foundUser.profilePicture,
            bio: foundUser.bio,
            roles: foundUser.roles // Assuming roles are part of the author model
        },
        accessToken: accessToken // Send the token in the response 
    })
}


export default login;
// module.exports = { loginAuth };