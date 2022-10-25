const Validator = require("validator");
const validText = require("./valid-text");
const validNumber = require("./valid-number");

module.exports = function validateNewProductInput(data) {
    let errors = {};

    data.name = validText(data.name) ? data.name : ''
    data.type = validNumber(data.type) ? data.type : ''
    data.price = validNumber(data.price) ? data.price : ''
    data.expiration = validText(data.expiration) ? data.expiration : ''

    if (Validator.isEmpty(data.name)) {
        errors.name = "Name is required";
    }

    if (Validator.isEmpty(data.type)) {
        errors.type = "Type is required";
    }

    if (!Validator.isNumeric(data.price)) {
        errors.price = "Price is invalid";
    }

    if (Validator.isEmpty(data.expiration)) {
        errors.expiration = "Expiration date is required";
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
};