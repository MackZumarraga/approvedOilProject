const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    customerId: {
        type: Number,
        required: true
    },
    productId: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    purchaseDate: {
        type: Date,
        required: true
    },
});

const Order = mongoose.model('orders', OrderSchema);
module.exports = Order;