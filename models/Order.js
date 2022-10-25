const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'customers',
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    purchaseDate: {
        type: Date,
        default: Date.now,
        required: true
    },
});

const Order = mongoose.model('orders', OrderSchema);
module.exports = Order;