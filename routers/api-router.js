//Imports necessary modules
const express = require('express');

//Creates the router
const apiRouter = express.Router();

//Mounts the receiptRouter
const receiptsRouter = require('./routers/receipts-router.js');
apiRouter.use('/receipts', receiptsRouter)

//Handles errors
apiRouter.use((err, req, res, next) => {
    if(!err.status){
      err.status = 500;
    }
    res.status(err.status).send(err.message);
  })

//Exports the router
module.exports = apiRouter;