
var express = require('express');
var path = require('path');

var app = express();
var router = express.Router();

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/debug/index.html'));
});
app.use(express.static(__dirname + '/dist/debug'));


app.listen('5000', () => {
    console.log('Connected to port 5000');
});