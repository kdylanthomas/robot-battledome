'use strict';

let robotOptions = [];

// ROBOT PROTOTYPE CHAIN

function Robot (type) {
	this.type = type;
	this.modification = null;
	this.weapon = null;
	this.health = 0;
}

// Motorized Robots
function Motorized (name) {
	this.name = name;
}
Motorized.prototype = new Robot("Motorized");

function R2D2 () {
	// health between 50-80
	this.initialHealth = Math.floor(Math.random() * (81 - 50) + 50);
}
R2D2.prototype = new Motorized("R2D2");

function WallE () {
	// health between 55-70
	this.initialHealth = Math.floor(Math.random() * (71 - 55) + 55);
}
WallE.prototype = new Motorized("Wall-E");


// Bipedal Robots
function Bipedal (name) {
	this.name = name;
}
Bipedal.prototype = new Robot("Bipedal");

function Bender () {
	// health between 40-70
	this.initialHealth = Math.floor(Math.random() * (71 - 40) + 40);

}
Bender.prototype = new Bipedal("Bender");

function C3PO () {
	// health between 60-90
	this.initialHealth = Math.floor(Math.random() * (91 - 60) + 60);

}
C3PO.prototype = new Bipedal("C3PO");


// Supercomputer Robots
function Supercomputer (name) {
	this.name = name;
}
Supercomputer.prototype = new Robot("Supercomputer");


function Watson () {
	// health between 55-85
	this.initialHealth = Math.floor(Math.random() * (96 - 55) + 55);
}
Watson.prototype = new Supercomputer("Watson");

function Hal () {
	// health between 45-75
	this.initialHealth = Math.floor(Math.random() * (76 - 45) + 45);
}
Hal.prototype = new Supercomputer("HAL");


robotOptions.push(R2D2, WallE, Bender, C3PO, Watson, Hal);

console.log(robotOptions);
