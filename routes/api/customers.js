const express = require("express");
const router = express.Router();
const Customer = require("../../models/Customer");
const Order = require("../../models/Order");
const validateNewCustomerInput = require("../../validation/newCustomer");
const validateUpdateCustomerInput = require("../../validation/updateCustomer");
const ObjectId = require('mongodb').ObjectId;

//Retrieves all customers
router.get("/", (req, res) => {
    Customer
    .find()
    .sort({ name: 1 })
    .then(customers => res.json(customers))
    .catch(err => res.status(400).json(err));
});

//Retrieves a customer via customer ID
router.get("/:id", (req, res) => {
    Customer
    .findById(req.params.id)
    .then(customer => res.json(customer))
    .catch(err => res.status(400).json(err));
});

//Adds a new customer
router.post("/newCustomer", (req, res) => {
    const { errors, isValid } = validateNewCustomerInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Customer.findOne({ email: req.body.email }) //Avoids adding a duplicate
    .then(customer => {
        if (customer) {
            return res.status(400).json({ email: "This email already exists" })
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

//Updates a customer information
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

//Deletes a customer
router.delete("/deleteCustomer/:customer_id", (req, res) => {
    Customer.findByIdAndDelete(req.params.customer_id, function(error, deletedCustomer) {
        if (error || deletedCustomer === null) {
            return res.status(400).json({ error: "This customer does not exist" });
        } else {
            const deletedInstance = { "customerId" : ObjectId(req.params.customer_id) }

            Order.deleteMany(deletedInstance, function(error, deletedOrders) {
                if (error || deletedOrders === null) {
                    return res.status(400).json({ error: "There are no orders for this customer" });
                } 
                else {
                    return res.json({ deletedOrdersCount: deletedOrders.deletedCount, deletedCustomer: deletedCustomer });
                }
            });
        }
    });
});

module.exports = router;