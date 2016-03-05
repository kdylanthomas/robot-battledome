'use strict';

let player1;
let player2;
let P1Health;
let P2Health;
let evasionPoints;
let extraDamage;
let protectionPoints;
let gameOver = false;

// BUILDER FUNCTIONS

// Define robot
function chooseRobot (choice, player) {
	switch (choice) {
		case "r2d2":
			player.type = new R2D2();
			break;
		case "walle":
			player.type = new WallE();
			break;
		case "c3po":
			player.type = new C3PO();
			break;
		case "bender":
			player.type = new Bender();
			break;
		case "watson":
			player.type = new Watson();
			break;
		case "hal":
			player.type = new Hal();
			break;
		default:
			break;
	}
	return player.type.name;
}

// Define weapon
function chooseWeapon (choice, player) {
	switch (choice) {
		case "lasergun":
			player.weapon = new LaserGun();
			break;
		case "boomerang":
			player.weapon = new ElectricBoomerang();
			break;
		case "throwing-stars":
			player.weapon = new ThrowingStars();
			break;
		case "flamethrower":
			player.weapon = new Flamethrower();
			break;
		case "giant-magnet":
			player.weapon = new GiantMagnet();
			break;
		case "mayo":
			player.weapon = new Mayonnaise();
			break;
		default:
			break;
	}
	return player.weapon.name;
}

// Define modification
function chooseMod (choice, player) {
	switch (choice) {
		case "invisibility-cloak":
			player.modification = new InvisibilityCloak();
			break;
		case "wheelie-shoes":
			player.modification = new WheelieShoes();
			break;
		case "gauntlet":
			player.modification = new CarbonFiberGauntlet();
			break;
		case "ram-upgrade":
			player.modification = new RAMUpgrade();
			break;
		case "immunity-potion":
			player.modification = new ImmunityPotion();
			break;
		case "titanium-armor":
			player.modification = new TitaniumArmor();
			break;
		default:
			break;
	}
	return player.modification.name;
}


// BATTLEDOME FUNCTIONS

function fight (attacker, defender) {
	let output = "";
	let evaded = false;
	attacker.weapon.damage = randomNumber(attacker.weapon.maxDamage, attacker.weapon.minDamage);
	// MANAGE MODIFICATIONS
	// Add bonus damage to attacker if necessary
	if (attacker.modification.benefit === "damage") {
		extraDamage = randomNumber(attacker.modification.maxDamageBonus, attacker.modification.minDamageBonus);
		attacker.weapon.damage += extraDamage;
		output += `<p>${attacker.type.name} used ${attacker.weapon.name} with ${attacker.weapon.damage} damage!</p>`;
		output += `<p>${attacker.type.name} inflicted ${extraDamage} extra damage on the attack!</p>`;
	} else {
		output += `<p>${attacker.type.name} used ${attacker.weapon.name} with ${attacker.weapon.damage} damage!</p>`;
	}
	// Subtract defender's health based on modification
	switch (defender.modification.benefit) {
		case "evasion":
			// Roll 6-sided die, compare to evasionThreshold. If diceRoll > evasionThreshold, defender evades attack
			let diceRoll = randomNumber(1, 7);
			if (diceRoll >= defender.modification.evasionThreshold) {
				evaded = true;
				output += `<p>${defender.type.name} evaded the attack!</p>`;
			} else {
				defender.health -= attacker.weapon.damage;
			}
			break;
		case "protection":
			// Calculate random protectionPoints between min and max, subtract from attacker damage
			protectionPoints = randomNumber(defender.modification.maxProtection, defender.modification.minProtection);
			// Do not allow protection points to be greater than weapon damage from attacker
			protectionPoints = protectionPoints > attacker.weapon.damage ? attacker.weapon.damage : protectionPoints;
			defender.health -= attacker.weapon.damage - protectionPoints;
			output += `<p>${defender.type.name} avoided ${protectionPoints} damage!</p>`;
			break;
		case "damage":
			// No benefit for defender
			defender.health -= attacker.weapon.damage;
			break;
		default:
			break;
	}
	// REPORT DEFENDER'S NEW HEALTH
	if (defender.health <= 0 && protectionPoints !== attacker.weapon.damage) {
		output += `<p>${defender.type.name}'s health was reduced to 0!</p>`;
		output += `<p id="game-over">${defender.type.name} has fainted! ${attacker.type.name} wins the battle.</p>`;
		// adjust defender health if less than 0
		defender.health = 0;
		// tells app.js to show "Play Again" button
		gameOver = true;
		window.clearInterval(battleTimer);
	} else if (protectionPoints === attacker.weapon.damage) {
		output += `<p>${defender.type.name}'s health remained constant.</p>`;
		output += `<p>. . .</p>`;
	} else {
		if (!evaded) {
			output += `<p>${defender.type.name}'s health was reduced to ${defender.health}!</p>`;
		}
		output += `<p>. . .</p>`;
	}
	updateBattleground(output);
	return defender.health;
}


function updateBattleground (text) {
	$('#battleground').append(text);
 	$('#battleground').animate({scrollTop: $('#battleground').prop('scrollHeight')});
}

function randomNumber (max, min) {
	return Math.floor(Math.random() * (max + 1 - min) + min);
}