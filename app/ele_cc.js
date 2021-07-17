let oEleCC = {
	//--------------------------------------------------------------------------------------------------------------
	// Fields
	name:     'Electronical Cookkie Creator',
	thinking: '',
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
		'AutoBuyA':     false,
		'AutoBuyZ':     false,
		'SellGodzamok': false,
		'Gardener':     false,
		'GardenJuicer': false,
		'AutoJuicer':   false,
		'AutoTrade':    false
	},
	// 1Sec Timer couunt
	nSecCount:               0,
	// Garden Setting
	oGardenerSetting:        {},
	oGardenReRollSet:        {},
	sGardenReRollExp:        '',
	nGardenReRollCnt:        0,
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
		'Fortune #011','Fortune #012','Fortune #013','Fortune #014','Fortune #015','Fortune #016','Fortune #017','Fortune #018',
		'Fortune #100','Fortune #101','Fortune #102','Fortune #103','Fortune #104'
	],
	// Required Wizard tower amount
	// Wizard tower Lvl.1
	//   21(MP  23, Fate  23):Fate * 1
	//   55(MP  38, Fate  32):Fate * 1 minimum charge time
	//  321(MP  82, Fate  59):Fate * 2(Fate -> Sell300 -> Fate)
	//  326(MP  83, Fate  59):Fate + Stretch
	// Lvl.2
	//   14(MP  23, Fate  23):Fate * 1
	//  314(MP  82, Fate  59):Fate * 2(Fate -> Sell300 -> Fate)
	// Lvl.3
	//    8(MP  23, Fate  23):Fate * 1
	// Lvl.4
	//    3(MP  23, Fate  23):Fate * 1
	// Lvl.5
	//    1(MP  24, Fate  24):Fate * 1
	// Lvl.6
	//    1(MP  27, Fate  26):Fate * 1
	// Lvl.7
	//    1(MP  29, Fate  27):Fate * 1
	// Lvl.8
	//    1(MP  31, Fate  28):Fate * 1
	// Lvl.9
	//    1(MP  32, Fate  29):Fate * 1
	// Lvl.10
	//    1(MP  34, Fate  30):Fate * 1
	//  500(MP 101, Fate  70):Fate * 2(Fate -> Sell499 -> Fate)
	// 1400(MP 150, Fate 100):Fate * 3(Random(Fate) -> Random(Fate) -> SellAll -> Buy1 -> Fate)
	aDoubleCastMP:           [[21, 23],[14, 23],[ 8, 23],[ 3, 23],[ 1, 24],
	                          [ 1, 26],[ 1, 27],[ 1, 28],[ 1, 29],[ 1, 30]],
	// For Auto Cast(2)
	// Excluded: Wizard tower ('Manabloom'), 'Frenzy'
	aAutoCastTarget:         [
		'High-five', 'Congregation', 'Luxuriant harvest', 'Ore vein', 'Oiled-up', 'Juicy profits',
		'Fervent adoration', 'Delicious lifeforms', 'Breakthrough', 'Righteous cataclysm', 'Golden ages',
		'Extra cycles', 'Solar flare', 'Winning streak', 'Macrocosm', 'Refactoring', 'Cosmic nursery'
	],
	// For Auto-Buy PlanZ
	// Excluded: Wizard tower (keep amounts for magic meter)
	nBuyAUpgradeRate:        1.1,
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
	nSugarDesire1:           0,
	nSugarDesire2:           0,
	sSugarExp:               '',
	nSugarReRollCnt:         0,
	// For Auto Trade
	aTradeBaseAmount:        [
		[  3, 100],
		[  3, 100],
		[  4, 100],
		[  4, 100],
		[ 10, 120],
		[ 10, 120],
		[ 10, 120],
		[ 10, 120],
		[ 30, 140],
		[ 30, 140],
		[ 30, 140],
		[ 30, 140],
		[ 30, 160],
		[ 30, 160],
		[ 30, 160],
		[ 30, 160]
	],
	oTradeBkVal:  {},
	oTradeBkVals: {},
	oTradeBkD:    {},
	oTradeBkMode: {},
	oTradeBkDur:  {},
	// log
	aLog:                    [],
	//--------------------------------------------------------------------------------------------------------------
	// Functions
	// Initialize
	Init: function() {
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
			// Hide topBar
			document.getElementById('topBar').style.display = 'none';
			document.getElementById('game').style.top       = 0;
			// Block ADs
			//document.getElementById('aqad').style.display = 'none';
			// Change Cookies in bank font size
			document.getElementById('cookies'          ).style.fontSize = '14pt';
			// Change NewsTicker font size
			document.getElementById('commentsText'     ).style.fontSize = '8pt';
			document.getElementById('commentsTextBelow').style.fontSize = '8pt';
			// Change Bank Balance span font size
			if (Game.Objects['Bank'].minigame) {
				document.getElementById('bankBalance'      ).style.fontSize = '10pt';
			}
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
			case 'BigCookie':    func = Game.ClickCookie.bind(this);       freq =    4; break;
			case 'SellGodzamok': func = this.SellGodzamokTimer.bind(this); freq = this.nSellGodzamokFreq; break;
			case 'AutoBuyZ':     func = this.BuyZ.bind(this);              freq = 1000; break;
			case 'ReRollGarden': func = this.ReRollGardenTimer.bind(this); freq =  300; break;
			case 'ReRollSugar':  func = this.ClickSugarTimer.bind(this);   freq =  500; break;
		}
		if (func) {
			//func();
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
	// Export
	WriteSave: function() {
		// V2.031 Bug? fix
		let oPantheon = Game.Objects['Temple'].minigame;
		if (oPantheon && (-1 in oPantheon.slot)) delete oPantheon.slot[-1];
		return Game.WriteSave(1);
	},
	//--------------------------------------------------------------------------------------------------------------
	// Log,popup,notify
	Notify: function(message, persist) {
		Game.Notify('Ele-CC ' + (persist ? 'report' : 'info'), message, 0, (persist ? 0 : 7));
		let dt    = new Date();
		let sTime =
			 dt.getFullYear()                               + '/' +
			(dt.getMonth() + 1).toString().padStart(2, '0') + '/' +
			(dt.getDate()     ).toString().padStart(2, '0') + ' ' +
			(dt.getHours()    ).toString().padStart(2, '0') + ':' +
			(dt.getMinutes()  ).toString().padStart(2, '0') + ':' +
			(dt.getSeconds()  ).toString().padStart(2, '0');
		this.aLog.push('[' + sTime + ']' + message);
	},
	GetLog: function() {
		let sResult = this.aLog.join('\r\n');
		this.aLog.splice(0);
		return sResult;
	},
	//--------------------------------------------------------------------------------------------------------------
	// 1Sec Timer
	SecTimer: function() {
		this.nSecCount = (this.nSecCount + 1) % 7200;
		if (this.Flags['Golden'])                                   this.ClickCookieGolden();
		if (this.Flags['GSwitch'])                                  this.ClickGoldenSwitch();
		if ((this.nSecCount % 2   == 0) && this.Flags['BuyEP'])     this.BuyEP();
		if ((this.nSecCount % 2   == 0) && this.Flags['Fortune'])   this.ClickFortune();
		if ((this.nSecCount % 2   == 0) && this.Flags['Dragon'])    this.ClickDragon();
		if ((this.nSecCount % 2   == 0) && this.Flags['Wrinkler'])  this.ClickWrinkler();
		if ((this.nSecCount % 2   == 0) && this.Flags['AutoCastT']) this.ClickSpellCheckTimer();
		if ((this.nSecCount % 2   == 0) && this.Flags['AutoBuyA'])  this.BuyA();
		if ((this.nSecCount % 60  == 0) && (this.Flags['AutoTrade']) && (this.Timers['ReRollGarden'] == 0) && (this.nGardenJuicerReRollCnt == 0) && (this.Timers['ReRollSugar'] == 0)) {
			this.AutoTradeTimer();
		}
		if  (this.nSecCount % 120 == 0) {
			if (this.Flags['Gardener']) {
				this.ClickGardener();
			} else if (Object.keys(this.oGardenerSetting).length) {
				this.oGardenerSetting = {};
			}
		}
		if ((this.nSecCount % 120 == 0) && (this.Flags['ReRollSugar']) && Game.canLumps() && (this.Timers['SellGodzamok'] == 0) && (this.Timers['AutoBuyZ'] == 0) && (this.Timers['ReRollGarden'] == 0) && (this.nGardenJuicerReRollCnt == 0) && (this.Timers['ReRollSugar'] == 0)) {
			let age = Date.now() - Game.lumpT;
			if (age >= Game.lumpMatureAge) {
				// Sugar type check
				switch (Game.lumpCurrentType) {
					case 1:  this.nSugarDesire1 = 2; break; // bifurcated
					case 2:  this.nSugarDesire1 = 7; break; // golden
					case 3:  this.nSugarDesire1 = 2; break; // meaty
					case 4:  this.nSugarDesire1 = 3; break; // caramelized
					default: this.nSugarDesire1 = 1;
				}
				this.nSugarDesire2   = this.nSugarDesire1 + Game.lumps;
				this.sSugarExp       = this.WriteSave();
				this.nSugarReRollCnt = 0;
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
						if (this.CastSpell('hand of fate', this.Flags['AutoCastD'])) {
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
	CastSpell: function(name, double) {
		let oGrimoire  = Game.Objects['Wizard tower'].minigame;
		if (oGrimoire && (oGrimoire.magic > oGrimoire.getSpellCost(oGrimoire.spells[name]))) {
			oGrimoire.castSpell(oGrimoire.spells[name]);
			let nLevel = Math.min(Math.floor(Game.Objects['Wizard tower'].level) - 1, 9);
			if (double && (oGrimoire.magic >= this.aDoubleCastMP[nLevel][0])) {
				let nSell = Game.Objects['Wizard tower'].amount - this.aDoubleCastMP[nLevel][1];
				Game.Objects['Wizard tower'].sell(nSell, 1);
				setTimeout(this.CastDouble, 700, name, nSell);
			}
			return true;
		} else
			return false;
	},
	CastDouble: function(name, buy) {
		let oGrimoire  = Game.Objects['Wizard tower'].minigame;
		if (oGrimoire) {
			oGrimoire.castSpell(oGrimoire.spells[name]);
			Game.Objects['Wizard tower'].buy(buy);
		}
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
				this.Notify('<b>Sell Godzamok</b> was done.<b>' + ((this.nSellGodzamokCnt + 1) / 2) + '</b> count' + (this.nSellGodzamokCnt > 1 ? 's' : '') + '!<br>' + Beautify(this.nSellGodzamokBeforeAmt) + '<br>' + Beautify(Game.cookies), true);
				this.oSellGodzamokAmount = {};
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
		if ((Game.UpgradesInStore.indexOf(Game.Upgrades['Elder Pledge']) != -1) && (!Game.Upgrades['Elder Pledge'].bought) && (this.Timers['ReRollGarden'] == 0) && (this.nGardenJuicerReRollCnt == 0) && (this.Timers['ReRollSugar'] == 0)) {
			Game.Upgrades['Elder Pledge'].buy();
			this.Notify('Auto-Buy <b>Elder Pledge</b>.', false);
		}
	},
	//--------------------------------------------------------------------------------------------------------------
	// Auto-Buy
	GetSynergy: function(me) { // from main.js
		let synergyBoost  = 0;
//		if (me.amount > 0) {
//			if (me.name == 'Grandma') {
//				for (let loop1 in Game.GrandmaSynergies) {
//					if (Game.Has(Game.GrandmaSynergies[loop1])) {
//						let other = Game.Upgrades[Game.GrandmaSynergies[loop1]].buildingTie;
//						let mult  = me.amount * 0.01 * (1 / (other.id - 1));
//						synergyBoost += (other.storedTotalCps * Game.globalCpsMult) - (other.storedTotalCps * Game.globalCpsMult) / (1 + mult);
//					}
//				}
//			} else if (me.name == 'Portal' && Game.Has('Elder Pact')) {
//				synergyBoost += (me.amount * 0.05 * Game.Objects['Grandma'].amount) * Game.globalCpsMult;
//			}
//			for (let loop1 in me.synergies) {
//				let it = me.synergies[loop1];
//				if (Game.Has(it.name)) {
//					let weight = 0.05;
//					let other  = it.buildingTie1;
//					if (me == it.buildingTie1) {
//						weight = 0.001;
//						other  = it.buildingTie2;
//					}
//					synergyBoost += (other.storedTotalCps * Game.globalCpsMult) - (other.storedTotalCps * Game.globalCpsMult) / (1 + me.amount * weight);
//				}
//			}
//		}
		if (me.amount == 0) 
			synergyBoost = me.baseCps;
		else if (synergyBoost == 0) 
//			synergyBoost = me.storedTotalCps * Game.globalCpsMult / me.amount;
			synergyBoost = me.cps(me);
		else
			synergyBoost = synergyBoost / me.amount;
		return synergyBoost;
	},
	BuyA: function() {
		if (this.Timers['SellGodzamok'] == 0) {
			// Upgrades
			let nPrice        = 0;
			let nWishUpgPrice = 0;
			let sWishUpgName  = '';
//			// Buildings
//			for (const loop1 in Game.UpgradesInStore) {
//				let me = Game.UpgradesInStore[loop1];
//				if (!me.isVaulted() && (me.pool != 'toggle') && (me.pool != 'tech')) {
//					nPrice = me.getPrice();
//					if ((nPrice > Game.cookies) && (nPrice < Game.cookies * this.nBuyAUpgradeRate) && (nWishUpgPrice == 0)) {
//						nWishUpgPrice = nPrice;
//						sWishUpgName  = me.name;
//					} else if (nPrice < Game.cookies) {
//						me.buy(1);
////						this.Notify('Auto-Buy <b>' + me.name + '</b>.', false);
//					}
//				}
//			}
			if (nWishUpgPrice == 0) {
				// Buildings
				let maxName    = '';
				let maxPerf    = 0;
				for (const loop1 in Game.ObjectsById) {
					let me = Game.ObjectsById[loop1];
					if (!me.locked) {
						if (maxPerf == 0) {
							maxName = me.name;
							maxPerf = (me.amount == 0) ? 1 : (this.GetSynergy(me) * 10e15 / me.price);
						} else {
							let thisPerf = (this.GetSynergy(me) * 10e15 / me.price);
							if (maxPerf < thisPerf) {
								maxName = me.name;
								maxPerf = thisPerf;
							}
						}
					}
				}
				if (maxName != '') {
					if (Game.Objects[maxName].price < Game.cookies) {
						Game.Objects[maxName].buy(1);
//						this.Notify('Auto-Buy <b>' + maxName + '</b>.', false);
					} else {
						this.thinking = 'I want to buy <b>' + maxName + '(' + Beautify(Game.Objects[maxName].price) + ')</b>...';
					}
				}
			} else {
				this.thinking = 'I want to buy <b>' + sWishUpgName + '(' + Beautify(nWishUpgPrice) + ')</b>...';
			}
		}
	},
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
				this.thinking = 'Want to buy <b>' + sWishUpgName + '(' + Beautify(nWishUpgPrice) + ')</b>...';
			}
			if (!bBought) this.TimerStop('AutoBuyZ');
		}
	},
	//--------------------------------------------------------------------------------------------------------------
	// Garden maintenance
	GardenPlant: function(x, y) {
		let oGarden = Game.Objects['Farm'].minigame;
		if ((oGarden) && (x + '_' + y in this.oGardenerSetting)) {
			if (this.oGardenerSetting[x + '_' + y] == 'queenbeetLump') {
				delete this.oGardenerSetting[x + '_' + y];
			} else {
				oGarden.useTool(oGarden.plants[this.oGardenerSetting[x + '_' + y]].id, x, y);
			}
		}
	},
	ClickGardener: function() {
		let oGarden = Game.Objects['Farm'].minigame;
		if (oGarden) {
			if (!Object.keys(this.oGardenerSetting).length) {
				for (let loop1 = 0; loop1 < 6; loop1++) {
					for (let loop2 = 0; loop2 < 6; loop2++) {
						let tile = oGarden.getTile(loop1, loop2);
						if (tile[0] > 0) this.oGardenerSetting[loop1 + '_' + loop2] = oGarden.plantsById[tile[0] - 1].key;
					}
				}
			}
			for (let loop1 = 0; loop1 < 6; loop1++) {
				for (let loop2 = 0; loop2 < 6; loop2++) {
					let aTile = oGarden.getTile(loop1, loop2);
					let sKey  = this.oGardenerSetting[loop1 + '_' + loop2];
					if (this.aGardenEffect.includes(sKey) || this.aGardenDrop.includes(sKey)) {
						if (aTile[0] > 0) {
							let oType = oGarden.plantsById[aTile[0] - 1];
							if ((aTile[0] - 1) != oGarden.plants[this.oGardenerSetting[loop1 + '_' + loop2]].id) {
								if (oType.unlocked) {
									oGarden.harvest(loop1, loop2);
									this.GardenPlant(loop1, loop2);
								} else {
									this.oGardenerSetting[loop1 + '_' + loop2] = oType.key;
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
							delete this.oGardenerSetting[loop1 + '_' + loop2];
						} else if ((!this.oGardenerSetting[loop1 + '_' + loop2]) && (!oType.unlocked)) {
							this.oGardenerSetting[loop1 + '_' + loop2] = oType.key;
						} else if ((aTile[1] + Math.ceil(oType.ageTick + oType.ageTickR)) >= 100) {
							oGarden.harvest(loop1, loop2);
							delete this.oGardenerSetting[loop1 + '_' + loop2];
						}
					}
				}
			}
		}
	},
	ClickGardenerStop: function() {
		this.oGardenerSetting    = {};
		this.Flags['Gardener'] = false;
	},
	// ReRoll garden for drop
	ReRollGardenerOnce: function(savedata) {
		if (!this.Flags['Gardener']) {
			// ReRoll
			Game.ImportSaveCode(savedata);
			// Clear Garrdener setting 
			this.oGardenerSetting = {};
			// Garden check
			this.ClickGardener();
			// Clear Garrdener setting 
			this.oGardenerSetting = {};
		}
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
				this.nGardenReRollCnt = 0;
				this.TimerStart('ReRollGarden');
			} else if (this.Timers['ReRollGarden'] > 0) {
				this.TimerStop('ReRollGarden');
				this.Notify('Garden ReRoll count: ' + this.nGardenReRollCnt, false);
				this.AutoTradeRestore(this.nGardenReRollCnt > 0);
				this.oGardenReRollSet = {};
				this.sGardenReRollExp = '';
				this.nGardenReRollCnt = 0;
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
			this.Notify('Garden ReRoll count: ' + this.nGardenReRollCnt, false);
			this.AutoTradeRestore(this.nGardenReRollCnt > 0);
			this.oGardenReRollSet = {};
			this.sGardenReRollExp = '';
			this.nGardenReRollCnt = 0;
		} else {
			// ReRoll
			if (this.nGardenReRollCnt == 0) this.AutoTradeBackup();
			this.nGardenReRollCnt++;
			Game.ImportSaveCode(this.sGardenReRollExp);
		}
	},
	//--------------------------------------------------------------------------------------------------------------
	// Check & ReRoll garden for JuicyQueenbeat
	GardenJuicerStart: function() {
		let oGarden = Game.Objects['Farm'].minigame;
		if (oGarden && (!this.Flags['GardenJuicer']) && (this.Timers['GardenJuicer'] == 0)) {
			this.Flags['GardenJuicer']  = true;
			this.oGardenJuicerSet       = {};
			this.sGardenJuicerExp       = '';
			this.nGardenNextStep        = oGarden.nextStep;
			this.nGardenJuicerReRollCnt = 0;
			this.Timers['GardenJuicer'] = setTimeout(this.GardenJuicerTimer.bind(this), this.nGardenJuicerFreqMain);
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
						if (aTileId[loop1 + 1][loop2 + 1] > 0) {
							oGarden.harvest(loop1 + 1, loop2 + 1);
							let sKey = (loop1 + 1) + '_' + (loop2 + 1);
							if ((Object.keys(this.oGardenerSetting).length) && (sKey in this.oGardenerSetting)) delete this.oGardenerSetting[sKey];
						}
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
					this.oGardenerSetting = {};
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
						this.sGardenJuicerExp     = this.WriteSave();
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
					} else if (nTotal == 0) {
						bResult = true;
					} else if (this.aGardenJuicerTarget.includes('queenbeet')) {
						bResult = (nMax - nMin < this.nGardenJuicerQBrange);
					} else {
						bResult = (nCnt >= Math.ceil(nTotal / 2));
					}
					if (bResult) {
						this.Notify((this.nGardenJuicerReRollCnt > 400 ? 'Hmmm...' : '') + 'Garden Juicer ReRoll count: ' + this.nGardenJuicerReRollCnt, false);
						this.AutoTradeRestore(this.nGardenJuicerReRollCnt > 0);
					}
				}
				if (bResult) {
					this.oGardenJuicerSet       = {};
					this.sGardenJuicerExp       = '';
					this.nGardenJuicerReRollCnt = 0;
					this.nGardenNextStep        = oGarden.nextStep;
				} else {
					// ReRoll
					if (this.nGardenJuicerReRollCnt == 0) this.AutoTradeBackup();
					this.nGardenJuicerReRollCnt++;
					Game.ImportSaveCode(this.sGardenJuicerExp);
				}
			}
			this.Timers['GardenJuicer'] = setTimeout(this.GardenJuicerTimer.bind(this), (bResult ? this.nGardenJuicerFreqMain : this.nGardenJuicerFreqReRoll));
		} else {
			this.Timers['GardenJuicer'] = 0;
			this.AutoTradeRestore(false);
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
	GrimoireGetChange: function() {
		return (Game.season == 'easter' || Game.season == 'valentines') ? 1 : 0;
	},
	GrimoireIsFall: function(lMath, spell, obj) {
		let obj1       = obj || {};
		let oGrimoire  = Game.Objects['Wizard tower'].minigame;
		let failChance = oGrimoire.getFailChance(spell);
		if (typeof obj1.failChanceSet  !== 'undefined') failChance =  obj1.failChanceSet;
		if (typeof obj1.failChanceAdd  !== 'undefined') failChance += obj1.failChanceAdd;
		if (typeof obj1.failChanceMult !== 'undefined') failChance *= obj1.failChanceMult;
		if (typeof obj1.failChanceMax  !== 'undefined') failChance =  Math.max(failChance, obj1.failChanceMax);
		return ((!spell.fail || (lMath.random() < (1 - failChance))) ? true : false);
	},
	GrimoireHand: {
		failFunc: function(fail) {
			return fail + 0.15 * Game.shimmerTypes['golden'].n;
		},
		win: function(lMath, cycle) {
			lMath.random();lMath.random();					// by shimmer.initFunc
			for(let loop1 = 0;loop1 < cycle; loop1++) lMath.random();	// by PlaySound or season shimmer
			let choices = [];
			choices.push('frenzy', 'lucky');
			if (!Game.hasBuff('Dragonflight'))                      choices.push('click frenzy');
			if (lMath.random() < 0.1)                               choices.push('cookie storm', 'cookie storm', 'blab');
			if (Game.BuildingsOwned >= 10 && lMath.random() < 0.25) choices.push('building special');
			if (lMath.random() < 0.15)                              choices = ['cookie storm drop'];
			if (lMath.random() < 0.0001)                            choices.push('free sugar lump');
			return choices[Math.floor(lMath.random() * choices.length)];
		},
		fail: function(lMath, cycle) {
			lMath.random();lMath.random();					// by shimmer.initFunc
			for(let loop1 = 0;loop1 < cycle; loop1++) lMath.random();	// by PlaySound or season shimmer
			let choices = [];
			choices.push('clot', 'ruin cookies');
			if (lMath.random() < 0.1)   choices.push('cursed finger', 'elder frenzy');
			if (lMath.random() < 0.003) choices.push('free sugar lump');
			if (lMath.random() < 0.1)   choices = ['blab'];
			return choices[Math.floor(lMath.random() * choices.length)];
		}
	},
	spellCheckHand: function(next, change) {
		let oGrimoire  = Game.Objects['Wizard tower'].minigame;
		if (oGrimoire) {
			let oLocalMath = Object.create(Math);
			oLocalMath.seedrandom(Game.seed + '/' + (oGrimoire.spellsCastTotal + next - 1));
			return this.GrimoireIsFall(oLocalMath, this.GrimoireHand) ? this.GrimoireHand.win(oLocalMath, change) : this.GrimoireHand.fail(oLocalMath, change);
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
	ClickSpellCheckTimer: function() {
		let oGrimoire  = Game.Objects['Wizard tower'].minigame;
		if (oGrimoire) {
			if ((!this.Flags['AutoCast1']) && (!this.Flags['AutoCast2']) && (oGrimoire.magic > oGrimoire.getSpellCost(oGrimoire.spells['hand of fate'])) && (oGrimoire.magic == oGrimoire.magicM)) {
				let spellResult1  = this.spellCheckHand(1, this.GrimoireGetChange());
				let spellResult2  = this.spellCheckHand(2, this.GrimoireGetChange());
				let bCanDouble    = (oGrimoire.magic > oGrimoire.getSpellCost(oGrimoire.spells['hand of fate']) + this.aDoubleCastMP[Math.min(Math.floor(Game.Objects['Wizard tower'].level) - 1, 9)][0])
				//let spellResult1C = this.spellCheckHand(1, 1);
				//let spellResult2C = this.spellCheckHand(2, 1);
				//if (((spellResult1C == 'click frenzy') || (spellResult2C == 'click frenzy') || (spellResult1C == 'building special') || (spellResult2C == 'building special')) &&
				//     (spellResult1  != 'click frenzy') && (spellResult2  != 'click frenzy') && (spellResult1C != 'building special') && (spellResult2C == 'building special')) {
				//	spellResult1 = spellResult1C;
				//	spellResult2 = spellResult2C;
				//	if (Game.chimeType == 0) Game.chimeType = 1;
				//} else if (Game.chimeType == 1) {
				//	Game.chimeType = 0;
				//}
				let sMsg          = '';
				if ((spellResult1 == 'building special') || (spellResult1 == 'frenzy')) {
					if ((spellResult2 == 'click frenzy') && bCanDouble) {
						this.Flags['AutoCast2'] = true;
						this.Flags['AutoCastD'] = true;
					} else {
						this.Flags['AutoCast1'] = true;
						this.Flags['AutoCastD'] = (bCanDouble && (spellResult2 == 'building special'));
					}
				} else if ((spellResult1 == 'click frenzy') || (spellResult1 == 'elder frenzy')) {
					this.Flags['AutoCast2'] = true;
					this.Flags['AutoCastD'] = (bCanDouble && ((spellResult2 == 'building special') || (spellResult2 == 'frenzy') || (((spellResult2 == 'click frenzy') || (spellResult2 == 'elder frenzy')) && (spellResult1 != spellResult2))));
				} else {
					this.CastSpell(oGrimoire.getSpellCost(oGrimoire.spells['hand of fate']) < oGrimoire.getSpellCost(oGrimoire.spells['haggler\'s charm']) ? 'hand of fate' : 'haggler\'s charm', false);
					sMsg = 'Hahaha...';
				}
				if (!sMsg) sMsg = 'Maybe I can cast <b>' + spellResult1 + (this.Flags['AutoCastD'] ? ' and ' + spellResult2 : '') + '</b>';
				this.Notify(sMsg, false);
			}
			// Auto Cast spell(2)
			if (this.Flags['AutoCast2']) {
				if (this.AnyHasBuff(this.aAutoCastTarget) && 
				    (!this.AnyHasBuff(['Clot', 'Dragonflight', 'Click frenzy', 'Elder frenzy'])) &&
				    (this.Timers['ReRollGarden'] == 0) && (this.nGardenJuicerReRollCnt == 0)) {
					if (this.CastSpell('hand of fate', this.Flags['AutoCastD'])) {
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
		if (this.nSugarDesire2 <= Game.lumps) {
			// Rigidel restore
			this.TimerStop('ReRollSugar');
			this.Notify('I got ' + this.nSugarDesire1 + ' sugar' + (this.nSugarDesire1 > 1 ? 's' : '') + '! (ReRoll count: ' + this.nSugarReRollCnt + ')', false);
			this.AutoTradeRestore(this.nSugarReRollCnt > 0);
			this.nSugarDesire1   = 0;
			this.nSugarDesire2   = 0;
			this.sSugarExp       = '';
			this.nSugarReRollCnt = 0;
		} else {
			// ReRoll
			if (this.nSugarReRollCnt == 0) this.AutoTradeBackup();
			this.nSugarReRollCnt++;
			Game.ImportSaveCode(this.sSugarExp);
		}
	},
	//--------------------------------------------------------------------------------------------------------------
	// Auto-Trade
	AutoTradeTimer: function() {
		let oMarket = Game.Objects['Bank'].minigame;
		if (oMarket) {
			let sResult = '';
			for (const loop1 in oMarket.goodsById) {
				let oGoods  = oMarket.goodsById[loop1];
				let nAction = 0;   // 1: Buy, 2: Sell
				let bType2  = (Array.isArray(oGoods.vals) && (oGoods.vals.length >= 4) && (oMarket.brokers > 60));
//				if (Array.isArray(oGoods.vals) && oGoods.vals.length > 20) {
//					let avg_all  = oGoods.vals.reduce((a, b) => a + b, 0) / oGoods.vals.length;
//					let avg_near = oGoods.vals.slice(0,10).reduce((a, b) => a + b, 0) / oGoods.vals.slice(0, 10).length;
//					if (avg_all < avg_near) {
//						// Golden Cross?
//						nAction = 1;
//					} else {
//						// Dead Cross?
//						nAction = 2;
//					}
//				} else {
					// first version
					if (oGoods.stock == 0)  {
						if ((oMarket.getGoodPrice(oGoods) <= this.aTradeBaseAmount[loop1][0]) && (oMarket.goodDelta(loop1) >= 0))
							nAction = 1;
						else if (bType2 && (oMarket.getGoodPrice(oGoods) < this.aTradeBaseAmount[loop1][1])) {
							if ((oGoods.vals[0] > oGoods.vals[1]) && (oGoods.vals[1] > oGoods.vals[2]) && (oGoods.vals[2] > oGoods.vals[3])) nAction = 1;
						}
					} else {
						if ((oMarket.getGoodPrice(oGoods) > this.aTradeBaseAmount[loop1][1]) && (oMarket.goodDelta(loop1) < 0))
							nAction = 2;
						else if (bType2 && (oMarket.getGoodPrice(oGoods) > this.aTradeBaseAmount[loop1][0])) {
							if ((oGoods.vals[0] < oGoods.vals[1]) && (oGoods.vals[1] < oGoods.vals[2]) && (oGoods.vals[2] < oGoods.vals[3])) nAction = 2;
						}
					}
//				}
				switch (nAction) {
					case 1:
						oMarket.buyGood(loop1, oMarket.getGoodMaxStock(oGoods));
						sResult = sResult + (sResult == '' ? '' : '<br>') + 'Auto-Trade buy '  + oGoods.symbol + '(' + Beautify(oMarket.getGoodPrice(oGoods), 2) + ')';
						break;
					case 2:
						oMarket.sellGood(loop1, oGoods.stock);
						sResult = sResult + (sResult == '' ? '' : '<br>') + 'Auto-Trade sell ' + oGoods.symbol + '(' + Beautify(oMarket.getGoodPrice(oGoods), 2) + ')';
						break;
				}
			}
			if (sResult != '') {
				oMarket.toRedraw = 2;
				this.Notify(sResult, false);
			}
		}
	},
	//--------------------------------------------------------------------------------------------------------------
	// Price histories Backup/Restore
	AutoTradeBackup: function() {
		this.oTradeBkVal  = {};
		this.oTradeBkVals = {};
		this.oTradeBkD    = {};
		this.oTradeBkMode = {};
		this.oTradeBkDur  = {};
		let oMarket = Game.Objects['Bank'].minigame;
		if (oMarket) {
			for (const loop1 in oMarket.goodsById) {
				let oGoods = oMarket.goodsById[loop1];
				this.oTradeBkVal[loop1]  = oGoods.val;
				this.oTradeBkVals[loop1] = [].concat(oGoods.vals);
				this.oTradeBkD[loop1]    = oGoods.d;
				this.oTradeBkMode[loop1] = oGoods.mode;
				this.oTradeBkDur[loop1]  = oGoods.dur;
			}
		}
	},
	AutoTradeRestore: function(chk) {
		let oMarket = Game.Objects['Bank'].minigame;
		if (oMarket && this.oTradeBkVals && chk) {
			for (const loop1 in oMarket.goodsById) {
				let oGoods = oMarket.goodsById[loop1];
				oGoods.val  = this.oTradeBkVal[loop1];
				oGoods.vals = [].concat(this.oTradeBkVals[loop1]);
				oGoods.d    = this.oTradeBkD[loop1];
				oGoods.mode = this.oTradeBkMode[loop1];
				oGoods.dur  = this.oTradeBkDur[loop1];
			}
			oMarket.toRedraw  = 2;
		}
		this.oTradeBkVal  = {};
		this.oTradeBkVals = {};
		this.oTradeBkD    = {};
		this.oTradeBkMode = {};
		this.oTradeBkDur  = {};
	},
	//--------------------------------------------------------------------------------------------------------------
	// Test
	EleCCTest: function() {
		this.Notify(this.thinking + '<br>' + 
			this.spellCheckHand(1, this.GrimoireGetChange()) + ':' + this.spellCheckHand(2, this.GrimoireGetChange()) + '<br>' +
			this.Flags['AutoCast1'] + ':' + this.Flags['AutoCast2'] + ':' + this.Flags['AutoCastD'],
			false);
	}
};
oEleCC.Init();
