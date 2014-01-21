
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Wordcast' });
};

exports.listener = function(req, res){
	res.render('listener', {title: "Wordcast Room Name"});
};

exports.viewer = function(req, res){
	res.render('viewer', {title: "HTML5 Closed Captioning Viewer"});
};

exports.createRoom = function(req, res){
	res.render('createRoom', {title: "Create a new Wordcast Room"});
};
