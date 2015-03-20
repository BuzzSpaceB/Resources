
var express = require("express");
var multer = require("multer");
var resources = require("./Resources.js");

var app = express();
var done = false;

app.use(multer(
	{
		dest: './uploads/',
		onFileUploadStart: function (file) 
		{
			console.log(file.originalname + ' is starting ...');
		},
		onFileUploadComplete: function (file)
		{
			resources.uploadResources(file);
			console.log(file.fieldname + ' uploaded to  ' + file.path);
			done=true;
		}
	}
));

app.get('/', function(request, response)
{
      response.sendfile("index.html");
});

app.post('/api/photo',function(req,res)
{
	if(done == true)
	{
		console.log(req.files);
		res.end("File uploaded.");
	}
});

app.listen(3000, function()
{
    console.log("Working on port 3000");
});
