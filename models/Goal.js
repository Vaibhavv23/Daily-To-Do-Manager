const mongoose=require('mongoose')

const GoalSchema=new mongoose.Schema({
    goalName:{
        type: String,
        required: true
    },
    startDate:{
        type:String,
        required:true,
    },
    endDate:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:false,
    },
    totalDays: {
        type:Number,
        required:false,
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
const Goal=mongoose.model('Goal',GoalSchema)
module.exports=Goal;