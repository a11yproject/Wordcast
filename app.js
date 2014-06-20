
/**
 * Module dependencies.
 */

var express 			= require('express'),
	morgan 				= require('morgan'),
	bodyParser 			= require('body-parser'),
	methodOverride 		= require('method-override'),
	app 				= express(),
	server 				= require('http').Server(app),
	io 					= require('socket.io')(server);

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());

/*
	ROUTES
*/
var roomController = require('./controllers/Room');
app.use('/room', roomController);


app.get('/', routes.index);
var routes = require('./routes');
var user = require('./routes/user');

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
		{
			socket.emit("no room exists");
			return;
		}

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
