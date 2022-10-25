const Validator = require("validator");
const validText = require("./valid-text");
const validNumber = require("./valid-number");

module.exports = function validateNewCustomerInput(data) {
    let errors = {};

    data.email = validText(data.email) ? data.email : ''
    data.name = validText(data.name) ? data.name : ''
    data.address = validText(data.address) ? data.address : ''
    data.phone = validNumber(data.phone) ? data.phone : ''

    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email is required";
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = "Name is required";
    }

    if (Validator.isEmpty(data.address)) {
        errors.address = "Address is required";
    }

    if (!Validator.isNumeric(data.phone)) {
        errors.phone = "Phone number is invalid";
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
};