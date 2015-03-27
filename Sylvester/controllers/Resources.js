var mongoose = require('mongoose');
var ResourcesModel = require('../models/Resources');
var ResourcesConstraintsModel = require('../models/Resources_Constraints');
var fs = require("fs");

var MimeTypeDetector = {}; //MimeTypeDetector object
var Persistence = {}; //Persistence object
var Resource = {}; //Resource object

/**
* MimeTypeDetector method for detecting mimeType of a resource
*@param {Oject} file - an object with all the resoucers attributes. 
*/
MimeTypeDetector.detectMimeType = function(file) {

	if(file.mimetype) {

		return true;

	} else {

		return console.log("Error: Could not detect mimeType");
	}
};


/**
* Persistence method for retrieving constraints of a resource type.
*@param {String} type - the mimetype of the constraints to be retrieved.
*@param {Function} callback - a call back function use to handle retreived constraints.  
*/
Persistence.retrieveResourceTypeConstraints = function(type, callback) {

	ResourcesConstraintsModel.find({"mimeType": type}, function(err, _constraints) {
	
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
Persistence.persistObject = function (file, desc) {

	ResourcesModel.collection.insert({

		userID: "uxxxxxxxx",
		resourceName: file.name,
		data: fs.readFileSync(file.path),
		resourceDescription: desc,
		mimeType: file.mimetype,
		uploadDate: new Date() }, function(err, doc) {
	
			if(err) console.log("Error inserting record");
			else console.log("Record added");
		});
					
};


/**
*Resource method for uploading resources in the mongo database
*@param {Oject} file - an object with all the resoucers attributes. 
*@param {String} disc - the description of the resource. 
*/
Resource.uploadResource = function(file, desc) {


	addConsToDb(); // add constraints if not exist (For demo and testing)

	if(MimeTypeDetector.detectMimeType(file)) {

		Persistence.retrieveResourceTypeConstraints(file.mimetype, function(err, constraints) {

			if(err) {

			 	console.log("Error getting constraints");

			} else {

				var fSize = (file.size/ 1000); // bytes to KB;

				if (constraints != null) {
					if(fSize > constraints.maxSize) {

						console.log("Error: reource type constraints not met..");

					}else {

						Persistence.persistObject(file, desc);
					}
				} else {

					console.log("WHAT ARE YOU DOING, HACKING THE SYSTEM?");
				}
			}

			fs.unlinkSync(file.path);

		});

	}
};

/**
*Resource method for removing resources in the mongo database. 
*@param {String} r_id - the id of a resource to be removed.   
*/
Resource.removeResource = function(r_id) {

	ResourcesModel.find({"_id" :r_id}).remove(function(err, results) {

		if(err) console.log("Error removing resource");
		else {
			console.log("Resource removed");
		}
	});
};

/**
*Resource method for downloading reources in the mongo database (temp method, for testing).
*@param {String} name - the name of the resource to be downloaded. 
*/
Resource.downloadResource = function(name) {

	ResourcesModel.find({
		"resourceName": name}, function(err, results) {

		if(err) {

			return console.log("Error searching...");
		} else {

			fs.writeFile("public/downloads/" + results[0].resourceName, results[0].data, function(err) {

				if(err) {

					return console.log("Error");

				} else {}
			});
		}
	});
	
};


/**
*ResourceTypeConstraintsManager object use to manage constraints of resources
*/
Resource.ResourceTypeConstraintsManager = {};

/**
*ResourceTypeConstraintsManager method for adding a type to a resource
*/
Resource.ResourceTypeConstraintsManager.addResourceType = function(type, max) {

	ResourcesConstraintsModel.collection.insert({
			mimeType: type,
			maxSize: max }, function(err, results) {

				if(err) console.log("Error inserting  constraint record");
				else console.log("Record constraint added");
			});
		
}

/**
* Everything from here is for demo and testing only
*/
var constraintsTypes = ["image/jpeg", "image/png", "application/pdf", "audio/mp3"];
var constraintsMaxSize = [2000.0, 2000.0, 2500.0, 3000.0]; //in KB

function addConsToDb() {


	ResourcesConstraintsModel.collection.count(function(err, count) {

		if (err)
			return;

		if (count == 0) {
			for(var i  = 0; i < constraintsTypes.length; i++) {

				Resource.ResourceTypeConstraintsManager.addResourceType(constraintsTypes[i], constraintsMaxSize[i]);

			}
		}

	});
}


module.exports = Resource;