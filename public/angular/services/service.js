myApp.service('supportService', function($http){

	var baseUrl = "./api/v1"
	
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

		return $http.get(baseUrl+'/ticket/all')

	} // gets all queries specific to loggged in user

	this.getAllAdminQuery = function(){

		return $http.get(baseUrl+'/ticket/admin/all')

	} // get queries from all users for admin

	this.getdiscussion = function(id){

		return $http.get(baseUrl+'/ticket/'+id)

	} // get single query details

	this.sendMessage = function (data){
		return $http.post(baseUrl+'/ticket/add/message', data)
	} // sends message to admin

	this.sendAdminMessage = function (data){
		return $http.post(baseUrl+'/ticket/admin/add/message', data)
	} // sends message to user that created the query
	
	this.deleteTicket = function (id){
		return $http.post(baseUrl+'/ticket/'+id+'/delete', null)
	} // api for deleting a ticket

	this.closeTicket = function (id){
		return $http.post(baseUrl+'/ticket/'+id+'/close', null)
	} // api for closing a ticket

	this.openTicket = function (id){
		return $http.post(baseUrl+'/ticket/'+id+'/open', null)
	} // api for reopening a closed ticket

	this.newQuery = function (data){
		return $http.post(baseUrl+'/ticket/create', data)
	} // api for submitting a new query

	this.getLogin = function (data){
		return $http.post(baseUrl+'/users/login',data)
	} // api to log user in

	this.passportLogin = function (){
		return $http.get(baseUrl+'/getProfile')
	} // api to log in to google or facebook account whichever requested

	this.forgot = function(id){

		return $http.post(baseUrl+'/forgot',id)

	} // api to request new password

	this.updatePass = function(id,data){

		return $http.post(baseUrl+'/reset/'+id,data)

	} // api to update new password on valid token

	this.postSignup = function(data){

		return $http.post(baseUrl+'/users/signup',data)

	} // api to signup new user with all necessary details

});