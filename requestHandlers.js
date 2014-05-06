var zlib = require('zlib');
var db = require("./db");
var handle = {}
exports.handle = handle;

handle["/start_get"] = function (request, response) {
	response.writeHead(302, {'Location': '/survey.html'});
	/*response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("This is a survey_project");*/
	response.end();
}
handle["/_get"] = handle["/start_get"];

//outputs questions in json
handle["/questions_get"] = function(request, response) {
	response.writeHead(200, {"Content-Type": "text/plain"});
	/*response.write(db.questions.find().toArray());*/
	db.questions.find().toArray(function(err, result) {
	    if (err) throw err;
	    response.write(JSON.stringify(result));
	    response.end();
	});
	
}

handle["/answers_post"] = function(request, response, postData) {
	console.log(postData);
	var answers = JSON.parse(postData);
	var doc = {};
	doc.ip = request.connection.remoteAddress;
	doc.date = new Date();
	doc.answers = answers;
	db.answers.insert(doc, function(err, result) {
		console.log(result);
		console.log("added to db with id = " + result._id);
	});
	response.writeHead(201, {'Content-Type': 'text/plain'});
	response.end();
}

//outputs questions in gzip
handle["/questionsgzip_get"] = function(request, response) {
	response.writeHead(200, {'Content-Type': 'text/html', 'Content-Encoding': 'gzip'});

	db.questions.find().toArray(function(err, result) {
	    if (err) throw err;

	    var buf = new Buffer(JSON.stringify(result), 'utf-8');
   		zlib.gzip(buf, function (_, result) { 
      		response.end(result);                     
    	});
	});
}