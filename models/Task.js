const mongoose=require('mongoose')

const TaskSchema=new mongoose.Schema({
    taskName:{
        type: String,
        required: true
    },
    priority:{
        type:String,
        required:true,
    },
    taskType:{
        type:String,
        required:true,
    },
    target:{
        type:Number,
        required:false,
    },
    goal:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Goal',
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

const Task=mongoose.model('Task',TaskSchema)
module.exports=Task;