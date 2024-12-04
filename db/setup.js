const mongoose = require('mongoose');
const dbConfig = require('../config/db.config');

async function initializeDatabase() {
    try {
        await mongoose.connect(dbConfig.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected successfully');

        // Define your models and initialize collections here
        // Example:
        // const User = mongoose.model('User', new mongoose.Schema({ name: String }));
        // await User.createCollection();

        console.log('Database initialized successfully');
    } catch (err) {
        console.error('Error initializing database:', err.message);
    } finally {
        mongoose.connection.close(); // Close the connection after execution
    }
}

initializeDatabase();
