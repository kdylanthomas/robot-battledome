'use strict';

let robotOptions = [];

// ROBOT PROTOTYPE CHAIN

function Robot (type) {
	this.type = type;
	this.modification = null;
	this.weapon = null;
	this.health = 0;
	this.isEquipped = false;
}

// Motorized Robots
function Motorized (name) {
	this.name = name;
}
Motorized.prototype = new Robot("Motorized");

function R2D2 () {
	this.maxHealth = 80;
	this.minHealth = 60;
	this.image = `img/r2d2.png`;
}
R2D2.prototype = new Motorized("R2D2");

function WallE () {
	this.maxHealth = 70;
	this.minHealth = 55;
	this.image = `img/walle.png`;
}
WallE.prototype = new Motorized("Wall-E");


// Bipedal Robots
function Bipedal (name) {
	this.name = name;
}
Bipedal.prototype = new Robot("Bipedal");

function Bender () {
	this.maxHealth = 70;
	this.minHealth = 40;
	this.image = `img/bender.png`;
}
Bender.prototype = new Bipedal("Bender");

function C3PO () {
	this.maxHealth = 90;
	this.minHealth = 60;
	this.image = `img/c3po.png`;
}
C3PO.prototype = new Bipedal("C3PO");


// Supercomputer Robots
function Supercomputer (name) {
	this.name = name;
}
Supercomputer.prototype = new Robot("Supercomputer");


function Watson () {
	this.maxHealth = 95;
	this.minHealth = 55;
	this.image = `img/watson.png`;
}
Watson.prototype = new Supercomputer("Watson");

function Hal () {
	this.maxHealth = 75;
	this.minHealth = 45;
	this.image = `img/hal.gif`;
}
Hal.prototype = new Supercomputer("HAL");


robotOptions.push(R2D2, WallE, Bender, C3PO, Watson, Hal);

console.log(robotOptions);
