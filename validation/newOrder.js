const Validator = require("validator");
const validText = require("./valid-text");
const validNumber = require("./valid-number");

module.exports = function validateNewOrderInput(data) {
    let errors = {};

    data.customerId = validText(data.customerId) ? data.customerId : ''
    data.productId = validText(data.productId) ? data.productId : ''
    data.quantity = validNumber(data.quantity) ? data.quantity : ''
    data.purchaseDate = validText(data.purchaseDate) ? data.purchaseDate : ''

    if (Validator.isEmpty(data.customerId)) {
        errors.customerId = "CustomerId is required";
    }

    if (Validator.isEmpty(data.productId)) {
        errors.productId = "ProductId is required";
    }


    if (!Validator.isInt(data.quantity, {min: 0})) {
        errors.quantity = "Quantity is invalid";
    }

    if (Validator.isEmpty(data.purchaseDate)) {
        errors.purchaseDate = "Purchase date is required";
    }

    if (!Validator.isDate(data.purchaseDate)) {
        errors.purchaseDate = "Purchase date is invalid";
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
};