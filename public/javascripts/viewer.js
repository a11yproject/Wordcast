var socket = io.connect("http://localhost:3000");

var pathArray = window.location.pathname.split('/');
var roomID = pathArray[2];

var caption = document.querySelector("#cc-text");
var roomName = document.querySelector("#roomName");

socket.on("connect", function(){
	socket.emit("join room", roomID);
});

socket.on("new caption", function(data){
	console.log("new caption: " + data);
	caption.innerHTML = data;
});

socket.on("room name", function(data){
	console.log("room name: " + data);
	roomName.innerHTML = data;
});
