const Users = require('../models/user');

module.exports.getLogin = (req, res) => {
    if (req.user) {
        return res.redirect('/profile');
    }
    res.render('login', { msg: req.flash('msg') });
};

module.exports.postLogin = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        let user = await Users.findOne({ username });
        if (!user) {
            req.flash('msg', 'Incorrect Username');
            return res.redirect('/login');
        }
        if (user.password !== password) {
            req.flash('msg', 'Incorrect Password');
            return res.redirect('/login');
        }
        req.login(user, function (err) {
            if (err) return next(err);
            return res.redirect('/profile');
        });
    } catch (err) {
        next(err);
    }
};