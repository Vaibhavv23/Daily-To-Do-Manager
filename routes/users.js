const express=require('express')
const router=express.Router()
const bcrypt=require('bcryptjs')
var validator = require("email-validator");
const passport=require('passport')
const User=require('../models/User')

//@parentroute /users

//@desc Show user register page
//@route GET/register
router.get('/register', (req, res) => {
  res.render('users/register',{
    title: 'Todo Manager - Register ',
    css: '/css/register.css'
  });
})

//@desc Process user details
//@route POST/register
router.post('/register',(req,res)=>{
 var {name,email,password,cpassword}=req.body;
 let errors=[];
console.log(req.body);
    //Check required fields
    if(!name||!email||!password||!cpassword){
        errors.push({msg:'Please fill in all the fields'})
        console.log(errors);
      // send details to prepopulate forms
      res.render('users/register', {
        title: 'Todo Manager - Register ',
        css: '/css/register.css',
        errors,
        name,
        email,
        password,
        cpassword
    })
    }else if(password<6){ // Check passlength is atleast 6
    errors.push({msg:`The password should be atleast 6 character long.`})
    // send details to prepopulate forms return name and email only
    res.render('users/register', {
      title: 'Todo Manager - Register ',
      css: '/css/register.css',
      errors,
      name,
      email
     })
    }else if(password!==cpassword){ //Check if password and confirm password matches
      errors.push({msg:'Passwords do not match'})
  //  send details to prepopulate form return name,email and password only.
      res.render('users/register', {
        title: 'Todo Manager - Register ',
        css: '/css/register.css',
        errors,
        name,
        email,
        password
    })
  }else if(!validator.validate(email)){  // check if email is valid
    //True if email is not valid
    errors.push({msg:'Email ID you entered is not valid'})
    // send details to prepopulate forms return all except email
    res.render('users/register', {
      title: 'Todo Manager - Register ',
      css: '/css/register.css',
      errors,
      name,
      password,
      cpassword
  })
  }else{
    //Validation passed
    User.findOne({email:email})
    .then(user => {
      if(user){
        // User exists by same email id
        errors.push({msg:'This email id is already registered'})
        res.render('users/register',{
          title: 'Todo Manager - Register ',
          css: '/css/register.css',
            errors,
            name,
            email,
            password,
            cpassword,
        });
      }else{
         // no user exists by that email 
        // create a object to pass in the database
         const newUser=new User({
          name,
          email,
          password
      });

      console.log(newUser);
         // encrypt the password so that no one gets access to it.
         bcrypt.genSalt(10,(err,salt)=>
            bcrypt.hash(newUser.password,salt,(err,hash)=>{
                if(err) throw err;
                
                // set password to hash
                newUser.password=hash
            console.log(newUser);

            // save user
            newUser
            .save()
            .then(user=>{
                req.flash('success_msg','You are now registered and can log in')
                res.redirect('login')
            })
            .catch(err=>{console.log(err);})
            }))
       
      }
    })
    .catch(err=> console.log(err));
  }
})

//@desc Show login page
//@route GET/login
router.get('/login',(req,res,next)=>{
  res.render('users/login',{
    title: 'Todo Manager - Login',
    css: '/css/login.css'
  })
})

//@desc Process Login Page
//@route POST/login
router.post('/login',(req,res,next)=>{
  passport.authenticate('local',{
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
   })(req,res,next);
})

// @desc Logout user
// @route GET/logout
router.get('/logout',(req,res,next)=>{
  req.logout();
  req.flash('success_msg','You are logged out successfully');
  res.redirect('/users/login')
})

module.exports=router;