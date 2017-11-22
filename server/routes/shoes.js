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
            client.query(`SELECT * FROM SHOES ORDER BY id;`, function (errorMakingQuery, result) {
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
            client.query(`SELECT * FROM shoes ORDER BY id`, [req.body.name, req.body.cost], function (errorMakingQuery, result) {
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
            client.query(`DELETE FROM shoes WHERE id=$1`, [shoeIdToRemove], function (errorMakingQuery, result) {
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
    console.log(req.body);
    var newShoeName = req.body.name;
    var newShoeCost = req.body.cost;
    var shoeIdToSave = req.params.id;
    console.log( shoeIdToSave, newShoeName, newShoeCost);
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
            client.query(`UPDATE shoes SET name = $1, cost = $2 WHERE id= $3;`, [newShoeName, newShoeCost, shoeIdToSave],
            //The $'s match by number to the order of the variables in the array, not to the columns of the table 
            function (errorMakingQuery, result) {
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