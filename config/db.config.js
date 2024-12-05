const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

mongoose.set('debug', true);

module.exports = { mongoose, dbURI };
