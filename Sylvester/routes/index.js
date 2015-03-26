var express = require('express');
var multer = require("multer");
var router = express.Router();
var mongoose = require('mongoose');
var ResourcesModel = require('../models/Resources');
var ResourceController = require('../controllers/Resources');

var done = false;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Upload Resource' });
});

router.get('/viewResources', function(req, res, next) {

	var page = "</h1>Uploaded Resources</h1>";

  	ResourcesModel.find(function (err, items) {

  		if(err) return console.log("Error viewing Resources");
  		else {

  			page += "<table>"
  						+"<thead>"
                    		+"<th>Resource Name</th>"
                    		+"<th> Resource</th>"
                    	+"</thead>"

                    	+"<tbody>";
  			for(i=  0; i < items.length; i++) {

  					page += "<tr>";
  					page += "<td>" + items[i].plainText + "</td>";


					ResourceController.downloadResource(items[i].plainText);

  					if(items[i].mimeType.substring(0, 5) == "image") {

  						page += "<td><img width='250' height='150' src='/downloads/" + items[i].plainText + "'/></td>";
  					} else {
  						page += "<td><a href='/downloads/" + items[i].plainText + "'>"+ items[i].plainText +"</a></td>";
  					}
  					
  					page += "</tr>";
  			}

  			page += "</tbody></table>";
  		}
        
        res.send(page);
    });
});

router.use(multer(
	{
		dest: './uploads/',
		onFileUploadStart: function (file) 
		{
			console.log(file.originalname + ' is starting ...  ' + file.path);
		},
		onFileUploadComplete: function (file)
		{
			ResourceController.uploadResource(file);
			console.log(file.fieldname + ' uploaded to  ' + file.path);
			done=true;
		}
	}
));

router.post('/uploadResource', function(req, res, next) {

	if(done == true)
	{
		res.location("./viewResources");
		res.redirect("./viewResources");
	}
});

router.post('/search', function(req, res, next) {

	ResourceController.findResources(req.body.query);

});

router.post('/download', function(req, res, next) {

	ResourceController.downloadResource(req.body.getdoc);

	res.location("./");
	res.redirect("./");

});

module.exports = router;
