
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
app.post('/createNewRoom', function(req, res){
	
	var GUID = Math.round(Math.random() * (99999 - 1) + 1);
	var url = '/listener/' + GUID;

	var room = {id: GUID, name: req.body.RoomName};

	if (rooms.indexOf(room) < 0)
	{
		console.log("Created room: #" + room.id + " " + room.name);
		rooms.push(room);
	}
	else
		console.log("ERROR: Cannot Create Room, Room Already Exists");

	res.redirect(url);

});

/*
	INIT
*/
server.listen(3000);

/*
	Socket.IO
*/
var rooms = new Array();
io.sockets.on('connection', function(socket) {

	socket.on("join room", joinRoomHandler);
	socket.on("new caption", newCaptionHandler);
	socket.on("get room name", getRoomNameHandler);

	// Socket Functions
	function newCaptionHandler(data)
	{
		console.log("new caption: " + data.text);
		socket.broadcast.to(data.room).emit("new caption", data.text);
	}

	function getRoomNameHandler(data)
	{
		console.log("get room name: #" + data);

		var room = getRoomById(data);
		if (!room)
			return;

		socket.emit("room name", room.name);
	}

	function joinRoomHandler(data)
	{
		var room = getRoomById(data);

		if (!room)
			return;

		if (room.name)
		{
			console.log("Room Joined: #" + data + " - " + room.name);
			socket.emit("room name", room.name);
		}
		else
		{
			console.log("Room Joined: #" + data);
		}
		
		socket.join(data)
	}

});

function getRoomById(id)
{
	for (var i = 0; i < rooms.length; i++)
	{
		room = rooms[i];
		if (!room.hasOwnProperty("name") || !room.hasOwnProperty("id"))
			continue;

		if (room.id == id)
			return room;
	}
	return;	
}
