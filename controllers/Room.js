var roomController = require('express').Router();

roomController.get('/listener/*', function(req, res){
	res.render('listener', {title: "Wordcast Room Name"});
});

roomController.get('/viewer/*', function(req, res){
	res.render('viewer', {title: "HTML5 Closed Captioning Viewer"});
});

roomController.get('', function(req, res){
	res.render('createRoom', {title: "Create a new Wordcast Room"});
});

module.exports = roomController;
