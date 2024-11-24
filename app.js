const http = require('http');
const routes = require('./routes/routes');
const port = 3000;

const server = http.createServer((req, res) => {
    routes(req, res); // Delegate request to routes
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});