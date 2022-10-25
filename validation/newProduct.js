const Validator = require("validator");
const validText = require("./valid-text");
const validNumber = require("./valid-number");
const types = require("./product-types");

module.exports = function validateNewProductInput(data) {
    let errors = {};

    data.name = validText(data.name) ? data.name : ''
    data.type = validNumber(data.type) ? data.type : ''
    data.price = validNumber(data.price) ? data.price : ''
    data.expiration = validText(data.expiration) ? data.expiration : ''

    if (Validator.isEmpty(data.name)) {
        errors.name = "Name is required";
    }

    if (!Validator.isIn(data.type, Object.keys(types))) {
        errors.type = "Type is not valid";
    }

    if (!Validator.isFloat(data.price, {min: 0.00})) {
        errors.price = "Price is invalid";
    }

    if (Validator.isEmpty(data.expiration)) {
        errors.expiration = "Expiration date is required";
    }

    if (!Validator.isDate(data.expiration)) {
        errors.expiration = "Expiration date is invalid";
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
};