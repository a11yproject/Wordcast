var RoomManager = function() {
	if (arguments.callee._singletonInstance)
		return arguments.callee._singletonInstance;
	arguments.callee._singletonInstance = this;

	this.rooms = new Array();
};

RoomManager.prototype.addRoom = function(room) {
	if (!this.hasRoom(room))
		this.rooms.push(room);
	else
		return false; //TODO: better error maybe?
};

RoomManager.prototype.hasRoom = function(room) {
	var room = this.getRoomById(room.getID());
	return (room != null);
};

RoomManager.prototype.getRoomById = function(ID) {
	for (var i = 0, len = this.rooms.length; i < len; i++) {
		var room = this.rooms[i],
			roomID = room.getID();

		if (roomID == ID) {
			return room;
		}
	}
};

module.exports = new RoomManager() || RoomManager();
