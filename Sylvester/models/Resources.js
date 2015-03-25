
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	userID: String,
	data: Buffer,
	resourceName: String,
	resourceDescription: String,
	mimeType: String,
	uploadDate: {type: Date, default: Date.now},
	resourceURL: String
});

schema.set('collection', 'resources');
module.exports = mongoose.model('Resources', schema);
