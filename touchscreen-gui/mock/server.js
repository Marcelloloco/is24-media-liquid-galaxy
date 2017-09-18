var http = require('http');
var fs = require('fs');
var respBody = fs.readFileSync('resp.json');


http.createServer(function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');

  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(respBody);
}).listen(9615);
