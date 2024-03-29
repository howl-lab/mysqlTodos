//where our stuff will come from 
// connection to database
// use promise, easier for database stuff
require('dotenv').config();
const mysql = require('mysql2');

// let connection be undefined bc scoping
let connection;

// check if environmental variable exist
// credential change between production (to Heroku) and development
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  }).promise();
} else {
  connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'todos_db',
  }).promise();
}


module.exports = connection;