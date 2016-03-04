'use strict';

let modOptions = [];

// MODIFICATION PROTOTYPE CHAIN
function Modification (name) {
	this.name = name;
	this.benefit = null;
}

// idea--roll die, if threshold >= rolled #, attack is evaded

function InvisibilityCloak () {
	this.benefit = "evasion";
	this.evasionThreshold = 3;
}

InvisibilityCloak.prototype = new Modification("Invisibility Cloak");

function WheelieShoes () {
	this.benefit = "evasion";
	this.evasionThreshold = 4;
}

WheelieShoes.prototype = new Modification("Wheelie Shoes");

function CarbonFiberGauntlet () {
	this.benefit = "damage";
	this.maxDamageBonus = 3;
	this.minDamageBonus = 1;
}

CarbonFiberGauntlet.prototype = new Modification("Carbon Fiber Gauntlet");


function RAMUpgrade () {
	this.benefit = "damage";
	this.maxDamageBonus = 4;
	this.minDamageBonus = 1;
}

RAMUpgrade.prototype = new Modification("RAM Upgrade");

function ImmunityPotion () {
	this.benefit = "protection";
	this.maxProtection = 3;
	this.minProtection = 1;
}

ImmunityPotion.prototype = new Modification("Immunity Potion");

function TitaniumArmor () {
	this.benefit = "protection";
	this.maxProtection = 5;
	this.minProtection = 1;
}

TitaniumArmor.prototype = new Modification("Titanium Armor");

modOptions.push(InvisibilityCloak, WheelieShoes, CarbonFiberGauntlet, RAMUpgrade, ImmunityPotion, TitaniumArmor);
console.log(modOptions);

