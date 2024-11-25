const fs = require('fs');
const path = require('path');
const db = require('../config/db.config');

const schemaPath = path.join(__dirname, 'schema.sql');

async function initializeDatabase() {
    try {
        const schema = fs.readFileSync(schemaPath, 'utf8');
        await db.query(schema);
        console.log('Database initialized successfully');
    } catch (err) {
        console.error('Error initializing database:', err.message);
    } finally {
        process.exit(); // Exit script after execution
    }
}

initializeDatabase();
