const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// intialize routes here
app.use('/api',require('./routes/api'));


app.listen(4000, function(){
  console.log('Now listening for requests!');
});
