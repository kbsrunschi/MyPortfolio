var http = require("http");
var express = require('express');
var fs = require("fs");
var events = require("events");

http.createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('You have successfully conected your app');
}).listen(42189);

console.log("Server running at http://127.0.0.1/42189/");

//var data = fs.readFileSync

fs.readFile("input.txt", function(err, data) {
    if (err) {
        console.log(err.stack);
        return;
    }

    console.log(data.toString());
});


var eventEmitter = new events.EventEmitter();
var connectHandler = function connected() {
    console.log("connection successful");

    eventEmitter.emit('data_received');
}

// bind connected event w handler
eventEmitter.on('connection', connectHandler);

// bind data_Received wit anon fn
eventEmitter.on('data_received', function() {
    console.log("Data received successfully");
});

eventEmitter.emit("connection");


console.log("Program Ended");