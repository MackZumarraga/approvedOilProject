const validNumber = num => {
    return typeof parseFloat(num) === 'number';
}


module.exports = validNumber;