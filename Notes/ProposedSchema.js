var resourceSchema = new Schema({

	resourceID: Number,	
	userID: String,
	resourceName: String,
	resourceDescription: String,
	mimeType: String,
	fileSize: Number,
	uploadDate: Date.now
	lastViewed: Date
	resourceURL: String,
	filePath: String
});
