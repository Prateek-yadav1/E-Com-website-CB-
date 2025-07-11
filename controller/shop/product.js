const Products = require('../../models/products');
const Review = require('../../models/reviews');

module.exports.getProducts = async (req,res,next)=>{
    try{
        let products = await Products.find({});
        res.render('shop/products',{
            products
        });
    }
    catch(e){
        next(e);
    }
}

module.exports.getDetails = async (req,res,next)=>{
    const {id} = req.query;
    try{
        let product = await Products.findOne({_id:id}).populate('reviews');
        res.render('shop/productDetails',{
            product
        });
    }
    catch(e){
        next(e);
    }
}


module.exports.postSubmitReview = async (req,res,next)=>{
    const {title, desc, prodID} = req.body;
    try{
        let review = await Review.create({title, desc});
        let product = await Products.findOne({_id: prodID});
        product.reviews.unshift(review._id);
        await product.save();

        product = await Products.findOne({_id: prodID}).populate('reviews');
        res.send({
            reviews: product.reviews,
            isAdmin
        });
    }
    catch(e){
        next(e);
    }
}

module.exports.getAddToCart = async (req, res, next) => {
    const { productId } = req.query;

    try {
        const updatedCount = await req.user.addToCart(productId);
        res.json({ cartCount: updatedCount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong!' });
    }
};

//function to count total price
function findTotalPrice(products){
    let totalPrice = 0;
    products.forEach(element => {
        let price = element.id.price * element.quantity;
        totalPrice += price;
    });
    return totalPrice;
}


module.exports.getCart = async (req,res,next)=>{
    try{
        req.user.populate('cart.products.id')
            .then((user)=>{
                let products = user.cart.products;

                let totalPrice = findTotalPrice(products);

                res.render('shop/cart',{
                    products,
                    totalPrice
                });
            })
    }
    catch(e){
        next(e);
    }
}


module.exports.getIncreaseQuantity = async (req, res, next) => {
    const { productId } = req.query;

    try {
        await req.user.populate('cart.products.id');

        let products = req.user.cart.products;


        for (let element of products) {
            if (element.id._id.equals(productId)) {
                element.quantity += 1;

                let totalPrice = findTotalPrice(products);

                await req.user.save();
                return res.send({ quantity: element.quantity, totalPrice });
            }
        }

        return res.json({ message: 'Product not found in cart' });

    } 
    catch (e) {
        next(e);
    }
};


module.exports.getDecreaseQuantity = async (req, res, next) => {
    const { productId } = req.query;

    try {
        await req.user.populate('cart.products.id');

        let products = req.user.cart.products;

        for (let element of products) {
            if (element.id._id.equals(productId)) {
                if (element.quantity > 1) element.quantity -= 1;

                let totalPrice = findTotalPrice(products);

                await req.user.save();
                return res.send({ quantity: element.quantity, totalPrice });
            }
        }

        return res.json({ message: 'Product not found in cart' });

    } 
    catch (e) {
        next(e);
    }
};


module.exports.getDeleteCartItem = async (req, res, next) => {
    const { productId } = req.query;

    try {
        await req.user.populate('cart.products.id');

        req.user.cart.products = req.user.cart.products.filter(p => {
            return !p.id._id.equals(productId);
        });

        await req.user.save();

        const totalPrice = findTotalPrice(req.user.cart.products);

        return res.send({ totalPrice });
    } 
    catch (e) {
        next(e);
    }
};