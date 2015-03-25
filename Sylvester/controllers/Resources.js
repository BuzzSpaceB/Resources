
var mongoose = require('mongoose');
var Resources = require('../models/Resources');
var fs = require("fs");


var Resource = {};

Resource.uploadResource = function(file) {

   
		new Resources({userID: "buzz",
				resourceName: file.name,
				data: fs.readFileSync(file.path),
				resourceDescription: "Buzz Resource",
				mimeType: file.mimetype,
				uploadDate: {type: Date, default: Date.now},
				resourceURL: file.path}).save();

		fs.unlinkSync(file.path);

};


Resource.removeResource = function() {

};


Resource.ResourceTypeContraintsManager = {};

Resource.ResourceTypeContraintsManager.addResourceType = function() {

}

module.exports = Resource;