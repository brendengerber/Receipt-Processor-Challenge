//Imports necessary modules
const express = require('express');

//Creates the router
const apiRouter = express.Router();

//Mounts the receiptRouter
const receiptsRouter = require('./routers/receipt-router.js');
apiRouter.use('/receipts', receiptsRouter)

//Exports the router
module.exports = apiRouter;