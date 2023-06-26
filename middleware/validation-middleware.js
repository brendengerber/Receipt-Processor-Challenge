//Imports necessary modules
const Schema = require('validate');

//Creates a schema to validate receipts
const receiptSchema = new Schema({
    retailer: {
        type: String,
        required: true
    },
    purchaseDate: {
        type: String,
        required: true
    },
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


const validateReceipt = (req, res, next) => {
    try{
        //Validates the receipt object sent in the request body and attatches it to req.receipt to pass it to the next middleware
        const validationErrors = receiptSchema.validate(req.body);
        if(validationErrors.length === 0){
            req.receipt = req.body;
            next();
        //Creates an error describing the invalidities and passes it to the error handling middleware
        }else{
            const err = new Error(`Invalid receipt format.\n ${validationErrors.join("\n")}`);
            err.status = 403;
            next(err);
        }
    //Catches any other unforseen server errors and passes them to the error handling middleware
    } catch(err){
       next(err)
    }
};

module.exports = {
    validateReceipt
};