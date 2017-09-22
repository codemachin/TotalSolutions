var mongoose = require('mongoose');
var express = require('express');
var shortid = require("shortid");
var nodemailer = require("nodemailer");
var fs = require('fs');

var jwt = require('jsonwebtoken'); 
var expressJwt = require('express-jwt'); 
var multer = require('multer');

var secret = require("./../../libs/jwtSecret").secret;

var events = require('events');
var eventEmitter = new events.EventEmitter();
var ticketRouter  = express.Router();
var queryModel = mongoose.model('Query')
var userModel = mongoose.model('User')

var responseGenerator = require('./../../libs/responseGenerator');
var getDetails = require('./../../libs/getDetails');
var auth = require("./../../middlewares/auth");
var mailer = require("./../../libs/mailConfig");

//////////////////////////////event to send mail to admin or user when they reply/////////////////////////////////

eventEmitter.on('replied',function(data){

        var mailOptions={
            to : data.user,
            subject : "Query has been replied",
            text : "Dear "+ data.name+". The query with ticketNo : "+data.ticket+" has been replied",
            html : "<h1>Dear "+data.name+".</h1><h2>The query with ticketNo : "+data.ticket+" has been replied.</h2>"
          }
        console.log(mailOptions);
        mailer.smtpTransport.sendMail(mailOptions, function(error, response){
         if(error){
            console.log('mail not sent '+error);
         }else{
                console.log(response);
             }
        });
  
})

/////////////////////event to send mail to respective user when a ticket is opened or closed////////////////////////

eventEmitter.on('statusChange',function(data){

        var mailOptions={
                to : data.user.email,
                subject : "Your Query has been "+data.status,
                text : "Dear "+ data.name+". Your query with ticketNo : "+data.user.ticketNo+" has been "+data.status,
                html : "<h1>Dear "+data.name+".</h1><h2>Your query with ticketNo : "+data.user.ticketNo+" has been "+data.status+"</h2>"
              }
        console.log(mailOptions);
        mailer.smtpTransport.sendMail(mailOptions, function(error, response){
         if(error){
            console.log('mail not sent ' +error);
         }else{
                console.log(response);
             }
        });

})


///////////////////////////////////////////Start of controller function//////////////////////////////////////////////

