var express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment');

var app = express();

var tasks = {};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/task/', function (req, res) {
    res.json(tasks);
});

app.get('/api/task/:task', function (req, res) {
    if (!tasks[req.params.task]) {
        tasks[req.params.task] = {};
    }

    res.json(tasks[req.params.task]);
});

app.post('/api/task/:task/', function (req, res) {
    tasks[req.params.task] = {
        'Diaper': generateSubtask(moment.duration)
    };

    res.send();
});

app.post('/api/task/:task/subtask/', function (req, res) {
    console.log(req.body);

    if (!tasks[req.params.task]) {
        tasks[req.params.task] = {};
    }

    tasks[req.params.task][req.body.Name] = req.body;

    res.send();
});

app.use(express.static('wwwroot'));

var server = app.listen(4321, function() {
    console.log("Started!");
});

function generateSubtask(secondsTotal) {
    return {
        targetTime: moment().add(secondsTotal, 'seconds')
    };
}
