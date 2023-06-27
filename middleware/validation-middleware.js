//Imports necessary modules
const Schema = require('validate');
const validator = require('validator');
const {validateDate, validateTime, validatePrice} = require('../helper-functions/validation-helper-functions.js')

//Creates a schema to validate receipts
const receiptSchema = new Schema({
    retailer: {
        type: String,
        required: true
    },
    purchaseDate: {
        type: String,
        required: true    },
    purchaseTime: {
        type: String, 
        required: true
    },
    items: [{
        shortDescription: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        }
    }],
    total: {
        type: String,
        required: true
    }
});

//Validates the receipt object sent in the request body and attatches it to req.receipt to pass it to the next middleware
const validateReceipt = (req, res, next) => {
    try{
        let validationErrors;
        //Validates the format of the receipt object and sets validationErrors equal to the array of errors
        validationErrors = receiptSchema.validate(req.body);

        //Validates the date format and pushes any errors to the validationErrors array
        if(validateDate(req.body.purchaseDate) === false){
            validationErrors.push('Error: purchase date does not follow the YYYY-MM-DD format.');
        }

        //Validates the time format and pushes any errors to the validationErrors array
        if(validateTime(req.body.purchaseTime) === false){
            validationErrors.push('Error: purchase time does not follow the HH-mm 24 hour format.');
        }

        //Validates the price format of all items
        for(let item of req.body.items){
            if(validatePrice(item.price) === false){
                validationErrors.push(`Error: ${item.shortDescription} price does not follow the xxxx.xx currency format.`)
            }
        }
        //Validates the price format for total
        if(validatePrice(req.body.total) === false){
            validationErrors.push(`Error: total price does not follow the xxxx.xx currency format.`)
        }

        //Checks if any errors have been recorded and if not attatches the receipt to pass to the next middleware        
        if(validationErrors.length === 0){
            req.receipt = req.body;
            next();

        //In case of errors, creates a new error object describing the invalid formatting and passes it to the error handling middleware
        }else{
            const err = new Error(`The receipt format is invalid.\n ${validationErrors.join("\n")}`);
            err.status = 403;
            next(err);
        }

    //Catches any other unforseen server errors and passes them to the error handling middleware
    }catch(err){
       next(err);
    }
};

const validateIdParam = (req, res, next) => {
    try{
        //Uses a regular expression to test that the Id of the requested receipt is a v4 UUID
        if(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(req.params.id)){
            req.id = req.params.id;
            next();
        }else{
            const err = new Error('Request parameter is not a v4 UUID.');
            err.status = 400;
            next(err);
        }
    }catch(err){
        next(err);
    }
};

module.exports = {
    validateReceipt,
    validateIdParam
};