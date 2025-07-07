const path=require('path');
const express=require('express');
const app=express();
const Port=1111;
const expressSession=require('express-session');
const MongoStore=require('connect-mongo');
const mongoose=require('mongoose')
const flash=require('connect-flash');
const hbs = require('hbs');
require('dotenv').config();

hbs.registerPartials(path.join(__dirname , 'views/partials'));

app.set('view engine','hbs');
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(flash());

app.use(expressSession({
secret:process.env.SECRET_KEY,
resave:false,
saveUninitialized:true,
store:MongoStore.create({
    mongoUrl:process.env.DB_PATH})
}))

app.get('/',(req,res)=>{
    res.redirect('/login');
})


app.use('/login',require('./routes/login'));
app.use('/signup',require('./routes/signup'));
app.use('/profile',require('./routes/profile'));
app.use('/admin',require('./routes/admin'));
// app.use('/shop',);



app.get('/logout',(req,res)=>{
req.session.destroy();
res.redirect('/login');

})
mongoose.connect(process.env.DB_PATH)
app.listen(Port,()=>{
    console.log('http://localhost:'+Port);
})
