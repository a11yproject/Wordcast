
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Wordcast' });
};

exports.listener = function(req, res){
	res.render('listener', {title: "HTML5 Closed Captioning Listener"});
};

exports.viewer = function(req, res){
	res.render('viewer', {title: "HTML5 Closed Captioning Viewer"});
};

exports.createRoom = function(req, res){
	res.render('createRoom', {title: "Create a new Wordcast Room"});
};

/*
*	POST
*/
exports.Action_createNewRoom = function(req, res){
	var GUID = Math.round(Math.random() * (99999 - 1) + 1);
	var url = '/listener/' + GUID;
	res.redirect(url);
};
