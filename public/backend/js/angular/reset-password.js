(function(){
    var app = angular.module('reset_password', []);


    app.controller("reset_password_controller", ["$scope", "$http", function($scope, $http) {
        $scope.user = {};

        $scope.reset = function() {
            $http({
                method  : "put",
                url     : location.href,
                data    : $scope.user
            }).success(function(data, status, headers, config) {
                if (data.code === 0) {
                    App.alert_message("success", "重置密码成功")
                    setTimeout(function() {
                        // location.href = '/backend/admin'
                    }, 2000)

                    return
                }

                App.alert_message("danger", "重置密码失败", data.msg)
            }).error(App.show_error)
        }
    }])

})();