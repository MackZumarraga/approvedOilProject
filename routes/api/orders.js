const express = require("express");
const router = express.Router();
const Product = require("../../models/Product");
const Customer = require("../../models/Customer");
const Order = require("../../models/Order");
const validateNewOrderInput = require("../../validation/newOrder");
const validateUpdateOrderInput = require("../../validation/updateOrder");

router.get("/", (req, res) => {
    Order
    .find()
    .sort({ purchaseDate: -1 })
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json(err));
});

router.get("/customer/:customer_id", (req, res) => {
    Order
    .find({ customerId: req.params.customer_id })
    .sort({ purchaseDate: -1 })
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json(err));
})

router.get("/product/:product_id", (req, res) => {
    Order
    .find({ productId: req.params.product_id })
    .sort({ purchaseDate: -1 })
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json(err));
})

router.get("/:id", (req, res) => {
    Order
    .findById(req.params.id)
    .then(order => res.json(order))
    .catch(err => res.status(400).json(err));
});


router.post("/newOrder", (req, res) => {
    const { errors, isValid } = validateNewOrderInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Customer.findById(req.body.customerId, (error, customer) => {
        if (error) {
            return res.status(400).json( {customer: "This customer does not exist"} );
        } else {
            Product.findById(req.body.productId, (error, product) => {
                if (error) {
                    return res.status(400).json( {product: "This product does not exist"} );
                } else {
                    const newOrder = new Order({
                        customerId: req.body.customerId,
                        productId: req.body.productId,
                        quantity: req.body.quantity,
                        purchaseDate: req.body.purchaseDate
                    });
        
                    newOrder.save().then(order => res.send(order)).catch(err => res.send(err));
                }
            });
        }
    });
});


router.patch("/updateOrder/:order_id", (req, res) => {
    const { errors, isValid } = validateUpdateOrderInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const update = req.body

    Customer.findById(req.body.customerId, (error, customer) => {
        if (error) {
            return res.status(400).json( {customer: "This customer does not exist"} );
        } else {
            Product.findById(req.body.productId, (error, product) => {
                if (error) {
                    return res.status(400).json( {product: "This product does not exist"} );
                } else {
                    
                    Order.findByIdAndUpdate(req.params.order_id, update, { new: true }, function(error, updatedOrder) {
                        if (error) {
                            return res.status(400).json(error);
                        } else {
                            return res.json(updatedOrder);
                        }
                    });



                }
            });
        }
    });
    
    // Order.findByIdAndUpdate(req.params.order_id, update, { new: true }, function(error, updatedOrder) {
    //     if (error) {
    //         return res.status(400).json(error);
    //     } else {
    //         return res.json(updatedOrder);
    //     }
    // });
});

module.exports = router;