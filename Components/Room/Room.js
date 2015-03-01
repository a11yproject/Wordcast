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
	return "/room/ID/" + this.ID;
};

module.exports = Room;