//Imports necessary modules
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();

//Remove after development to minimize unnecessary realtime logs on server
app.use(morgan('tiny'));

//Security measures
app.use(helmet());
app.disable('x-powered-by');

//Parses request bodies to json
app.use(express.json());

//Mounts the api router
const apiRouter = require('./routers/api-router.js');
app.use('/api', apiRouter);

//Handles errors
app.use((err, req, res, next) => {
    if(!err.status){
      err.status = 500;
    }
    console.log(err);
    res.status(err.status).send(err.message);
  })

//Sets the port and starts the server
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
  