var router 		= require('express').Router(),
	RoomManager = require('./RoomManager'),
	Room 		= require('./Room');

router.get('/new', function(req, res){
	res.render('create-room', {title: "Create a new Wordcast Room"});
});

router.get('/ID/:id', function(req, res){

	var mode = req.query.viewMode,
		room = RoomManager.getRoomById(req.params.id);

	if (!room)
		res.render('viewer', {title: "Room No Exist"});

	if (mode == 'broadcast') {
		res.render('listener', {title: room.getName()});
	} else {
		res.render('viewer', {title: room.getName()});
	}
});

router.post('/createNewRoom', function(req, res){
	
	var GUID 		= Math.round(Math.random() * (99999 - 1) + 1),
		roomName 	= req.body.RoomName;

	var room = new Room(GUID, roomName, "99999");

	if (!RoomManager.hasRoom(room)) {
		console.log("Created room: #" + room.getID() + " " + room.getName());
		RoomManager.addRoom(room);
	}
	else {
		console.log("ERROR: Cannot Create Room, Room Already Exists");
	}

	res.redirect(room.getUrl());

});

module.exports = router;
