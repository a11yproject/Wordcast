var socket = io.connect("http://localhost:3000");

var pathArray = window.location.pathname.split('/');
var roomID = pathArray[3];

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
  captionLog.innerHTML += '<li>' + caption + '</li>';
  captionLog.scrollTop = captionLog.scrollHeight;
}
