var RoomManager 	= require('../Room/RoomManager'),
	Room 			= require('../Room/Room');

var Socket = function(io) {

	var sock = null;
	
	var joinRoomHandler = function(data) {
		var room = RoomManager.getRoomById(data);

		if (!room)
			return;

		var roomName = room.getName();

		if (roomName)
			sock.emit("room name", roomName);
		
		sock.join(data)
	};

	var newCaptionHandler = function(data) {
		sock.broadcast.to(data.room).emit("new caption", data.text);
	};

	var getRoomNameHandler = function(data) {

		console.log("RoomID: " + data);
		var room = RoomManager.getRoomById(data);
		if (!room)
		{
			sock.emit("no room exists");
			return;
		}

		sock.emit("room name", room.getName());
	};

	io.sockets.on('connection', function(socket) {

		sock = socket;

		socket.on("join room", joinRoomHandler);
		socket.on("new caption", newCaptionHandler);
		socket.on("get room name", getRoomNameHandler);
	});

};

module.exports = Socket;