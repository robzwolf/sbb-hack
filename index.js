var http = require('http');

var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('Hello, world!');
});
var port = 8080
server.listen(port);
console.log("Listening on http:localhost:" + port)
//
