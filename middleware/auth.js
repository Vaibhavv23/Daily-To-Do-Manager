module.exports={
    ensureAuth:function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg','Please log in to view this resource')
        res.redirect('/users/login')
    },
    ensureGuest:function(req,res,next){
        if(req.isAuthenticated()){
            res.redirect('/dashboard')
        }
        else{
            return next()
        }
    }
}