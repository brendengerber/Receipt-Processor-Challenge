//mports receipts and database helper functions
let receipts = require('../data/receipts.js');
const {assignEntryId} = require('../helper-functions/data-handling-helper-functions.js');

//Assigns an id to the envelope in the req body based on the current highest id
const assignReceiptId = (req, res, next) => {
    try{
        req.receipt.id = assignEntryId(receipts);
        next();
    }catch(err){
        next(err);
    }
}

module.exports = {
    assignReceiptId
};