var mongoose = require('mongoose');
var express = require('express');

var jwt = require('jsonwebtoken');  
var expressJwt = require('express-jwt');


var secret = require("./../../libs/jwtSecret").secret;

// express router // used to define routes 
var userRouter  = express.Router();
var userModel = mongoose.model('User')
var responseGenerator = require('./../../libs/responseGenerator');
var crypto = require('./../../libs/crypto');
var auth = require("./../../middlewares/auth");


module.exports.controllerFunction = function(app) {


    ///////////////////////// api to signup new user and enryping password with aes algorithm //////////////////////

    userRouter.post('/signup',auth.signup,function(req,res){


            var passwordDb = crypto.encrypt(req.body.password,crypto.key);

            var newUser = new userModel({
                
                firstName           : req.body.firstName,
                lastName            : req.body.lastName,
                email               : req.body.email,
                password            : passwordDb,
                contact             : req.body.mobile


            });// end new user 

            newUser.save(function(err){
                if(err){

                    var myResponse = responseGenerator.generate(true,"email already exists in database",500,null);
                    res.send(myResponse);
                   

                }
                else{

                   newUser = newUser.toObject();
                   delete newUser.password;
                   var myResponse = responseGenerator.generate(false,"successfully signup user",200,newUser);
                   
                   var token = jwt.sign(myResponse, secret, { expiresIn : 60*5 });

                   res.json({ token: token });
                  
                }

            });//end new user save

        

    });//end get all users

    //////////////////////////////////////////// api to log in user ///////////////////////////////////////////////

    userRouter.post('/login',auth.login,function(req,res){

        var passwordDb = crypto.encrypt(req.body.password,crypto.key);

        userModel.findOne({$and:[{'email':req.body.email},{'password':passwordDb}]},function(err,foundUser){
            if(err){
                var myResponse = responseGenerator.generate(true,"some error"+err,500,null);
                res.send(myResponse);
            }
            else if(foundUser==null || foundUser==undefined || foundUser._id==undefined){

                var myResponse = responseGenerator.generate(true,"Incorrect Password. Please check again.",404,null);
                res.send(myResponse);

            }
            else{
                  foundUser = foundUser.toObject();
                  delete foundUser.password; 
                                  
                  var myResponse = responseGenerator.generate(false,"success",200,foundUser);

                  // We are sending the profile inside the token
                  var token = jwt.sign(myResponse, secret, { expiresIn : 60*5 });

                  res.json({ token: token });

            }

        });// end find


    });//end get signup screen

    //setting userRouter route
    app.use('/api/v1/users', userRouter);

 
} //end contoller code
