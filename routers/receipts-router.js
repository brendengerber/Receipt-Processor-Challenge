//Imports necessary modules
const express = require('express');
const {validateReceipt, validateIdParam} = require('../middleware/validation-middleware.js');
const {assignReceiptId, assignReceiptPoints, addReceipt, attatchReceiptById} = require('../middleware/data-handling-middleware.js');

//Creates the router
const receiptsRouter = express.Router();

//Assigns the new receipt a v4 UUID, assigns its point value, saves it, and sends a response with the newly assigned Id
receiptsRouter.post('/process', validateReceipt, assignReceiptId, assignReceiptPoints, addReceipt, (req, res, next) => {
    res.status(201).send({"id": req.receipt.id});
});

//Looks up the receipt of the given Id parameter and sends a response with the calculated points value
receiptsRouter.get('/:id/points', validateIdParam, attatchReceiptById, (req, res, next) => {
    res.status(200).send({"points": req.receipt.points});
})

//Exports the router
module.exports = receiptsRouter;