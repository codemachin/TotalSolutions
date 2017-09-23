myApp.controller('discussionController',['$window','$http','$routeParams','supportService','$sce',function($window,$http,$routeParams,supportService,$sce) {

    var main = this;
    this.details="";
    this.id = $routeParams.id;
    this.text="";

    if($window.sessionStorage.token){
      var encodedProfile = $window.sessionStorage.token.split('.')[1];
      this.profile = JSON.parse(supportService.url_base64_decode(encodedProfile));
      
    }else{
      alert("no token found. please login")
      window.location='#/'
    }// gets details from the jwt token an decodes it to get profile information

    this.discussion = function(){

    	supportService.getdiscussion(main.id)
      .then(function successCallback(response) {
            
            if(response.data.status==401){
                alert(response.data.message)
                window.location="#/"

            }else if(response.data.status==200){
              main.items = response.data.data
              main.details = $sce.trustAsHtml(main.items.details);
            }else{
              alert(response.data.message)
            }
            

          }, function errorCallback(response) {
            
              alert("some error occurred. Check the console.");

          });
    }// gets the query details including the messages exchanged

    if($window.sessionStorage.token){
      this.discussion();
    }

    this.sendMessage = function(id,email,ticketNo){
        mydata={
          text : main.text,
          id : main.items._id,
          email : main.items.email,
          ticketNo : main.items.ticketNo
        }
        main.text="";
        // checks if user's first name is admin
        if(main.profile.data.firstName=="admin"){
          supportService.sendAdminMessage(mydata)
            .then(function successCallback(response) {

                  if(response.data.status==401){
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
          supportService.sendMessage(mydata)
            .then(function successCallback(response) {
                  
                  if(response.data.status==401){
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

    } // function for sending message to the user or admin, whoever is logged in


    this.close = function(id){

      supportService.closeTicket(id)
      .then(function successCallback(response) {
            
            if(response.data.status==401){
                  alert(response.data.message)
                  window.location="#/"
            }
            else if(response.data.status==200){
              
              main.items.status="closed"
              

            } else {
              alert(response.data.message)
            }
            
            

          }, function errorCallback(response) {
            
              alert("some error occurred. Check the console.");
              console.log(response);

          });
    }// function to close an already open ticket

    this.opend = function(id){

      supportService.openTicket(id)
      .then(function successCallback(response) {
            
            if(response.data.status==401){
                  alert(response.data.message)
                  window.location="#/"
            }
            else if(response.data.status==200){
              
              main.items.status="open"              

            } else {
              alert(response.data.message)
            }
            
            

          }, function errorCallback(response) {
            
              alert("some error occurred. Check the console.");
              console.log(response);

          });
    }// function to reopen a closed ticket


    this.logout = function () {
        
        delete $window.sessionStorage.token;
        window.location="#/";
        
    };// deletes the token on user logout


}]); // end controller

