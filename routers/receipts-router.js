//Imports necessary modules
const express = require('express');
const {validateReceipt} = require('../middleware/validation-middleware.js');
const {assignReceiptId, addReceipt} = require('../middleware/data-handling-middleware.js');


//Creates the router
const receiptsRouter = express.Router();

//Assigns the new receipt a v4 UUID and POSTs it
receiptsRouter.post('/process', validateReceipt, assignReceiptId, addReceipt, (req, res, next) => {
    res.status(201).send({"id": req.receipt.id});
});

//Exports the router
module.exports = receiptsRouter;