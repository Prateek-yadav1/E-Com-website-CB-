module.exports.getProfile=(req,res)=>{
    if(!req.session.username){
        return res.redirect('/login');
    }
    else{
    res.render('profile')}

}