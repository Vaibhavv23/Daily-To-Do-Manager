const express=require('express')
const router=express.Router()
const { showRegisterPage,
       addUser,
       showLoginPage,
       checkLogin,
       Logout,
       showProfilePage,
       editProfile
  }=require('../controllers/UserController')
const { ensureGuest,ensureAuth } = require('../middleware/auth');

//@parentroute /users

//@desc Show user register page
//@route GET/users/register
//@access Public
router.get('/register',ensureGuest, showRegisterPage )

//@desc Process user details
//@route POST/users/register
//@access Public
router.post('/register',addUser )

//@desc Show login page
//@route GET/users/login
//@access Public
router.get('/login',ensureGuest,showLoginPage)

//@desc Process Login Page
//@route POST/users/login
//@access Public
router.post('/login',checkLogin )

// @desc Logout user
// @route GET/users/logout
//@access Private
router.get('/logout',ensureAuth,Logout)

//@desc Show Profile of user
//@route GET/users/profile
//@access Private
router.get('/profile',ensureAuth,showProfilePage)

//@desc Edit Profile of user
//@desc PUT/users/profile
//@access Private
router.put('/profile',ensureAuth,editProfile)

module.exports=router;