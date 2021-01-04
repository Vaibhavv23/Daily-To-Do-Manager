const { Router } = require('express')
const express=require('express')
const router=express.Router()
const { ensureAuth,
        ensureGuest }=require('../middleware/auth')
const { showHomePage,
       showDashboardPage, 
       showCalendarPage,
       showReportPage } =require('../controllers/IndexController')
const Goal=require('../models/Goal')
//@parentroute /

//@desc Show Home Page
//@route GET/
//@access Public
router.get('/',ensureGuest,showHomePage)

//@desc Show Dashboard Page
//@route GET/dashboard
//@access Private
router.get('/dashboard',ensureAuth,showDashboardPage)

//@desc Show calendar page
//@route GET/calendar
//@access Private 
router.get('/calendar',ensureAuth, showCalendarPage )

//@desc Show report page
//@route GET/report
//@access Private 
router.get('/report',ensureAuth, showReportPage )

module.exports=router;