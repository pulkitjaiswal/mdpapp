// Invoke 'strict' JavaScript mode
'use strict';

// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load the module dependencies
var mongoose = require('./config/mongoose'),
	express = require('./config/express'),
	passport = require('./config/passport');

// Create a new Mongoose connection instance
var db = mongoose();

// Create a new Express application instance
var app = express();

// Configure the Passport middleware
var passport = passport();

// Use the Express application instance to listen to the '3000' port
app.listen(3000);

// Log the server status to the console
console.log('Server running at http://localhost:3000/');

// Use the module.exports property to expose our Express application instance for external usage
module.exports = app;

//RPI Server
var net = require('net');

var server = net.createServer(function(c){
	console.log('Client Connected!');
	c.on('end', function(){
		console.log('client disconnected');
	});
	c.on('data', function(data){
		var msg = data.toString();
		console.log("RPi Received: " + msg);
	});
	this.write = function(data){
		console.log("Writing to PC: " + data);
		c.write(data);
	};
});

server.listen(3001, function(){
	console.log("Simulated RPi Server started!");
});

module.exports = server;


//Robot controller
//Main program
var physicalRobot = require('./physicalInterface.js');
var virtualRobot = require('./virtualInterface.js');

// 3 Types of environment
// PHYSICAL 	- Real connection with robot
// STAGING 		- Staged connection with simulated server (server.js)
// VIRTUAL 		- Simulated robot with in a virtual environment
var ENVIRONMENT = "PHYSICAL";
var robot;

//Representation of what the algorithm remember of the environment
var map = [];
var robotPos = [];
var robotDir;

//TODO
//Insert algorithm to get the robot to respond to inputs from other devices
var decode = function(instruction){
	console.log("Decoding instructions from algorithm script...");
	console.log(instruction);
	//Decode the instructions for sensor data or android instructions
}

//Anytime here, you can use the function robot.moveForward(10), etc (=

if(ENVIRONMENT=="VIRTUAL"){
	console.log("Algorithm running in simulated environment");
	robot = new virtualRobot();

	//TODO
	//Initialise the virtual environment with a map descriptor and relevant data
	//robot.init(mapDescriptor, robot, xPos, yPos, dir);
}else if(ENVIRONMENT == "PHYSICAL"){
	console.log("Algorithm running in actual environment");
	robot = new physicalRobot("192.168.21.1", 3001, decode);
}else if(ENVIRONMENT == "STAGING"){
	console.log("Algorithm running in staged environment (Attempting to connect to local server.js...)");
	robot = new physicalRobot("127.0.0.1", 3001, decode);
}else{
	console.log("Please configure the environment variable");
}
//Keeps the program alive
//Remove following line if running inside a server
require('net').createServer().listen();

robot.moveForward(20);
