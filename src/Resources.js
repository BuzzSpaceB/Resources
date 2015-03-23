
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/');

var schema = new mongoose.Schema({
	resourceID: Integer,
	userID: String,
	resourceName: String,
	resourceDescription: String,
	mimeType: String,
	fileSize: Double,
	uploadDate: {type: Date, default: Date.now},
	lastViewed: Date
	resourceURL: String,
	//filePath: String
});

var ResourceTypeContraintsManager = {};

manageResourceTypeContraints.addResourceType = function()
{
		
}

manageResourceTypeContraints.removeResourceType = function()
{
	
}

manageResourceTypeContraints.modifyResourceType = function()
{
	
}

var Resources = {};

Resources.manageResourceTypeContraints = ResourceTypeContraintsManager;

Resources.uploadResources = function(file)
{
	
}

Resources.deleteResources = function()
{
	
}

module.exports = Resources;
