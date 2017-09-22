myApp.service('supportService', function($http){
	
	//this is used to parse the token in base64 format to user details
	this.url_base64_decode = function (str) {
		  var output = str.replace('-', '+').replace('_', '/');
		  switch (output.length % 4) {
		    case 0:
		      break;
		    case 2:
		      output += '==';
		      break;
		    case 3:
		      output += '=';
		      break;
		    default:
		      throw 'Illegal base64url string!';
		  }
		  return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
		}

	this.getAllQuery = function(){

		return $http.get('./ticket/all')

	} // gets all queries specific to loggged in user

	this.getAllAdminQuery = function(){

		return $http.get('./ticket/admin/all')

	} // get queries from all users for admin

	this.getdiscussion = function(id){

		return $http.get('./ticket/'+id)

	} // get single query details

	this.sendMessage = function (data){
		return $http.post('./ticket/add/message', data)
	} // sends message to admin

	this.sendAdminMessage = function (data){
		return $http.post('./ticket/admin/add/message', data)
	} // sends message to user that created the query
	
	this.deleteTicket = function (id){
		return $http.post('./ticket/'+id+'/delete', null)
	} // api for deleting a ticket

	this.closeTicket = function (id){
		return $http.post('./ticket/'+id+'/close', null)
	} // api for closing a ticket

	this.openTicket = function (id){
		return $http.post('./ticket/'+id+'/open', null)
	} // api for reopening a closed ticket

	this.newQuery = function (data){
		return $http.post('./ticket/create', data)
	} // api for submitting a new query

	this.getLogin = function (data){
		return $http.post('./api/v1/users/login',data)
	} // api to log user in

	this.passportLogin = function (){
		return $http.get('./getProfile')
	} // api to log in to google or facebook account whichever requested

	this.passportLogout = function (){
		return $http.get('./logout')
	} // api to logout from facebook or google whichever used to sign in

	this.forgot = function(id){

		return $http.post('./forgot',id)

	} // api to request new password

	this.updatePass = function(id,data){

		return $http.post('./reset/'+id,data)

	} // api to update new password on valid token

	this.postSignup = function(data){

		return $http.post('./api/v1/users/signup',data)

	} // api to signup new user with all necessary details

});