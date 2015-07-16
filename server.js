/*
var http = require('http');
var ecstatic = require('ecstatic');

http.createServer(
  ecstatic({ root: __dirname })
).listen(8080);

console.log('Listening on :8080');

*/

/*
var app = require('express')();
var http = require('http').Server(app);
var express = require('express');
*/

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require('express');


app.use(express.static('./'));


http.listen(3000, function(){
  console.log('listening on *:3000');
});
