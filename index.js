var mongoose = require('mongoose')
    , ds = require('DatabaseStuff');

    ds.init(mongoose);

/**
 * Export controllers/Resources
 */

module.exports = require('./controllers/Resources');
