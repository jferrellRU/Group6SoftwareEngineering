const url = require('url');

// Utility to parse the request body
const parseRequestBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            } catch (err) {
                reject(err);
            }
        });
    });
};

const getUsers = (req, res) => {
    // Logic to get users
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Get all users', users: [] })); // Example response
};

const getUserById = (req, res, userId) => {
    // Logic to get user by ID
    if (!userId) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'User ID is required' }));
        return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `Get user with ID: ${userId}` }));
};

const createUser = async (req, res) => {
    try {
        const newUser = await parseRequestBody(req);
        // Logic to create a new user
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User created', user: newUser }));
    } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid request body' }));
    }
};

const updateUser = async (req, res, userId) => {
    try {
        const updatedUser = await parseRequestBody(req);
        // Logic to update user
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: `User with ID: ${userId} updated`, user: updatedUser }));
    } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid request body' }));
    }
};

const deleteUser = (req, res, userId) => {
    // Logic to delete user
    if (!userId) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'User ID is required' }));
        return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `User with ID: ${userId} deleted` }));
};

const requestHandler = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method;

    if (path === '/users' && method === 'GET') {
        getUsers(req, res);
    } else if (path.match(/^\/users\/\w+$/) && method === 'GET') {
        const userId = path.split('/')[2];
        getUserById(req, res, userId);
    } else if (path === '/users' && method === 'POST') {
        createUser(req, res);
    } else if (path.match(/^\/users\/\w+$/) && method === 'PUT') {
        const userId = path.split('/')[2];
        updateUser(req, res, userId);
    } else if (path.match(/^\/users\/\w+$/) && method === 'DELETE') {
        const userId = path.split('/')[2];
        deleteUser(req, res, userId);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Route not found' }));
    }
};

module.exports = requestHandler;
