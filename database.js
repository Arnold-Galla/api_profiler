const mysql = require("mysql");

const connection = mysql.createConnection({
    database: 'profilerdb',
    user: 'root',
    password: '1234'
});

if (process.env.NODE_ENV == "production") {
    connection.socketPath = process.env.GAE_DB_SOCKET;
} else {
    connection.host = '34.101.238.214';
}

module.exports = connection;