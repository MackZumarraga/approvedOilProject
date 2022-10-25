const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        required: true
    },
    price: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    expiration: {
        type: Date,
        required: true
    },
});

const Product = mongoose.model('products', ProductSchema);
module.exports = Product;