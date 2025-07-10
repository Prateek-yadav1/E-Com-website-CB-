require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 1111;
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./auth/passport');
const hbs = require('hbs');

app.set('view engine','hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(flash());


const mongoUrl = process.env.DB_PATH;
const sessionSecret = process.env.SECRET_KEY ;

app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.users = req.user; 
    next();
});

const cartCountMiddleware = require('./middlewares/cartCount');
app.use(cartCountMiddleware);

app.get('/',(req,res)=>{
    res.redirect('/login')
})

const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const profileRoute = require('./routes/profile');
const shopRoute = require('./routes/shop');
const addProductRoute = require('./routes/admin');
const { isAdmin } = require('./middlewares/admin');
const { isLoggedIn } = require('./middlewares/isLoggedIn');

app.use('/signup',signupRoute);
app.use('/login',loginRoute);
app.use(isLoggedIn);
app.use('/profile',profileRoute);
app.use('/shop',shopRoute);
app.use('/admin', isAdmin, addProductRoute);


app.get('/logout',(req,res)=>{
req.session.destroy();
res.redirect('/login');

})
mongoose.connect(mongoUrl)
app.listen(PORT,()=>{
    console.log('http://localhost:'+PORT);
})
