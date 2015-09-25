var virtualInterface = function(){
	var virtualMap = [];
	var robotPos = [];
	var robotDir; 
	var counter;

	//If no decoder is assigned, simply print message out
	if(!decoder){
		decoder = function(data){
			console.log("Received data: " + data);
		}
	}

	//Takes in a map descriptor and load map into virtual map
	this.loadMap = function(map){
		//TODO
	}

	//Mobility functions
	this.moveForward = function(){
		//TODO
		//Update robotPos & robotDir
	}

	this.moveBackward = function(){
		//TODO
		//Update robotPos & robotDir
	}

	this.turnRight = function(){
		//TODO
		//Update robotPos & robotDir
	}

	this.turnLeft = function(){
		//TODO
		//Update robotPos & robotDir
	}

	//Returns sensor data after 1 cycle
	this.getTelemetry = function(){
		var telemetry;

		//TODO
		//Insert computation of telemetry from robotPos, robotDir & virtualMap
		//Then encode according to standards specified by the document

		//Simulate a asynchronous return of telemetry results from the robot
		process.nextTick(function(){
			decoder(telemetry);
		});
	}

	//Display map in console
	this.printMap = function(){
		//TODO
		//Debugging function to see map in console
	}

	//Initialise virtualMap
	this.init = function(mapDescriptor, robot, xPos, yPos, dir){
		this.loadMap(mapDescriptor);
		Robot = robot;
		robotPos = [xPos, yPos];
		robotDir = dir;
		this.printMap();
	}
}

module.exports = virtualInterface;