const mongoose=require('mongoose')

const blacklistToken=new mongoose.Schema({
    token:{
        type:String,
        requried:true,
        unique:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:86400

    }
})

module.exports=mongoose.model('Blacklisttoken',blacklistToken)