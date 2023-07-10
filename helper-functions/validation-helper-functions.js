//Imports necessary modules
const validator = require('validator');
const Schema = require('validate');

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
        if(!validator.isCurrency(price, {thousands_separator: '', require_decimal: true, digits_after_decimal: [0, 1, 2]}) || isNaN(price)){
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

//Creates a schema to validate receipt objects
const receiptSchema = new Schema({
    retailer: {
        type: String,
        required: true,
    },
    purchaseDate: {
        type: String,
        required: true    
    },
    purchaseTime: {
        type: String, 
        required: true
    },
    items: {
        type: Array,
        required: true,
        each: {
            type: Object,
            required: true,
            properties: {
                shortDescription: {
                    type: String,
                    required: true
                },
                price: {
                    type: String,
                    required: true
                }
            }   
        }
    },
    total: {
        type: String,
        required: true
    }
}, {strict: true});

//Creates a formatted error message recording all invalidities, and sends a 400 response if there are any
const validateReceipt = function(receipt){
    let validationErrors;
    //Validates the format of the receipt object and sets validationErrors equal to the array of errors
    validationErrors = receiptSchema.validate(receipt);

    //Validates the date format and pushes any errors to the validationErrors array
    if(validateDate(receipt.purchaseDate) === false){
        validationErrors.push('Error: purchase date does not follow the YYYY-MM-DD date format.');
    }

    //Validates the time format and pushes any errors to the validationErrors array
    if(validateTime(receipt.purchaseTime) === false){
        validationErrors.push('Error: purchase time does not follow the HH:mm 24 hour time format.');
    }

    //Validates the price format of all items
    if(receipt.items){
        for(let item of receipt.items){
            if(validatePrice(item.price) === false){
                validationErrors.push(`Error: ${item.shortDescription}'s price does not follow the xxxx.xx currency format.`);
            }
        }
    }

    //Validates the price format for total
    if(validatePrice(receipt.total) === false){
        validationErrors.push(`Error: total does not follow the xxxx.xx currency format.`);
    }

    //Checks if any errors have been recorded and if not attatches the receipt to pass to the next middleware        
    if(validationErrors.length === 0){
        return receipt;

    //In case of errors, creates a new error object describing the invalid formatting and passes it to the error handling middleware
    }else{
        const err = new Error(`The receipt format is invalid.\n ${validationErrors.join("\n")}`);
        err.status = 400;
        throw(err);
    }
};

//Exports functions to be used in other modules
module.exports = {
    validateDate,
    validateTime,
    validatePrice,
    validateId,
    validateReceipt
};