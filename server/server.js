var express = require('express');
var pg = require('pg');
var app = express();
var bodyParser = require('body-parser');

var app = express();
var port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

var config = {
    database: 'shoe_store', //the name of our database
    host: 'localhost', //where is your database (which computer)
    port: 5432, //the port number for your database, 5432 is default
    max: 10, //how many connections at one time
    idleTimeoutMillies: 30000 // 30 seconds to try to connect to our database
}

var pool = new pg.Pool(config); //creating pool of connections to our database, limit 10


// var shoes = [{ name: 'nike', cost: '75' }];

// for localhost:5000/shoes should return array of shoe objects

app.get('/shoes', function (req, res) {
    //attempt to connect to database
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            //there was an error connecting to the database
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        }
        else {
            //We connected to the database!!
            //Now we are going to GET things from the DB
            client.query('SELECT * FROM SHOES;', function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    //query failed. Did you test it in Postico?
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            });

        }
    });
});

app.listen(port, function () {
    console.log('server is listening on port', port);
});