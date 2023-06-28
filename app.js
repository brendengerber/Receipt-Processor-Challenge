//Imports necessary modules
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();

//Comment out for production to minimize unnecessary realtime logs on server
//app.use(morgan('tiny'));

//Security measures
app.use(helmet());
app.disable('x-powered-by');

//Parses request bodies to json
app.use(express.json());

//Mounts the api router
const apiRouter = require('./routers/api-router.js');
app.use('/', apiRouter);

//Sets the port and starts the server
const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

//For testing purposes
module.exports = app;