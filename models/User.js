const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    image:{
       type:String,
       default:'images/blank'
    },
    phone:{
        type:Number,
        default: 0
    },
    address:{
        type:String,
        default:'NA'
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})
const User=mongoose.model('User',UserSchema)
module.exports=User;