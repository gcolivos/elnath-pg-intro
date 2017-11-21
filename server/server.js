var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var app = express();
var port = 5000;

var shoes = require('./routes/shoes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

app.use ('/shoes', shoes);

// var shoes = [{ name: 'nike', cost: '75' }];

// for localhost:5000/shoes should return array of shoe objects


app.listen(port, function () {
    console.log('server is listening on port', port);
});