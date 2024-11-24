const mysql = require('mysql');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'mydatabase'
};

const connection = mysql.createConnection(dbConfig);

connection.connect(error => {
    if (error) {
        console.error('Error connecting to the database:', error.stack);
        return;
    }
    console.log('Connected to the database as id ' + connection.threadId);
});

module.exports = connection;