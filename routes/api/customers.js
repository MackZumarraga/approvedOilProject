const express = require("express");
const router = express.Router();
const Customer = require("../../models/Customer");
const validateNewCustomerInput = require("../../validation/newCustomer");

router.get("/test", (req, res) => {
    res.json({ msg: "this is the customers route"});
});

router.post("/newCustomer", (req, res) => {
    const { errors, isValid } = validateNewCustomerInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Customer.findOne({ email: req.body.email })
    .then(customer => {
        if (customer) {
            return res.status(400).json( {email: "This email already exists"})
        } else {
            const newCustomer = new Customer({
                email: req.body.email,
                name: req.body.name,
                address: req.body.address,
                phone: req.body.phone
            })

            newCustomer.save().then(customer => res.send(customer)).catch(err => res.send(err));
        }
    })
})

module.exports = router;