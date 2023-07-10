//Imports necessary modules
const express = require('express');
const {validateReceiptReq, validateIdParam} = require('../middleware/validation-middleware.js');
const {assignReceiptId, assignReceiptPoints, addReceipt, attatchReceiptById} = require('../middleware/data-handling-middleware.js');

//Creates the router
const receiptsRouter = express.Router();

//Validates the Id of all routes with an Id parameter
receiptsRouter.param('id', validateIdParam);

//Assigns the new receipt a v4 UUID, assigns its point value, saves it, and sends a response with the newly assigned Id
//For a successful POST, the body must be a properly formatted receipt in JSON
receiptsRouter.post('/process', validateReceiptReq, assignReceiptId, assignReceiptPoints, addReceipt, (req, res, next) => {
    res.status(201).send({"id": req.receipt.id});
});

//Looks up the receipt of the given Id parameter and sends a response with the calculated points value
//For a successful GET, the Id parameter must be a valid v4 UUID that exists in the dataset
receiptsRouter.get('/:id/points', attatchReceiptById, (req, res, next) => {
    res.status(200).send({"points": req.receipt.points});
});

//Exports the router
module.exports = receiptsRouter;