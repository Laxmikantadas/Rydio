const mongoose = require("mongoose");
const bcrypt=require('bcrypt')
const JWT=require('jsonwebtoken')
const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength:[3,"Name should be 3 character "]
    },
    lastname: {
        type:String,
        required:true
    },
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true

  },
  socketId:{
    type:String
  }
},{timestamps:true});

userSchema.methods.generateAuthToken=function(){
const Token=JWT.sign({_id:this._id},process.env.JWT_SECRET)
return Token
}
userSchema.static.hashPassword=async(password)=>{
  return await bcrypt.hash(password,10)
}

// userSchema.methods.comparePassword=async function(password){
//       return await bcrypt.compare(password,this.password)
// }

const userModel=mongoose.model('user',userSchema)
module.exports=userModel