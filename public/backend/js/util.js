(function() {
    App.alert_message = function(type, title, msg) {
        var $message_container = $("#alert-message");
        var $alert = $message_container.find(".alert-" + type);

        $alert.find("h4 span").html(title || type).end().find(".msg").html(msg || "").end().slideDown()

        $alert.delay(2000).slideUp()
    }

    App.show_error = function(data, status, headers, config) {
        App.alert-message("danger", "出了点问题", "遇到一些未知错误")
    } 
}());
