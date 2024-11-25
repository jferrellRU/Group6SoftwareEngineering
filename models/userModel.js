const db = require('../config/db.config'); // Your database connection

// Fetch a user by ID
const getUserById = async (userId) => {
    const [rows] = await db.query('SELECT * FROM Users WHERE UserID = ?', [userId]);
    return rows[0];
};

// Create a new user
const createUser = async (name, email, password, address) => {
    const [result] = await db.query(
        'INSERT INTO Users (Name, Email, Password, Address) VALUES (?, ?, ?, ?)',
        [name, email, password, address]
    );
    return result.insertId; // Return the new UserID
};

module.exports = { getUserById, createUser };
