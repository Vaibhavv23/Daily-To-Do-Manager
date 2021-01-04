const { Router } = require('express')
const express=require('express')
const router=express.Router()
const { ensureAuth,ensureGuest }=require('../middleware/auth')

//@parentroute /

//@desc Show landing page
//@route GET
router.get('/',ensureGuest,(req, res,next) => {
  res.render('home',{
    layout: 'layouts/main',
     title: 'Todo Manager',
       css: 'css/home.css'
  });
})

router.get('/dashboard',ensureAuth,(req,res)=>{
  console.log(req.user);
  res.render('dashboard',{
    layout: 'layouts/main',
    title: 'Todo Manager - Dashboard',
    css:'css/listmenu.css',
    name: req.user.name,
  })
})
module.exports=router;