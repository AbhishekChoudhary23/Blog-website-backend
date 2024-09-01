const mysql = require('mysql2');
require('dotenv').config();

// -----------------------------    Connecting with Database     -----------------------------
const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE
})

// -----------------------------    Query Function     -----------------------------
const queryFn = (sql, params) => {
    return new Promise((resolve, reject) => {
        con.query(sql, params, (err, results) => {
            if (err) {
                return reject(err); // Reject the promise with the error
            }
            resolve(results); // Resolve the promise with the results
        });
    });
};

module.exports = queryFn;