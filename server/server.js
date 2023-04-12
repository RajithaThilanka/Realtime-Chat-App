const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const port = process.env.PORT;



const server = app.listen(port, () => {
  console.log('Listening to port ' + port);
});