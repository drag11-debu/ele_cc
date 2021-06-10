let oEleCC = {
	//--------------------------------------------------------------------------------------------------------------
	// Fields
	name:  'Electronical Cookkie Creator',
	// setInterval Timer ID
	Timers: {
		'Init':         0,
		'SecTimer':     0,
		'BigCookie':    0,
		'SellGodzamok': 0,
		'AutoBuyZ':     0,
		'ReRollGarden': 0,
		'GardenJuicer': 0,
		'ReRollSugar':  0
	},
	// On/Off/Start/Stop Flags
	Flags: {
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
		'AutoCastD':    false,
		'AutoBuyZ':     false,
		'SellGodzamok': false,
		'Gardener':     false,
		'GardenJuicer': false,
		'AutoJuicer':   false
	},
	// 1Sec Timer couunt
	nSecCount:               0,
	// Garden Setting
	oGardenSetting:          {},
	oGardenReRollSet:        {},
	sGardenReRollExp:        '',
	aGardenEffect:           ['goldenClover', 'keenmoss', 'nursetulip', 'tidygrass', 'everdaisy', 'elderwort', 'whiskerbloom'],
	aGardenDrop:             ['bakerWheat', 'bakeberry', 'ichorpuff', 'greenRot', 'duketater', 'drowsyfern', 'queenbeetLump'],
	// For Sell Godzamok
	nSellGodzamokCnt:        0,
	oSellGodzamokAmount:     {},
	nSellGodzamokBeforeAmt:  0,
	// Excluded: Has Minigame, Has Synergy effect to Fractal/Javascript/Idleverse
	aSellGodzamokTarget:     ['Mine', 'Factory', 'Shipment', 'Alchemy lab', 'Time machine', 'Antimatter condenser'],
	nSellGodzamokFreq:       5,
	// For Click Dragon
	aClickDragonHasCheck:    ['Dragon scale', 'Dragon claw', 'Dragon fang', 'Dragon teddy bear'],
	// For Click Fortune
	aClickFortuneHasCheck:   [
		'Fortune #001','Fortune #002','Fortune #003','Fortune #004','Fortune #005','Fortune #006','Fortune #007','Fortune #008','Fortune #009','Fortune #010',
		'Fortune #011','Fortune #012','Fortune #013','Fortune #014','Fortune #015','Fortune #016','Fortune #017',
		'Fortune #100','Fortune #101','Fortune #102','Fortune #103','Fortune #104'
	],
	// For Auto Cast
	oLocalMath:              {},
	// For Auto Cast(2)
	// Excluded: Wizard tower (Manabloom)
	aAutoCastTarget:         [
		'High-five', 'Congregation', 'Luxuriant harvest', 'Ore vein', 'Oiled-up', 'Juicy profits',
		'Fervent adoration', 'Delicious lifeforms', 'Breakthrough', 'Righteous cataclysm', 'Golden ages',
		'Extra cycles', 'Solar flare', 'Winning streak', 'Macrocosm', 'Refactoring', 'Cosmic nursery'
	],
	// For Auto-Buy PlanZ
	// Excluded: Wizard tower (keep amounts for magic meter)
	nBuyZWishRate:           1.5,
	nBuyZUpgradeRate:        1.2,
	aBuyZTarget1:            ['Fractal engine', 'Idleverse'],
	nBuyZTarget1Rate:        1.2,
	aBuyZTarget2:            ['Cursor', 'Grandma', 'Portal', 'Prism', 'Javascript console'],
	nBuyZTarget2Rate:        1.5,
	aBuyZTarget3:            ['Farm', 'Bank', 'Temple', 'Chancemaker'],
	nBuyZTarget3Rate:        3,
	// For Garden Juicer
	nGardenJuicerFreqMain:   1000 * 5,
	nGardenJuicerFreqReRoll: 300,
	nGardenNextStep:         0,
	oGardenJuicerSet:        {},
	sGardenJuicerExp:        '',
	nGardenJuicerReRollCnt:  0,
	aGardenJuicerTarget:     ['queenbeetLump', 'everdaisy', 'drowsyfern', 'duketater'],
	nGardenJuicerQBrangeDef: 6,
	nGardenJuicerQBrange:    6,
	// For Auto Garden Juicer
	bAutoJuicerReRoll:       false,
	// For Sugar auto harvest
	nSugarDesire:            0,
	sSugarExp:               '',
	bRigidel:                false,
	nRigidelSell:            0,
	nPrevGod:                -1,
	sRigidelSell:            'Mine',
	//--------------------------------------------------------------------------------------------------------------
	// Functions
	// Initialize
	Init: function() {
		// Hide topBar
		document.getElementById('topBar').style.display = 'none';
		document.getElementById('game').style.top       = 0;
		// Block ADs
		//document.getElementById('aqad').style.display = 'none';
		// Change NewsTicker font size
		document.getElementById('commentsText'     ).style.fontSize = '8pt';
		document.getElementById('commentsTextBelow').style.fontSize = '8pt';
		// Initialize
		this.oLocalMath = Object.create(Math);
		// Init timer
		this.TimerStart('Init');
	},
	InitTimer: function() {
		if (Game.Win && Game.Notify) {
			// Init objects
			// I'm Third-party!
			Game.Win('Third-party');
			// Stop Init timer
			this.TimerStop('Init');
			// Start 1Sec Timer
			this.TimerStart('SecTimer');
			// Welcome message
			this.Notify('Hello.', false);
		}
	},
	//--------------------------------------------------------------------------------------------------------------
	// Timer
	TimerStart: function(name) {
		let func;
		let freq;
		switch (name) {
			case 'Init':         func = this.InitTimer.bind(this);         freq =  500; break;
			case 'SecTimer':     func = this.SecTimer.bind(this);          freq =  500; break;
			case 'BigCookie':    func = Game.ClickCookie.bind(this);         freq =    4; break;
			case 'SellGodzamok': func = this.SellGodzamokTimer.bind(this); freq = this.nSellGodzamokFreq; break;
			case 'AutoBuyZ':     func = this.BuyZ.bind(this);              freq = 1000; break;
			case 'ReRollGarden': func = this.ReRollGardenTimer.bind(this); freq =  300; break;
			case 'ReRollSugar':  func = this.ClickSugarTimer.bind(this);   freq =  500; break;
		}
		if (func) {
			func();
			if(this.Timers[name] == 0) this.Timers[name] = setInterval(func, freq);
		}
	},
	TimerStop: function(name) {
		if (this.Timers[name] > 0) {
			clearInterval(this.Timers[name]);
			this.Timers[name] = 0; 
		}
	},
	//--------------------------------------------------------------------------------------------------------------
	// Log,popup,notify
	Notify: function(message, persist) {
		Game.Notify('Ele-CC ' + (persist ? 'report' : 'info'), message, 0, (persist ? 0 : 7));
	},
	//--------------------------------------------------------------------------------------------------------------
	// 1Sec Timer
	SecTimer: function() {
		this.nSecCount = (this.nSecCount + 1) % 7200;
		if (this.Flags['Golden'])                                     this.ClickCookieGolden();
		if (this.Flags['GSwitch'])                                    this.ClickGoldenSwitch();
		if ((this.nSecCount % 2   == 0) && this.Flags['BuyEP'])     this.BuyEP();
		if ((this.nSecCount % 2   == 0) && this.Flags['Fortune'])   this.ClickFortune();
		if ((this.nSecCount % 2   == 0) && this.Flags['Dragon'])    this.ClickDragon();
		if ((this.nSecCount % 2   == 0) && this.Flags['Wrinkler'])  this.ClickWrinkler();
		if ((this.nSecCount % 2   == 0) && this.Flags['AutoCastT']) this.ClickSpellCheckTimer();
		if  (this.nSecCount % 120 == 0) {
			if (this.Flags['Gardener']) {
				this.ClickGardener();
			} else if (Object.keys(this.oGardenSetting).length) {
				this.oGardenSetting = {};
			}
		}
		if ((this.nSecCount % 120 == 0) && (this.Flags['ReRollSugar']) && Game.canLumps() && (this.Timers['SellGodzamok'] == 0) && (this.Timers['AutoBuyZ'] == 0) && (this.Timers['ReRollGarden'] == 0) && (this.nGardenJuicerReRollCnt == 0) && (this.Timers['ReRollSugar'] == 0)) {
			let age = Date.now() - Game.lumpT;
			if ((age >= Game.lumpMatureAge) && (age < Game.lumpRipeAge)) {
				// Sugar type check
				switch (Game.lumpCurrentType) {
					case 1:  this.nSugarDesire = 2; break; // bifurcated
					case 2:  this.nSugarDesire = 7; break; // golden
					case 3:  this.nSugarDesire = 2; break; // meaty
					case 4:  this.nSugarDesire = 3; break; // caramelized
					default: this.nSugarDesire = 1;
				}
				this.nSugarDesire += Game.lumps;
				// Rigidel check
				this.bRigidel     =  false;
				this.nRigidelSell =  0;
				this.nPrevGod     =  -1;
//				let oPantheon = Game.Objects['Temple'].minigame;
//				if (oPantheon && (!Game.hasGod('order')) && (oPantheon.swaps >= 2)) {
//					this.bRigidel = true;
//					this.nPrevGod = oPantheon.slot[0];
//					oPantheon.slotGod(oPantheon.gods['order'], 0);
//					if (Game.BuildingsOwned % 10) {
//						this.nRigidelSell = Game.BuildingsOwned % 10;
//						Game.Objects[this.sRigidelSell].sell(this.nRigidelSell);
//					}
//					Game.computeLumpTimes();
//				}
				this.sSugarExp    =  Game.WriteSave(1);
				this.TimerStart('ReRollSugar');
			}
		}
	},
	//--------------------------------------------------------------------------------------------------------------
	// Golden cookies,reindeeres
	ClickCookieGolden: function() {
		for (const loop1 in Game.shimmers) Game.shimmers[loop1].pop();
	},
	//--------------------------------------------------------------------------------------------------------------
	// Golden switch -> Sell Godzamok, AutoCast spell(1)
	ClickGoldenSwitch: function() {
		if (Game.Has('Golden switch [off]') || Game.Has('Golden switch [on]')) {
			let isClickBuffStarting = (this.IsBuffStarting('Dragonflight', 22) || this.IsBuffStarting('Click frenzy', 29) || this.IsBuffStarting('Elder frenzy', 14));
			let hasClickBuff        = ((this.GetBuffTime('Dragonflight') > 0)  || (this.GetBuffTime('Click frenzy') > 0)  || (this.GetBuffTime('Elder frenzy') > 0));
			if (isClickBuffStarting) {
				if (!Game.Upgrades['Golden switch [off]'].bought) {
					Game.Upgrades['Golden switch [off]'].buy();
					this.Notify('Changed Golden switch to <b>on</b>', false);
					// Sell Godzamok
					if (this.Flags['SellGodzamok']) {
						Game.storeBulkButton(0);
						setTimeout(this.SellGodzamok.bind(this), 100);
					}
					// Auto Cast spell(1)
					if (this.Flags['AutoCast1'] && (!Game.hasBuff('Clot'))) {
						if (this.CastSpell('hand of fate')) {
							this.Flags['AutoCast1'] = false;
							this.Flags['AutoCastD'] = false;
							this.Notify('Bibbidi-bobbidi...poo...', false);
						}
					}
				}
			} else if (!hasClickBuff) {
				if (!Game.Upgrades['Golden switch [on]' ].bought) {
					Game.Upgrades['Golden switch [on]' ].buy();
					this.Notify('Changed Golden switch to <b>off</b>', false);
				}
			}
		}
	},
	//--------------------------------------------------------------------------------------------------------------
	// Buffs
	GetBuffTime: function(buffName) {
		return Game.hasBuff(buffName) ? Game.hasBuff(buffName).time : 0;
	},
	IsBuffStarting: function(buffName, buffBaseTime) {
		return (this.GetBuffTime(buffName) >= ((buffBaseTime - 1) * Game.fps));
	},
	AnyHasBuff: function(aName) {
		for (const loop1 of aName) if (Game.hasBuff(loop1)) return true;
		return false;
	},
	//--------------------------------------------------------------------------------------------------------------
	// Cast Spell
	CastSpell: function(name) {
		let oGrimoire  = Game.Objects['Wizard tower'].minigame;
		if (oGrimoire && (oGrimoire.magic > oGrimoire.getSpellCost(oGrimoire.spells[name]))) {
			oGrimoire.castSpell(oGrimoire.spells[name]);
			return true;
		} else
			return false;
	},
	//--------------------------------------------------------------------------------------------------------------
	// Sell Godzamok
	SellGodzamok: function() {
		let oPantheon = Game.Objects['Temple'].minigame;
		if (oPantheon && Game.hasGod('ruin') && (!Game.hasBuff('Clot')) && (this.Timers['SellGodzamok'] == 0)) {
			this.nSellGodzamokBeforeAmt = Game.cookies;
			this.nSellGodzamokCnt       = 0;
			this.oSellGodzamokAmount    = {};
			for (const loop1 of this.aSellGodzamokTarget) {
				this.oSellGodzamokAmount[loop1] = Game.Objects[loop1].amount - ((loop1 == 'Farm') || (loop1 == 'Bank') ? 301 : 1);
			}
			if (Object.keys(this.oSellGodzamokAmount).length) {
				this.TimerStart('SellGodzamok');
			}
			this.Notify('<b>Sell Godzamok</b> started.', false);
		}
	},
	SellGodzamokTimer: function() {
		this.nSellGodzamokCnt++;
		if (this.nSellGodzamokCnt % 2 == 1) {
			if ((this.GetBuffTime('Dragonflight') <= 10) && (this.GetBuffTime('Click frenzy') <= 10) && (this.GetBuffTime('Elder frenzy') <= 10)) {
				this.TimerStop('SellGodzamok');
				this.oSellGodzamokAmount = {};
				this.Notify('<b>Sell Godzamok</b> was done.<b>' + ((this.nSellGodzamokCnt + 1) / 2) + '</b> count' + (this.nSellGodzamokCnt > 1 ? 's' : '') + '!<br>' + Beautify(this.nSellGodzamokBeforeAmt) + '<br>' + Beautify(Game.cookies), true);
				if (this.Flags['AutoBuyZ']) this.TimerStart('AutoBuyZ');
			} else {
				for (const loop1 of this.aSellGodzamokTarget) {
					if ((this.oSellGodzamokAmount[loop1] > 0) && (Game.Objects[loop1].amount >= this.oSellGodzamokAmount[loop1])) Game.Objects[loop1].sell(this.oSellGodzamokAmount[loop1], 1);
				}
			}
		} else {
			for (const loop1 of this.aSellGodzamokTarget) {
				if (this.oSellGodzamokAmount[loop1] > 0) Game.Objects[loop1].buy(this.oSellGodzamokAmount[loop1]);
			}
		}
	},
	//--------------------------------------------------------------------------------------------------------------
	// Click Dragon
	AllHasCheck: function(aItems) {
		let bResult = true;
		for (const loop1 of aItems) if (!Game.Has(loop1)) bResult = false;
		return bResult;
	},
	ClickDragon: function() {
		if (this.AllHasCheck(this.aClickDragonHasCheck)) {
			this.Notify('All Dragon upgrade are belong to us.', false);
			this.Flags['Dragon'] = false;
		} else if (Game.Has('A crumbly egg')) {
			if (Game.specialTab != 'dragon') {
				if (Game.specialTab != '') Game.ToggleSpecialMenu(0);
				Game.specialTab = 'dragon';
				Game.ToggleSpecialMenu(1);
			}
			Game.ClickSpecialPic();
		}
	},
	//--------------------------------------------------------------------------------------------------------------
	// Click Foretune
	ClickFortune: function() {
		if (this.AllHasCheck(this.aClickFortuneHasCheck)) {
			this.Notify('All Fortune upgrade are belong to us.', false);
			this.Flags['Fortune'] = false;
		} else if (Game.TickerEffect && (Game.TickerEffect.type == 'fortune')) {
			Game.tickerL.click();
		}
	},
	//--------------------------------------------------------------------------------------------------------------
	// Click Wrinkler
	ClickWrinkler: function() {
		for (const loop1 of Game.wrinklers) if (loop1.close==1) loop1.hp = 0;
	},
	//--------------------------------------------------------------------------------------------------------------
	// Auto-Buy Elder Pledge
	BuyEP: function() {
		if ((Game.UpgradesInStore.indexOf(Game.Upgrades['Elder Pledge']) != -1) && (!Game.Upgrades['Elder Pledge'].bought)) {
			Game.Upgrades['Elder Pledge'].buy();
			this.Notify('Auto-Buy <b>Elder Pledge</b>.', false);
		}
	},
	//--------------------------------------------------------------------------------------------------------------
	// Auto-Buy Plan Z
	BuyZ: function() {
		if (this.Timers['SellGodzamok'] == 0) {
			// Upgrades
			let nPrice        = 0;
			let nWishUpgPrice = 0;
			let sWishUpgName  = '';
			let bBought       = false;
			for (const loop1 in Game.UpgradesInStore) {
				let me = Game.UpgradesInStore[loop1];
				if (!me.isVaulted() && (me.pool != 'toggle') && (me.pool != 'tech')) {
					nPrice = me.getPrice();
					if ((nPrice > Game.cookies) && (nPrice < Game.cookies * this.nBuyZWishRate) && (nWishUpgPrice == 0)) {
						nWishUpgPrice = nPrice;
						sWishUpgName  = me.name;
					} else if (nPrice * this.nBuyZUpgradeRate < Game.cookies) {
						me.buy(1);
						bBought = true;
						this.Notify('Auto-Buy <b>' + me.name + '</b>.', false);
					}
				}
			}
			if (nWishUpgPrice == 0) {
				// Buildings 1
				let sCheapTarget = this.aBuyZTarget1[0];
				let nCheapPrice  = Game.Objects[this.aBuyZTarget1[0]].price;
				for (const loop1 of this.aBuyZTarget1) {
					if (nCheapPrice > Game.Objects[loop1].price) {
						nCheapPrice  = Game.Objects[loop1].price;
						sCheapTarget = loop1;
					}
				}
				if (nCheapPrice * this.nBuyZTarget1Rate < Game.cookies) {
					Game.Objects[sCheapTarget].buy(1);
					bBought = true;
					this.Notify('Auto-Buy <b>' + sCheapTarget + '</b>.', false);
				} else {
					// Buildings 2
					sCheapTarget = this.aBuyZTarget2[0];
					nCheapPrice  = Game.Objects[this.aBuyZTarget2[0]].price;
					for (const loop1 of this.aBuyZTarget2) {
						if (nCheapPrice > Game.Objects[loop1].price) {
							nCheapPrice  = Game.Objects[loop1].price;
							sCheapTarget = loop1;
						}
					}
					if (nCheapPrice * this.nBuyZTarget2Rate < Game.cookies) {
						Game.Objects[sCheapTarget].buy(1);
						bBought = true;
						this.Notify('Auto-Buy <b>' + sCheapTarget + '</b>.', false);
					}
					// Buildings 3
					sCheapTarget = this.aBuyZTarget3[0];
					nCheapPrice  = Game.Objects[this.aBuyZTarget3[0]].price;
					for (const loop1 of this.aBuyZTarget3) {
						if (nCheapPrice > Game.Objects[loop1].price) {
							nCheapPrice  = Game.Objects[loop1].price;
							sCheapTarget = loop1;
						}
					}
					if (nCheapPrice * this.nBuyZTarget3Rate < Game.cookies) {
						Game.Objects[sCheapTarget].buy(1);
						bBought = true;
						this.Notify('Auto-Buy <b>' + sCheapTarget + '</b>.', false);
					}
				}
			} else {
				this.Notify('Want to buy <b>' + sWishUpgName + '(' + Beautify(nWishUpgPrice) + ')</b>...', true);
			}
			if (!bBought) this.TimerStop('AutoBuyZ');
		}
	},
	//--------------------------------------------------------------------------------------------------------------
	// Garden maintenance
	GardenPlant: function(x, y) {
		let oGarden = Game.Objects['Farm'].minigame;
		if ((oGarden) && (x + '_' + y in this.oGardenSetting)) {
			if (this.oGardenSetting[x + '_' + y] == 'queenbeetLump') {
				delete this.oGardenSetting[x + '_' + y];
			} else {
				oGarden.useTool(oGarden.plants[this.oGardenSetting[x + '_' + y]].id, x, y);
			}
		}
	},
	ClickGardener: function() {
		let oGarden = Game.Objects['Farm'].minigame;
		if (oGarden) {
			if (!Object.keys(this.oGardenSetting).length) {
				for (let loop1 = 0; loop1 < 6; loop1++) {
					for (let loop2 = 0; loop2 < 6; loop2++) {
						let tile = oGarden.getTile(loop1, loop2);
						if (tile[0] > 0) this.oGardenSetting[loop1 + '_' + loop2] = oGarden.plantsById[tile[0] - 1].key;
					}
				}
			}
			for (let loop1 = 0; loop1 < 6; loop1++) {
				for (let loop2 = 0; loop2 < 6; loop2++) {
					let aTile = oGarden.getTile(loop1, loop2);
					let sKey  = this.oGardenSetting[loop1 + '_' + loop2];
					if (this.aGardenEffect.includes(sKey) || this.aGardenDrop.includes(sKey)) {
						if (aTile[0] > 0) {
							let oType = oGarden.plantsById[aTile[0] - 1];
							if ((aTile[0] - 1) != oGarden.plants[this.oGardenSetting[loop1 + '_' + loop2]].id) {
								if (oType.unlocked) {
									oGarden.harvest(loop1, loop2);
									this.GardenPlant(loop1, loop2);
								} else {
									this.oGardenSetting[loop1 + '_' + loop2] = oType.key;
								}
							} else if ((this.aGardenEffect.includes(sKey) && !oType.immortal && (((aTile[1] + Math.ceil(oType.ageTick + oType.ageTickR)) >= 100))) ||
								   (this.aGardenDrop.includes(sKey) && (aTile[1] >= oType.mature))) {
								oGarden.harvest(loop1, loop2);
								this.GardenPlant(loop1, loop2);
							}
						} else {
							this.GardenPlant(loop1, loop2);
						}
					} else if (aTile[0] > 0) {
						let oType = oGarden.plantsById[aTile[0] - 1];
						if (oType.weed && oType.unlocked) {
							oGarden.harvest(loop1, loop2);
						} else if ((aTile[1] >= oType.mature) && (!oType.unlocked)) {
							oGarden.harvest(loop1, loop2);
							delete this.oGardenSetting[loop1 + '_' + loop2];
						} else if ((!this.oGardenSetting[loop1 + '_' + loop2]) && (!oType.unlocked)) {
							this.oGardenSetting[loop1 + '_' + loop2] = oType.key;
						} else if ((aTile[1] + Math.ceil(oType.ageTick + oType.ageTickR)) >= 100) {
							oGarden.harvest(loop1, loop2);
							delete this.oGardenSetting[loop1 + '_' + loop2];
						}
					}
				}
			}
		}
	},
	ClickGardenerStop: function() {
		this.oGardenSetting    = {};
		this.Flags['Gardener'] = false;
	},
	//--------------------------------------------------------------------------------------------------------------
	// ReRoll garden for new seed
	ReRollGardenStart: function(savedata) {
		let oGarden = Game.Objects['Farm'].minigame;
		if (oGarden) {
			if (!Object.keys(this.oGardenReRollSet).length) {
				for (let loop1 = 0; loop1 < 6; loop1++) {
					for (let loop2 = 0; loop2 < 6; loop2++) {
						let tile = oGarden.getTile(loop1, loop2);
						if (tile[0] > 0) this.oGardenReRollSet[loop1 + '_' + loop2] = oGarden.plantsById[tile[0] - 1].key;
					}
				}
				this.sGardenReRollExp = savedata;
				this.TimerStart('ReRollGarden');
			} else if (this.Timers['ReRollGarden'] > 0) { 		
				this.TimerStop('ReRollGarden');
				this.oGardenReRollSet = {};
				this.sGardenReRollExp = '';
			}
		}
	},
	ReRollGardenTimer: function() {
		// Garden check
		let bResult = false;
		let oGarden = Game.Objects['Farm'].minigame;
		if (oGarden && Object.keys(this.oGardenReRollSet).length) {
			for (let loop1 = 0; loop1 < 6; loop1++) {
				for (let loop2 = 0; loop2 < 6; loop2++) {
					let tile = oGarden.getTile(loop1, loop2);
					if (tile[0] > 0) {
						if (this.oGardenReRollSet[loop1 + '_' + loop2]) {
							if (this.oGardenReRollSet[loop1 + '_' + loop2] != oGarden.plantsById[tile[0] - 1].key) {
								bResult = true;
							}
						} else {
							if (this.aGardenJuicerTarget.length) {
								if (this.aGardenJuicerTarget.includes(oGarden.plantsById[tile[0] - 1].key)) bResult = true;
							} else {
								bResult = true;
							}
						}
					} else if (this.oGardenReRollSet[loop1 + '_' + loop2]) {
						bResult = true;
					}
				}
			}
		} else {
			bResult = true;
		}
		if (bResult) {
			this.TimerStop('ReRollGarden');
			this.oGardenReRollSet = {};
			this.sGardenReRollExp = '';
		} else {
			// ReRoll
			Game.ImportSaveCode(this.sGardenReRollExp);
		}
	},
	//--------------------------------------------------------------------------------------------------------------
	// ReRoll garden for drop
	ReRollGardenerOnce: function(savedata) {
		if (!this.Flags['Gardener']) {
			// ReRoll
			Game.ImportSaveCode(savedata);
			// Clear Garrdener setting 
			this.oGardenSetting = {};
			// Garden check
			this.ClickGardener();
			// Clear Garrdener setting 
			this.oGardenSetting = {};
		}
	},
	//--------------------------------------------------------------------------------------------------------------
	// Check & ReRoll garden for JuicyQueenbeat
	GardenJuicerStart: function() {
		let oGarden = Game.Objects['Farm'].minigame;
		if (oGarden && (!this.Flags['GardenJuicer']) && (this.Timers['GardenJuicer'] == 0)) {
			this.Flags['GardenJuicer']  = true;
			this.oGardenJuicerSet        = {};
			this.sGardenJuicerExp        = '';
			this.nGardenNextStep        = oGarden.nextStep;
			this.nGardenJuicerReRollCnt = 0;
			this.Timers['GardenJuicer']  = setTimeout(this.GardenJuicerTimer.bind(this), this.nGardenJuicerFreqMain);
			this.Notify('Garden Juicer started.', false);
		} else {
			this.Notify(this.Timers['GardenJuicer'] != 0 ? 'Garden Juicer was already started.' : '???', false);
		}
	},
	GardenJuicerStop: function() {
		this.Flags['GardenJuicer'] = false;
	},
	GardenJuicerAuto: function() {
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
			this.bAutoJuicerReRoll = false;
			switch (nStatus1) {
				case 0:
				case 3:
					// QB/JuicyQB Juicer
					this.GardenJuicerTargetChange(nStatus1 == 0 ? 'queenbeet' : 'queenbeetLump');
					break;
				case 1:
					// Garden ReRoll for JuicyQB!
					this.GardenJuicerTargetChange('queenbeetLump');
					this.bAutoJuicerReRoll = true;
					break;
				case 2:
				case 4:
					// QB/JuicyQB Juicer
					this.GardenJuicerTargetChange(nStatus1 == 4 ? 'queenbeet' : 'queenbeetLump');
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
					this.oGardenSetting = {};
					break;
				default:
					this.Flags['GardenJuicer'] = false;
			}
			//this.Notify('Full Auto status:' + nStatus1 + '/' + aPointX + '/' + aPointY + '/' + nJuicyCnt, false);
		}
	},
	GardenJuicerTimer: function() {
		let oGarden = Game.Objects['Farm'].minigame;
		if (oGarden && this.Flags['GardenJuicer'] && this.aGardenJuicerTarget.length) {
			let bResult = true;
			let nTotal  = 0;
			let nMax    = 0;
			let nMin    = 100;
			if (this.nGardenNextStep == oGarden.nextStep) {
				if ((this.nGardenNextStep - Date.now() <= this.nGardenJuicerFreqMain) &&
				    (this.Timers['SellGodzamok'] == 0) && (this.Timers['AutoBuyZ'] == 0) && (this.Timers['ReRollGarden'] == 0) && (this.Timers['ReRollSugar'] == 0)) {
					if (this.Flags['AutoJuicer']) {
						this.GardenJuicerAuto();
					}
					if (this.Flags['GardenJuicer']) {
						this.nGardenJuicerQBrange = this.nGardenJuicerQBrangeDef;
						this.sGardenJuicerExp     = Game.WriteSave(1);
						for (let loop1 = 0; loop1 < 6; loop1++) {
							for (let loop2 = 0; loop2 < 6; loop2++) {
								let tile = oGarden.getTile(loop1, loop2);
								if ((tile[0] > 0) && (this.aGardenJuicerTarget.includes(oGarden.plantsById[tile[0] - 1].key))) {
									nTotal++;
									if (nMax < tile[1]) nMax = tile[1];
									if (nMin > tile[1]) nMin = tile[1];
									this.oGardenJuicerSet[loop1 + '_' + loop2] = tile[1];
								}
							}
						}
						if ((nTotal > 0) && (this.aGardenJuicerTarget.includes('queenbeet'))) this.nGardenJuicerQBrange = Math.max(this.nGardenJuicerQBrangeDef, nMax - nMin);
						this.Notify('Garden Juicer Check time.<br>' + 
							'Target: ' + this.aGardenJuicerTarget + ':' + nTotal + '<br>' + 
							(this.aGardenJuicerTarget.includes('queenbeet') ? 'range: ' + this.nGardenJuicerQBrange : ''), false);
					}
				}
			} else {
				if (this.Flags['AutoJuicer'] && this.bAutoJuicerReRoll) {
					// Garden ReRoll for JuicyQB!
					this.bAutoJuicerReRoll = false;
					this.ReRollGardenStart(this.sGardenJuicerExp);
				} else if ((this.Timers['SellGodzamok'] == 0) && (this.Timers['AutoBuyZ'] == 0) && (this.Timers['ReRollGarden'] == 0) && (this.Timers['ReRollSugar'] == 0) && (Object.keys(this.oGardenJuicerSet).length)) {
					let nCnt    = 0;
					for (let loop1 = 0; loop1 < 6; loop1++) {
						for (let loop2 = 0; loop2 < 6; loop2++) {
							let tile = oGarden.getTile(loop1, loop2);
							if ((tile[0] > 0) && (this.aGardenJuicerTarget.includes(oGarden.plantsById[tile[0] - 1].key))) {
								nTotal++;
								if (nMax < tile[1]) nMax = tile[1];
								if (nMin > tile[1]) nMin = tile[1];
								if ((loop1 + '_' + loop2 in this.oGardenJuicerSet) && (this.oGardenJuicerSet[loop1 + '_' + loop2] < tile[1])) nCnt++;
							}
						}
					}
					if (this.nGardenJuicerReRollCnt > 400) {
						bResult = true;
						this.Notify('Hmmm...', false);
					} else if (nTotal == 0) {
						bResult = true;
					} else if (this.aGardenJuicerTarget.includes('queenbeet')) {
						bResult = (nMax - nMin < this.nGardenJuicerQBrange);
					} else {
						bResult = (nCnt >= Math.ceil(nTotal / 2));
					}
				}
				if (bResult) {
					this.oGardenJuicerSet       = {};
					this.sGardenJuicerExp       = '';
					this.nGardenJuicerReRollCnt = 0;
					this.nGardenNextStep        = oGarden.nextStep;
				} else {
					// ReRoll
					this.nGardenJuicerReRollCnt++;
					Game.ImportSaveCode(this.sGardenJuicerExp);
				}
			}
			this.Timers['GardenJuicer'] = setTimeout(this.GardenJuicerTimer.bind(this), (bResult ? this.nGardenJuicerFreqMain : this.nGardenJuicerFreqReRoll));
		} else {
			this.Timers['GardenJuicer'] = 0;
			this.oGardenJuicerSet       = {};
			this.sGardenJuicerExp       = '';
			this.nGardenNextStep        = 0;
			this.nGardenJuicerReRollCnt = 0;
			this.Notify('Garden Juicer stopped.', false);
		}
	},
	GardenJuicerTargetChange: function(target) {
		this.aGardenJuicerTarget.splice(0);
		if (target == 'J_E_D_D') {
			this.aGardenJuicerTarget.push('queenbeetLump');
			this.aGardenJuicerTarget.push('everdaisy');
			this.aGardenJuicerTarget.push('drowsyfern');
			this.aGardenJuicerTarget.push('duketater');
		} else if (target != '') {
			this.aGardenJuicerTarget.push(target);
		}
	},
	//--------------------------------------------------------------------------------------------------------------
	// Auto Spell Checker
	GrimoireIsEV: function() {
		return (Game.season == 'easter' || Game.season == 'valentines') ? 1 : 0;
	},
	GrimoireChoose: function(arr) {
		return arr[oEleCC.oLocalMath.floor(oEleCC.oLocalMath.random() * arr.length)];
	},
	GrimoireIsFall: function(spell, obj) {
		let obj1       = obj || {};
		let oGrimoire  = Game.Objects['Wizard tower'].minigame;
		let failChance = oGrimoire.getFailChance(spell);
		if (typeof obj1.failChanceSet  !== 'undefined') failChance =  obj1.failChanceSet;
		if (typeof obj1.failChanceAdd  !== 'undefined') failChance += obj1.failChanceAdd;
		if (typeof obj1.failChanceMult !== 'undefined') failChance *= obj1.failChanceMult;
		if (typeof obj1.failChanceMax  !== 'undefined') failChance =  Math.max(failChance, obj1.failChanceMax);
		return ((!spell.fail || (oEleCC.oLocalMath.random() < (1 - failChance))) ? true : false);
	},
	GrimoireHand: {
		failFunc: function(fail) {
			let golden = 0; /* game */
			return fail + 0.15 * golden;
		},
		win: function(cycle) {
			oEleCC.oLocalMath.random();oEleCC.oLocalMath.random();			// by shimmer.initFunc
			for(let loop1 = 0;loop1 < cycle; loop1++) oEleCC.oLocalMath.random();	// by PlaySound or season shimmer
			let choices = [];
			choices.push('frenzy', 'multiply cookies');
			if (!Game.hasBuff('Dragonflight'))                                  choices.push('click frenzy');
			if (oEleCC.oLocalMath.random() < 0.1)                               choices.push('cookie storm', 'cookie storm', 'blab');
			if (Game.BuildingsOwned >= 10 && oEleCC.oLocalMath.random() < 0.25) choices.push('building special');
			if (oEleCC.oLocalMath.random() < 0.15)                              choices = ['cookie storm drop'];
			if (oEleCC.oLocalMath.random() < 0.0001)                            choices.push('free sugar lump');
			return oEleCC.GrimoireChoose(choices);
		},
		fail: function(cycle) {
			oEleCC.oLocalMath.random();oEleCC.oLocalMath.random();			// by shimmer.initFunc
			for(let loop1 = 0;loop1 < cycle; loop1++) oEleCC.oLocalMath.random();	// by PlaySound or season shimmer
			let choices = [];
			choices.push('clot', 'ruin cookies');
			if (oEleCC.oLocalMath.random() < 0.1)   choices.push('cursed finger', 'elder frenzy');
			if (oEleCC.oLocalMath.random() < 0.003) choices.push('free sugar lump');
			if (oEleCC.oLocalMath.random() < 0.1)   choices = ['blab'];
			return oEleCC.GrimoireChoose(choices);
		}
	},
	spellCheckHand: function(next) {
		let oGrimoire  = Game.Objects['Wizard tower'].minigame;
		if (oGrimoire) {
			this.oLocalMath.seedrandom(Game.seed + '/' + (oGrimoire.spellsCastTotal + next - 1));
			return this.GrimoireIsFall(this.GrimoireHand) ? this.GrimoireHand.win(this.GrimoireIsEV()) : this.GrimoireHand.fail(this.GrimoireIsEV());
		} else
			return '';
	},
	AutoCastStart: function() {
		this.Flags['AutoCast1'] = false;
		this.Flags['AutoCast2'] = false;
		this.Flags['AutoCastD'] = false;
		this.Flags['AutoCastT'] = true;
	},
	AutoCastStop: function() {
		this.Flags['AutoCast1'] = false;
		this.Flags['AutoCast2'] = false;
		this.Flags['AutoCastD'] = false;
		this.Flags['AutoCastT'] = false;
	},
	// Auto Cast Check -> Auto Cast spell(2)
	// Required Wizard tower amount
	// Wizard tower Lvl.1
	//   21(MP  23, Fate  23):Fate * 1
	//   55(MP  38, Fate  32):Fate * 1 minimum charge time
	//  321(MP  82, Fate  59):Fate * 2(Fate -> Sell300 -> Fate)
	//  326(MP  83, Fate  59):Fate + Stretch
	// Wizard tower Lvl.10
	//    1(MP  34, Fate  30):Fate * 1
	//  500(MP 101, Fate  70):Fate * 2(Fate -> SellAll -> Buy1 -> Fate)
	// 1400(MP 150, Fate 100):Fate * 3(Random(Fate) -> Random(Fate) -> SellAll -> Buy1 -> Fate)
	ClickSpellCheckTimer: function() {
		let oGrimoire  = Game.Objects['Wizard tower'].minigame;
		if (oGrimoire) {
			if ((!this.Flags['AutoCast1']) && (!this.Flags['AutoCast2']) && (oGrimoire.magic > oGrimoire.getSpellCost(oGrimoire.spells['hand of fate'])) && (oGrimoire.magic == oGrimoire.magicM)) {
				let spellResult1 = this.spellCheckHand(1);
				let spellResult2 = this.spellCheckHand(2);
				if (spellResult1 == 'building special') {
					this.Flags['AutoCast1'] = true;
					this.Flags['AutoCastD'] = (spellResult2 == 'building special');
					this.Notify('Maybe I can cast <b>' + spellResult1 + (this.Flags['AutoCastD'] ? 'Double!!' : '') + '</b>', false);
				} else if ((spellResult1 == 'click frenzy') || (spellResult1 == 'elder frenzy')) {
					this.Flags['AutoCast2'] = true;
					this.Flags['AutoCastD'] = (spellResult2 == 'building special');
					this.Notify('Maybe I can cast <b>' + spellResult1 + (this.Flags['AutoCastD'] ? ' and ' + spellResult2 : '') + '</b>', false);
				} else {
					this.CastSpell('hand of fate');
					this.Notify('Hahaha...', false);
				}
			}
			// Auto Cast spell(2)
			if (this.Flags['AutoCast2']) {
				if (this.AnyHasBuff(this.aAutoCastTarget) && 
				    (!this.AnyHasBuff(['Clot', 'Dragonflight', 'Click frenzy', 'Elder frenzy'])) &&
				    (this.Timers['ReRollGarden'] == 0) && (this.nGardenJuicerReRollCnt == 0)) {
					if (this.CastSpell('hand of fate')) {
						this.Flags['AutoCast2'] = false;
						this.Flags['AutoCastD'] = false;
						this.Notify('Bibbidi-bobbidi...baa...', false);
					}
				}
			}
		}
	},
	//--------------------------------------------------------------------------------------------------------------
	// Sugar auto harvest
	ClickSugarTimer: function() {
		Game.clickLump();
		if (this.nSugarDesire <= Game.lumps) {
			// Rigidel restore
//			let oPantheon = Game.Objects['Temple'].minigame;
//			if (oPantheon && this.bRigidel) {
//				if (this.nRigidelSell >  0)  Game.Objects['Mine'].buy(this.nRigidelSell);
//				if (this.nPrevGod     != -1) oPantheon.slotGod(oPantheon.godsById[this.nPrevGod], 0);
//			}
			this.nSugarDesire = 0;
			this.sSugarExp    = '';
			this.TimerStop('ReRollSugar');
		} else {
			// ReRoll
			Game.ImportSaveCode(this.sSugarExp);
		}
	},
	//--------------------------------------------------------------------------------------------------------------
	// Test
	EleCCTest: function() {
		this.Notify('Test:' + this.name + '<br>' + 
			this.spellCheckHand(1) + ':' + this.spellCheckHand(2) + '<br>' +
			this.Flags['AutoCast1'] + ':' + this.Flags['AutoCast2'] + ':' + this.Flags['AutoCastD'],
			false);
	}
};
oEleCC.Init();
