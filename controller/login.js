const Users=require('../models/user');

module.exports.getLogin=(req,res)=>{
     if(req.session.username){
       return  res.redirect('/profile');
    }
    res.render('login',{msg:req.flash('msg')});
}

module.exports.postLogin=async (req,res,next)=>{
    const {username,password}=req.body;
     if(req.session.username===username && req.session.password===password){
       return  res.redirect('/profile');
    }
     else{
        req.flash('msg','Incorrect username or password!');
        res.redirect('/profile');
    }
    try{
let user=await Users.findOne({
    username
})
if(!user){
    req.flash('msg','Incorrect Username');
}
if(user.password!==password){
    req.flash('msg','Incorrect Password')
    return res.redirect('profile');
}
req.session.username=user.username;
req.session.password=user.password;
return res.redirect('profile');
    }
    catch(err){
next(err);
    }
   
   
}