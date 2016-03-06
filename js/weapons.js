'use strict';

// WEAPON PROTOTYPE CHAIN
function Weapon (name) {
	this.name = name;
	this.damage = 0;
}

function LaserGun () {
	this.maxDamage = 8;
	this.minDamage = 5;
}

LaserGun.prototype = new Weapon("Laser Gun");


function ElectricBoomerang () {
	this.maxDamage = 9;
	this.minDamage = 2;
}

ElectricBoomerang.prototype = new Weapon("Electric Boomerang");


function ThrowingStars () {
	this.maxDamage = 8;
	this.minDamage = 2;
}

ThrowingStars.prototype = new Weapon("Throwing Stars");


function Flamethrower () {
	this.maxDamage = 11;
	this.minDamage = 5;
}

Flamethrower.prototype = new Weapon("Flamethrower");


function GiantMagnet () {
this.maxDamage = 10;
this.minDamage = 8;
}

GiantMagnet.prototype = new Weapon("Giant Magnet");


function Mayonnaise () {
	this.maxDamage = 16;
	this.minDamage = 3;
}

Mayonnaise.prototype = new Weapon("Mayonnaise");
