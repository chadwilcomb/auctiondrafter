'use strict'
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    // db  = require('./db'),
    router = require('./router');
    // config = require('../knexfile.js'),
    // env = 'development',
    // knex = require('knex')(config[env]),
    // bookshelf = require('bookshelf')(knex);

// app.set('bookshelf', bookshelf);

var port = 4000;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.listen(port);
console.log("App listening on port", port);

router.initialize(app);
