import jwt from 'jsonwebtoken';
export const checkAuth = async (req, res, next) => {
    console.log('req', req.header)
    // const token = req.cookie.jwt; // when the access token is sent through cookies then we can use like this
    const authHeader =  req.headers.authorization || req.headers.Authorization; // when the access token is sent through headers then we can use like this
console.log('auth in server', authHeader );
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token from the header
    if(!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err){
                return res.status(403).json({ message: 'Forbidden' });
            }
            // console.log("req.user", req.user, "REQ.ROLES", req.roles)
            // req.user = decoded.user.username; // Attach the username to the request object
            // req.roles = decoded.user.roles; // Attach the user ID to the request object
            next();
        });
    } catch (error) {
        res.status(403).json({ message: 'Forbidden' });
    }
}