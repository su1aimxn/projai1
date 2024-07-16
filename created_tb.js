var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "WorkloadDB",
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

     //Create Instructor table
     var sqlInstructor = 'CREATE TABLE IF NOT EXISTS Instructor ( ' +
                        'id INT AUTO_INCREMENT PRIMARY KEY, ' +
                       'Instructor_fname VARCHAR(100) NOT NULL, ' +
                        'Instructor_lfname VARCHAR(100) NOT NULL, ' +
                       'Faculty CHAR(100) NOT NULL, ' +
                        'Major VARCHAR(100) NOT NULL, ' +
                       'password VARCHAR(255) NOT NULL )';
     con.query(sqlInstructor, function(err, result) {
        if (err) throw err;
        console.log("Table 'Instructor' created");
     });

     //Create Subject table
    var sqlSubject = 'CREATE TABLE IF NOT EXISTS Subject ( ' +
                    'id INT AUTO_INCREMENT PRIMARY KEY, ' +
                    'Subject_id VARCHAR(10) NOT NULL, ' +
                    'Subject_name VARCHAR(100) NOT NULL, ' +
                    'Instructor_lname VARCHAR(100) NOT NULL, ' +
                    'Instructor_fname VARCHAR(100) NOT NULL )' ;
    con.query(sqlSubject, function(err, result) {
        if (err) throw err;
        console.log("Table 'Subject' created");
    });
});
