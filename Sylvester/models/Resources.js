
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
	uploadDate: Date
});

/**
* Define the collection to be used
*/
schema.set('collection', 'Resources');

module.exports = mongoose.model('Resources', schema);
