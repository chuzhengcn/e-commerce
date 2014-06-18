(function(){
    var app = angular.module('login', []);

    app.controller("signInController", function($scope, $http) {
        $scope.user = {
            name     : "",
            password : ""
        };

        $scope.signIn = function() {
            $http({
                method  : "post",
                url     : "/admin/login",
                data    : #scope.user,
            }).success(function(data, status, headers, config) {

            }).error(function(data, status, headers, config) {
                
            })
        }
    })

    function login_success() {

    }

})();