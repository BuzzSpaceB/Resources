var express =  require('express');
// var mongoose = require('mongoose');
var mimeTypeDetector = require('./mimeTypeDetector');
var persistence = require('./persistence');
var resourcesModel = require('../models/Resources');
var resourcesConstraintsModel = require('../models/Resources_Constraints');
var fs = require("fs");


/**
 *Resource method for uploading resources in the mongo database
 *@param {Oject} file - an object with all the resoucers attributes.
 *@param {String} disc - the description of the resource.
 */
module.exports.uploadResource = function (file, desc) {

    if (mimeTypeDetector.detectMimeType(file)) {

        persistence.retrieveResourceTypeConstraints(file.mimetype, function (err, constraints) {

            if (err) {

                console.log("Error getting constraints");

            } else {

                var fSize = (file.size / 1000); // bytes to KB;

                if (constraints != null) {
                    if (fSize > constraints.maxSize) {

                        console.log("Error: reource type constraints not met..");

                    } else {

                        persistence.persistObject(file, desc);
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
module.exports.removeResource = function (r_id) {

    resourcesModel.find({"_id": r_id}).remove(function (err, results) {

        if (err) console.log("Error removing resource");
    });
};

/**
 *Resource method for downloading reources in the mongo database (temp method, for testing).
 *@param {String} name - the name of the resource to be downloaded.
 */
module.exports.downloadResource = function (name) {

    resourcesModel.find({
        "resourceName": name
    }, function (err, results) {

        if (err) {

            return console.log("Error searching...");
        } else {

            fs.writeFile("public/downloads/" + results[0].resourceName, results[0].data, function (err) {

                if (err) {

                    return console.log("Error");

                }
            });
        }
    });

};


/**
 *ResourceTypeConstraintsManager method for adding a type to a resource
 */
module.exports.addResourceType = function (r_type, maxSize) {

    var entry = new resourcesConstraintsModel();
    entry.resourceType = r_type;
    entry.maximumSize = maxSize;

    entry.save(function (err) {

        if (err) {

            console.log("Error: " + err);
        }
    })

};

module.exports.removeResourceType = function (r_type) {

    resourcesConstraintsModel.find({"resourceType": r_type}).remove(function (err, results) {

        if (err) console.log("Error removing resource type");
    });

};

