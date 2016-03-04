// When your user interface first loads, provide the user with buttons so that one specific robot model can be chosen as Player 1.
// Once the user selects a robot model for Player 1, show a button for each weapon that can be added to the robot.
// Once the user selects a weapon for Player 1, show a button for each modification that can be added to the robot.
// Once Player 1 has a modification, provide the user with buttons so that one specific robot model can be chosen as Player 2.
// Once the user selects a robot model for Player 2, show a button for each weapon that can be added to the robot.
// Once the user selects a weapon for Player 2, show a button for each modification that can be added to the robot.
// Once the modification for Player 2 is chosen, the battle begins.
// Each round of battle should determine the amount of damage each robot will do with its weapon.

// That damage should then be adjusted based on the modifications that it has, and what its opponent has.

// Rounds continue until one of the robots has 0, or less than 0, health.

// When the battle is over display the outcome to the user. For example...

'use strict';

let player1 = new Robot();
let player2 = new Robot();
let P1Health;
let P2Health;
let battleTimer;
let evasionPoints;
let extraDamage;
let protectionPoints;
// EVENTS


// Robot Buttons -- load page w/ robot selection view
$('#robot-selection').show();
$('#robot-selection').siblings().hide();
$('.robot').on('click', function(e) {
	let choice = e.target.id;
	if (!player1.type) {
		chooseRobot(choice, player1);
	} else if (player1.type && !player2.type) {
		chooseRobot(choice, player2);
	}
});

// Choose a Weapon -- show weapon selection view
$('#choose-weapon').on('click', function(e) {
	console.log("player1 in submit", player1);
	if (player1.type) {
		console.log("you can move on!");
		$('#weapon-selection').show();
		$('#weapon-selection').siblings().hide();
	} else {
		console.log("you didn't choose a robot yet");
	}
})

// Weapon Buttons
$('.weapon').on('click', function(e) {
	let choice = e.target.id;
	if (!player1.weapon) {
		chooseWeapon(choice, player1);
	} else if (player1.weapon && !player2.weapon) {
		chooseWeapon(choice, player2);
	}
});

// Choose A Mod -- show modification selection view
$('#choose-mod').on('click', function(e) {
	if (!player1.weapon && !player2.weapon) {
		console.log("you didn't choose a weapon yet");
	} else {
		$('#mod-selection').show();
		$('#mod-selection').siblings().hide();
		if (player1.weapon && player2.weapon) {
			$('#define-player2').hide();
			$('#begin-battle').show();
		} else {
			$('#begin-battle').hide();
			$('#define-player2').show();
		}
	}
});

// Mod Buttons
$('.mod').on('click', function(e) {
	console.log("clicked");
	let choice = e.target.id;
	if (!player1.modification) {
		chooseMod(choice, player1);
	} else if (player1.modification && !player2.modification) {
		chooseMod(choice, player2);
	}
});

// Define Player 2 -- revert to robot selection view
$('#define-player2').on('click', function() {
	$('#robot-selection').show();
	$('#robot-selection').siblings().hide();
})

// Begin Battle -- show battle view
$('#begin-battle').on('click', function(e) {
	if (player1.modification && player2.modification) {
		$('#battle-view').show();
		$('#battle-view').siblings().hide();
		formatCard(player1);
		formatCard(player2);
		player1.health = player1.type.initialHealth;
		P1Health = player1.health;
		player2.health = player2.type.initialHealth;
		P2Health = player2.health;
		updateBattleground(`<p>Let the battle begin!</p>`);
		battleTimer = window.setInterval(() => {
			trackBattle(player1, player2)
		}, 3000);
	} else {
		console.log("you didn't choose a modification yet");
	}
})

// BATTLEDOME


// Battle function
function trackBattle (P1, P2) {
	P2Health = fight(P1, P2);
	$('#player2 .health').html(`Health: ${P2Health}`);
	// change P2 health html
	if (P2Health > 0) {
		let P2battle = window.setTimeout(() => {
		P1Health = fight(P2, P1);
		$('#player1 .health').html(`Health: ${P1Health}`);
		}, 1500);
	}
}

function fight (attacker, defender) {
	let output = "";
	// MANAGE MODIFICATIONS
	if (attacker.modification.benefit === "damage") {
		extraDamage = randomNumber(attacker.modification.maxDamageBonus, attacker.modification.minDamageBonus);
		attacker.weapon.damage = randomNumber(attacker.weapon.maxDamage, attacker.weapon.minDamage) + extraDamage;
		output += `<p>${attacker.type.name} used ${attacker.weapon.name} with ${attacker.weapon.damage} damage!</p>`;
		output += `<p>${attacker.type.name} inflicted ${extraDamage} extra damage on the attack!</p>`;
	} else {
		attacker.weapon.damage = randomNumber(attacker.weapon.maxDamage, attacker.weapon.minDamage);
		output += `<p>${attacker.type.name} used ${attacker.weapon.name} with ${attacker.weapon.damage} damage!</p>`;
	}
	switch (defender.modification.benefit) {
		case "evasion":
			// Roll 6-sided die, compare to evasionThreshold. If dice roll > threshold, defender evades attack
			let diceRoll = randomNumber(0, 7);
			if (diceRoll >= defender.modification.evasionThreshold) {
				output += `<p>${defender.type.name} evaded the attack!</p>`;
			} else {
				defender.health -= attacker.weapon.damage;
				output += `<p>${defender.type.name} was reduced to ${defender.health}!</p>`;
			}
			break;
		case "protection":
			// Calculate random protectionPoints between min and max, subtract that from attacker damage
			protectionPoints = randomNumber(defender.modification.maxProtection, defender.modification.minProtection);
			console.log("protectionPoints", protectionPoints);
			defender.health -= attacker.weapon.damage - protectionPoints;
			output += `<p>${defender.type.name} avoided ${protectionPoints} damage!</p>`;
			output += `<p>${defender.type.name} was reduced to ${defender.health}!</p>`;
			break;
		case "damage":
			// No benefit for defender, only attacker
			defender.health -= attacker.weapon.damage;
			output += `<p>${defender.type.name} was reduced to ${defender.health}!</p>`;
			break;
	}
	console.log(defender.modification.benefit);
	if (defender.health <= 0) {
		output += `<p>${defender.type.name} was reduced to 0!</p>`;
		output += `<p id="game-over">${defender.type.name} has fainted! ${attacker.type.name} wins the battle.</p>`;
		defender.health = 0;
		window.clearInterval(battleTimer);
	} else {
		output += `<p>. . .</p>`;
	}
	updateBattleground(output);
	return defender.health;
}

function updateBattleground (text) {
	$('#battleground').append(text);
}


function randomNumber (max, min) {
	return Math.floor(Math.random() * (max + 1 - min) + min);
}
// BUILDER FUNCTIONS


// Build robot card
function formatCard (player) {
	let contents = "";
	contents += `<h1>${player.type.name}</h1>`;
	contents += `<img src='' alt='robot pic goes here' />`;
	contents += `<p>WEAPON: ${player.weapon.name}</p>`;
	contents += `<p>MODIFICATION: ${player.modification.name}</p>`;
	contents += `<p>mod benefit goes here</p>`;
	contents += `<p class='health'>Health: ${player.type.initialHealth}</p>`;
	if (player === player1) {
		$('#player1').html(contents);
	} else {
		$('#player2').html(contents);
	}
}



// Define robot
function chooseRobot (choice, player) {
	console.log("choice", choice);
	// console.log("player", player);
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
	};
	console.log(player);
};

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
	};
	console.log(player);
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
	};
	console.log(player);
}

