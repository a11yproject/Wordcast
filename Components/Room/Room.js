var Room = function(ID, name, ownerId) {

	this.ID = ID;
	this.name = name;
	this.ownerID = ownerId;

};

Room.prototype.getID = function() {
	return this.ID;
};

Room.prototype.getName = function() {
	return this.name;
};

Room.prototype.getOwnerID = function() {
	return this.ownerID;
};

Room.prototype.isOwner = function(user) {
	return (this.ownerID === user.ID);
};

Room.prototype.getUrl = function() {

	// TODO: this should be config based
	if (process.env.NODE_ENV == "production")
		URL = "http://wordcast.io/room/ID/" + this.ID;
	else
		URL = "http://localhost:3000/room/ID/" + this.ID;

	return URL;
};

module.exports = Room;
