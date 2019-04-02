const express = require('express');
const router = express.Router();


router.get('/files',function(req, res){
  res.send({
    folder1:{file1:"Info.csv",file2:"Data.csv",file3:"Phones.csv"},
    file1:{name:"Info.csv",id:"1"},
    file2:{name:"Data.csv",id:"2"},
    file3:{name:"Phones.csv",id:"3"},
    folder2:{file4:"Messages.csv"},
    file4:{name:"Messages.csv",id:"4"}
});
});

module.exports = router;
