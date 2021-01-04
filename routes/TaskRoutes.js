const express=require('express')
const router=express.Router()
const { ensureAuth }=require('../middleware/auth')
const {
   showAddTaskPage,
   addTask,
   singleTask,
   editTask,
   removeTask
}=require('../controllers/TaskController')

router.get('/add/goal/:id',ensureAuth,showAddTaskPage);

//@desc Add Task in database
//@route POST/tasks/add
//@access Private
router.post('/add',ensureAuth,addTask)

//@desc Show single Task 
//@route GET tasks/:id
//@access Private
router.get('/:id',ensureAuth,singleTask)

//@desc delete task
//@route DELETE task/:id
//@access Private
router.delete('/:id/goals/:id',ensureAuth,removeTask)

//@desc edit task
//@route PUT task/:id
//@access Private
router.put('/:id',ensureAuth,editTask)

module.exports=router;