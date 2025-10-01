import jwt from 'jsonwebtoken'
import { Author } from "../model/author.model.js";

export const refresh = async(req, res) =>{   //only when AT is expired this controller is called
    console.log("refresh controller", req.cookies)

    const refToken = req?.cookies?.jwt;
    console.log("refToken", refToken)
    if(!refToken) return res.sendStatus(403)

    // const foundUserWithRefreshToken = await Author.findOne({refreshToken: { $in: [refToken] }});
    const foundUserWithRefreshToken = await Author.findOne({refreshToken: refToken});
    console.log('refresh user', foundUserWithRefreshToken)

    if(!foundUserWithRefreshToken) { //unauthorized  //user may have logged out alredy

    //now user has that rt token so need to check if the rt is valid and also the req has user name in it
    jwt.verify(refToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
        // if(err || foundUserWithRefreshToken.username !== decoded.username) {
        if(err){
            return res.sendStatus(401)
        } 

        //inside error user is found with refresh token
        const hackedUser = await Author.findOne({username: decoded.username})
        hackedUser.refreshToken = [];
        await hackedUser.save();
    })
    return res.sendStatus(403)
}

    //get all other rt except the expired one
    const validRefreshTokens = foundUserWithRefreshToken.refreshToken.filter(rt => rt !== refToken)

 jwt.verify(
    refToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
        if(err){  //if the incomming token has expired then we can remove that token and save only the valid  one
           foundUserWithRefreshToken.refreshToken = [...validRefreshTokens]; //old RT's
           const result = await foundUserWithRefreshToken.save();
        }
      console.log("decodedname",decoded.username, "foundUserWithRefreshToken ",foundUserWithRefreshToken.username);

      if (err || foundUserWithRefreshToken.username !== decoded.username){
        console.log("err in refresh", err.message);
        return res.sendStatus(403);
      }

      console.log("=================entered");
  const roles = Object.values(foundUserWithRefreshToken.roles)


        // create a JWT token for the user
    const newAccessToken = jwt.sign({id: foundUserWithRefreshToken._id, username: foundUserWithRefreshToken.username}, 
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: '1h' });
    
    const newRefreshToken = jwt.sign({id: foundUserWithRefreshToken._id, username: foundUserWithRefreshToken.username}
                ,process.env.REFRESH_TOKEN_SECRET,{expiresIn: '2h'});

     foundUserWithRefreshToken.refreshToken = [...validRefreshTokens, newRefreshToken]   
     const result = await foundUserWithRefreshToken.save()
      res.cookie('jwt', newRefreshToken, {
        httpOnly: true, // This makes the cookie inaccessible to JavaScript (helps prevent XSS attacks)
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'None', // Helps prevent CSRF attacks
        maxAge: 24*60*60*2, // 1 hour in milliseconds, (as refreshToken expires in 2h we set the cookie to 
                      // be expired in same 2h, if it is lesser than that, then the 
                    // cookie will be deleted withing the time and no refresh token will be available)
        // path: '/auth/register'  // For instance, if path is /auth/refresh, 
                             //  the browser will send the cookie only with requests to 
                             // URLs under that path—not with unrelated routes.
    });

      res.json({
        message: 'User reauthenticated successfully',
        user: {
            // id: savedAuthor._id,
            username: foundUserWithRefreshToken.username,
            profilePicture: foundUserWithRefreshToken.profilePicture,
            bio: foundUserWithRefreshToken.bio,
            roles: foundUserWithRefreshToken.roles // Assuming roles are part of the author model
        },
        accessToken: newAccessToken // Send the token in the response 
    });
})
}