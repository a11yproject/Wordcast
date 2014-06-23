var config 		= require('./config')();

// BASE SETUP
// ===================================================================

// Packages
var express 			= require('express'),
	morgan 				= require('morgan'),
	bodyParser 			= require('body-parser'),
	methodOverride 		= require('method-override'),
	app 				= express(),
	server 				= require('http').Server(app),
	io 					= require('socket.io')(server),
	socketManager		= require('./Components/Socket')(io);

app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());

var PORT 		= process.env.PORT || 3000;

// DBA SETUP
// ===================================================================
// TODO: 

// ROUTES / CONTROLLERS
// ===================================================================
var base 		= require('./Components'),
	room		= require('./Components/Room/RoomController');

// register routes
app.use('/', base);
app.use('/room', room);

// START THE SERVER
// ===================================================================

server.listen(PORT);
console.log('Listening on port ' + PORT);
