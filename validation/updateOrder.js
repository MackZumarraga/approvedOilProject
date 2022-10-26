const Validator = require("validator");
const validText = require("./valid-text");
const validNumber = require("./valid-number");

module.exports = function validateUpdateOrderInput(data) {
    let errors = {};
    let updateProperties = {
        customerId: data.customerId !== undefined ? true : false,
        productId: data.productId !== undefined ? true : false,
        quantity: data.quantity !== undefined ? true : false,
        purchaseDate: data.purchaseDate !== undefined ? true : false 
    };

    data.customerId = updateProperties.customerId ? (validText(data.customerId) ? data.customerId : '') : undefined
    data.productId = updateProperties.productId ? (validText(data.productId) ? data.productId : '') : undefined
    data.quantity = updateProperties.quantity ? (validNumber(data.quantity) ? data.quantity : '') : undefined
    data.purchaseDate = updateProperties.purchaseDate ? (validText(data.purchaseDate) ? data.purchaseDate : '') : undefined

    if (updateProperties.customerId) {
        if (Validator.isEmpty(data.customerId)) {
            errors.customerId = "Customer ID is required";
        }
    }

    if (updateProperties.productId) {
        if (Validator.isEmpty(data.productId)) {
            errors.productId = "Product ID is required";
        }
    }
    
    if (updateProperties.name) {
        if (Validator.isEmpty(data.name)) {
            errors.name = "Name is required";
        }
    }

    if (updateProperties.quantity) {
        if (!Validator.isInt(data.quantity, {min: 0})) {
            errors.quantity = "Quantity is invalid";
        }
    }

    if (updateProperties.purchaseDate) {
        if (Validator.isEmpty(data.purchaseDate)) {
            errors.purchaseDate = "Purchase date is required";
        }
        if (!Validator.isDate(data.purchaseDate)) {
            errors.purchaseDate = "Purchase date is invalid";
        }
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
};