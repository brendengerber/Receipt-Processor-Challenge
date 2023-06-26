//Imports receipts and database helper functions
let receipts = require('../data/receipts.js');
const {assignEntryId, addEntry} = require('../helper-functions/data-handling-helper-functions.js');

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

module.exports = {
    assignReceiptId,
    addReceipt
};