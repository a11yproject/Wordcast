
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Wordcast' });
};

exports.listener = function(req, res){
	res.render('ccListener', {title: "HTML5 Closed Captioning Listener"});
};

exports.viewer = function(req, res){
	res.render('ccViewer', {title: "HTML5 Closed Captioning Viewer"});
};