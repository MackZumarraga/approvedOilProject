const Validator = require("validator");
const validText = require("./valid-text");
const validNumber = require("./valid-number");

module.exports = function validateUpdateCustomerInput(data) {
    let errors = {};
    let updateProperties = {
        email: data.email !== undefined ? true : false,
        name: data.name !== undefined ? true : false,
        address: data.address !== undefined ? true : false,
        phone: data.phone !== undefined ? true : false 
    };

    data.email = updateProperties.email ? (validText(data.email) ? data.email : '') : undefined
    data.name = updateProperties.name ? (validText(data.name) ? data.name : '') : undefined
    data.address = updateProperties.address ? (validText(data.address) ? data.address : ''): undefined
    data.phone = updateProperties.phone ? (validNumber(data.phone) ? data.phone : '') : undefined

    if (updateProperties.email) {
        if (!Validator.isEmail(data.email)) {
            errors.email = "Email is invalid";
        }
        if (Validator.isEmpty(data.email)) {
            errors.email = "Email is required";
        }
    }

    if (updateProperties.name) {
        if (Validator.isEmpty(data.name)) {
            errors.name = "Name is required";
        }
    }

    if (updateProperties.address) {
        if (Validator.isEmpty(data.address)) {
            errors.address = "Address is required";
        }
    }

    if (updateProperties.phone) {
        if (!Validator.isNumeric(data.phone)) {
            errors.phone = "Phone number is invalid";
        }
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
};