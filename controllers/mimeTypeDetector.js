/**
* MimeTypeDetector method for detecting mimeType of a resource
*@param {Oject} file - an object with all the resoucers attributes. 
*/
module.exports.detectMimeType = function(file) {

	if(file.mimetype) {

		return true;

	} else {

		return console.log("Error: Could not detect mimeType");
	}
}
