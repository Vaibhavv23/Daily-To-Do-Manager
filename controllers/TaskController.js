const Task=require('../models/Task')

//@desc Show Add Task Page
//@route GET /tasks/add
//@access Private
const showAddTaskPage=(req,res)=>{
    //console.log(req.user);
    console.log('Goal id ');
    console.log(req.params.id);
      res.render('screens/AddTaskPage',{
          title: 'Todo Manager - Add Task ',
          css: '/css/task.css',
          goal: req.params.id
        });
}

//@desc Add Task in database
//@route POST/tasks/add/goals/:id
//@access Private
const addTask=async(req,res)=> {
 try {
    req.body.user=req.user.id
    console.log(req.body);
     const {taskName,priority,taskType,target,goal,user}=req.body;

     // create an object for goal
     const newTask=new Task({
        taskName,
        priority,
        taskType,
        target,
        goal,
        user
   });

   console.log(newTask);
     // save goal
     newTask
     .save()
     .then((task)=>{
       // task successfully added
        res.redirect(`/goals/${goal}`);
     })
     .catch((err)=>{
       console.log(err);
     })
 } catch (error) {
     
 }
}

//@desc Delete Task from Database
//@route DELETE task/:id
//@access Private
const removeTask=async(req,res) => {
    try {
      await Task.remove({_id:req.params.id })
      res.redirect(``)
    } catch (error) {
        return res.render('screens/NotFoundErrorPage',{
            title: 'Todo Manager - Not Found'
          })
    }
}

//@desc Edit Task in Database
//@route PUT task/:id
//@access Private
const editTask=async(req,res) =>{
    try {
        
    } catch (error) {
        
    }
}

//@desc Show single Task 
//@route GET task/:id
//@access Private
const singleTask=async(req,res) =>{
    try {
        
    } catch (error) {
        
    }
}


module.exports={
    showAddTaskPage,
    addTask,
    removeTask,
    editTask,
    singleTask
}