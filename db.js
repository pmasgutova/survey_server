var MongoClient = require('mongodb').MongoClient;
//var mongoURI = 'mongodb://nodejs:deployment_nodjs@oceanic.mongohq.com:10028/app23800219';
var mongoURI = 'mongodb://nodejs:deployment_nodjs@oceanic.mongohq.com:10004/app23829205';
MongoClient.connect(mongoURI, function(err, db) {
	if(err) throw err;
	exports.questions = db.collection('questions');
	exports.answers = db.collection('answers');
});