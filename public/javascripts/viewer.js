var socket = io.connect("http://localhost:3000");

var pathArray = window.location.pathname.split('/');
var roomID = pathArray[2];

var caption = document.querySelector("#cc-text");

socket.on("new caption", function(data){
	caption.innerHTML = data;
});
