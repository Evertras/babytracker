var express = require('express');

var app = express();

app.get('/api/', function (req, res) {
    res.send("Hi");
});

app.use(express.static('wwwroot'));

var server = app.listen(4321, function() {
    console.log("Started!");
});
