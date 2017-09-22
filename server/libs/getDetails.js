var mongoose = require('mongoose');
var userModel = mongoose.model('User');

exports.findAllAdminEmails = function( callback) {
    userModel.find({'firstName':'admin'},function(err,result){
        if(err){
            console.log(err)
        }else{
            
            var list = [];
            for(x in result){
                list.push(result[x].email);
            }
            
            callback(list)
        }
    })
};// function gets all the email adresses with firstName admin and pushes it to an array

exports.getUserDetails = function( email, callback) {
    userModel.findOne({'email': email},function(err,result){
        if(err){
            console.log(err)
        }else{            
            callback(result)
        }
    })
};// function gets the firstName associated with a particular email address
