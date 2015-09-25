var net = require('net');

var socket = function(host, port, writeBack){
	var client = new net.Socket();
	client.setEncoding('utf8');

	console.log("Creating new connection");

	client.connect(port, host, function(){
		console.log("Connected to: " + host  + ":" + port);
	});

	this.write = function(data){
		client.write(data+'\n', function(success){
			console.log("Wrote to socket: " + data);
		});
	}

	this.connect = function(host, port, cb){
		client.connect(port, host, function(){
			console.log("Connected to: " + host  + ":" + port);
			cb(this);
		});
	}

	this.disconnect = function(){
		client.end();
	}

	client.on('data', function(data){
		writeBack(data);
	});
};

module.exports = socket;