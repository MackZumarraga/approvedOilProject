const Validator = require("validator");
const validText = require("./valid-text");
const validNumber = require("./valid-number");
const types = require("./product-types");

module.exports = function validateUpdateProductInput(data) {
    let errors = {};
    let updateProperties = {
        name: data.name !== undefined ? true : false,
        type: data.type !== undefined ? true : false,
        price: data.price !== undefined ? true : false,
        expiration: data.expiration !== undefined ? true : false 
    };

    data.name = updateProperties.name ? (validText(data.name) ? data.name : '') : undefined
    data.type = updateProperties.type ? (validNumber(data.type) ? data.type : '') : undefined
    data.price = updateProperties.price ? (validNumber(data.price) ? data.price : '') : undefined
    data.expiration = updateProperties.expiration ? (validText(data.expiration) ? data.expiration : '') : undefined

    if (updateProperties.name) {
        if (Validator.isEmpty(data.name)) {
            errors.name = "Name is required";
        }
    }

    if (updateProperties.type) {
        if (!Validator.isIn(data.type, Object.keys(types))) {
            errors.type = "Type is not valid";
        }
    }

    if (updateProperties.price) {
        if (!Validator.isFloat(data.price, {min: 0.00})) {
            errors.price = "Price is invalid";
        }
    }

    if (updateProperties.expiration) {
        if (Validator.isEmpty(data.expiration)) {
            errors.expiration = "Expiration date is required";
        }
        if (!Validator.isDate(data.expiration)) {
            errors.expiration = "Expiration date is invalid";
        }
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
};