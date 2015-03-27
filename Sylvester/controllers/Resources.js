var mongoose = require('mongoose');
var ResourcesModel = require('../models/Resources');
var fs = require("fs");
var ObjectId = require('mongodb').ObjectID;

var MimeTypeDetector = {}; //MimeTypeDetector object
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
}

/**
*Resource method for uploading resources in the mongo database
*@param {Oject} file - an object with all the resoucers attributes. 
*@param {String} disc - the description of the resource. 
*/
Resource.uploadResource = function(file, desc) {


	if(MimeTypeDetector.detectMimeType(file)) {

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
		
		fs.unlinkSync(file.path);
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

				} else {

					console.log("Done downloading Resource");
				}
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
Resource.ResourceTypeConstraintsManager.addResourceType = function() {

}

module.exports = Resource;