const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel")

const authHandler = expressAsyncHandler(async(req, res, next)=> {
    const {token} = req.cookies;
    if(!token){
        res.status(401);
        throw new Error("Token is not valid");
    }

    const decodeObj = jwt.verify(token, process.env.SECREAT_TOKEN)
    const {_id} = decodeObj.user;
    
    const user = await User.findById({_id}).select("-password")
    if(!user){
        res.status(401);
        throw new Error("User is not authorised");
    }

    req.user = user;

    next();
})

module.exports = authHandler

