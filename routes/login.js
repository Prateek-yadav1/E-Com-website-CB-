const express = require('express');
const router = express.Router();
const loginController = require('../controller/login')
const myPassport = require('../auth/passport');

router.get('/',loginController.getLogin);
router.post('/',
    myPassport.authenticate('local', { failureRedirect: '/profile' }),
    (req, res) => {
        res.redirect('/profile');
    }
)
router.get('/google',
    myPassport.authenticate('google', {scope: ['profile']})
)

router.get('/auth/google/callback',
    myPassport.authenticate('google', { failureRedirect: '/profile' }),
    (req,res)=>{
        res.redirect('/profile');
    }
);

module.exports = router;