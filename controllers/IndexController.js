const Goal=require('../models/Goal')
//@desc Show Home Page
//@route GET/
//@access Public
const showHomePage=(req, res,next) => {
    // res.send('hello');
     res.render('screens/HomePage',{
       layout: 'layouts/main',
        title: 'Todo Manager',
          css: 'css/home.css'
     });
   }

//@desc Show Dashboard Page with all goals
//@route GET/dashboard
//@access Private
const showDashboardPage=async (req,res)=>{
  try {
    console.log(req.user);
    const goals=await Goal.find({user:req.user.id}).lean() ;

    res.render('screens/DashboardPage',{
      layout: 'layouts/main',
      title: 'Todo Manager - Dashboard',
      css:'css/dashboard.css',
      name: req.user.name,
      goals: goals,
      helper: require('../helpers/ejshelper'),
    })
  } catch (error) {
    
  }
 
  }

//@desc Show calendar page
//@route GET/calendar
//@access Private 
const showCalendarPage=(req,res)=>{
  
  console.log(req.user);
   
  res.render('screens/CalendarPage',{
    layout: 'layouts/special',
    title: 'Todo Manager - Calendar',
    css:'css/calendar.css',
    js: 'js/calendar.js',
    name: req.user.name,
    helper: require('../helpers/ejshelper'),
  })
 
  }

//@desc Show calendar page
//@route GET/calendar
//@access Private 
const showReportPage=async (req,res)=>{
  try{
    console.log(req.user);
    const goals=await Goal.find({user:req.user.id}).lean() ;

    
  res.render('screens/ReportPage',{
    layout: 'layouts/main',
    title: 'Todo Manager - Report',
    css:'css/report.css',
    goals,
    name: req.user.name,
    helper: require('../helpers/ejshelper'),
  })
 
  }catch(err){

  }
  
  }


module.exports={
    showHomePage,
    showDashboardPage,
    showCalendarPage,
    showReportPage
}