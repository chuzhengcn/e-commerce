(function(){
    var app = angular.module('reset_password', []);


    app.controller("reset_password_controller", ["$scope", "$http", function($scope, $http) {
        $scope.user = {};

        $scope.password_valid = true
        $scope.password_verify_valid = true
        $scope.token_valid = true

        $scope.validate = function(index) {
            switch(index) {
                case 0 :
                    $scope.password_valid = $scope.form_reset_password.password.$valid
                    break;
                case 1 :
                   $scope.password_verify_valid = $scope.form_reset_password.password_verify.$valid 
                                            && ($scope.user.password === $scope.user.password_verify) 
                    break;
                case 2 :
                    $scope.token_valid = $scope.form_reset_password.token.$valid
                default :
                    return  
            }
        }

        $scope.reset = function() {
            $http({
                method  : "post",
                url     : location.href,
                data    : $scope.user
            }).success(function(data, status, headers, config) {
                if (data.code === 0) {
                    App.alert_message("success", "重置密码成功", "请重新登录")
                    setTimeout(function() {
                        location.href = '/backend'
                    }, 2000)

                    return
                }

                App.alert_message("danger", "重置密码失败", data.msg)
            }).error(App.show_error)
        }
    }])

})();