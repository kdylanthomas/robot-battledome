'use strict';

let weaponOptions = [];

// WEAPON PROTOTYPE CHAIN
function Weapon (name) {
	this.name = name;
	this.damage = 0;
}

// rewrite specific weapons into prototypes??

// set laserGun damage to 5-8
function LaserGun () {
	this.maxDamage = 8;
	this.minDamage = 5;
}

LaserGun.prototype = new Weapon("Laser Gun");

// set electricBoomerang damage to 2-9
function ElectricBoomerang () {
	this.maxDamage = 9;
	this.minDamage = 2;
}

ElectricBoomerang.prototype = new Weapon("Electric Boomerang");


// set electricBoomerang damage to 2-8
function ThrowingStars () {
	this.maxDamage = 8;
	this.minDamage = 2;
}

ThrowingStars.prototype = new Weapon("Carbon Fiber Throwing Stars");


// set flamethrower damage to 5-11
function Flamethrower () {
	this.maxDamage = 11;
	this.minDamage = 5;
}

Flamethrower.prototype = new Weapon("Flamethrower");

// set giant magnet damage to 8-10
function GiantMagnet () {
this.maxDamage = 10;
this.minDamage = 8;
}

GiantMagnet.prototype = new Weapon("Giant Magnet");

// set mayo damage to 3-15

function Mayonnaise () {
	this.maxDamage = 16;
	this.minDamage = 3;
}

Mayonnaise.prototype = new Weapon("Mayonnaise");

weaponOptions.push(LaserGun, ElectricBoomerang, ThrowingStars, Flamethrower, GiantMagnet, Mayonnaise);
console.log(weaponOptions);