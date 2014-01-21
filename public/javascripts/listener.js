var button = document.getElementById('cc-toggle');

var pathArray = window.location.pathname.split('/');
var roomID = pathArray[2];
var roomName = document.querySelector("#roomName");

var captionLog = document.querySelector(".log-captions");

//===========================
//
//  Socket
//
//===========================

var socket = io.connect("http://localhost:3000");

// Successfully connected to server
socket.on("connect", function(){
  socket.emit("get room name", roomID); // get room by id
});

//  Get room name from server
socket.on("room name", function(data){
  console.log("Room Name: " + data);
  roomName.innerHTML = data;
});

//TODO: more graceful error here
// If page is loaded, but a room doesn't exist
socket.on("no room exists", function(data){
  console.log("no room exists");
  window.location = '../';
});

//===========================
//
//  Voice Recognition
//
//===========================

var recognizing = false;
var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
  
recognition.onstart = function() {
  recognizing = true;
};

recognition.onerror = function(event) {};
recognition.onend = function() {
  recognizing = false;
};

recognition.onresult = function(event) {
  for (var i = event.resultIndex; i < event.results.length; ++i) {
    if(event.results[i][0].confidence > 0.4) {
      var captionText = capitalize(event.results[i][0].transcript);
      socket.emit("new caption", {text: captionText, room: roomID});
      log(captionText);
    }
  }
};

//===========================
//
//  Util
//
//===========================

function capitalize(s) {
  var first_char = /\S/;
 return s.replace(first_char, function(m) { 
    return m.toUpperCase(); 
  }); 
}

function log(caption) {
  captionLog.innerHTML += '<li>' + caption + '</li>';
  captionLog.scrollTop = captionLog.scrollHeight;
}

function toggleSpeechRecognition(event) {
  if(recognizing) {
    recognition.stop();
    button.classList.remove("listening");
    return;
  } else {
    recognition.start();
    button.classList.add("listening");
  }
}

function dummyMsg(msg){
  var messages = ["here is a caption", "The Lazy Brown Fox", "Wizards", "santa claws"];
  var message = messages[Math.floor(Math.random()*messages.length)];
  socket.emit("new caption", {text: message, room: roomID});
  log(message);
}
