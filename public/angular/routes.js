

myApp.config(['$routeProvider','$httpProvider', function($routeProvider,$httpProvider){
    $httpProvider.interceptors.push('authInterceptor');
    // for pre-processing the http requests with authInterceptor
    $routeProvider
        .when('/',{
        	templateUrl		: 'views/login-view.html',
            controller 		: 'loginController',
        	controllerAs 	: 'myLogin'
        })
        .when('/register',{
        	templateUrl		: 'views/register-view.html',
            controller 		: 'signupController',
        	controllerAs 	: 'mySignup'
        })

        .when('/home',{
            templateUrl     : 'views/home-view.html',
            controller      : 'homeController',
            controllerAs    : 'myDash'
        })
        .when('/:id/discussion',{

        	templateUrl     : 'views/discussion-view.html',
            controller      : 'discussionController',
            controllerAs    : 'myDiscussion'
        	
        })

        .when('/queryCreate',{

            templateUrl     : 'views/queryCreate-view.html',
            controller      : 'queryCreateController',
            controllerAs    : 'myQueryCreate'
            
        })

        .when('/forgotPassword',{

            templateUrl     : 'views/forgot-view.html',
            controller      : 'resetController',
            controllerAs    : 'myReset'
        })

        .when('/reset/:token',{

            templateUrl     : 'views/updatePass-view.html',
            controller      : 'resetController',
            controllerAs    : 'myReset'
        })
        

        .otherwise(
            {
                //redirectTo:'/'
                template   : '<h1 style="color:#004D40;margin:10%">404 page not found</h1>'
            }
        );


}]);