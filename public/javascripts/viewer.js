var socketPath = window.location.protocol + "//" + window.location.host;
var pathArray = window.location.pathname.split('/');
var roomID = pathArray[3];

var socket = io.connect(socketPath);

var roomName = document.querySelector("#roomName");
var captionLog = document.querySelector(".log-captions");

//===========================
//
//  Socket
//
//===========================

// Successfully connected to server
socket.on("connect", function(){
	socket.emit("join room", roomID);
});

// Received a new caption
socket.on("new caption", function(data){
	console.log("new caption: " + data);
	log(data);
});

// Get room name from server
socket.on("room name", function(data){
	console.log("room name: " + data);
	roomName.innerHTML = data;
});

//===========================
//
//  Util
//
//===========================

function log(caption) {
  captionLog.innerHTML = caption;
}
