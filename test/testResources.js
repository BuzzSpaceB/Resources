'use strict';
var resources = require("../controllers/Resources"),
persistence = require("../controllers/persistence"), 
mime = require("../controllers/mimeTypeDetector"), 
        request = require("supertest");


describe('Download Resource', function() {

    describe('A. Download valid resource', function() {


        it('Should return nothing if successful!', function(done) {

            var results = resources.downloadResource("mountain.jpg");

            if (results != null)
                results.should.equal("Error");
            done();

        });
    });

    describe('B. Download invalid resource', function() {


        it('Should return an an error!', function(done) {

            var results = resources.downloadResource("mountain5dt.jpg");

            if (results != null)
                results.should.equal("Error");
            done();

        });
    });
});

describe('Resource Types', function() {

    describe('A. Add a new Resource Type', function() {


        it('Should return true if successful!', function(done) {

            var results = resources.addResourceType("image/jpeg", "3000");

            results.should.equal(true);
            done();

        });
    });

    describe('B. Remove a Resource Type', function() {


        it('Should return true if successful!', function(done) {

            var results = resources.removeResourceType("image/jpeg");

            results.should.equal(true);
            done();

        });
    });

    describe('C. Modify a Resource Type', function() {


        it('Should return true if successful!', function(done) {

            var results = resources.modifyResourceType("image/jpeg", "1000");

            results.should.equal(true);
            done();

        });
    });
});

describe('Persistence', function() {

    describe('A. Retrieve Resource Type Constraints', function() {


        it('Should return constraints if successful!', function(done) {

            var results = persistence.retrieveResourceTypeConstraints("image/jpeg");

            results.should.equal(false);
            done();

        });
    });
    
});

 describe('Detect Mime Type', function() {


        it('Should return true if successful!', function(done) {

            var results = mime.detectMimeType("./r/mountain.jpg");

            results.should.equal(false);
            done();

        });
    });