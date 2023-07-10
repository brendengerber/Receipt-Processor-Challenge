//Route functionality is kept here in seperate middleware functions to maintain separation of concerns and allow for re use in multiple routes
//Middleware functions are in charge of calling the correct helper functions with the correct arguments and attatching results to the req object
//Validation middlewares will add request bodies and parameters as custom properties to the req object
//This allows for consistency and for middlewares down the chain to use the data knowing it is clean and properly formatted

//Imports necessary modules
const {validateId, validateReceipt} = require('../helper-functions/validation-helper-functions.js');

//Validates the receipt object sent in the request body and attatches it to req.receipt to pass it to the next middleware
const validateReceiptReq = (req, res, next) => {
    try{
        req.receipt = validateReceipt(req.body);
        next();
    //Catches any errors and passes them to the error handling middleware
    }catch(err){
       next(err);
    }
};

//Validates the Id paramater of a request to ensure it conforms to the v4 UUID standard 
//Sends a 400 response if the Id is not valid
const validateIdParam = (req, res, next) => {
    try{
        if(validateId(req.params.id)){
            req.id = req.params.id;
            next();
        }else{
            const err = new Error(`The request ID ${req.params.id} is not a valid v4 UUID.`);
            err.status = 400;
            next(err);
        }
    }catch(err){
        next(err);
    }
};

//Exports functions to be used in other modules
module.exports = {
    validateReceiptReq,
    validateIdParam
};