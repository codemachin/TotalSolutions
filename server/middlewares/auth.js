var responseGenerator = require('../libs/responseGenerator');
var getDetails = require('../libs/getDetails');


// middleware for checking login form
exports.login = function (req, res, next) {

    if (!req.body.email || !req.body.password) {
        var myResponse = responseGenerator.generate(true,"Please enter both email and password",403,null);
        res.send(myResponse);
    }else if (req.body.email && req.body.password){
    	getDetails.getUserDetails( req.body.email, function(returnData) {
    		if(!returnData){
    			var myResponse = responseGenerator.generate(true,"No account with that email present. Please signup to continue.",403,null);
        		res.send(myResponse);
    		}else{
    			next();
    		}
    	});
    }else{
        next();
    }
}

// middleware for checking registration form
exports.signup = function (req, res, next) {

    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password || !req.body.mobile) {
    	var myResponse = responseGenerator.generate(true,"Please enter complete information",403,null);
        res.send(myResponse);
    }else if(req.body.password.length<6){
    	var myResponse = responseGenerator.generate(true,"Minimum password length must be 6",403,null);
        res.send(myResponse);
    }else if(req.body.firstName==req.body.lastName){
    	var myResponse = responseGenerator.generate(true,"firstName and lastName cannot be the same. Please check again.",403,null);
        res.send(myResponse);
    }else if(req.body.mobile.toString().length<6){
    	var myResponse = responseGenerator.generate(true,"Mobile number cannot be less than 6 digits",403,null);
        res.send(myResponse);
    }else{
    
        next();
    }
}