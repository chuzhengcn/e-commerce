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
        $scope.user = {};

        $scope.login = function() {
            console.log($scope)
            $http({
                method  : "post",
                url     : "/backend/login",
                data    : $scope.user
            }).success(function(data, status, headers, config) {
                if (data.code === 0) {
                    App.alert_message("success", "登录成功")
                    setTimeout(function() {
                        // location.href = '/backend/admin'
                    }, 2000)

                    return
                }

                App.alert_message("danger", "登录失败", data.msg)
            }).error(App.show_error).then()
        }
    }])

    app.controller("reminder_controller", ["$scope", "$http", function($scope, $http) {
        $scope.email = "";

        $scope.reset_password = function() {
            $http({
                method  : "post",
                url     : "/backend/forgot-password",
                data    : {email : $scope.email}
            }).success(function(data, status, headers, config) {
                if (data.code === 0) {
                    App.alert_message("success", "操作成功", "密码重置验证码已发往您的注册邮箱")
                    location.href= "/backend/reset-password/" + data
                    return
                }

                App.alert_message("danger", "重置密码失败", data.msg)
            }).error(App.show_error)
        }
    }])

    app.controller("form_register_controller", ["$scope", "$http", function($scope, $http) {
        $scope.user = {};

        $scope.reg = function() {
            $http({
                method  : "post",
                url     : "/backend/reg",
                data    : $scope.user,
            }).success(function(data, status, headers, config) {
                if (data.code === 0) {
                    App.alert_message("success", "注册成功")
                    setTimeout(function() {
                        location.href = '/backend/admin'
                    }, 2000)

                    return
                }

                App.alert_message("danger", "注册失败", data.msg)
            }).error(App.show_error)
        }

    }])

})();