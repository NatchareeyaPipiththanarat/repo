const http = require('http');
const hostname = 'localhost';
const port = 3000;
const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');

        if (req.url === '/about'){
            req.end('About Page\n')
        }else if(req.url === '/contact'){
            req.end('Contact Page\n')
        }else{
            res.end('Hello, World!\n');
        }

});

server.listen(port, hostname,() => {
    console.log(`Server running at http://${hostname}:${port}/`)
});