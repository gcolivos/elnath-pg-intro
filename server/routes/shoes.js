var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

router.get('/', function (req, res) {
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

router.post('/', function (req, res) {
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
            client.query(`INSERT INTO shoes (name, cost)
            VALUES ($1, $2);`, [req.body.name, req.body.cost], function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        //query failed. Did you test it in Postico?
                        //Log the error
                        console.log('Error making query', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(201)
                    }
                });

        }
    });
});;

router.get('/all', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            //there was an error connecting to the database
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        }
        else {
            //We connected to the database!!
            //Now we are going to GET things from the DB
            client.query(`SELECT * FROM shoes`, [req.body.name, req.body.cost], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    //query failed. Did you test it in Postico?
                    //Log the error
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201)
                }
            });

        }
    });
});;

router.delete('/:id', function (req, res) {
    var shoeIdToRemove = req.params.id;
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
            client.query(`DELETE FROM shoes WHERE id=$1;`, [shoeIdToRemove], function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        //query failed. Did you test it in Postico?
                        //Log the error
                        console.log('Error making query', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(201)
                    }
                });

        }
    });
});;

router.put('/:id', function (req, res) {
    var shoeIdToSave = req.params.id;
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
            client.query(`UPDATE shoes SET name = 'Moon Boots' WHERE id=$1;`, [shoeIdToSave], function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        //query failed. Did you test it in Postico?
                        //Log the error
                        console.log('Error making query', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(201)
                    }
                });

        }
    });
});;

module.exports = router