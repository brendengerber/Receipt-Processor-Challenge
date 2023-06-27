//Imports necessary modules
const validator = require('validator');

const validateDate = function(dateString){
    if(typeof dateString !== 'string'){
        return undefined;
    }
    if(!validator.isDate(dateString, {format: 'YYYY-MM-DD', delimiters: ['-']})){
        return false;
    }
    return true;
};

const validateTime = function(timeString){
    if(typeof timeString !== 'string'){
        return undefined;
    }
    if(!validator.isTime(timeString, {hourFromat: 'hour24'})){
        return false;
    }
    return true;
};

const validatePrice = function(priceString){
    if(typeof priceString !== 'string'){
        return undefined;
    };
    if(!validator.isCurrency(priceString, {thousands_separator: '', require_decimal: true, digits_after_decimal: [2]}) || isNaN(priceString)){
        return false;
    };
    return true;
};

module.exports = {
    validateDate,
    validateTime,
    validatePrice
};