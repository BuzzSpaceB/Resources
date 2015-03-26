
var mongoose = require('mongoose');
var ResourcesModel = require('../models/Resources');
var fs = require("fs");


var Resource = {};

Resource.uploadResource = function(file) {


	ResourcesModel.collection.insert({userID: "buzz",
		resourceName: file.name,
		data: fs.readFileSync(file.path),
		resourceDescription: "Buzz Resource",
		plainText: file.originalname,
		mimeType: file.mimetype,
		uploadDate: {type: Date, default: Date.now},
		resourceURL: file.path}, function(err, doc) {

			if(err) console.log("Error inserting record");
			else console.log("Record added");
		});
	
	fs.unlinkSync(file.path);
};

var callback = function(err, re) {

		if(err) return console.log("Error: finding..");
		else {
				console.log(re);
		}
	};

Resource.findResources = function(file) {

	ResourcesModel.find({
		"plainText": file}, callback);

};

Resource.downloadResource = function(file) {

	ResourcesModel.find({
		plainText: file}, function(err, results) {

		if(err) {

			return console.log("Error searching...");
		} else {

			fs.writeFile("public/downloads/" + results[0].plainText, results[0].data, function(err) {

				if(err) {

					return console.log("Error");

				} else {

					console.log("Done downloading Resource");
				}
			});
		}
	});
	
};



Resource.ResourceTypeContraintsManager = {};

Resource.ResourceTypeContraintsManager.addResourceType = function() {

}

module.exports = Resource;