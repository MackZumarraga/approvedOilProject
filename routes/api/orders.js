const express = require("express");
const router = express.Router();
const Product = require("../../models/Product");
const Customer = require("../../models/Customer");
const Order = require("../../models/Order");
const validateNewOrderInput = require("../../validation/newOrder");

router.get("/test", (req, res) => {
    res.json({ msg: "this is the orders route"});
});

router.post("/newOrder", (req, res) => {
    const { errors, isValid } = validateNewOrderInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Customer.findById(req.body.customerId, (error, data) => {
        if (error) {
            return res.status(400).json( {customer: "This customer does not exist"} );
        } else {
            Product.findById(req.body.productId, (error, data) => {
                if (error) {
                    return res.status(400).json( {customer: "This product does not exist"} );
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

module.exports = router;