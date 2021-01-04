const express=require('express')
const router=express.Router()
const { ensureAuth }=require('../middleware/auth')
const { showGoalPage,
         addGoal,
         removeGoal,
         editGoal,
         showEditGoalPage,
        showSingleGoal } =require('../controllers/GoalController')

//@parentroute /goals

//@desc Show add goal page
//@route GET/goals/add
//@access Private
router.get('/add',ensureAuth,showGoalPage )

//@desc Process add goal
//@route POST/goals/add
//@access Private
router.post('/add',ensureAuth,addGoal )

//@desc Show goal Details page
//@route GET/goal/:id
//@access Private
router.get('/:id',ensureAuth,showSingleGoal)

//@desc Show edit goal page
//@route GET goals/edit/:id
//@access Private
router.get('/edit/:id',ensureAuth,showEditGoalPage)


//@desc Update Goal
//@route PUT goal/:id
//@access Private
router.put('/:id',ensureAuth,editGoal)

//@desc Delete Goal
//@route DELETE goal/:id
//@access Private
router.delete('/:id',ensureAuth,removeGoal)

module.exports=router;

