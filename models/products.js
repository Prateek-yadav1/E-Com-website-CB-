const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews:{
        type: [Schema.Types.ObjectId],
        ref: 'Review'
    }
});

module.exports = mongoose.model('Products', productSchema);