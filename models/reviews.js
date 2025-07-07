const mongoose = require('mongoose');
const {Schema} = mongoose;

const reviewSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Review', reviewSchema);