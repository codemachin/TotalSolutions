var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var message = new Schema({

  sender:{type:String,required:true},
  text:{type:String,required:true},
  created : {type:Date,default:Date.now}

});

var userSchema = new Schema({

  userId : {type:String,default:"",required:true},
  email :  {type:String,default:"",required:true},
  title : {type:String,default:"",required:true},
  details : {type:String,default:"",required:true},
  status : {type:String,default:""},
  ticketNo : {type:String,default:""},
  fileName : {type:String},
  messages    : [message],
  created : {type:Date,default:Date.now},
  updated : {type:Date,default:Date.now}

});

mongoose.model('Query',userSchema);