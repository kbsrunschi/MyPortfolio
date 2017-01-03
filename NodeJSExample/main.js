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
eventEmitter.on('connection1', connectHandler);

// bind data_Received wit anon fn
eventEmitter.on('data_received', function() {
    console.log("Data received successfully");
});

eventEmitter.emit("connection1");


// events

//listener #1
var listener1 = function listener1() {
    console.log("listener 1 executed")
}

// listener 2
var listener2 = function listener2() {
    console.log("listener 2 executed");
}

//bind connection to event 
eventEmitter.addListener('connection', listener1);

eventEmitter.on('connection', listener2);

var eventListeners = require('events').EventEmitter.listenerCount(eventEmitter, 'connection');

console.log(eventListeners + " Listener(s) listening to connection event");

// fire connection
eventEmitter.emit('connection');

eventEmitter.removeListener('connection', listener1);

eventEmitter.emit('connection');

eventListeners = require('events').EventEmitter.listenerCount(eventEmitter, 'connection');
console.log(eventListeners + " Listner(s) listening to connection event");

// buffer
//10 octets
var buf = new Buffer(10);

//option encoding
// var buf = new Buffer("Simply Easy Learning", "utf-8");
// buf.toString([encoding][, start][, end])

buf = new Buffer(256);
len = buf.write("Simply Easy Learning");

console.log("Octets written : " + len);


var buffer1 = new Buffer('ABC');
var buffer2 = new Buffer('ABCD');
var result = buffer1.compare(buffer2);

if (result < 0) {
    console.log(buffer1 + " comes before " + buffer2);
} else if (result == 0) {
    console.log(buffer1 + " is same as " + buffer2);
} else {
    console.log(buffer1 + " comes after " + buffer2);
}



console.log("Program Ended");