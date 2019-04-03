const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const fileSchema = new Schema({
  name:{
    type: String,
    required:[true,"Name field is required"]
  },
  id:{
    type:String
  },
  folder:{
    type:String
  }

});

const File = mongoose.model('file',fileSchema);
module.export = File;
