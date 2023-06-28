//Imports necessary modules
const validator = require('validator');

const validateDate = function(dateString){
    try{
        if(typeof dateString !== 'string'){
            return undefined;
        }
        if(!validator.isDate(dateString, {format: 'YYYY-MM-DD', delimiters: ['-']})){
            return false;
        }
        return true;
    }catch(err){
        throw err;
    }
};

const validateTime = function(timeString){
    try{
        if(typeof timeString !== 'string'){
            return undefined;
        }
        if(!validator.isTime(timeString, {hourFromat: 'hour24'})){
            return false;
        }
        return true;
    }catch(err){
        throw err;
    }
};

const validatePrice = function(priceString){
    try{
        if(typeof priceString !== 'string'){
            return undefined;
        };
        if(!validator.isCurrency(priceString, {thousands_separator: '', require_decimal: true, digits_after_decimal: [2]}) || isNaN(priceString)){
            return false;
        };
        return true;
    }catch(err){
        throw err;
    }
};

const validateId = function(id){
    try{
        if(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(id)){
            return true;
        }
        return false;
    }catch(err){
        throw err;
    }
};

module.exports = {
    validateDate,
    validateTime,
    validatePrice,
    validateId
};