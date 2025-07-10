const Users = require('../models/user');

module.exports.getSignup = (req, res) => {
    res.render('signup', { msg: req.flash('msg') });
};

module.exports.postSignup = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        let user = await Users.findOne({ username });
        if (!user) {
            await Users.create({ username, password });
            req.flash('msg', 'You have successfully signed up');
            return res.redirect('/login');
        } else {
            req.flash('msg', 'Username already exists!');
            return res.redirect('/signup');
        }
    } catch (err) {
        req.flash('msg', 'Signup not successful, try again!');
        return res.redirect('/signup');
    }
};