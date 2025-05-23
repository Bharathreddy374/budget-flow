const User = require("../models/User")
const jwt = require("jsonwebtoken");

const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1h"});

}

exports.registerUser =async(req,res)=>{
    const{fullname,email,pass,profileImageUrl}=req.body;
        console.log(req.body);

    if(!fullname||!email||!pass){
        return res.status(400).json({message:"All feilds are required"});
    }
    try{
        const existingUser=await User.findOne({email});
        if(existingUser){
            console.log("email exists");
            return res.status(400).json({message:"Email Already exists!"});
        }

        const user = await User.create({
            fullname,email,pass,profileImageUrl,
            
        });
        console.log("user created");

        res.status(201).json({
            id: user._id,
            user,
            token:generateToken(user._id),
        });
         }catch(err){
            res
            .status(500)
            .json({message:"Error registering user",error:err.message});

    }
};

exports.loginUser =async(req,res)=>{
    const {email,pass} = req.body;
    if(!email || !pass){
        return res.status(400).json({message:"All feilds are required!"});
    }
    try{
        const user=await User.findOne({email});
        if(!user|| !(await user.comparePassword(pass))){
            return res.status(400).json({message:"Inavlid credentials"});

        }
        res.status(200).json({
            id:user._id,
            user,
            token:generateToken(user._id),
        });
    }catch(err){
         res
            .status(500)
            .json({message:"Error registering user",error:err.message});
    }

};

exports.getUserInfo =async(req,res)=>{
    try{
        const user= await User.findById(req.user.id).select("-pass");
        if(!user){
            return res.status(404).json({message:"User Not found!"});

        }
        res.status(200).json(user);
    }catch(err){
         res
            .status(500)
            .json({message:"Error registering user",error:err.message});
    
    }
};