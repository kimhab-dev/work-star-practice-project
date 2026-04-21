const mysql = require('mysql2/promise');
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Kdamprai@17',
    database: 'workstar_db'
});

module.exports = db;