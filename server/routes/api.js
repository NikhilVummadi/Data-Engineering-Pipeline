const express = require('express');
const router = express.Router();

var data = {name:"1csv",id:"1"}

router.get('/file',function(req, res){
  res.send(data);
});

router.post('/file',function(req, res){
  console.log(req.body);
  res.send({
    type:"POST",
    name:req.body.name,
    rank:req.body.rank
  });
});

module.exports = router;
