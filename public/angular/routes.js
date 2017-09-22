

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
        .when('/admin/signup',{
            templateUrl     : 'views/signup-view.html',
            controller      : 'signupAdminController',
            controllerAs    : 'mySignup'
        })
        .when('/dashboard',{
        	templateUrl     : 'views/dashboard-view.html',
        	controller 		: 'dashController',
        	controllerAs 	: 'myDash'
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
        .when('/createTest',{

            templateUrl     : 'views/testCreate-view.html',
            controller      : 'testCreateController',
            controllerAs    : 'myTestCreate'
            
        })
        .when('/:id/createQuestions',{

            templateUrl     : 'views/questionCreate-view.html',
            controller      : 'questionCreateController',
            controllerAs    : 'myQuestionCreate'
            
        })
        .when('/:id/liveTest',{

            templateUrl     : 'views/testLive-view.html',
            controller      : 'testLiveController',
            controllerAs    : 'myLive'
            
        })
        .when('/queryCreate',{

            templateUrl     : 'views/queryCreate-view.html',
            controller      : 'queryCreateController',
            controllerAs    : 'myQueryCreate'
            
        })
        .when('/product/:id',{

        	templateUrl     : 'views/product-view.html',
            controller      : 'productController',
            controllerAs    : 'myProduct'
        	
        })
        .when('/product/:id/edit',{

            templateUrl     : 'views/editProduct-view.html',
            controller      : 'editProductController',
            controllerAs    : 'myEditProduct'
            
        })
        .when('/cart',{

        	templateUrl     : 'views/cart-view.html',
        	controller 		: 'cartController',
        	controllerAs 	: 'myCart'
        })
        .when('/forgotPassword',{

            templateUrl     : 'views/forgot-view.html',
            controller      : 'resetController',
            controllerAs    : 'myReset'
        })
        .when('/verifyOTP',{

            templateUrl     : 'views/otp-view.html',
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
                template   : '<h1 style="color:red;">404 page not found</h1>'
            }
        );


}]);