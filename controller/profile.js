module.exports.getProfile = (req, res) => {
    if (!req.user) {
        return res.redirect('/login');
    }
    res.render('profile', { username: req.user.username });
};