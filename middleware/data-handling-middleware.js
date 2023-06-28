//Imports receipts and database helper functions
const {createEntryId, addEntry, findEntry, calculateReceiptPoints} = require('../helper-functions/data-handling-helper-functions.js');

//Assigns an id to the envelope in the req body based on the current highest id
const assignReceiptId = (req, res, next) => {
    try{
        req.receipt.id = createEntryId('Receipts');
        next();
    }catch(err){
        next(err);
    }
};

const assignReceiptPoints = (req, res, next) => {
    try{
        req.receipt.points = calculateReceiptPoints(req.receipt);
        next();
    }catch(err){
        next(err);
    }
};

//Adds the receipt to the data object
const addReceipt = (req, res, next) => {
    try{
        addEntry('Receipts', req.receipt);
        next();
    }catch(err){
        next(err);
    }

};

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

module.exports = {
    assignReceiptId,
    assignReceiptPoints,
    addReceipt,
    attatchReceiptById
};