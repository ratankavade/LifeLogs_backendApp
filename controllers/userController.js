const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//@desc - User registration
//@route - POST - /register
//@access - public
const userRegistration = expressAsyncHandler(async(req, res)=>{
    const {userName, email, password, photoUrl} = req.body;
    if(!userName || !email || !password){
        res.status(400).json({message: "All fields are required."});
        // throw new Error("All fields are mandatory..");
    }
    const alreadyRegistered = await User.findOne({email});

    if(alreadyRegistered){
        res.status(400).json({message: "User is already registered."});
        // throw new Error("User already registered!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        userName, email, password: hashedPassword, photoUrl
    })

    if(user){
        await res.status(200).send("User register successfully!", user);
    }else{
        res.status(400).json({message: "Invalid data"});
        // throw new Error("Invalid data");
    }
    
});

//@desc - User login
//@route - POST - /login
//@access - public
const userLogin = expressAsyncHandler(async(req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400).json({message: "All fields are required."});
        // throw new Error("All fields are mandatory");
    }
    const registeredUser = await User.findOne({email});

    if(!registeredUser){
        res.status(400).json({message: "Please register before login."});
        // throw new Error("Please register before login");
    }
    const comparePassword = await bcrypt.compare(password, registeredUser.password);
    if(!comparePassword){
        res.status(400).json({message : "Enter valid password."});
        // throw new Error("Please enter valid password");
    }

    if(registeredUser && comparePassword){
        const accessToken = await jwt.sign({
            user: {
                userName: registeredUser.userName,
                email: registeredUser.email,
                _id: registeredUser._id
            }
        },
        process.env.SECREAT_TOKEN,
        {
            expiresIn: '10h'
        })
        res.cookie("token", accessToken);
        await res.status(200).json(registeredUser);

    }else{
        res.status(400);
        throw new Error("Please enter valid email id and password");
    }
})

//@desc - User login
//@route - POST - /login
//@access - public
const userLogout = expressAsyncHandler(async(req, res)=> {
    res.cookie("token", null, {
        expires: new Date(Date.now()) 
    });
    res.send("Logout successfull")
})

//@desc - profile information
//@route - GET - /profile
//@access - private
const userProfile = expressAsyncHandler(async(req, res)=> {
    const user = req.user;
    // const user = await User.findById(req.params.id)
    // console.log("user", user);
    await res.status(200).json(user)
})

//@desc - profile information
//@route - GET - /profile/:id
//@access - private
const getAllUser = expressAsyncHandler(async(req, res)=> {
    const user = await User.find()
    await res.status(200).send(user)
})


module.exports = {
    userRegistration, userLogin, userProfile, getAllUser, userLogout
}