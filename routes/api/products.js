const express = require("express");
const router = express.Router();
const Product = require("../../models/Product");
const Order = require("../../models/Order");
const validateNewProductInput = require("../../validation/newProduct");
const validateUpdateProductInput = require("../../validation/updateProduct");
const ObjectId = require('mongodb').ObjectId;

router.get("/", (req, res) => {
    Product
    .find()
    .sort({ name: 1 })
    .then(products => res.json(products))
    .catch(err => res.status(400).json(err));
});

router.get("/:id", (req, res) => {
    Product
    .findById(req.params.id)
    .then(product => res.json(product))
    .catch(err => res.status(400).json(err));
});

router.post("/newProduct", (req, res) => {
    const { errors, isValid } = validateNewProductInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Product.findOne({ name: req.body.name })
    .then(product => {
        if (product) {
            return res.status(400).json( {product: "This product already exists"});
        } else {
            const newProduct = new Product({
                name: req.body.name,
                type: req.body.type,
                price: req.body.price,
                expiration: req.body.expiration
            })

            newProduct.save().then(product => res.send(product)).catch(err => res.send(err));
        }
    });
});


router.patch("/updateProduct/:product_id", (req, res) => {
    const { errors, isValid } = validateUpdateProductInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const update = req.body
    
    Product.findByIdAndUpdate(req.params.product_id, update, { new: true }, function(error, updatedProduct) {
        if (error) {
            return res.status(400).json(error);
        } else {
            return res.json(updatedProduct);
        }
    });
});


router.delete("/deleteProduct/:product_id", (req, res) => {
    Product.findByIdAndDelete(req.params.product_id, function(error, deletedProduct) {
        if (error || deletedProduct === null) {
            return res.status(400).json({ error: "This product does not exist" });
        } else {
            const deletedInstance = { "productId" : ObjectId(req.params.product_id) }

            Order.deleteMany(deletedInstance, function(error, deletedOrders) {
                if (error || deletedOrders === null) {
                    return res.status(400).json({ error: "There are no orders for this product" });
                } 
                else {
                    return res.json({ deletedOrdersCount: deletedOrders.deletedCount, deletedProduct: deletedProduct });
                }
            });
        }
    });
});

module.exports = router;