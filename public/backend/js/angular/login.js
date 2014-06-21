(function(){
    var app = angular.module('login', []);

    app.controller("login_container_controller", ["$scope", function($scope) {
        if (location.hash === '#register') {
            $scope.title = "注册";
        } else if (location.hash === '#reminder') {
            $scope.title = "找回密码";
        } else {
            $scope.title = "登录";
        }

        $scope.switch_title = function(title) {
            $scope.title = title;
        }
    }])

    app.controller("login_controller", ["$scope", "$http", function($scope, $http) {
        $scope.user = {
            name     : "",
            password : "",
            remember_me : true,
        };

        $scope.login = function() {
            $http({
                method  : "post",
                url     : "/backend/login",
                data    : $scope.user
            }).success(function(data, status, headers, config) {

            }).error(function(data, status, headers, config) {
                
            })
        }
    }])

    app.controller("reminder_controller", ["$scope", "$http", function($scope, $http) {
        $scope.email = "";

        $scope.reset_password = function() {
            $http({
                method  : "post",
                url     : "/backend/reset-password",
                data    : {email : $scope.email}
            }).success(function(data, status, headers, config) {

            }).error(function(data, status, headers, config) {
                
            })
        }
    }])

    app.controller("form_register_controller", ["$scope", "$http", function($scope, $http) {
        $scope.user = {};

        $scope.reg = function(user) {
            $http({
                method  : "post",
                url     : "/backend/reg",
                data    : user,
            }).success(function(data, status, headers, config) {

            }).error(function(data, status, headers, config) {
                
            })
        }

    }])

    function login_success() {

    }

})();