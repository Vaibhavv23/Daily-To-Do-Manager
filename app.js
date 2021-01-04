const express=require('express')
const dotenv=require('dotenv')
const morgan=require('morgan')
const flash=require('connect-flash')
const session=require('express-session')
const methodOverride=require('method-override')
const path=require('path')
const passport=require('passport')
const connectDB=require('./config/db')
const expressLayouts=require('express-ejs-layouts')
// Load config
dotenv.config({ path: './config/config.env' })

// connect to Database by method in db.js
connectDB()

const app=express();

//Require passport middleware
require('./middleware/passport')(passport);

// Body Parser
app.use(express.urlencoded({extended:false}))
app.use(express.json()) 

//Method override 
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    let method = req.body._method
    delete req.body._method
    return method
  }
}))


// Express Sessions
app.use(session({
    secret: 'secret',             //passcode for session
    resave: true,                //save even if nothing is modified
    maxAge: 36000000,           //expires in 10 hrs
    saveUninitialized: true,   //save the uninitialized value also
  }))

// Passport middleware 
app.use(passport.initialize());
app.use(passport.session());

//Connect flash
app.use(flash())

//Global Middleware
app.use((req,res,next)=>{
res.locals.success_msg=req.flash('success_msg');
res.locals.error_msg=req.flash('error_msg');
res.locals.error = req.flash('error');
next();
})

//Logging 
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}

// set view engine for ejs
app.use(expressLayouts)
app.set('layout','layouts/default') //set default layout to default
app.set('view engine','ejs')

//Static folder
app.use(express.static(path.join(__dirname,'public')))

// Routes
app.use('/',require('./routes/indexRoutes'))
app.use('/users',require('./routes/userRoutes'))
app.use('/goals',require('./routes/goalRoutes'))
app.use('/tasks',require('./routes/TaskRoutes'))

// Listen to port
const PORT=process.env.PORT||3000

app.listen(PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))