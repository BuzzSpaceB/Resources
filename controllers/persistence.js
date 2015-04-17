var mongoose = require('mongoose');
var ds = require('DatabaseStuff');
var fs = require("fs");
var deasync = require('deasync');

var ResourcesModel = ds.models.resourcesConstraints.resource,
	ResourcesConstraintsModel = ds.models.resourcesConstraints;
	
/**
* Persistence method for retrieving constraints of a resource type.
*@param {String} type - the mimetype of the constraints to be retrieved.
*@param {Function} callback - a call back function use to handle retreived constraints.  
*/
module.exports.retrieveResourceTypeConstraints = function(type) {

	var done = false,
	 data = false;

	ResourcesConstraintsModel.find({"resourceType": type}, function(err, _constraints) {
	
		if (!err) {

	    	data = _constraints[0];
	    }

	    done  = true;
	 });

	while(!done) {

  		deasync.runLoopOnce();
	}

	return data;
};

/**
* Persistence method for storing/inserting the resource in the database.
*@param {Object} file - object with the attributes of a resource. 
*@param {String} desc - description of the resource.  
*/
module.exports.persistObject = function (file, desc) {

	var entry = new ResourcesModel();

	entry.resourceName = file.name;
	entry.data = fs.readFileSync(file.path);
	entry.resourceDescription = desc;
	entry.mimeType = file.mimetype;
	entry.uploadDate = new Date();
	entry.url = file.path;

	var done = false,
	data = false;

	entry.save(function(err, results) {

		if (!err) {

			data = results;
		}

		done = true;
	});


	while(!done) {

  		deasync.runLoopOnce();
	}
					
	return data;
};

