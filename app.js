//Imports necessary modules
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();

//Provides logs request data to the console for every request made to the server
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

//Sets the port
const PORT = 3000;

//Starts the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

//Exports the app for testing purposes
module.exports = app;