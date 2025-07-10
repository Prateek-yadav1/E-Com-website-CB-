module.exports = (req, res, next) => {
    if (req.user && req.user.cart && req.user.cart.products) {
        res.locals.cartCount = req.user.cart.products.length;
    } else {
        res.locals.cartCount = 0;
    }
    next();
};