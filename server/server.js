var express = require('express');

var app = express();

var tasks = {};

app.get('/api/task/:task', function (req, res) {
    if (!tasks[req.params.task]) {
        tasks[req.params.task] = {};
    }

    res.json(tasks[req.params.task]);
});

app.post('/api/task/:task/subtask', function (req, res) {
    if (tasks[req.params.task]) {
    } else {
    }

    res.send();
});

app.use(express.static('wwwroot'));

var server = app.listen(4321, function() {
    console.log("Started!");
});
