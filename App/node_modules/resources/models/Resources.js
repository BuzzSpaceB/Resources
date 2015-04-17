
var mongoose = require('mongoose');
/**
* Database schema use for resources
*/
var schema = new mongoose.Schema({
	userID: String,
	data: Buffer,
	resourceName: String,
	resourceDescription: String,
	mimeType: String,
	uploadDate: Date,
	url: String
});


module.exports = mongoose.model('resources', schema);
