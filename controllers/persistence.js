var mongoose = require('mongoose');
var ResourcesModel = require('../models/Resources');
var ResourcesConstraintsModel = require('../models/Resources_Constraints');
var fs = require("fs");

/**
* Persistence method for retrieving constraints of a resource type.
*@param {String} type - the mimetype of the constraints to be retrieved.
*@param {Function} callback - a call back function use to handle retreived constraints.  
*/
module.exports.retrieveResourceTypeConstraints = function(type, callback) {

	ResourcesConstraintsModel.find({"resourceType": type}, function(err, _constraints) {
	
		if (err) {

	    	callback(err, null);

	    } else {

	      callback(null, _constraints[0]);
	    }
	 });

};

/**
* Persistence method for storing/inserting the resource in the database.
*@param {Object} file - object with the attributes of a resource. 
*@param {String} desc - description of the resource.  
*/
module.exports.persistObject = function (file, desc) {

	var entry = new ResourcesModel();

	entry.userID = "uxxxxxxxx";
	entry.resourceName = file.name;
	entry.data = fs.readFileSync(file.path);
	entry.resourceDescription = desc;
	entry.mimeType = file.mimetype;
	entry.uploadDate = new Date();
	entry.url = file.path;

	entry.save(function(err) {

		if (err) {

			console.log("Err: " + err);
		}
	});
					
};

