
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();
var server = http.createServer(app);
var io = require("socket.io").listen(server);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*
	ROUTES
*/
app.get('/', routes.index);

/* Wordcast routes */

//GET
app.get('/listener/*', routes.listener);
app.get('/viewer/*', routes.viewer);
app.get('/createRoom', routes.createRoom);

// POST
app.post('/createNewRoom', routes.Action_createNewRoom);

/*
	INIT
*/
server.listen(3000);

/*
	Socket.IO
*/
var rooms = new Array();
io.sockets.on('connection', function(socket) {

	socket.on("join room", function(data){
		socket.join(data)
	});

	socket.on("create room", function(data){
		if (rooms.indexOf(data) < 0)
			rooms.push(data);
		else
			socket.emit("create room error", "room already exists");
	});

	// Broadcast a new caption when one is received
	socket.on("new caption", function(data){
		socket.broadcast.to(data.room).emit("new caption", data.text);
	});

});
