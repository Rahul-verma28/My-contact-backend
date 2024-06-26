const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateUser = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization

    if(authHeader && authHeader.startsWith('Bearer')){
        token = authHeader.split(" ")[1];
        // console.log(token);
        jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, decoded) =>{
            if(err){
                res.status(401);
                throw new Error("User is not authorized")
            }
            req.user = decoded.user;
            next();
            // console.log(decoded);
        })
    }

    if(!token){
        res.status(401);
        throw new Error("User is not authorized or missig token")
    }
})

module.exports = validateUser;