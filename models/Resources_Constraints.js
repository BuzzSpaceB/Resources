var mongoose = require('mongoose');
/**
* Database schema use for resources constraints
*/
var schema = new mongoose.Schema({
	resourceType: String,
	maximumSize: Number 
});

module.exports = mongoose.model('resources_constraints', schema);
