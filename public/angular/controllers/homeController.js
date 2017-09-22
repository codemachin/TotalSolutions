myApp.controller('homeController',['$window','$http','$routeParams','supportService',function($window,$http,$routeParams,supportService) {

    var main = this;
    this.worker = "open";
    this.worker1 = "closed";
    this.expire=true;
    
    if($window.sessionStorage.token){
      var encodedProfile = $window.sessionStorage.token.split('.')[1];
      this.profile = JSON.parse(supportService.url_base64_decode(encodedProfile));
       
    }else{
      alert("no token found. please login")
      window.location='#/'
    }// gets details from the jwt token an decodes it to get profile information


    // functions to sort based on open closed and by date
    this.open = function(){
      main.worker = "open"
      main.worker1 = "";
    }
    this.closed = function(){
      main.worker = "closed"
      main.worker1 = "";
    }
    this.all = function(){
      main.worker = "open"
      main.worker1 = "closed";
    }
    
    this.sort = function(){ 
        
      main.items.reverse();
        
    }
    

    this.allQuery = function(){
      /// get all users query if logged in user is admin
      if(main.profile.data.firstName=="admin"){
      	supportService.getAllAdminQuery()
        .then(function successCallback(response) {
              
              if(response.data.status==401){
                  main.expire=false;
                  alert(response.data.message)
                  window.location="#/"
              }
              else if(response.data.status==200){
              	
              	main.items= response.data.data;
              	

              } else {
              	alert(response.data.message)
              }
              
            }, function errorCallback(response) {
              
                alert("some error occurred. Check the console.");
                console.log(response);
            });
      }else{
        // get queries specific to a particular user
        supportService.getAllQuery()
        .then(function successCallback(response) {
              
              if(response.data.status==401){
                  main.expire=false;
                  alert(response.data.message)
                  window.location="#/"
              }
              else if(response.data.status==200){
                
                main.items= response.data.data;
                

              } else {
                alert(response.data.message)
              }
                            

            }, function errorCallback(response) {
              
                alert("some error occurred. Check the console.");
                console.log(response);
            });
      }
    }


    if($window.sessionStorage.token){
      this.allQuery();
    }


    this.delete = function(id,index){

      supportService.deleteTicket(id)
      .then(function successCallback(response) {
            
            if(response.data.status==401){
                  alert(response.data.message)
                  window.location="#/"
            }
            else if(response.data.status==200){
              
                main.items.splice(index,1)           

            } else {
              alert(response.data.message)
            }
            
            

          }, function errorCallback(response) {
            
              alert("some error occurred. Check the console.");
              console.log(response);

          });
    }// function to delete a ticket


    this.close = function(id,index){

      supportService.closeTicket(id)
      .then(function successCallback(response) {
            
            if(response.data.status==401){
                  alert(response.data.message)
                  window.location="#/"
            }
            else if(response.data.status==200){
              
              main.items[index].status="closed"
              

            } else {
              alert(response.data.message)
            }
            
            

          }, function errorCallback(response) {
            
              alert("some error occurred. Check the console.");
              console.log(response);

          });
    }// function to close an already open ticket

    this.opend = function(id,index){

      supportService.openTicket(id)
      .then(function successCallback(response) {
            
            if(response.data.status==401){
                  alert(response.data.message)
                  window.location="#/"
            }
            else if(response.data.status==200){
              
              main.items[index].status="open"
              

            } else {
              alert(response.data.message)
            }
            
            

          }, function errorCallback(response) {
            
              alert("some error occurred. Check the console.");
              console.log(response);

          });
    }// function to open a closed ticket


    this.passportLogout = function(){

      supportService.passportLogout()
      .then(function successCallback(response) {
            
            if(response.status==200){
             console.log("logged out")
            }
            
          }, function errorCallback(response) {
              
              alert("some error occurred. Check the console.");
              console.log(response);

          });


    }// function to logout of passportLogin for both google and facebook


    this.logout = function () {
      
      delete $window.sessionStorage.token;
      window.location="#/"
      main.passportLogout();
    };// deletes the token on user logout



}]); // end controller