//Imports receipts and database helper functions
let receipts = require('../data/receipts.js');
const {assignEntryId, addEntry, findEntry} = require('../helper-functions/data-handling-helper-functions.js');

//Assigns an id to the envelope in the req body based on the current highest id
const assignReceiptId = (req, res, next) => {
    try{
        req.receipt.id = assignEntryId(receipts);
        next();
    }catch(err){
        next(err);
    }
};

const addReceipt = (req, res, next) => {
    addEntry(receipts, req.receipt);
    next();
};

const attatchReceiptById = (req, res, next) => {
    try{
        const receipt = findEntry(receipts, req.id);
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
}

module.exports = {
    assignReceiptId,
    addReceipt,
    attatchReceiptById
};