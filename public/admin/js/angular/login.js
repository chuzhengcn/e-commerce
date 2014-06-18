(function(){
    var app = angular.module('login', []);

    app.controller("login_controller", function($scope, $http) {
        $scope.user = {
            name     : "",
            password : "",
            remember_me : true,
        };

        $scope.login = function() {
            $http({
                method  : "post",
                url     : "/admin/login",
                data    : $scope.user,
            }).success(function(data, status, headers, config) {

            }).error(function(data, status, headers, config) {
                
            })
        }
    })

    app.controller("reminder_controller", function($scope, $http) {
        $scope.email = "";

        $scope.reset_password = function() {
            $http({
                method  : "post",
                url     : "/admin/reset-password",
                data    : $scope.email,
            }).success(function(data, status, headers, config) {

            }).error(function(data, status, headers, config) {
                
            })
        }
    })

    function login_success() {

    }

})();