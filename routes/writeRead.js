'use strict';

const express = require('express');
const crypto = require('crypto');
const wrRoute = express.Router();
const connection = require('../db');

// Route to insert instructor
wrRoute.post('/instructor', function (req, res, next) {
    let mypass = crypto.createHash('md5').update(req.body.password).digest('hex');
    
    connection.execute(`INSERT INTO instructor
     (Instructor_fname, Instructor_lfname, Faculty, Major, password)
     VALUES (?, ?, ?, ?, ?);`, 
     [req.body.Instructor_fname, req.body.Instructor_lfname, req.body.Faculty, req.body.Major, mypass ])
        .then(() => {
            console.log('Insert successful');
            res.status(201).send('Insert Successful!');
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error inserting data');
        });
});

// Route to insert subject
wrRoute.post('/subject', function (req, res, next) {
    connection.execute(`
        INSERT INTO subject (Subject_id, Subject_name, Instructor_lname, Instructor_fname)
        VALUES (?, ?, ?, ?);`, 
        [req.body.Subject_id, req.body.Subject_name, req.body.Instructor_lname, req.body.Instructor_fname ])
        .then(() => {
            console.log('Insert successful');
            res.status(201).send('Insert Successful!');
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error inserting data');
        });
});

module.exports = wrRoute;
