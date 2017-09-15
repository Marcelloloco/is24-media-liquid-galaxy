var http = require('http');
var fs = require('fs');
var respBody = fs.readFileSync('resp.json');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(respBody);
}).listen(9615);
