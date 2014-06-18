var express         = require("express"),
    env             = require("./env"),
    mongoose        = require("mongoose"),
    jade            = require("jade"),
    path            = require("path"),
    pkg             = require("./package.json"),
    errorhandler    = require('errorhandler'),
    serveStatic     = require('serve-static'),
    morgan          = require('morgan'),
    app             = express();

// db connect ----------------------------------------------------------------------------------
function connect() {
    var options = { server: { socketOptions: { keepAlive: 1 } } }
    mongoose.connect(env.mongo_url, options)
}
connect()

mongoose.connection.on('open', function() {
    console.log('mongodb connected')
})

mongoose.connection.on('error', function(err) {
    console.log(err)
})

// Reconnect when closed
mongoose.connection.on('disconnected', function () {
    connect()
})

// app setting-------------------------------------------------------------------------------------
app.set("title", pkg.name)
app.set("port", env.port);
app.set('view engine', 'jade');

// middleware ----------------------------------------------------------------------------------------

var backend_router = require("./routes/backend/index").router;

app.use(morgan("dev"));
app.use(serveStatic('bower_components'));
app.use(serveStatic('public'));
app.use(serveStatic('pro_ui'));

app.use("/backend", backend_router);

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded());

// parse application/json
// app.use(bodyParser.json())

if (app.get("env") === "development") {
    app.use(errorhandler())
}

// run --------------------------------------------------------------------------------------------
app.listen(app.get('port'))
console.log(app.get("title") + " listen on " + app.get("port"))





// // all environments
// app.set('views', path.join(__dirname, 'views'));
// 

// app.use(express.json());
// app.use(express.urlencoded());
// app.use(express.bodyParser({ keepExtensions: true, uploadDir: __dirname + '/tmp' }))
// app.use(express.cookieParser('feiyesoft'))
// app.use(express.cookieSession({key : 'xiaoxiong'}))

