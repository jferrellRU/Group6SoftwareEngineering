const mysql = require('mysql2');

// Database connection pool
const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'mydatabase',
    multipleStatements: true // Allow multiple statements (for schema.sql import)
});


connection.connect(error => {
    if (error) {
        console.error('Error connecting to the database:', error.stack);
        return;
    }
    console.log('Connected to the database as id ' + connection.threadId);
});

module.exports = db.promise(); // Use promises for async/await
