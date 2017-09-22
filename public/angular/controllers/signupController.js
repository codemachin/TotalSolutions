myApp.controller('signupController',['$window','$http','$routeParams','supportService',function($window,$http,$routeParams,supportService) {

  var main = this;
  this.email="";
  this.firstName="";
  this.lastName="";
  this.password1="";
  this.password="";
  this.mobile="";
  
  

  this.signup = function(){

  	var myData = {

  			    firstName: main.firstName,
  			    lastName: main.lastName,
            email: main.email,
            password: main.password,
            mobile : main.mobile

        }
   if(main.password1==main.password){
      supportService.postSignup(myData)
        .then(function successCallback(response) {
           
            if(response.data.token){
              $window.sessionStorage.token = response.data.token;
              window.location = "#/home"
            }else{
              alert(response.data.message)
            }
                        

        }, function errorCallback(response) {
          
          alert("some error occurred. Check the console.");
          console.log(response);

        });
   }else{
    alert("passwords don't match!!!")
   }


  }// function to post all user details for successful signup




}]); // end controller