var path = require('path');
var express = require('express');
var app = express();

app.use('/', express.static(path.join(__dirname, '../html/')));

var server = app.listen(9000, function () {
    console.log('Server started: http://localhost:%s/', server.address().port);
});
