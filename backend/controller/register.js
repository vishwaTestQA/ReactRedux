export const register = async (req, res) => {
   const { username, password, confirmPassword } = req.body;

   if(!username || !password || !confirmPassword) {
       return res.status(400).json({ message: 'All fields are required' });
   } 

   if(password.length < 6) {
       return res.status(400).json({ message: 'Password must be at least 6 characters long' });
   }

    if(password !== confirmPassword) {
         return res.status(400).json({ message: 'Passwords do not match' });
    }

    const foundUser = await Author.findOne({ username });
    if(foundUser) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAuthor = new Author({
        username,
        password: hashedPassword,
        profilePicture: req.body.profilePicture || 'defaultProfilePic.jpg', // Optional profile picture
        bio: req.body.bio || '', // Optional bio
    });

    try {
            console.log(savedAuthor.validateUsername()); // This will log true if the username is valid   
       // this method is defined in the author.model.js file
       
         // create a JWT token for the user
        const token = jwt.sign({id: newAuthor._id, username: newAuthor.username}, 
        process.env.ACCESS_TOKEN_SECRET, 
        { expiresIn: '1h' });

        const refreshToken = jwt.sign({id: newAuthor._id, username: newAuthor.username}
            ,process.env.REFRESH_TOKEN_SECRET,{expiresIn: '2h'});
    
    // send the token in the response
    res.cookie('jwt', refreshToken, {
        httpOnly: true, // This makes the cookie inaccessible to JavaScript (helps prevent XSS attacks)
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'Strict', // Helps prevent CSRF attacks
        maxAge: 3600000*2, // 1 hour in milliseconds, (as refreshToken expires in 2h we set the cookie to 
                      // be expired in same 2h, if it is lesser than that, then the 
                    // cookie will be deleted withing the time and no refresh token will be available)
        path: '/auth/refresh'  // For instance, if path is /auth/refresh, 
                             //  the browser will send the cookie only with requests to 
                             // URLs under that path—not with unrelated routes.
    });

    res.status(201).json({
        message: 'User registered successfully',
        user: {
            username: newAuthor.username,
            profilePicture: newAuthor.profilePicture,
            bio: newAuthor.bio
        },
        accessToken: token // Send the token in the response 
    });
      const savedAuthor = await newAuthor.save();
    } catch (error) {       
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
    // Note: In a real application, you would also want to send a response with the user data or a token
    // to the client after successful registration. 
    // This is just a basic example to demonstrate the registration logic.
    // You can also implement email verification, password strength checks, etc. as needed.
    // For now, we are just returning a success message.
    // res.json({ message: "Registration successful" });   
}