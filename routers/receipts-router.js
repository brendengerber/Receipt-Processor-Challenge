//Imports necessary modules
const express = require('express');
const {validateReceipt, validateIdParam} = require('../middleware/validation-middleware.js');
const {assignReceiptId, assignReceiptPoints, addReceipt, attatchReceiptById} = require('../middleware/data-handling-middleware.js');

//Creates the router
const receiptsRouter = express.Router();

//Assigns the new receipt a v4 UUID, assigns its point value, and POSTs it
receiptsRouter.post('/process', validateReceipt, assignReceiptId, assignReceiptPoints, addReceipt, (req, res, next) => {
    res.status(201).send({"id": req.receipt.id});
});

receiptsRouter.get('/:id/points', validateIdParam, attatchReceiptById, (req, res, next) => {
    res.status(200).send({"poings": req.receipt.points});
})

//Exports the router
module.exports = receiptsRouter;