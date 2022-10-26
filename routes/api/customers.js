const express = require("express");
const router = express.Router();
const Customer = require("../../models/Customer");
const validateNewCustomerInput = require("../../validation/newCustomer");
const validateUpdateCustomerInput = require("../../validation/updateCustomer");

router.get("/", (req, res) => {
    Customer
    .find()
    .sort({ name: 1 })
    .then(customers => res.json(customers))
    .catch(err => res.status(400).json(err));
});

router.get("/:id", (req, res) => {
    Customer
    .findById(req.params.id)
    .then(customer => res.json(customer))
    .catch(err => res.status(400).json(err));
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


router.patch("/updateCustomer/:customer_id", (req, res) => {
    const { errors, isValid } = validateUpdateCustomerInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const update = req.body
    
    Customer.findByIdAndUpdate(req.params.customer_id, update, { new: true }, function(error, updatedCustomer) {
        if (error) {
            return res.status(400).json(error);
        } else {
            return res.json(updatedCustomer);
        }
    });
});

module.exports = router;