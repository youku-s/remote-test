const http = require('http');
const server = http.createServer(function(req, res) {
   res.writeHead(200, {'ContentType': 'text/plain'});
   res.end('HelloWorld');
});
server.listen(8080); 