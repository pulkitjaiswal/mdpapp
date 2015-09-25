var socket = require('./socket');

var robot = function(host, port, decoder){

	//If no decoder is assigned, simply print message out
	if(!decoder){
		decoder = function(data){
			console.log("Received data: " + data);
		}
	}

	var soc = new socket(host, port, decoder);

	this.moveForward = function(cm){
		soc.write("RPMF" + cm);
	}

	this.moveBackward = function(cm){
		soc.write("RPMB" + cm);
	}

	this.turnLeft = function(deg){
		soc.write("RPTL" + deg);
	}

	this.turnRight = function(deg){
		soc.write("RPTR" +deg);
	}

	this.getTelemetry = function(){
		soc.write("RPTM");
	}
}

module.exports = robot;

/*
var encoder = require('./encoder');
var robot = new encoder("192.168.21.1", 3001);
*/