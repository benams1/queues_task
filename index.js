require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const router = require('./src/routers');
const config = require('./src/config');


const app = express();
const server = http.Server(app);

// parse json request body
app.use(express.json());

// enable cors
app.use(cors());
app.options('*', cors());

// handle all the requests in the router
app.use('/', router);

server.listen(config.PORT, () => {
  console.log(`App is listening on port ${config.PORT}`);
});