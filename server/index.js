const express = require('express');
//const routes = require('./routes/api');

const app = express();

// intialize routes
app.use('/api',require('./routes/api'));


app.listen(4000, function(){
  console.log('Now listening for requests!');
});
