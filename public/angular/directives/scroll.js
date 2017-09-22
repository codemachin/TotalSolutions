myApp.directive('schrollBottom', function () {
  return {
    scope: {
      schrollBottom: "="
    },
    link: function (scope, element) {
      scope.$watchCollection('schrollBottom', function (newValue) {
        if (newValue)
        {
          $(element).scrollTop($(element)[0].scrollHeight);
        }
      });
    }
  }
})// this directive keeps the chat box scrolled to bottom automatically and also in sending new message in the discussion view

myApp.directive('scrollOnClick', function() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.on('click', function() {
        $("body").animate({scrollTop: $('.card-login').offset().top}, "fast");
      });
    }
  }
});// this directive is for simple scroll animation in the login view