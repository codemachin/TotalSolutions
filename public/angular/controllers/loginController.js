myApp.controller('loginController',['$window','$http','$routeParams','supportService',function($window,$http,$routeParams,supportService) {

    var main = this;
    this.email="";
    this.password="";


    this.baseUrl = './users/login';
    

    this.login = function(){

    	var myData = {
              email: main.email,
              password: main.password

          }
     
        
        supportService.getLogin(myData)
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


    }// function to login user and save token to sessionStorage , if successful


    this.passportSubmit= function(){
      supportService.passportLogin()
        .then(function successCallback(response) {
            
              if(response.data.status==404){
                  
              }else if (response.data.error==true){

                alert(response.data.message)

              }else {
                
                $window.sessionStorage.token = response.data.token;
                window.location = "#/home"

              }


          }, function errorCallback(response) {
            
              alert("some error occurred. Check the console.");
              console.log(response);
            
          });
    } // this function runs automatically to check if user has logged in through passport
      // if he has then it saves the token and logs user in

    this.passportSubmit();


}]); // end controller
