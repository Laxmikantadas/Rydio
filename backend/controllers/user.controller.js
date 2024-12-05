const userModel = require("../models/user.model.js");
const { createUser } = require("../services/user.services.js");
const { validationResult } = require("express-validator");
const blacklistTokenModel=require('../models/blacklistToken.model.js')
const bcrypt = require("bcrypt");
exports.register = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  const { fullname, email, password } = req.body;
  const exitingUser=await userModel.find({email})
  if(exitingUser){
    res.status(409).json({message:"User is already exist"})
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashPassword,
  });
  const token = user.generateAuthToken();
  res.status(201).json({ user, token });
};

exports.loginUser = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = user.generateAuthToken();
    res.cookie('token',token)
    res.status(200).json({ user, token });
  
};

exports.getUserProfile=async(req,res)=>{
   res.status(200).json(req.user)
}

exports.userLogout=async(req,res)=>{
   res.clearCookie('token')
   const token =req.cookies.token||req.headers.authorization.split(" ")[1] ;
    
   await blacklistTokenModel.create({token})
   res.status(200).json({message:"Logged Out"})
}