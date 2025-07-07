const Products = require('../../models/products');
const Review = require('../../models/reviews');

module.exports.getAddProduct = (req,res)=>{
    res.render('admin/add-product')
}

module.exports.postAddProduct = async (req,res,next)=>{
    const {name, price, desc, imageURL} = req.body;
    try{
        await Products.create({
            name, 
            price, 
            desc, 
            imageURL,
            userID: req.user._id
        });
        res.redirect('/admin/products');
    }
    catch(e){
        next(e);
    }
}


module.exports.getProducts = async (req,res,next)=>{
    try{
        let products = await Products.find({
            userID: req.user._id // This will allow only those users to see the products that are added by them
        });
        res.render('admin/products',{
            products
        });
    }
    catch(e){
        next(e);
    }
}


module.exports.getEdit = async (req,res,next)=>{
    const {id} = req.query;
    try{
        let product = await Products.findOne({
            _id: id
        });
        res.render('admin/edit-product',{product})
    }
    catch(e){
        next(e);
    }
}

module.exports.postEdit = async (req,res,next)=>{
    const {name, price, desc, imageURL, id} = req.body;
    try{

        let product = await Products.findOne({
            _id: id
        })
        product.name = name;
        product.price = price;
        product.desc = desc;
        product.imageURL = imageURL;

        product.save();

        res.redirect('/admin/products');
    }
    catch(e){
        next(e);
    }
}


module.exports.getDetails = (req,res)=>{
    try{
        res.render('admin/products')
    }
    catch(e){
        next(e);
    }
}


module.exports.getDelete = async (req,res)=>{
    const {id} = req.query;
    try{
        await Products.deleteOne({
            _id: id
        });
        res.redirect('/admin/products');
    }
    catch(e){
        next(e);
    }
}

module.exports.getDeleteReview = async (req,res,next)=>{
    const {id, productId} = req.query;
    try{
        await Review.deleteOne({_id: id});

        let product = await Products.findOne({_id:productId});

        product.reviews.pull({_id:id});
        await product.save();
        // console.log(product);
        
        res.redirect(`/shop/details?id=${productId}`);
    }
    catch(e){
        next(e);
    }
}