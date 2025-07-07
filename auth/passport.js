const passport = require('passport');
const User = require('../models/user');

//Local
const LocalStrategy = require('passport-local');

passport.use(new LocalStrategy(
    async (username, password, done)=>{
      try{
        let user = await User.findOne({username: username});
        if(!user) return done(null, false);
        return done(null, user);
      }
      catch(err){
        return done(err);
      }
    }
));

passport.serializeUser((user, done)=>{
  done(null, user.id);
});

passport.deserializeUser(async (id, done)=>{
  try{
    let user = await User.findById(id);
     done(null, user);
  }
  catch(err){
    done(err, false);
  }
});

//Google
const GoogleStrategy = require('passport-google-oauth20');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENTID,
  clientSecret: process.env.GOOGLE_SECRETKEY,
  callbackURL: `http://localhost:${process.env.PORT}/login/auth/google/callback`
},
    async (accessToken, refreshToken, profile, cb)=>{
      
      try{
        let user = await User.findOne({
          googleID: profile.id
        });

        if(user) return cb(null, user);

        user = await User.create({
          username: profile.displayName,
          googleID: profile.id,
          googleAccessToken: accessToken,
          isAdmin: false
        });

        cb(null, user);
      }
      catch(err){
        cb(err, false);
      }
    }
));

module.exports = passport;