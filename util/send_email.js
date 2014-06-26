var email_sender   = require("emailjs/email"),
    env            = require("../fy_env");


var server = email_sender.server.connect({
    user        : env.email.user,
    password    : env.email.password,
    host        : env.email.host,
    ssl         : true 
})

var from_name = "扉页软件客服 <cs@feiyesoft.com>";

function send_text_only(option, cb) {
    server.send({
        text : option.text,
        from : from_name,
        to   : option.to,
        subject : option.subject,
    }, function(err, message) {
        cb(err, message)
    })  
}     

exports.send_text_only = send_text_only

// send_text_only({
//     from    : "cs@feiyesoft.com",
//     to      : "chuzhengcn@gmail.com",
//     subject : "重置密码邮件",
//     text : "55555"
// },function(err, message) {
//     if (err) {
//         console.log(err)
//         return
//     }

//     console.log(message)
// })