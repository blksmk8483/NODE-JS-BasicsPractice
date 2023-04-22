const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">submit username</button></form></body>');
        res.write('</html>');
        return res.end();
    };
    if (url === '/users') {
        res.write('<html>');
        res.write('<body><ul>User1</ul><ul>User 2</ul></body>');
        res.write('</html>');
        return res.end();
    };
    if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
        });
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    }
};

module.exports = requestHandler;