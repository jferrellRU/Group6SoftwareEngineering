const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const dbURI = process.env.MONGODB_URI;
console.log(dbURI);

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

module.exports = { mongoose, dbURI };
