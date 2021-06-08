class cEleCC {
	//--------------------------------------------------------------------------------------------------------------
	// Fields
	name =  '';
	self =  {};
	// setInterval Timer ID
	Timers = {
		'Init':         0,
		'SecTimer':     0,
		'BigCookie':    0,
		'SellGodzamok': 0,
		'AutoBuyZ':     0,
		'ReRollGarden': 0,
		'GardenJuicer': 0,
		'ReRollSugar':  0
	};
	// On/Off/Start/Stop Flags
	Flags = {
		'Golden':       false,
		'GSwitch':      false,
		'BuyEP':        false,
		'Fortune':      false,
		'Dragon':       false,
		'Wrinkler':     false,
		'ReRollSugar':  false,
		'AutoCastT':    false,
		'AutoCast1':    false,
		'AutoCast2':    false,
		'AutoBuyZ':     false,
		'SellGodzamok': false,
		'Gardener':     false,
		'GardenJuicer': false,
		'AutoJuicer':   false
	};
	// Game objects
	oLocalMath =             {};
	// 1Sec Timer couunt
	nSecCount =              0;
	// Garden Setting
	oGardenSetting =         {};
	oGardenReRollSet =       {};
	sGardenReRollExp =       '';
	aGardenEffect =          ['goldenClover', 'keenmoss', 'nursetulip', 'tidygrass', 'everdaisy', 'elderwort', 'whiskerbloom'];
	aGardenDrop =            ['bakerWheat', 'bakeberry', 'ichorpuff', 'greenRot', 'duketater', 'drowsyfern', 'queenbeetLump'];
	// for Sell Godzamok
	nSellGodzamokCnt =       0;
	oSellGodzamokAmount =    {};
	nSellGodzamokBeforeAmt = 0;
	// Excluded: Has Minigame, Has Synergy effect to Fractal/Javascript/Idleverse
	aSellGodzamokTarget =    ['Mine', 'Factory', 'Shipment', 'Alchemy lab', 'Time machine', 'Antimatter condenser'];
	nSellGodzamokFreq =      5;
	// for Click Dragon
	aClickDragonHasCheck =   ['Dragon scale', 'Dragon claw', 'Dragon fang', 'Dragon teddy bear'];
	// for Click Fortune
	aClickFortuneHasCheck =  [
		'Fortune #001','Fortune #002','Fortune #003','Fortune #004','Fortune #005','Fortune #006','Fortune #007','Fortune #008','Fortune #009','Fortune #010',
		'Fortune #011','Fortune #012','Fortune #013','Fortune #014','Fortune #015','Fortune #016','Fortune #017',
		'Fortune #100','Fortune #101','Fortune #102','Fortune #103','Fortune #104'
	];
	// for Auto Cast(2)
	// Excluded: Wizard tower (Manabloom)
	aAutoCastTarget =        ['High-five', 'Congregation', 'Luxuriant harvest', 'Ore vein', 'Oiled-up', 'Juicy profits', 'Fervent adoration', 'Delicious lifeforms', 'Breakthrough', 'Righteous cataclysm', 'Golden ages', 'Extra cycles', 'Solar flare', 'Winning streak', 'Macrocosm', 'Refactoring', 'Cosmic nursery'];
	// for Auto-Buy PlanZ
	// Excluded: Wizard tower (keep amounts for magic meter)
	nBuyZWishRate =          1.5;
	nBuyZUpgradeRate =       1.2;
	aBuyZTarget1 =           ['Fractal engine', 'Idleverse'];
	nBuyZTarget1Rate =       1.2;
	aBuyZTarget2 =           ['Cursor', 'Grandma', 'Portal', 'Prism', 'Javascript console'];
	nBuyZTarget2Rate =       1.5;
	aBuyZTarget3 =           ['Farm', 'Bank', 'Temple', 'Chancemaker'];
	nBuyZTarget3Rate =       3;
	// For Garden Juicer
	nGardenJuicerFreqMain   = 1000 * 5;
	nGardenJuicerFreqReRoll =  300;
	nGardenNextStep         =    0;
	oGardenJuicerSet        = {};
	sGardenJuicerExp        = '';
	nGardenJuicerReRollCnt  = 0;
	aGardenJuicerTarget     = ['queenbeetLump', 'everdaisy', 'drowsyfern', 'duketater'];
	nGardenJuicerQBrange    = 7;
	// For Auto Garden Juicer
	bAutoJuicerReRoll       = false;
	// For Sugar auto harvest
	nSugarDesire            = 0;
	sSugarExp               = '';
	bRigidel                = false;
	nRigidelSell            = 0;
	nPrevGod                =  -1;
	sRigidelSell            = 'Mine';
	//--------------------------------------------------------------------------------------------------------------
	// Functions
	// Initialize
	constructor(myname, init) {
		self = this;
		name = myname;
		if (init) {
			// Hide topBar
			document.getElementById('topBar').style.display = 'none';
			document.getElementById('game').style.top       = 0;
			// Block ADs
			//document.getElementById('aqad').style.display = 'none';
			// Change NewsTicker font size
			document.getElementById('commentsText'     ).style.fontSize = '8pt';
			document.getElementById('commentsTextBelow').style.fontSize = '8pt';
			// Initialize
			self.oLocalMath = Object.create(Math);
			// Init timer
			self.TimerStart('Init');
		}
	}
	EleCCInitTimer() {
		if (Game.Win && Game.Notify) {
			// Init objects
			// I'm Third-party!
			Game.Win('Third-party');
			// Stop Init timer
			self.TimerStop('Init');
			// Start 1Sec Timer
			self.TimerStart('SecTimer');
			// Welcome message
			self.Notify('Hello.', false);
		}
	}
	//--------------------------------------------------------------------------------------------------------------
	// Timer
	TimerStart(name) {
		let func;
		let freq;
		switch (name) {
			case 'Init':         func = self.EleCCInitTimer;    freq =  500; break;
			case 'SecTimer':     func = self.SecTimer;          freq =  500; break;
			case 'BigCookie':    func = Game.ClickCookie;       freq =    4; break;
			case 'SellGodzamok': func = self.SellGodzamokTimer; freq = self.nSellGodzamokFreq; break;
			case 'AutoBuyZ':     func = self.BuyZ;              freq = 1000; break;
			case 'ReRollGarden': func = self.ReRollGardenTimer; freq =  300; break;
			case 'ReRollSugar':  func = self.ClickSugarTimer;   freq =  500; break;
		}
		if (func) {
			func();
			if(self.Timers[name] == 0) self.Timers[name] = setInterval(func, freq);
		}
	}
	TimerStop(name) {
		if (self.Timers[name] > 0) {
			clearInterval(self.Timers[name]);
			self.Timers[name] = 0; 
		}
	}
	//--------------------------------------------------------------------------------------------------------------
	// Log,popup,notify
	Notify(message, persist) {
		Game.Notify('Ele-CC ' + (persist ? 'report' : 'info'), message, 0, (persist ? 0 : 7));
	}
	//--------------------------------------------------------------------------------------------------------------
	// 1Sec Timer
	SecTimer() {
		self.nSecCount = (self.nSecCount + 1) % 7200;
		if (self.Flags['Golden'])                                   self.ClickCookieGolden();
		if (self.Flags['GSwitch'])                                  self.ClickGoldenSwitch();
		if ((self.nSecCount % 2   == 0) && self.Flags['BuyEP'])     self.BuyEP();
		if ((self.nSecCount % 2   == 0) && self.Flags['Fortune'])   self.ClickFortune();
		if ((self.nSecCount % 2   == 0) && self.Flags['Dragon'])    self.ClickDragon();
		if ((self.nSecCount % 2   == 0) && self.Flags['Wrinkler'])  self.ClickWrinkler();
		if ((self.nSecCount % 2   == 0) && self.Flags['AutoCastT']) self.ClickSpellCheckTimer();
		if  (self.nSecCount % 120 == 0) {
			if (self.Flags['Gardener']) {
				self.ClickGardener();
			} else if (Object.keys(self.oGardenSetting).length) {
				self.oGardenSetting = {};
			}
		}
		if ((self.nSecCount % 120 == 0) && (self.Flags['ReRollSugar']) && Game.canLumps() && (self.Timers['SellGodzamok'] == 0) && (self.Timers['AutoBuyZ'] == 0) && (self.Timers['ReRollGarden'] == 0) && (self.nGardenJuicerReRollCnt == 0) && (self.Timers['ReRollSugar'] == 0)) {
			let age = Date.now() - Game.lumpT;
			if ((age >= Game.lumpMatureAge) && (age < Game.lumpRipeAge)) {
				// Sugar type check
				switch (Game.lumpCurrentType) {
					case 1:  self.nSugarDesire = 2; break; // bifurcated
					case 2:  self.nSugarDesire = 7; break; // golden
					case 3:  self.nSugarDesire = 2; break; // meaty
					case 4:  self.nSugarDesire = 3; break; // caramelized
					default: self.nSugarDesire = 1;
				}
				self.nSugarDesire += Game.lumps;
				// Rigidel check
				self.bRigidel     =  false;
				self.nRigidelSell =  0;
				self.nPrevGod     =  -1;
//				let oPantheon = Game.Objects['Temple'].minigame;
//				if (oPantheon && (!Game.hasGod('order')) && (oPantheon.swaps >= 2)) {
//					self.bRigidel = true;
//					self.nPrevGod = oPantheon.slot[0];
//					oPantheon.slotGod(oPantheon.gods['order'], 0);
//					if (Game.BuildingsOwned % 10) {
//						self.nRigidelSell = Game.BuildingsOwned % 10;
//						Game.Objects[self.sRigidelSell].sell(self.nRigidelSell);
//					}
//					Game.computeLumpTimes();
//				}
				self.sSugarExp    =  Game.WriteSave(1);
				self.TimerStart('ReRollSugar');
			}
		}
	}
	//--------------------------------------------------------------------------------------------------------------
	// Golden cookies,reindeeres
	ClickCookieGolden() {
		for (const loop1 in Game.shimmers) Game.shimmers[loop1].pop();
	}
	//--------------------------------------------------------------------------------------------------------------
	// Golden switch -> Sell Godzamok, AutoCast spell(1)
	ClickGoldenSwitch() {
		if (Game.Has('Golden switch [off]') || Game.Has('Golden switch [on]')) {
			let isClickBuffStarting = (self.IsBuffStarting('Dragonflight', 22) || self.IsBuffStarting('Click frenzy', 29) || self.IsBuffStarting('Elder frenzy', 14));
			let hasClickBuff        = ((self.GetBuffTime('Dragonflight') > 0)  || (self.GetBuffTime('Click frenzy') > 0)  || (self.GetBuffTime('Elder frenzy') > 0));
			if (isClickBuffStarting) {
				if (!Game.Upgrades['Golden switch [off]'].bought) {
					Game.Upgrades['Golden switch [off]'].buy();
					self.Notify('Changed Golden switch to <b>on</b>', false);
					// Sell Godzamok
					if (self.Flags['SellGodzamok']) {
						Game.storeBulkButton(0);
						setTimeout(self.SellGodzamok, 100);
					}
					// Auto Cast spell(1)
					if (self.Flags['AutoCast1'] && (!Game.hasBuff('Clot'))) {
						if (self.CastSpell('hand of fate', false)) {
							self.Flags['AutoCast1'] = false;
							self.Notify('Bibbidi-bobbidi...poo...', false);
						}
					}
				}
			} else if (!hasClickBuff) {
				if (!Game.Upgrades['Golden switch [on]' ].bought) {
					Game.Upgrades['Golden switch [on]' ].buy();
					self.Notify('Changed Golden switch to <b>off</b>', false);
				}
			}
		}
	}
	//--------------------------------------------------------------------------------------------------------------
	// Buffs
	GetBuffTime(buffName) {
		return Game.hasBuff(buffName) ? Game.hasBuff(buffName).time : 0;
	}
	IsBuffStarting(buffName, buffBaseTime) {
		return (self.GetBuffTime(buffName) >= ((buffBaseTime - 1) * Game.fps));
	}
	AnyHasBuff(aName) {
		for (const loop1 of aName) if (Game.hasBuff(loop1)) return true;
		return false;
	}
	//--------------------------------------------------------------------------------------------------------------
	// Cast Spell
	CastSpell(name, maxchk) {
		let oGrimoire  = Game.Objects['Wizard tower'].minigame;
		if (oGrimoire && (oGrimoire.magic > oGrimoire.getSpellCost(oGrimoire.spells[name])) && ((!maxchk) || (oGrimoire.magic == oGrimoire.magicM))) {
			oGrimoire.castSpell(oGrimoire.spells[name]);
			return true;
		} else
			return false;
	}
	//--------------------------------------------------------------------------------------------------------------
	// Sell Godzamok
	SellGodzamok() {
		if ((!Game.hasBuff('Clot')) && (self.Timers['SellGodzamok'] == 0)) {
			self.nSellGodzamokBeforeAmt = Game.cookies;
			self.nSellGodzamokCnt       = 0;
			self.oSellGodzamokAmount    = {};
			for (const loop1 of self.aSellGodzamokTarget) {
				self.oSellGodzamokAmount[loop1] = Game.Objects[loop1].amount - ((loop1 == 'Farm') || (loop1 == 'Bank') ? 301 : 1);
			}
			if (Object.keys(self.oSellGodzamokAmount).length) {
				self.TimerStart('SellGodzamok');
			}
			self.Notify('<b>Sell Godzamok</b> started.', false);
		}
	}
	SellGodzamokTimer() {
		self.nSellGodzamokCnt++;
		if (self.nSellGodzamokCnt % 2 == 1) {
			if ((self.GetBuffTime('Dragonflight') <= 10) && (self.GetBuffTime('Click frenzy') <= 10) && (self.GetBuffTime('Elder frenzy') <= 10)) {
				self.TimerStop('SellGodzamok');
				self.oSellGodzamokAmount = {};
				self.Notify('<b>Sell Godzamok</b> was done.<b>' + ((self.nSellGodzamokCnt + 1) / 2) + '</b> count' + (self.nSellGodzamokCnt > 1 ? 's' : '') + '!<br>' + Beautify(self.nSellGodzamokBeforeAmt) + '<br>' + Beautify(Game.cookies), true);
				if (self.Flags['AutoBuyZ']) self.TimerStart('AutoBuyZ');
			} else {
				for (const loop1 of self.aSellGodzamokTarget) {
					if ((self.oSellGodzamokAmount[loop1] > 0) && (Game.Objects[loop1].amount >= self.oSellGodzamokAmount[loop1])) Game.Objects[loop1].sell(self.oSellGodzamokAmount[loop1], 1);
				}
			}
		} else {
			for (const loop1 of self.aSellGodzamokTarget) {
				if (self.oSellGodzamokAmount[loop1] > 0) Game.Objects[loop1].buy(self.oSellGodzamokAmount[loop1]);
			}
		}
	}
	//--------------------------------------------------------------------------------------------------------------
	// Click Dragon
	AllHasCheck(aItems) {
		let bResult = true;
		for (const loop1 of aItems) if (!Game.Has(loop1)) bResult = false;
		return bResult;
	}
	ClickDragon() {
		if (self.AllHasCheck(self.aClickDragonHasCheck)) {
			self.Notify('All Dragon upgrade are belong to us.', false);
			self.Flags['Dragon'] = false;
		} else if (Game.Has('A crumbly egg')) {
			if (Game.specialTab != 'dragon') {
				if (Game.specialTab != '') Game.ToggleSpecialMenu(0);
				Game.specialTab = 'dragon';
				Game.ToggleSpecialMenu(1);
			}
			Game.ClickSpecialPic();
		}
	}
	//--------------------------------------------------------------------------------------------------------------
	// Click Foretune
	ClickFortune() {
		if (self.AllHasCheck(self.aClickFortuneHasCheck)) {
			self.Notify('All Fortune upgrade are belong to us.', false);
			self.Flags['Fortune'] = false;
		} else if (Game.TickerEffect && (Game.TickerEffect.type == 'fortune')) {
			Game.tickerL.click();
		}
	}
	//--------------------------------------------------------------------------------------------------------------
	// Click Wrinkler
	ClickWrinkler() {
		for (const loop1 of Game.wrinklers) if (loop1.close==1) loop1.hp = 0;
	}
	//--------------------------------------------------------------------------------------------------------------
	// Auto-Buy Elder Pledge
	BuyEP() {
		if ((Game.UpgradesInStore.indexOf(Game.Upgrades['Elder Pledge']) != -1) && (!Game.Upgrades['Elder Pledge'].bought)) {
			Game.Upgrades['Elder Pledge'].buy();
			self.Notify('Auto-Buy <b>Elder Pledge</b>.', false);
		}
	}
	//--------------------------------------------------------------------------------------------------------------
	// Auto-Buy Plan Z
	BuyZ() {
		if (self.Timers['SellGodzamok'] == 0) {
			// Upgrades
			let nPrice        = 0;
			let nWishUpgPrice = 0;
			let sWishUpgName  = '';
			let bBought       = false;
			for (const loop1 in Game.UpgradesInStore) {
				let me = Game.UpgradesInStore[loop1];
				if (!me.isVaulted() && (me.pool != 'toggle') && (me.pool != 'tech')) {
					nPrice = me.getPrice();
					if ((nPrice > Game.cookies) && (nPrice < Game.cookies * self.nBuyZWishRate) && (nWishUpgPrice == 0)) {
						nWishUpgPrice = nPrice;
						sWishUpgName  = me.name;
					} else if (nPrice * self.nBuyZUpgradeRate < Game.cookies) {
						me.buy(1);
						bBought = true;
						self.Notify('Auto-Buy <b>' + me.name + '</b>.', false);
					}
				}
			}
			if (nWishUpgPrice == 0) {
				// Buildings 1
				let sCheapTarget = self.aBuyZTarget1[0];
				let nCheapPrice  = Game.Objects[self.aBuyZTarget1[0]].price;
				for (const loop1 of self.aBuyZTarget1) {
					if (nCheapPrice > Game.Objects[loop1].price) {
						nCheapPrice  = Game.Objects[loop1].price;
						sCheapTarget = loop1;
					}
				}
				if (nCheapPrice * self.nBuyZTarget1Rate < Game.cookies) {
					Game.Objects[sCheapTarget].buy(1);
					bBought = true;
					self.Notify('Auto-Buy <b>' + sCheapTarget + '</b>.', false);
				} else {
					// Buildings 2
					sCheapTarget = self.aBuyZTarget2[0];
					nCheapPrice  = Game.Objects[self.aBuyZTarget2[0]].price;
					for (const loop1 of self.aBuyZTarget2) {
						if (nCheapPrice > Game.Objects[loop1].price) {
							nCheapPrice  = Game.Objects[loop1].price;
							sCheapTarget = loop1;
						}
					}
					if (nCheapPrice * self.nBuyZTarget2Rate < Game.cookies) {
						Game.Objects[sCheapTarget].buy(1);
						bBought = true;
						self.Notify('Auto-Buy <b>' + sCheapTarget + '</b>.', false);
					}
					// Buildings 3
					sCheapTarget = self.aBuyZTarget3[0];
					nCheapPrice  = Game.Objects[self.aBuyZTarget3[0]].price;
					for (const loop1 of self.aBuyZTarget3) {
						if (nCheapPrice > Game.Objects[loop1].price) {
							nCheapPrice  = Game.Objects[loop1].price;
							sCheapTarget = loop1;
						}
					}
					if (nCheapPrice * self.nBuyZTarget3Rate < Game.cookies) {
						Game.Objects[sCheapTarget].buy(1);
						bBought = true;
						self.Notify('Auto-Buy <b>' + sCheapTarget + '</b>.', false);
					}
				}
			} else {
				self.Notify('Want to buy <b>' + sWishUpgName + '(' + Beautify(nWishUpgPrice) + ')</b>...', true);
			}
			if (!bBought) self.TimerStop('AutoBuyZ');
		}
	}
	//--------------------------------------------------------------------------------------------------------------
	// Garden maintenance
	ClickGardener() {
		let oGarden = Game.Objects['Farm'].minigame;
		if (oGarden) {
			function gardenPlant(x, y) {
				if (self.oGardenSetting[x + '_' + y] == 'queenbeetLump') {
					delete self.oGardenSetting[x + '_' + y];
				} else {
					oGarden.useTool(oGarden.plants[self.oGardenSetting[x + '_' + y]].id, x, y);
				}
			}
			if (!Object.keys(self.oGardenSetting).length) {
				for (let loop1 = 0; loop1 < 6; loop1++) {
					for (let loop2 = 0; loop2 < 6; loop2++) {
						let tile = oGarden.getTile(loop1, loop2);
						if (tile[0] > 0) self.oGardenSetting[loop1 + '_' + loop2] = oGarden.plantsById[tile[0] - 1].key;
					}
				}
			}
			for (let loop1 = 0; loop1 < 6; loop1++) {
				for (let loop2 = 0; loop2 < 6; loop2++) {
					let aTile = oGarden.getTile(loop1, loop2);
					let sKey  = self.oGardenSetting[loop1 + '_' + loop2];
					if (self.aGardenEffect.includes(sKey) || self.aGardenDrop.includes(sKey)) {
						if (aTile[0] > 0) {
							let oType = oGarden.plantsById[aTile[0] - 1];
							if ((aTile[0] - 1) != oGarden.plants[self.oGardenSetting[loop1 + '_' + loop2]].id) {
								if (oType.unlocked) {
									oGarden.harvest(loop1, loop2);
									gardenPlant(loop1, loop2);
								} else {
									self.oGardenSetting[loop1 + '_' + loop2] = oType.key;
								}
							} else if ((self.aGardenEffect.includes(sKey) && !oType.immortal && (((aTile[1] + Math.ceil(oType.ageTick + oType.ageTickR)) >= 100))) ||
								   (self.aGardenDrop.includes(sKey) && (aTile[1] >= oType.mature))) {
								oGarden.harvest(loop1, loop2);
								gardenPlant(loop1, loop2);
							}
						} else {
							gardenPlant(loop1, loop2);
						}
					} else if (aTile[0] > 0) {
						let oType = oGarden.plantsById[aTile[0] - 1];
						if (oType.weed && oType.unlocked) {
							oGarden.harvest(loop1, loop2);
						} else if ((aTile[1] >= oType.mature) && (!oType.unlocked)) {
							oGarden.harvest(loop1, loop2);
							delete self.oGardenSetting[loop1 + '_' + loop2];
						} else if ((!self.oGardenSetting[loop1 + '_' + loop2]) && (!oType.unlocked)) {
							self.oGardenSetting[loop1 + '_' + loop2] = oType.key;
						} else if ((aTile[1] + Math.ceil(oType.ageTick + oType.ageTickR)) >= 100) {
							oGarden.harvest(loop1, loop2);
							delete self.oGardenSetting[loop1 + '_' + loop2];
						}
					}
				}
			}
		}
	}
	ClickGardenerStop() {
		self.oGardenSetting    = {};
		self.Flags['Gardener'] = false;
	}
	//--------------------------------------------------------------------------------------------------------------
	// ReRoll garden for new seed
	ReRollGardenStart(savedata) {
		let oGarden = Game.Objects['Farm'].minigame;
		if (oGarden) {
			if (!Object.keys(self.oGardenReRollSet).length) {
				for (let loop1 = 0; loop1 < 6; loop1++) {
					for (let loop2 = 0; loop2 < 6; loop2++) {
						let tile = oGarden.getTile(loop1, loop2);
						if (tile[0] > 0) self.oGardenReRollSet[loop1 + '_' + loop2] = oGarden.plantsById[tile[0] - 1].key;
					}
				}
				self.sGardenReRollExp = savedata;
				self.TimerStart('ReRollGarden');
			} else if (self.Timers['ReRollGarden'] > 0) { 		
				self.TimerStop('ReRollGarden');
				self.oGardenReRollSet = {};
				self.sGardenReRollExp = '';
			}
		}
	}
	ReRollGardenTimer() {
		// Garden check
		let bResult = false;
		let oGarden = Game.Objects['Farm'].minigame;
		if (oGarden && Object.keys(self.oGardenReRollSet).length) {
			for (let loop1 = 0; loop1 < 6; loop1++) {
				for (let loop2 = 0; loop2 < 6; loop2++) {
					let tile = oGarden.getTile(loop1, loop2);
					if (tile[0] > 0) {
						if (self.oGardenReRollSet[loop1 + '_' + loop2]) {
							if (self.oGardenReRollSet[loop1 + '_' + loop2] != oGarden.plantsById[tile[0] - 1].key) {
								bResult = true;
							}
						} else {
							if (self.aGardenJuicerTarget.length) {
								if (self.aGardenJuicerTarget.includes(oGarden.plantsById[tile[0] - 1].key)) bResult = true;
							} else {
								bResult = true;
							}
						}
					} else if (self.oGardenReRollSet[loop1 + '_' + loop2]) {
						bResult = true;
					}
				}
			}
		} else {
			bResult = true;
		}
		if (bResult) {
			self.TimerStop('ReRollGarden');
			self.oGardenReRollSet = {};
			self.sGardenReRollExp = '';
		} else {
			// ReRoll
			Game.ImportSaveCode(self.sGardenReRollExp);
		}
	}
	//--------------------------------------------------------------------------------------------------------------
	// ReRoll garden for drop
	ReRollGardenerOnce(savedata) {
		if (!self.Flags['Gardener']) {
			// ReRoll
			Game.ImportSaveCode(savedata);
			// Clear Garrdener setting 
			self.oGardenSetting = {};
			// Garden check
			self.ClickGardener();
			// Clear Garrdener setting 
			self.oGardenSetting = {};
		}
	}
	//--------------------------------------------------------------------------------------------------------------
	// Check & ReRoll garden for JuicyQueenbeat
	GardenJuicerStart() {
		let oGarden = Game.Objects['Farm'].minigame;
		if (oGarden && (!self.Flags['GardenJuicer']) && (self.Timers['GardenJuicer'] == 0)) {
			self.Flags['GardenJuicer']  = true;
			self.oGardenJuicerSet        = {};
			self.sGardenJuicerExp        = '';
			self.nGardenNextStep        = oGarden.nextStep;
			self.nGardenJuicerReRollCnt = 0;
			self.Timers['GardenJuicer']  = setTimeout(self.GardenJuicerTimer, self.nGardenJuicerFreqMain);
			self.Notify('Garden Juicer started.', false);
		} else {
			self.Notify(self.Timers['GardenJuicer'] != 0 ? 'Garden Juicer was already started.' : '???', false);
		}
	}
	GardenJuicerStop() {
		self.Flags['GardenJuicer'] = false;
	}
	GardenJuicerAuto() {
		let oGarden = Game.Objects['Farm'].minigame;
		if (oGarden) {
			let   nStatus1  = 99;
			const matureQB  = oGarden.plants['queenbeet'].mature;
			let   nJuicyCnt = 0;
			let   aTileId   = new Array(6);
			for(let loop1 = 0; loop1 < 6; loop1++) {
				aTileId[loop1] = new Array(6).fill(0);
			}
			let   aTileLife = new Array(6);
			for(let loop1 = 0; loop1 < 6; loop1++) {
				aTileLife[loop1] = new Array(6).fill(0);
			}
			let   aPointX   = [];
			let   aPointY   = [];
			let   oPlantHis = {};
			let   idQB      = oGarden.plants['queenbeet'].id;
			let   idJuicy   = oGarden.plants['queenbeetLump'].id;
			let   idAlt     = oGarden.plants['whiskerbloom'].id;
			function tileCheck1(x, y, check) {
				return ((aTileId[x    ][y    ] == check) &&
					(aTileId[x + 1][y    ] == check) &&
					(aTileId[x + 2][y    ] == check) &&
					(aTileId[x    ][y + 1] == check) &&
					(aTileId[x + 2][y + 1] == check) &&
					(aTileId[x    ][y + 2] == check) &&
					(aTileId[x + 1][y + 2] == check) &&
					(aTileId[x + 2][y + 2] == check));
			}
			function tileCheck2(x, y, mature) {
				return ((aTileLife[x    ][y    ] >= mature) &&
					(aTileLife[x + 1][y    ] >= mature) &&
					(aTileLife[x + 2][y    ] >= mature) &&
					(aTileLife[x    ][y + 1] >= mature) &&
					(aTileLife[x + 2][y + 1] >= mature) &&
					(aTileLife[x    ][y + 2] >= mature) &&
					(aTileLife[x + 1][y + 2] >= mature) &&
					(aTileLife[x + 2][y + 2] >= mature));
			}
			function tileHarvest(x, y, id) {
				if (!oPlantHis[x + '_' + y]) {
					let aTile = oGarden.getTile(x, y);
					if ((aTile[0] > 0) && (aTile[0] - 1 != id)) oGarden.harvest(x, y);
					if (id >= 0) oGarden.useTool(id, x, y);
					oPlantHis[x + '_' + y] = id;
				}
			}
			// Status check
			for (let loop1 = 0; loop1 < 6; loop1++) {
				for (let loop2 = 0; loop2 < 6; loop2++) {
					let tile = oGarden.getTile(loop1, loop2);
					aTileId[loop1][loop2]   = tile[0] - 1;
					aTileLife[loop1][loop2] = tile[1];
				}
			}
			for (let loop1 = 0; loop1 < 6; loop1++) {
				for (let loop2 = 0; loop2 < 6; loop2++) {
					if (aTileId[loop1][loop2] == idJuicy) {
						if ((loop1 > 0) && (loop2 > 0) && (loop1 < 5) && (loop2 < 5) && tileCheck1(loop1 - 1, loop2 - 1, idQB)) {
							nStatus1 = Math.min(nStatus1, 2);
							aPointX.push(loop1 - 1);
							aPointY.push(loop2 - 1);
						} else {
							nStatus1 = Math.min(nStatus1, 3);
						}
						nJuicyCnt++;
					} else if ((loop1 < 4) && (loop2 < 4) && (tileCheck1(loop1, loop2, idQB)) && (aTileId[loop1 + 1][loop2 + 1] != idJuicy)) {
						nStatus1 = Math.min(nStatus1, (tileCheck2(loop1, loop2, matureQB) ? 1 : 0));
					} else if ((loop1 < 4) && (loop2 < 4) && (tileCheck1(loop1, loop2, idAlt) && (aTileId[loop1 + 1][loop2 + 1] != idJuicy))) {
						nStatus1 = Math.min(nStatus1, 4);
						aPointX.push(loop1);
						aPointY.push(loop2);
					}
				}
			}
			// Change Full auito parameters 
			self.bAutoJuicerReRoll = false;
			switch (nStatus1) {
				case 0:
				case 3:
					// QB/JuicyQB Juicer
					self.GardenJuicerTargetChange(nStatus1 == 0 ? 'queenbeet' : 'queenbeetLump');
					break;
				case 1:
					// Garden ReRoll for JuicyQB!
					self.GardenJuicerTargetChange('queenbeetLump');
					self.bAutoJuicerReRoll = true;
					break;
				case 2:
				case 4:
					// QB/JuicyQB Juicer
					self.GardenJuicerTargetChange(nStatus1 == 4 ? 'queenbeet' : 'queenbeetLump');
					// Change around plants
					let id = (nStatus1 == 2 ? idAlt : idQB);
					for (let loop1 = 0; loop1 < aPointX.length; loop1++) {
						tileHarvest(aPointX[loop1],     aPointY[loop1],     id);
						tileHarvest(aPointX[loop1] + 1, aPointY[loop1],     id);
						tileHarvest(aPointX[loop1] + 2, aPointY[loop1],     id);
						tileHarvest(aPointX[loop1],     aPointY[loop1] + 1, id);
						if (nStatus1 == 4) tileHarvest(aPointX[loop1] + 1, aPointY[loop1] + 1, -1);
						tileHarvest(aPointX[loop1] + 2, aPointY[loop1] + 1, id);
						tileHarvest(aPointX[loop1],     aPointY[loop1] + 2, id);
						tileHarvest(aPointX[loop1] + 1, aPointY[loop1] + 2, id);
						tileHarvest(aPointX[loop1] + 2, aPointY[loop1] + 2, id);
					}
					// Clear Garrdener setting 
					self.oGardenSetting = {};
					break;
				default:
					self.Flags['GardenJuicer'] = false;
			}
			//self.Notify('Full Auto status:' + nStatus1 + '/' + aPointX + '/' + aPointY + '/' + nJuicyCnt, false);
		}
	}
	GardenJuicerTimer() {
		let oGarden = Game.Objects['Farm'].minigame;
		if (oGarden && self.Flags['GardenJuicer'] && self.aGardenJuicerTarget.length) {
			let bResult = true;
			let nTotal  = 0;
			let nMax    = 0;
			let nMin    = 100;
			if (self.nGardenNextStep == oGarden.nextStep) {
				if ((self.nGardenNextStep - Date.now() <= self.nGardenJuicerFreqMain) &&
				    (self.Timers['SellGodzamok'] == 0) && (self.Timers['AutoBuyZ'] == 0) && (self.Timers['ReRollGarden'] == 0) && (self.Timers['ReRollSugar'] == 0)) {
					if (self.Flags['AutoJuicer']) {
						self.GardenJuicerAuto();
					}
					if (self.Flags['GardenJuicer']) {
						self.nGardenJuicerQBrange = 7;
						self.sGardenJuicerExp     = Game.WriteSave(1);
						for (let loop1 = 0; loop1 < 6; loop1++) {
							for (let loop2 = 0; loop2 < 6; loop2++) {
								let tile = oGarden.getTile(loop1, loop2);
								if ((tile[0] > 0) && (self.aGardenJuicerTarget.includes(oGarden.plantsById[tile[0] - 1].key))) {
									nTotal++;
									if (nMax < tile[1]) nMax = tile[1];
									if (nMin > tile[1]) nMin = tile[1];
									self.oGardenJuicerSet[loop1 + '_' + loop2] = tile[1];
								}
							}
						}
						if ((nTotal > 0) && (self.aGardenJuicerTarget.includes('queenbeet'))) self.nGardenJuicerQBrange = Math.max(7, (nMax - nMin - 1));
						self.Notify('Garden Juicer Check time.<br>' + 
							'Target: ' + self.aGardenJuicerTarget + ':' + nTotal + '<br>' + 
							(self.aGardenJuicerTarget.includes('queenbeet') ? 'range: ' + self.nGardenJuicerQBrange : ''), false);
					}
				}
			} else {
				if (self.Flags['AutoJuicer'] && self.bAutoJuicerReRoll) {
					// Garden ReRoll for JuicyQB!
					self.bAutoJuicerReRoll = false;
					self.ReRollGardenStart(self.sGardenJuicerExp);
				} else if ((self.Timers['SellGodzamok'] == 0) && (self.Timers['AutoBuyZ'] == 0) && (self.Timers['ReRollGarden'] == 0) && (self.Timers['ReRollSugar'] == 0) && (Object.keys(self.oGardenJuicerSet).length)) {
					let nCnt    = 0;
					for (let loop1 = 0; loop1 < 6; loop1++) {
						for (let loop2 = 0; loop2 < 6; loop2++) {
							let tile = oGarden.getTile(loop1, loop2);
							if ((tile[0] > 0) && (self.aGardenJuicerTarget.includes(oGarden.plantsById[tile[0] - 1].key))) {
								nTotal++;
								if (nMax < tile[1]) nMax = tile[1];
								if (nMin > tile[1]) nMin = tile[1];
								if ((loop1 + '_' + loop2 in self.oGardenJuicerSet) && (self.oGardenJuicerSet[loop1 + '_' + loop2] < tile[1])) nCnt++;
							}
						}
					}
					if (self.aGardenJuicerTarget.includes('queenbeet')) {
						bResult = ((nTotal == 0) || (nMax - nMin < self.nGardenJuicerQBrange));
					} else {
						bResult = ((nTotal == 0) || (nCnt >= (self.nGardenJuicerReRollCnt > 400 ? 1 : Math.ceil(nTotal / 2))));
						if (bResult && (self.nGardenJuicerReRollCnt > 400)) self.Notify('Hmmm...', false);
					}
				}
				if (bResult) {
					self.oGardenJuicerSet       = {};
					self.sGardenJuicerExp       = '';
					self.nGardenJuicerReRollCnt = 0;
					self.nGardenNextStep        = oGarden.nextStep;
				} else {
					// ReRoll
					self.nGardenJuicerReRollCnt++;
					Game.ImportSaveCode(self.sGardenJuicerExp);
				}
			}
			self.Timers['GardenJuicer'] = setTimeout(self.GardenJuicerTimer, (bResult ? self.nGardenJuicerFreqMain : self.nGardenJuicerFreqReRoll));
		} else {
			self.Timers['GardenJuicer'] = 0;
			self.oGardenJuicerSet       = {};
			self.sGardenJuicerExp       = '';
			self.nGardenNextStep        = 0;
			self.nGardenJuicerReRollCnt = 0;
			self.Notify('Garden Juicer stopped.', false);
		}
	}
	GardenJuicerTargetChange(target) {
		self.aGardenJuicerTarget.splice(0);
		if (target == 'J_E_D_D') {
			self.aGardenJuicerTarget.push('queenbeetLump');
			self.aGardenJuicerTarget.push('everdaisy');
			self.aGardenJuicerTarget.push('drowsyfern');
			self.aGardenJuicerTarget.push('duketater');
		} else if (target != '') {
			self.aGardenJuicerTarget.push(target);
		}
	}
	//--------------------------------------------------------------------------------------------------------------
	// Auto Spell Checker
	GrimoireIsEV() {
		return (Game.season == 'easter' || Game.season == 'valentines') ? 1 : 0;
	}
	GrimoireChoose(arr) {
		return arr[self.oLocalMath.floor(self.oLocalMath.random() * arr.length)];
	}
	GrimoireIsFall(spell, obj) {
		let obj1       = obj || {};
		let oGrimoire  = Game.Objects['Wizard tower'].minigame;
		let failChance = oGrimoire.getFailChance(spell);
		if (typeof obj1.failChanceSet  !== 'undefined') failChance =  obj1.failChanceSet;
		if (typeof obj1.failChanceAdd  !== 'undefined') failChance += obj1.failChanceAdd;
		if (typeof obj1.failChanceMult !== 'undefined') failChance *= obj1.failChanceMult;
		if (typeof obj1.failChanceMax  !== 'undefined') failChance =  Math.max(failChance, obj1.failChanceMax);
		return ((!spell.fail || (self.oLocalMath.random() < (1 - failChance))) ? true : false);
	}
	GrimoireHand = {
		failFunc: (fail) => {
			let golden = 0; /* game */
			return fail + 0.15 * golden;
		},
		win: (cycle) => {
			self.oLocalMath.random();self.oLocalMath.random();			// by shimmer.initFunc
			for(let loop1 = 0;loop1 < cycle; loop1++) self.oLocalMath.random();	// by PlaySound or season shimmer
			let choices = [];
			choices.push('frenzy', 'multiply cookies');
			if (!Game.hasBuff('Dragonflight'))                                 choices.push('click frenzy');
			if (self.oLocalMath.random() < 0.1)                               choices.push('cookie storm', 'cookie storm', 'blab');
			if (Game.BuildingsOwned >= 10 && self.oLocalMath.random() < 0.25) choices.push('building special');
			if (self.oLocalMath.random() < 0.15)                              choices = ['cookie storm drop'];
			if (self.oLocalMath.random() < 0.0001)                            choices.push('free sugar lump');
			return self.GrimoireChoose(choices);
		},
		fail: (cycle) => {
			self.oLocalMath.random();self.oLocalMath.random();			// by shimmer.initFunc
			for(let loop1 = 0;loop1 < cycle; loop1++) self.oLocalMath.random();	// by PlaySound or season shimmer
			let choices = [];
			choices.push('clot', 'ruin cookies');
			if (self.oLocalMath.random() < 0.1)   choices.push('cursed finger', 'elder frenzy');
			if (self.oLocalMath.random() < 0.003) choices.push('free sugar lump');
			if (self.oLocalMath.random() < 0.1)   choices = ['blab'];
			return self.GrimoireChoose(choices);
		}
	};
	AutoCastStart() {
		self.Flags['AutoCast1'] = false;
		self.Flags['AutoCast2'] = false;
		self.Flags['AutoCastT'] = true;
	}
	AutoCastStop() {
		self.Flags['AutoCast1'] = false;
		self.Flags['AutoCast2'] = false;
		self.Flags['AutoCastT'] = false;
	}
	// Auto Cast Check -> Auto Cast spell(2)
	ClickSpellCheckTimer() {
		let oGrimoire  = Game.Objects['Wizard tower'].minigame;
		if (oGrimoire) {
			if ((!self.Flags['AutoCast1']) && (!self.Flags['AutoCast2']) && (oGrimoire.magic > oGrimoire.getSpellCost(oGrimoire.spells['hand of fate']))) {
				self.oLocalMath.seedrandom(Game.seed + '/' + oGrimoire.spellsCastTotal);
				let spellResult = self.GrimoireIsFall(self.GrimoireHand) ? self.GrimoireHand.win(self.GrimoireIsEV()) : self.GrimoireHand.fail(self.GrimoireIsEV());
				if (spellResult == 'building special') {
					self.Flags['AutoCast1'] = true;
					self.Notify('Maybe I can cast <b>' + spellResult + '</b>', false);
				} else if ((spellResult == 'click frenzy') || (spellResult == 'elder frenzy')) {
					self.Flags['AutoCast2'] = true;
					self.Notify('Maybe I can cast <b>' + spellResult + '</b>', false);
				} else {
					self.CastSpell('hand of fate', false);
					self.Notify('Hahaha...', false);
				}
			}
			// Auto Cast spell(2)
			if (self.Flags['AutoCast2']) {
				if (self.AnyHasBuff(self.aAutoCastTarget) && 
				    (!self.AnyHasBuff(['Clot', 'Dragonflight', 'Click frenzy', 'Elder frenzy'])) &&
				    (self.Timers['ReRollGarden'] == 0) && (self.nGardenJuicerReRollCnt == 0)) {
					if (self.CastSpell('hand of fate', false)) {
						self.Flags['AutoCast2'] = false;
						self.Notify('Bibbidi-bobbidi...baa...', false);
					}
				}
			}
		}
	}
	//--------------------------------------------------------------------------------------------------------------
	// Sugar auto harvest
	ClickSugarTimer() {
		Game.clickLump();
		if (self.nSugarDesire <= Game.lumps) {
			// Rigidel restore
//			let oPantheon = Game.Objects['Temple'].minigame;
//			if (oPantheon && self.bRigidel) {
//				if (self.nRigidelSell >  0)  Game.Objects['Mine'].buy(self.nRigidelSell);
//				if (self.nPrevGod     != -1) oPantheon.slotGod(oPantheon.godsById[self.nPrevGod], 0);
//			}
			self.nSugarDesire = 0;
			self.sSugarExp    = '';
			self.TimerStop('ReRollSugar');
		} else {
			// ReRoll
			Game.ImportSaveCode(self.sSugarExp);
		}
	}
	//--------------------------------------------------------------------------------------------------------------
	// Test
	EleCCTest() {
//		self.Notify('Test:' + self.name + '<br>' + self.Flags['AutoCast1'] + ':' + self.Flags['AutoCast2'], false);
		self.GardenJuicerAuto();
	}
};

let oEleCC = new cEleCC('Electronical Cookie Creator', true);
