//Route functionality is kept here in seperate middleware functions to maintain separation of concerns and allow for re use in multiple routes
//Middleware functions are in charge of calling the correct helper functions with the correct arguments and attatching results to the req object

//Imports necessary modules
const {createEntryId, addEntry, findEntry, calculateReceiptPoints} = require('../helper-functions/data-handling-helper-functions.js');

//Assigns a unique v4 UUID to the receipt attached to the req
const assignReceiptId = (req, res, next) => {
    try{
        req.receipt.id = createEntryId('Receipts');
        next();
    }catch(err){
        next(err);
    }
};

//Calculates and assigns the points value of the receipt attached to the req object to pass it to the next middleware
const assignReceiptPoints = (req, res, next) => {
    try{
        req.receipt.points = calculateReceiptPoints(req.receipt);
        next();
    }catch(err){
        next(err);
    }
};

//Adds the receipt attatched to the req body to the data object for storrage
const addReceipt = (req, res, next) => {
    try{
        addEntry('Receipts', req.receipt);
        next();
    }catch(err){
        next(err);
    }

};

//Locates and attatches the receipt of a given Id to the req object to be passed to the next middleware 
//Sends a 404 response if the receipt of the given Id does not exist
const attatchReceiptById = (req, res, next) => {
    try{
        const receipt = findEntry('Receipts', req.id);
        if(receipt){
            req.receipt = receipt;
            next();
        }else{
            const err = new Error(`The requested receipt with id ${req.id} does not exist.`);
            err.status = 404;
            next(err);
        }    
    }catch(err){
        next(err);
    }
};

//Exports functions to be used in other modules
module.exports = {
    assignReceiptId,
    assignReceiptPoints,
    addReceipt,
    attatchReceiptById
};