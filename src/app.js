'use strict'
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    router = require('./router');

var port = process.env.PORT || 4000;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.listen(port);
console.log("App listening on port", port);

router.initialize(app);