module.exports.controllerFunction = function(app) {

    ////////////////////////////////////////// setting up expressJwt middleware /////////////////////////////////////

    ticketRouter.use('/', expressJwt({secret: secret}));

    ///////////////////////////////////// middleware to allow cross origin requests /////////////////////////////////
    app.use(function(req, res, next) { 
        res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
        res.header("Access-Control-Allow-Origin", "http://localhost");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
   
    //////////////////////////////////////////// multers disk storage settings //////////////////////////////////////

    var storage = multer.diskStorage({ 
        destination: function (req, file, cb) {
            cb(null, './uploads/');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            var nameFile = file.fieldname + '-' + datetimestamp + req.user.data._id + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]
            cb(null, nameFile);
        }
    });

    ///////////////////////////////////////////////// multer settings //////////////////////////////////////////////

    var upload = multer({ 
                    storage: storage
                }).single('file');

    /////////////////////////////////////// API path that will upload the files /////////////////////////////////////

    ticketRouter.post('/upload',function(req, res) {
          
        upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
             res.json({error_code:0,err_desc:null,data:req.file.filename});
        });
    });

    /////////////////////////////////// api to download,set disposition and send it. /////////////////////////////////

    app.get('/download/:id', function(req, res){
      var file = './uploads/'+req.params.id;
      if (fs.existsSync(file)) {
         res.download(file);
      }else{
        res.send("<h2>404. File not found</h2>")
      }
      
    });

    ///////////////////////////////// gets all queries from database for specific user ////////////////////////////////  

    ticketRouter.get('/all',function(req,res){
        
        queryModel.find({'userId' : req.user.data._id }).sort({created:-1}).exec(function(err,alltests){
            if(err){                
                var myResponse = responseGenerator.generate(true,"some error"+err,500,null);
                res.send(myResponse);
            }
            else{
                
                var myResponse = responseGenerator.generate(false,"successfully retrieved",200,alltests);
                res.send(myResponse);

            }

        });//end query model find 

    });//end get all query

    //////////////////////////////////////// gets all queries from db for the admin ///////////////////////////////////

    ticketRouter.get('/admin/all',function(req,res){
        
        queryModel.find({}).sort({created:-1}).exec(function(err,alltests){
            if(err){                
                var myResponse = responseGenerator.generate(true,"some error"+err,500,null);
                res.send(myResponse);
            }
            else{

                var myResponse = responseGenerator.generate(false,"successfully retrieved",200,alltests);
                res.send(myResponse);

            }

        });//end query model find 

    });//end get all queries

    //////////////////////////////////////// get specific query , secured api ///////////////////////////////////////

    ticketRouter.get('/:id',function(req,res){
      
        queryModel.findOne({'_id':req.params.id},function(err,foundticket){
            if(err){
                var myResponse = responseGenerator.generate(true,"some error"+err,500,null);
                res.send(myResponse);
            }
            else if(foundticket==null || foundticket==undefined || foundticket._id==undefined){

                var myResponse = responseGenerator.generate(true,"test not found",404,null);
                res.send(myResponse);
                

            }
            else{
                
                var myResponse = responseGenerator.generate(false,"successfully retrieved",200,foundticket);
                res.send(myResponse)
                

            }

        });// end find
      

    });//end get all queries

    ////////////////////////////////////////// route to create a new query //////////////////////////////////////////

    ticketRouter.post('/create',function(req,res){

        if(req.body.title!=undefined && req.body.details!=undefined ){

            var ticketno = shortid.generate();
            if(req.body.filename){
                var newticket = new queryModel({
                    userId : req.user.data._id,
                    email  : req.user.data.email,
                    title : req.body.title,
                    details : req.body.details,
                    status : "open",
                    ticketNo : ticketno,
                    fileName : req.body.filename
                })
            }else if(req.body.filename==undefined || req.body.filename==null || req.body.filename ==""){
                var newticket = new queryModel({
                    userId : req.user.data._id,
                    email  : req.user.data.email,
                    title : req.body.title,
                    details : req.body.details,
                    status : "open",
                    ticketNo : ticketno

                });// end new query 
            }

            newticket.save(function(err){
                if(err){

                     var myResponse = responseGenerator.generate(true,"some error"+err,500,null);
                     res.send(myResponse);
                     
                }
                else{

                   var myResponse = responseGenerator.generate(false,"query successfully created",200,newticket);
                   res.send(myResponse);
                   
                }

            });//end new query save


        }
        else{

            var myResponse = {
                error: true,
                message: "Some body parameter is missing",
                status: 403,
                data: null
            };

            res.send(myResponse);

        }
        

    });//end get all products

    /////////////////////////////////////////// route to delete a query ////////////////////////////////////////////

    ticketRouter.post('/:id/delete',function(req,res) {

      queryModel.remove({'_id':req.params.id},function(err,result){

        if(err){
          console.log('some error');
          console.log(err);
          var myResponse = responseGenerator.generate(true,"some error"+err,500,null);
          res.send(myResponse);

        }
        else{
          var myResponse = responseGenerator.generate(false,"query deleted successfully",200,result);
          res.send(myResponse);
        }


      });

    });


    //////////////////////////////////////////// route to close a query /////////////////////////////////////////


    ticketRouter.post('/:id/close',function(req,res) {
                
        queryModel.findOneAndUpdate({'_id':req.params.id},{
            '$set':{status:"closed"}
        },{new:true},
            function(err,result){

                if(err){
                    var myResponse = responseGenerator.generate(true,"some error "+err,500,null);
                    res.send(myResponse);
                }
                else{

                    getDetails.getUserDetails( result.email, function(returnData) {
                        var data = {
                                status : "closed",
                                user : result,
                                name : returnData.firstName

                           }
                        eventEmitter.emit('statusChange',data);
                    });
                    var myResponse = responseGenerator.generate(false,"success",200,result);
                    res.send(myResponse);

                }


            });

    });

    ////////////////////////////////////////// route to reopen a query ///////////////////////////////////////////

    ticketRouter.post('/:id/open',function(req,res) {
                
        queryModel.findOneAndUpdate({'_id':req.params.id},{
            '$set':{status:"open"}
        },{new:true},
            function(err,result){

                if(err){
                    var myResponse = responseGenerator.generate(true,"some error "+err,500,null);
                    res.send(myResponse);
                }
                else{

                    getDetails.getUserDetails( result.email, function(returnData) {
                        var data = {
                                status : "reopened",
                                user : result,
                                name : returnData.firstName

                           }
                        eventEmitter.emit('statusChange',data);
                    });
                    var myResponse = responseGenerator.generate(false,"success",200,result);
                    res.send(myResponse);

                }


            });

    });

    ////////////////////////////////// route to add a new message to the query //////////////////////////////////

    ticketRouter.post('/add/message',function(req,res){

        var message =  {                        
                            sender: req.user.data.firstName,
                            text : req.body.text
                        };


        queryModel.findOne({'_id': req.body.id},
                function(err,result){
                    if(err){

                        var myResponse = responseGenerator.generate(true,"some error "+err,500,null);
                        res.send(myResponse);  

                    }
                    else{

                        result.messages.push(message);

                        result.save(function(err){
                            if(err){

                                 var myResponse = responseGenerator.generate(true,"some error"+err,500,null);
                                 res.send(myResponse);
                                 
                            }
                            else{ 

                                //this library function finds the emails of all admins in the returnData
                                getDetails.findAllAdminEmails( function(returnData) {
                                    var data = {
                                        ticket : req.body.ticketNo,
                                        user : returnData,
                                        name : 'admin'
                                    }
                                    eventEmitter.emit('replied',data);
                                    //emits event to send mail to admin that he recieved a reply
                                    
                                });                                
                               
                                var myResponse = responseGenerator.generate(false,"success",200,result);
                                res.send(myResponse);
                            
                              
                            }
                          
                       
                        })

                    }
                })

    });

    /////////////////////////////// route to add a new messaage to the query by admin ////////////////////////////////

    ticketRouter.post('/admin/add/message',function(req,res){     
        
        var message =  {                         
                            sender: "admin",
                            text : req.body.text
                        };

        queryModel.findOne({'_id': req.body.id},
                function(err,result){
                    if(err){
                        var myResponse = responseGenerator.generate(true,"some error "+err,500,null);
                        res.send(myResponse);  
                    }
                    else{

                        result.messages.push(message);
                        result.save(function(err){
                            if(err){
                                 var myResponse = responseGenerator.generate(true,"some error"+err,500,null);
                                 res.send(myResponse);                                 
                            }
                            else{

                                getDetails.getUserDetails( req.body.email, function(returnData) {
                                
                                    var data = {
                                        ticket : req.body.ticketNo,
                                        user : req.body.email,
                                        name : returnData.firstName
                                    }

                                    eventEmitter.emit('replied',data);

                                });
                                //emits event to send mail to respective user that he recieved a reply from admin   

                                var myResponse = responseGenerator.generate(false,"success",200,result);
                                res.send(myResponse);
                                                  
                            }
                          
                       
                        })
                       
                    }

                });//end new user save


    })

    //setting ticketRouter route

    app.use('/ticket', ticketRouter);
 
} //end contoller code
