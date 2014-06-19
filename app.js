var express         = require("express"),
    env             = require("./env"),
    mongoose        = require("mongoose"),
    jade            = require("jade"),
    path            = require("path"),
    pkg             = require("./package.json"),
    errorhandler    = require('errorhandler'),
    serveStatic     = require('serve-static'),
    morgan          = require('morgan'),
    compression     = require('compression'),
    bodyParser      = require("body-parser"),
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

// app setting----------------------------------------------------------------------------------------
app.enabled('trust proxy');
app.set("title", pkg.name)
app.set("port", env.port);
app.set('view engine', 'jade');

// middleware ----------------------------------------------------------------------------------------
app.use(morgan("dev"));
app.use(compression());
app.use("/static", serveStatic('bower_components'));
app.use("/static", serveStatic('public'));
app.use("/static", serveStatic('pro_ui'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

// parse application/json
app.use(bodyParser.json())

var backend_router = require("./routes/backend/index").router;

app.use("/backend", backend_router);

if (app.get("env") === "development") {
    app.use(errorhandler())
}

// run --------------------------------------------------------------------------------------------
app.listen(app.get('port'))
console.log(app.get("title") + " listen on " + app.get("port"))


// app.use(express.json());
// app.use(express.urlencoded());
// app.use(express.bodyParser({ keepExtensions: true, uploadDir: __dirname + '/tmp' }))
// app.use(express.cookieParser('feiyesoft'))
// app.use(express.cookieSession({key : 'xiaoxiong'}))

