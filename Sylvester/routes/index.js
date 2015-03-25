var express = require('express');
var multer = require("multer");
var router = express.Router();

var ResourceController = require('../controllers/Resources');

var done = false;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Upload Resource' });
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
		//console.log(req.files);
		res.location("./users");
		res.redirect("./users");
		res.end("File uploaded.");
	}
});


module.exports = router;
