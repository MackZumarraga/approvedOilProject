const express = require("express");
const router = express.Router();
const Product = require("../../models/Product");
const validateNewProductInput = require("../../validation/newProduct");

router.get("/test", (req, res) => {
    res.json({ msg: "this is the customers route"});
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

module.exports = router;