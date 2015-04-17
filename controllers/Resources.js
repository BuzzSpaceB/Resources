var mimeTypeDetector = require('./mimeTypeDetector');
var persistence = require('./persistence');
var mongoose = require('mongoose');
var ds = require('DatabaseStuff');
var fs = require("fs");
var deasync = require('deasync');

var resourcesModel = ds.models.resources,
	resourcesConstraintsModel = ds.models.resourcesConstraints;


/**
*Resource method for uploading resources in the mongo database
*@param {Oject} file - an object with all the resoucers attributes. 
*@param {String} desc - the description of the resource. 
*@return json object of uploaded resource if resource is added else false
*/
module.exports.uploadResource = function(file, desc) {

	var request_results = false;

	if(mimeTypeDetector.detectMimeType(file)) {

		var constraints = persistence.retrieveResourceTypeConstraints(file.mimetype);

		if(constraints) {

			if(file.size <= (constraints.maximumSize * 1000)) {

				request_results =  persistence.persistObject(file, desc);

			} else {

				fs.unlink(file.path);
				throw("File size constraints not met");
			}
		} else {

			fs.unlink(file.path);
			throw("Resource type not supported");
		}
	} else {

		fs.unlink(file.path);
		throw("Could not detect mimetype");
	}

	return request_results;
};

/**
*Resource method for removing resources in the mongo database. 
*@param {String} r_id - the id of a resource to be removed. 
*@return true is resource is removed else false.  
*/
module.exports.removeResource = function(r_id) {

	var status = false,
		done = false,
		before = false,
		data = null;

	var query = resourcesModel.find({"_id" :r_id}, function(err, results) {

		if(!err) {

			data = results[0];

		}

		before = true;

	});

	while(!before) {

  		deasync.runLoopOnce();
	}

	query.remove(function(err, results) {

		if(!err) {

			status = true;
			fs.unlink(data.url);
		}

		done = true;

	});

	while(!done) {

  		deasync.runLoopOnce();
	}

	return status;
};


/**
*ResourceTypeConstraintsManager method for adding a resource constraint type
*param {String} r_type - the mimetype (e.g text/plain) of a resource to be added. 
*param {String} maxSize - max size that can be uploaded for the resource. 
*/
module.exports.addResourceType = function(r_type, maxSize) {


	var status = false,
		done = false;

	var entry = new resourcesConstraintsModel();
	entry.resourceType = r_type;
	entry.maximumSize = maxSize;

	entry.save(function(err, results) {

		if (!err) {

			status = true;
		}

		done = true;
	});
		
};



/**
*ResourceTypeConstraintsManager method for removing a resource constraint type
*param {String} r_type - the mimetype (e.g text/plain) of a resource to be removed. 
*@return true if resource type is removed else false.
*/
module.exports.removeResourceType = function(r_type) {

	var status = false,
		done = false;

	resourcesConstraintsModel.find({"resourceType" :r_type}).remove(function(err, results) {

		if(!err) {

			status = true;
		}

		done = true;
	});

	while(!done) {

  		deasync.runLoopOnce();
	}

	return status;
};


/**
*ResourceTypeConstraintsManager method for modifying a resource constraint type
*param {String} r_type - the mimetype (e.g text/plain) of a resource to be modified. 
*param {Number} newSizeLimit - the new max size that can be uploaded for the resource. 
*@return true if the resource constraint type was modified else false.
*/
module.exports.modifyResourceType = function(type, newSizeLimit) {

	var status = false,
		done = false;

	resourcesConstraintsModel.update({"resourceType" : type}, {$set: {maximumSize: newSizeLimit}}, function(err, results) {

		if(!err) {

			status = true;
		}

		done = true;
	});

	while(!done) {

  		deasync.runLoopOnce();
	}

	return status;
};
