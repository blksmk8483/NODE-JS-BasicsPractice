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
    if (url === '/') {
        res.write('<html>');
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">submit username</button></form></body>');
        res.write('</html>');
        return res.end();
    };
    if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/create-user');
                return res.end();
            });
        });
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Usernames</title></head>');
    res.write('<body><h1>My usernames list...</h1></body>');
    res.write('</html>');
    res.end();  
}

module.exports = requestHandler;