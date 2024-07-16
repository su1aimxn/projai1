'use strict';

const express = require('express');
const crypto = require('crypto');
const wrRoute = express.Router();
const connection = require('../db');

// Helper function to hash password
function hashPassword(password) {
    return crypto.createHash('md5').update(password).digest('hex');
}

// Route to update instructor
wrRoute.put('/instructor/:id', function (req, res, next) {
    let mypass = req.body.password ? hashPassword(req.body.password) : undefined;

    connection.execute(`
        UPDATE instructor
        SET Instructor_fname = ?, Instructor_lfname = ?, Faculty = ?, Major = ?, password = ?
        WHERE id = ?;`, 
        [req.body.Instructor_fname, req.body.Instructor_lfname, req.body.Faculty, req.body.Major, mypass, req.params.id])
        .then(() => {
            console.log('Update successful');
            res.status(200).send('Update Successful!');
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error updating data');
        });
});

// Route to delete instructor
wrRoute.delete('/instructor/:id', function (req, res, next) {
    connection.execute(`
        DELETE FROM instructor
        WHERE id = ?;`, 
        [req.params.id])
        .then(() => {
            console.log('Delete successful');
            res.status(200).send('Delete Successful!');
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error deleting data');
        });
});





// Route to update subject
wrRoute.put('/subject/:id', function (req, res, next) {
    connection.execute(`
        UPDATE subject
        SET Subject_id = ?, Subject_name = ?, Instructor_fname = ?, Instructor_lname = ?
        WHERE id = ?;`, 
        [req.body.Subject_id, req.body.Subject_name, req.body.Instructor_fname, req.body.Instructor_lname, req.params.id])
        .then(() => {
            console.log('Update successful');
            res.status(200).send('Update Successful!');
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error updating data');
        });
});

// Route to delete subject
wrRoute.delete('/subject/:id', function (req, res, next) {
    connection.execute(`
        DELETE FROM subject
        WHERE id = ?;`, 
        [req.params.id])
        .then(() => {
            console.log('Delete successful');
            res.status(200).send('Delete Successful!');
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error deleting data');
        });
});

module.exports = wrRoute;
