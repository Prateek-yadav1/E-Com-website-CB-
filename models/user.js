const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    username: String,
    password: String,
    fbID: String,
    fbAccesToken: String,
    googleID: String,
    googleAccessToken: String,
    isAdmin: Boolean,
    cart: {
        products: [
            {
                id: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: 'Products'
                },
                quantity: Number
            }
        ]
    }
})

userSchema.methods.addToCart = async function (productId) {
    const cartProducts = this.cart.products;

    const index = cartProducts.findIndex(item => 
        item.id.toString() === productId.toString()
    );

    if (index === -1) {
        cartProducts.unshift({
            id: productId,
            quantity: 1
        });
    } 
    else {
        cartProducts[index].quantity += 1;
    }

    await this.save();

    return this.getCartCount();
};


userSchema.methods.getCartCount = function () {
    return this.cart.products.reduce((total, item) => total + item.quantity, 0);
};

module.exports = mongoose.model('User', userSchema);