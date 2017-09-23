myApp.controller('queryCreateController',['$window','$http','$routeParams','supportService','Upload',function($window,$http,$routeParams,supportService,Upload) {

    var main = this;
    this.ticket="";
    
    if($window.sessionStorage.token){
      var encodedProfile = $window.sessionStorage.token.split('.')[1];
      this.profile = JSON.parse(supportService.url_base64_decode(encodedProfile));
      
      if(main.profile.exp*1000<Date.now()){
        alert("Token expired. Login again to continue.")
        window.location='#/'
      }
    }else{
      alert("no token found. please login")
      window.location='#/'
    }// gets details from the jwt token an decodes it to get profile information
    

    this.newQuery = function(data){

      var myData = {

                  title : main.title,
                  details : main.details,
                  filename : data

              }

    	supportService.newQuery(myData)
      .then(function successCallback(response) {
            
            if(response.data.status==401){
                  alert(response.data.message)
                  window.location="#/"
            }
            else if(response.data.status==200){
            	
            	main.ticket= response.data.data.ticketNo;
            	main.title = "";
              main.details = "";

            } else {
            	alert(response.data.message)
            }
            
            

          }, function errorCallback(response) {
            
            alert("some error occurred. Check the console.");
            console.log(response);

          });
    }// function to post a new query and saave the filename if uploaded successfully


    this.submit = function(){ //function to call on form submit
          if (main.upload_form.file.$valid && main.file) { //check if from is valid
              main.upload(main.file); //call upload function
          }
      }
      
    this.upload = function (file) {

        Upload.upload({
            url: './api/v1/ticket/upload', //webAPI exposed to upload the file
            data:{
                file:file
              } //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            if(resp.data.error_code === 0){ //validate success
                $window.alert('Success ' + resp.config.data.file.name + ' uploaded.');
                main.newQuery(resp.data.data);
            } else {
                $window.alert('an error occured');
            }
        }, function (resp) { //catch error
            console.log('Error status: ' + resp.status);
            $window.alert('Error status: ' + resp.status);
        }, function (evt) { 
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            main.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });
    };// function to uploaded a file less than 20 MB
    

    this.run = function(){
      if(main.file && main.title && main.details){
        main.submit()
      }else{
        main.newQuery();
      }
    }// function to check if query is submitted with file or without file.


    this.logout = function () {
      
      delete $window.sessionStorage.token;
      window.location="#/"

    };// deletes the token on user logout



}]); // end controller