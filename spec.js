describe("core functionality for robot battledome", () => {
	// ROBOT PROTOTYPE CHAIN
	it("should have a base robot function", () => {
		expect(Robot).toBeDefined();
	});
	it("should have a Motorized function as instance of Robot", () => {
		expect(Motorized).toBeDefined();
	});
	it("should have a Bipedal function as instance of Robot", () => {
		expect(Bipedal).toBeDefined();
	});
	it("should have a Supercomputer function as instance of Robot", () => {
		expect(Supercomputer).toBeDefined();
	});
	// BATTLEDOME FUNCTIONALITY
	it("should assign player a new robot type when chooseRobot is called", () => {
		var player0 = new Robot();
		expect(chooseRobot('bender', player0)).toBe("Bender");
	});
	it("should assign player a new weapon when chooseWeapon is called", () => {
		var player0 = new Robot();
		expect(chooseWeapon('lasergun', player0)).toBe("Laser Gun");
	});
	it("should assign player a new modification when chooseMod is called", () => {
		var player0 = new Robot();
		expect(chooseMod('gauntlet', player0)).toBe("Carbon Fiber Gauntlet");
	});
	it("should have a random number function that generates random # between a max and min", () => {
		expect(randomNumber(1, 10)).toMatch('[1-9]|10');
	});
	it("should have a fight function that returns a defender's health after an attack", () => {
		// this test passes when updateBattleground(), clearInterval() are not called inside fight()
		var attacker = new Robot();
		attacker.type = new C3PO();
		attacker.weapon = new Mayonnaise();
		attacker.modification = new InvisibilityCloak();
		var defender = new Robot();
		defender.type = new Hal();
		defender.weapon = new ThrowingStars();
		defender.modification = new RAMUpgrade();
		defender.health = 10;
		expect(fight(attacker, defender)).toBeLessThan(10);
	});
})