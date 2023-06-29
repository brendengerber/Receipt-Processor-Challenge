//Imports necessary modules
const validator = require('validator');

//Validates date properties of submitted entries to ensure they conforms to the YYYY-MM-DD date format
//"date" is a string to validate
const validateDate = function(date){
    try{
        if(typeof date !== 'string'){
            return undefined;
        }
        if(!validator.isDate(date, {format: 'YYYY-MM-DD', delimiters: ['-']})){
            return false;
        }
        return true;
    }catch(err){
        throw err;
    }
};

//Validates time properties of submitted entries to ensure that they conforms to the HH:mm 24 hour standard
//"time" is a string to validate
const validateTime = function(time){
    try{
        if(typeof time !== 'string'){
            return undefined;
        }
        if(!validator.isTime(time, {hourFromat: 'hour24'})){
            return false;
        }
        return true;
    }catch(err){
        throw err;
    }
};

//Validates price properties of submitted entries to ensure that they conforms to the xxxx.xx currency format
//"price" is a string to validate
const validatePrice = function(price){
    try{
        if(typeof price !== 'string'){
            return undefined;
        };
        if(!validator.isCurrency(price, {thousands_separator: '', require_decimal: true, digits_after_decimal: [2]}) || isNaN(price)){
            return false;
        };
        return true;
    }catch(err){
        throw err;
    }
};

//Validates a submitted id using a regular expression to ensure it conforms to the v4 UUID standard
//"id" is a string to validate
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

//Exports functions to be used in other modules
module.exports = {
    validateDate,
    validateTime,
    validatePrice,
    validateId
};