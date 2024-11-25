const http = require('http');
const url = require('url');
const { getUserById, createUser } = require('../models/userModel');

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const method = req.method;
    const path = parsedUrl.pathname;
    const id = path.split('/')[1];

    if (method === 'GET' && /^\/\d+$/.test(path)) {
        // Route to get user by ID
        try {
            const user = await getUserById(id);
            if (!user) {
                res.statusCode = 404;
                return res.end('User not found');
            }
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(user));
        } catch (err) {
            console.error(err);
            res.statusCode = 500;
            res.end('Server error');
        }
    } else if (method === 'POST' && path === '/') {
        // Route to create a user
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            try {
                const { name, email, password, address } = JSON.parse(body);
                const userId = await createUser(name, email, password, address);
                res.statusCode = 201;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ userId }));
            } catch (err) {
                console.error(err);
                res.statusCode = 500;
                res.end('Server error');
            }
        });
    } else {
        res.statusCode = 404;
        res.end('Not found');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
