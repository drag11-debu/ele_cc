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
	Init: () => {
		// Hide topBar
		document.getElementById('topBar').style.display = 'none';
		document.getElementById('game').style.top       = 0;
		// Block ADs
		//document.getElementById('aqad').style.display = 'none';
		// Change NewsTicker font size
		document.getElementById('commentsText'     ).style.fontSize = '8pt';
		document.getElementById('commentsTextBelow').style.fontSize = '8pt';
		// Initialize
		oEleCC.oLocalMath = Object.create(Math);
		// Init timer
		oEleCC.TimerStart('Init');
	},
	InitTimer: () => {
		if (Game.Win && Game.Notify) {
			// Init objects
			// I'm Third-party!
			Game.Win('Third-party');
			// Stop Init timer
			oEleCC.TimerStop('Init');
			// Start 1Sec Timer
			oEleCC.TimerStart('SecTimer');
			// Welcome message
			oEleCC.Notify('Hello.', false);
		}
	},
	//--------------------------------------------------------------------------------------------------------------
	// Timer
	TimerStart: (name) => {
		let func;
		let freq;
		switch (name) {
			case 'Init':         func = oEleCC.InitTimer;         freq =  500; break;
			case 'SecTimer':     func = oEleCC.SecTimer;          freq =  500; break;
			case 'BigCookie':    func = Game.ClickCookie;         freq =    4; break;
			case 'SellGodzamok': func = oEleCC.SellGodzamokTimer; freq = oEleCC.nSellGodzamokFreq; break;
			case 'AutoBuyZ':     func = oEleCC.BuyZ;              freq = 1000; break;
			case 'ReRollGarden': func = oEleCC.ReRollGardenTimer; freq =  300; break;
			case 'ReRollSugar':  func = oEleCC.ClickSugarTimer;   freq =  500; break;
		}
		if (func) {
			func();
			if(oEleCC.Timers[name] == 0) oEleCC.Timers[name] = setInterval(func, freq);
		}
	},
	TimerStop: (name) => {
		if (oEleCC.Timers[name] > 0) {
			clearInterval(oEleCC.Timers[name]);
			oEleCC.Timers[name] = 0; 
		}
	},
	//--------------------------------------------------------------------------------------------------------------
	// Log,popup,notify
	Notify: (message, persist) => {
		Game.Notify('Ele-CC ' + (persist ? 'report' : 'info'), message, 0, (persist ? 0 : 7));
	},
	//--------------------------------------------------------------------------------------------------------------
	// 1Sec Timer
	SecTimer: () => {
		oEleCC.nSecCount = (oEleCC.nSecCount + 1) % 7200;
		if (oEleCC.Flags['Golden'])                                     oEleCC.ClickCookieGolden();
		if (oEleCC.Flags['GSwitch'])                                    oEleCC.ClickGoldenSwitch();
		if ((oEleCC.nSecCount % 2   == 0) && oEleCC.Flags['BuyEP'])     oEleCC.BuyEP();
		if ((oEleCC.nSecCount % 2   == 0) && oEleCC.Flags['Fortune'])   oEleCC.ClickFortune();
		if ((oEleCC.nSecCount % 2   == 0) && oEleCC.Flags['Dragon'])    oEleCC.ClickDragon();
		if ((oEleCC.nSecCount % 2   == 0) && oEleCC.Flags['Wrinkler'])  oEleCC.ClickWrinkler();
		if ((oEleCC.nSecCount % 2   == 0) && oEleCC.Flags['AutoCastT']) oEleCC.ClickSpellCheckTimer();
		if  (oEleCC.nSecCount % 120 == 0) {
			if (oEleCC.Flags['Gardener']) {
				oEleCC.ClickGardener();
			} else if (Object.keys(oEleCC.oGardenSetting).length) {
				oEleCC.oGardenSetting = {};
			}
		}
		if ((oEleCC.nSecCount % 120 == 0) && (oEleCC.Flags['ReRollSugar']) && Game.canLumps() && (oEleCC.Timers['SellGodzamok'] == 0) && (oEleCC.Timers['AutoBuyZ'] == 0) && (oEleCC.Timers['ReRollGarden'] == 0) && (oEleCC.nGardenJuicerReRollCnt == 0) && (oEleCC.Timers['ReRollSugar'] == 0)) {
			let age = Date.now() - Game.lumpT;
			if ((age >= Game.lumpMatureAge) && (age < Game.lumpRipeAge)) {
				// Sugar type check
				switch (Game.lumpCurrentType) {
					case 1:  oEleCC.nSugarDesire = 2; break; // bifurcated
					case 2:  oEleCC.nSugarDesire = 7; break; // golden
					case 3:  oEleCC.nSugarDesire = 2; break; // meaty
					case 4:  oEleCC.nSugarDesire = 3; break; // caramelized
					default: oEleCC.nSugarDesire = 1;
				}
				oEleCC.nSugarDesire += Game.lumps;
				// Rigidel check
				oEleCC.bRigidel     =  false;
				oEleCC.nRigidelSell =  0;
				oEleCC.nPrevGod     =  -1;
//				let oPantheon = Game.Objects['Temple'].minigame;
//				if (oPantheon && (!Game.hasGod('order')) && (oPantheon.swaps >= 2)) {
//					oEleCC.bRigidel = true;
//					oEleCC.nPrevGod = oPantheon.slot[0];
//					oPantheon.slotGod(oPantheon.gods['order'], 0);
//					if (Game.BuildingsOwned % 10) {
//						oEleCC.nRigidelSell = Game.BuildingsOwned % 10;
//						Game.Objects[oEleCC.sRigidelSell].sell(oEleCC.nRigidelSell);
//					}
//					Game.computeLumpTimes();
//				}
				oEleCC.sSugarExp    =  Game.WriteSave(1);
				oEleCC.TimerStart('ReRollSugar');
			}
		}
	},
	//--------------------------------------------------------------------------------------------------------------
	// Golden cookies,reindeeres
	ClickCookieGolden: () => {
		for (const loop1 in Game.shimmers) Game.shimmers[loop1].pop();
	},
	//--------------------------------------------------------------------------------------------------------------
	// Golden switch -> Sell Godzamok, AutoCast spell(1)
	ClickGoldenSwitch: () => {
		if (Game.Has('Golden switch [off]') || Game.Has('Golden switch [on]')) {
			let isClickBuffStarting = (oEleCC.IsBuffStarting('Dragonflight', 22) || oEleCC.IsBuffStarting('Click frenzy', 29) || oEleCC.IsBuffStarting('Elder frenzy', 14));
			let hasClickBuff        = ((oEleCC.GetBuffTime('Dragonflight') > 0)  || (oEleCC.GetBuffTime('Click frenzy') > 0)  || (oEleCC.GetBuffTime('Elder frenzy') > 0));
			if (isClickBuffStarting) {
				if (!Game.Upgrades['Golden switch [off]'].bought) {
					Game.Upgrades['Golden switch [off]'].buy();
					oEleCC.Notify('Changed Golden switch to <b>on</b>', false);
					// Sell Godzamok
					if (oEleCC.Flags['SellGodzamok']) {
						Game.storeBulkButton(0);
						setTimeout(oEleCC.SellGodzamok, 100);
					}
					// Auto Cast spell(1)
					if (oEleCC.Flags['AutoCast1'] && (!Game.hasBuff('Clot'))) {
						if (oEleCC.CastSpell('hand of fate')) {
							oEleCC.Flags['AutoCast1'] = false;
							oEleCC.Flags['AutoCastD'] = false;
							oEleCC.Notify('Bibbidi-bobbidi...poo...', false);
						}
					}
				}
			} else if (!hasClickBuff) {
				if (!Game.Upgrades['Golden switch [on]' ].bought) {
					Game.Upgrades['Golden switch [on]' ].buy();
					oEleCC.Notify('Changed Golden switch to <b>off</b>', false);
				}
			}
		}
	},
	//--------------------------------------------------------------------------------------------------------------
	// Buffs
	GetBuffTime: (buffName) => {
		return Game.hasBuff(buffName) ? Game.hasBuff(buffName).time : 0;
	},
	IsBuffStarting: (buffName, buffBaseTime) => {
		return (oEleCC.GetBuffTime(buffName) >= ((buffBaseTime - 1) * Game.fps));
	},
	AnyHasBuff: (aName) => {
		for (const loop1 of aName) if (Game.hasBuff(loop1)) return true;
		return false;
	},
	//--------------------------------------------------------------------------------------------------------------
	// Cast Spell
	CastSpell: (name) => {
		let oGrimoire  = Game.Objects['Wizard tower'].minigame;
		if (oGrimoire && (oGrimoire.magic > oGrimoire.getSpellCost(oGrimoire.spells[name]))) {
			oGrimoire.castSpell(oGrimoire.spells[name]);
			return true;
		} else
			return false;
	},
	//--------------------------------------------------------------------------------------------------------------
	// Sell Godzamok
	SellGodzamok: () => {
		let oPantheon = Game.Objects['Temple'].minigame;
		if (oPantheon && Game.hasGod('ruin') && (!Game.hasBuff('Clot')) && (oEleCC.Timers['SellGodzamok'] == 0)) {
			oEleCC.nSellGodzamokBeforeAmt = Game.cookies;
			oEleCC.nSellGodzamokCnt       = 0;
			oEleCC.oSellGodzamokAmount    = {};
			for (const loop1 of oEleCC.aSellGodzamokTarget) {
				oEleCC.oSellGodzamokAmount[loop1] = Game.Objects[loop1].amount - ((loop1 == 'Farm') || (loop1 == 'Bank') ? 301 : 1);
			}
			if (Object.keys(oEleCC.oSellGodzamokAmount).length) {
				oEleCC.TimerStart('SellGodzamok');
			}
			oEleCC.Notify('<b>Sell Godzamok</b> started.', false);
		}
	},
	SellGodzamokTimer: () => {
		oEleCC.nSellGodzamokCnt++;
		if (oEleCC.nSellGodzamokCnt % 2 == 1) {
			if ((oEleCC.GetBuffTime('Dragonflight') <= 10) && (oEleCC.GetBuffTime('Click frenzy') <= 10) && (oEleCC.GetBuffTime('Elder frenzy') <= 10)) {
				oEleCC.TimerStop('SellGodzamok');
				oEleCC.oSellGodzamokAmount = {};
				oEleCC.Notify('<b>Sell Godzamok</b> was done.<b>' + ((oEleCC.nSellGodzamokCnt + 1) / 2) + '</b> count' + (oEleCC.nSellGodzamokCnt > 1 ? 's' : '') + '!<br>' + Beautify(oEleCC.nSellGodzamokBeforeAmt) + '<br>' + Beautify(Game.cookies), true);
				if (oEleCC.Flags['AutoBuyZ']) oEleCC.TimerStart('AutoBuyZ');
			} else {
				for (const loop1 of oEleCC.aSellGodzamokTarget) {
					if ((oEleCC.oSellGodzamokAmount[loop1] > 0) && (Game.Objects[loop1].amount >= oEleCC.oSellGodzamokAmount[loop1])) Game.Objects[loop1].sell(oEleCC.oSellGodzamokAmount[loop1], 1);
				}
			}
		} else {
			for (const loop1 of oEleCC.aSellGodzamokTarget) {
				if (oEleCC.oSellGodzamokAmount[loop1] > 0) Game.Objects[loop1].buy(oEleCC.oSellGodzamokAmount[loop1]);
			}
		}
	},
	//--------------------------------------------------------------------------------------------------------------
	// Click Dragon
	AllHasCheck: (aItems) => {
		let bResult = true;
		for (const loop1 of aItems) if (!Game.Has(loop1)) bResult = false;
		return bResult;
	},
	ClickDragon: () => {
		if (oEleCC.AllHasCheck(oEleCC.aClickDragonHasCheck)) {
			oEleCC.Notify('All Dragon upgrade are belong to us.', false);
			oEleCC.Flags['Dragon'] = false;
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
	ClickFortune: () => {
		if (oEleCC.AllHasCheck(oEleCC.aClickFortuneHasCheck)) {
			oEleCC.Notify('All Fortune upgrade are belong to us.', false);
			oEleCC.Flags['Fortune'] = false;
		} else if (Game.TickerEffect && (Game.TickerEffect.type == 'fortune')) {
			Game.tickerL.click();
		}
	},
	//--------------------------------------------------------------------------------------------------------------
	// Click Wrinkler
	ClickWrinkler: () => {
		for (const loop1 of Game.wrinklers) if (loop1.close==1) loop1.hp = 0;
	},
	//--------------------------------------------------------------------------------------------------------------
	// Auto-Buy Elder Pledge
	BuyEP: () => {
		if ((Game.UpgradesInStore.indexOf(Game.Upgrades['Elder Pledge']) != -1) && (!Game.Upgrades['Elder Pledge'].bought)) {
			Game.Upgrades['Elder Pledge'].buy();
			oEleCC.Notify('Auto-Buy <b>Elder Pledge</b>.', false);
		}
	},
	//--------------------------------------------------------------------------------------------------------------
	// Auto-Buy Plan Z
	BuyZ: () => {
		if (oEleCC.Timers['SellGodzamok'] == 0) {
			// Upgrades
			let nPrice        = 0;
			let nWishUpgPrice = 0;
			let sWishUpgName  = '';
			let bBought       = false;
			for (const loop1 in Game.UpgradesInStore) {
				let me = Game.UpgradesInStore[loop1];
				if (!me.isVaulted() && (me.pool != 'toggle') && (me.pool != 'tech')) {
					nPrice = me.getPrice();
					if ((nPrice > Game.cookies) && (nPrice < Game.cookies * oEleCC.nBuyZWishRate) && (nWishUpgPrice == 0)) {
						nWishUpgPrice = nPrice;
						sWishUpgName  = me.name;
					} else if (nPrice * oEleCC.nBuyZUpgradeRate < Game.cookies) {
						me.buy(1);
						bBought = true;
						oEleCC.Notify('Auto-Buy <b>' + me.name + '</b>.', false);
					}
				}
			}
			if (nWishUpgPrice == 0) {
				// Buildings 1
				let sCheapTarget = oEleCC.aBuyZTarget1[0];
				let nCheapPrice  = Game.Objects[oEleCC.aBuyZTarget1[0]].price;
				for (const loop1 of oEleCC.aBuyZTarget1) {
					if (nCheapPrice > Game.Objects[loop1].price) {
						nCheapPrice  = Game.Objects[loop1].price;
						sCheapTarget = loop1;
					}
				}
				if (nCheapPrice * oEleCC.nBuyZTarget1Rate < Game.cookies) {
					Game.Objects[sCheapTarget].buy(1);
					bBought = true;
					oEleCC.Notify('Auto-Buy <b>' + sCheapTarget + '</b>.', false);
				} else {
					// Buildings 2
					sCheapTarget = oEleCC.aBuyZTarget2[0];
					nCheapPrice  = Game.Objects[oEleCC.aBuyZTarget2[0]].price;
					for (const loop1 of oEleCC.aBuyZTarget2) {
						if (nCheapPrice > Game.Objects[loop1].price) {
							nCheapPrice  = Game.Objects[loop1].price;
							sCheapTarget = loop1;
						}
					}
					if (nCheapPrice * oEleCC.nBuyZTarget2Rate < Game.cookies) {
						Game.Objects[sCheapTarget].buy(1);
						bBought = true;
						oEleCC.Notify('Auto-Buy <b>' + sCheapTarget + '</b>.', false);
					}
					// Buildings 3
					sCheapTarget = oEleCC.aBuyZTarget3[0];
					nCheapPrice  = Game.Objects[oEleCC.aBuyZTarget3[0]].price;
					for (const loop1 of oEleCC.aBuyZTarget3) {
						if (nCheapPrice > Game.Objects[loop1].price) {
							nCheapPrice  = Game.Objects[loop1].price;
							sCheapTarget = loop1;
						}
					}
					if (nCheapPrice * oEleCC.nBuyZTarget3Rate < Game.cookies) {
						Game.Objects[sCheapTarget].buy(1);
						bBought = true;
						oEleCC.Notify('Auto-Buy <b>' + sCheapTarget + '</b>.', false);
					}
				}
			} else {
				oEleCC.Notify('Want to buy <b>' + sWishUpgName + '(' + Beautify(nWishUpgPrice) + ')</b>...', true);
			}
			if (!bBought) oEleCC.TimerStop('AutoBuyZ');
		}
	},
	//--------------------------------------------------------------------------------------------------------------
	// Garden maintenance
	ClickGardener: () => {
		let oGarden = Game.Objects['Farm'].minigame;
		if (oGarden) {
			function gardenPlant(x, y) {
				if (oEleCC.oGardenSetting[x + '_' + y] == 'queenbeetLump') {
					delete oEleCC.oGardenSetting[x + '_' + y];
				} else {
					oGarden.useTool(oGarden.plants[oEleCC.oGardenSetting[x + '_' + y]].id, x, y);
				}
			}
			if (!Object.keys(oEleCC.oGardenSetting).length) {
				for (let loop1 = 0; loop1 < 6; loop1++) {
					for (let loop2 = 0; loop2 < 6; loop2++) {
						let tile = oGarden.getTile(loop1, loop2);
						if (tile[0] > 0) oEleCC.oGardenSetting[loop1 + '_' + loop2] = oGarden.plantsById[tile[0] - 1].key;
					}
				}
			}
			for (let loop1 = 0; loop1 < 6; loop1++) {
				for (let loop2 = 0; loop2 < 6; loop2++) {
					let aTile = oGarden.getTile(loop1, loop2);
					let sKey  = oEleCC.oGardenSetting[loop1 + '_' + loop2];
					if (oEleCC.aGardenEffect.includes(sKey) || oEleCC.aGardenDrop.includes(sKey)) {
						if (aTile[0] > 0) {
							let oType = oGarden.plantsById[aTile[0] - 1];
							if ((aTile[0] - 1) != oGarden.plants[oEleCC.oGardenSetting[loop1 + '_' + loop2]].id) {
								if (oType.unlocked) {
									oGarden.harvest(loop1, loop2);
									gardenPlant(loop1, loop2);
								} else {
									oEleCC.oGardenSetting[loop1 + '_' + loop2] = oType.key;
								}
							} else if ((oEleCC.aGardenEffect.includes(sKey) && !oType.immortal && (((aTile[1] + Math.ceil(oType.ageTick + oType.ageTickR)) >= 100))) ||
								   (oEleCC.aGardenDrop.includes(sKey) && (aTile[1] >= oType.mature))) {
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
							delete oEleCC.oGardenSetting[loop1 + '_' + loop2];
						} else if ((!oEleCC.oGardenSetting[loop1 + '_' + loop2]) && (!oType.unlocked)) {
							oEleCC.oGardenSetting[loop1 + '_' + loop2] = oType.key;
						} else if ((aTile[1] + Math.ceil(oType.ageTick + oType.ageTickR)) >= 100) {
							oGarden.harvest(loop1, loop2);
							delete oEleCC.oGardenSetting[loop1 + '_' + loop2];
						}
					}
				}
			}
		}
	},
	ClickGardenerStop: () => {
		oEleCC.oGardenSetting    = {};
		oEleCC.Flags['Gardener'] = false;
	},
	//--------------------------------------------------------------------------------------------------------------
	// ReRoll garden for new seed
	ReRollGardenStart: (savedata) => {
		let oGarden = Game.Objects['Farm'].minigame;
		if (oGarden) {
			if (!Object.keys(oEleCC.oGardenReRollSet).length) {
				for (let loop1 = 0; loop1 < 6; loop1++) {
					for (let loop2 = 0; loop2 < 6; loop2++) {
						let tile = oGarden.getTile(loop1, loop2);
						if (tile[0] > 0) oEleCC.oGardenReRollSet[loop1 + '_' + loop2] = oGarden.plantsById[tile[0] - 1].key;
					}
				}
				oEleCC.sGardenReRollExp = savedata;
				oEleCC.TimerStart('ReRollGarden');
			} else if (oEleCC.Timers['ReRollGarden'] > 0) { 		
				oEleCC.TimerStop('ReRollGarden');
				oEleCC.oGardenReRollSet = {};
				oEleCC.sGardenReRollExp = '';
			}
		}
	},
	ReRollGardenTimer: () => {
		// Garden check
		let bResult = false;
		let oGarden = Game.Objects['Farm'].minigame;
		if (oGarden && Object.keys(oEleCC.oGardenReRollSet).length) {
			for (let loop1 = 0; loop1 < 6; loop1++) {
				for (let loop2 = 0; loop2 < 6; loop2++) {
					let tile = oGarden.getTile(loop1, loop2);
					if (tile[0] > 0) {
						if (oEleCC.oGardenReRollSet[loop1 + '_' + loop2]) {
							if (oEleCC.oGardenReRollSet[loop1 + '_' + loop2] != oGarden.plantsById[tile[0] - 1].key) {
								bResult = true;
							}
						} else {
							if (oEleCC.aGardenJuicerTarget.length) {
								if (oEleCC.aGardenJuicerTarget.includes(oGarden.plantsById[tile[0] - 1].key)) bResult = true;
							} else {
								bResult = true;
							}
						}
					} else if (oEleCC.oGardenReRollSet[loop1 + '_' + loop2]) {
						bResult = true;
					}
				}
			}
		} else {
			bResult = true;
		}
		if (bResult) {
			oEleCC.TimerStop('ReRollGarden');
			oEleCC.oGardenReRollSet = {};
			oEleCC.sGardenReRollExp = '';
		} else {
			// ReRoll
			Game.ImportSaveCode(oEleCC.sGardenReRollExp);
		}
	},
	//--------------------------------------------------------------------------------------------------------------
	// ReRoll garden for drop
	ReRollGardenerOnce: (savedata) => {
		if (!oEleCC.Flags['Gardener']) {
			// ReRoll
			Game.ImportSaveCode(savedata);
			// Clear Garrdener setting 
			oEleCC.oGardenSetting = {};
			// Garden check
			oEleCC.ClickGardener();
			// Clear Garrdener setting 
			oEleCC.oGardenSetting = {};
		}
	},
	//--------------------------------------------------------------------------------------------------------------
	// Check & ReRoll garden for JuicyQueenbeat
	GardenJuicerStart: () => {
		let oGarden = Game.Objects['Farm'].minigame;
		if (oGarden && (!oEleCC.Flags['GardenJuicer']) && (oEleCC.Timers['GardenJuicer'] == 0)) {
			oEleCC.Flags['GardenJuicer']  = true;
			oEleCC.oGardenJuicerSet        = {};
			oEleCC.sGardenJuicerExp        = '';
			oEleCC.nGardenNextStep        = oGarden.nextStep;
			oEleCC.nGardenJuicerReRollCnt = 0;
			oEleCC.Timers['GardenJuicer']  = setTimeout(oEleCC.GardenJuicerTimer, oEleCC.nGardenJuicerFreqMain);
			oEleCC.Notify('Garden Juicer started.', false);
		} else {
			oEleCC.Notify(oEleCC.Timers['GardenJuicer'] != 0 ? 'Garden Juicer was already started.' : '???', false);
		}
	},
	GardenJuicerStop: () => {
		oEleCC.Flags['GardenJuicer'] = false;
	},
	GardenJuicerAuto: () => {
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
			oEleCC.bAutoJuicerReRoll = false;
			switch (nStatus1) {
				case 0:
				case 3:
					// QB/JuicyQB Juicer
					oEleCC.GardenJuicerTargetChange(nStatus1 == 0 ? 'queenbeet' : 'queenbeetLump');
					break;
				case 1:
					// Garden ReRoll for JuicyQB!
					oEleCC.GardenJuicerTargetChange('queenbeetLump');
					oEleCC.bAutoJuicerReRoll = true;
					break;
				case 2:
				case 4:
					// QB/JuicyQB Juicer
					oEleCC.GardenJuicerTargetChange(nStatus1 == 4 ? 'queenbeet' : 'queenbeetLump');
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
					oEleCC.oGardenSetting = {};
					break;
				default:
					oEleCC.Flags['GardenJuicer'] = false;
			}
			//oEleCC.Notify('Full Auto status:' + nStatus1 + '/' + aPointX + '/' + aPointY + '/' + nJuicyCnt, false);
		}
	},
	GardenJuicerTimer: () => {
		let oGarden = Game.Objects['Farm'].minigame;
		if (oGarden && oEleCC.Flags['GardenJuicer'] && oEleCC.aGardenJuicerTarget.length) {
			let bResult = true;
			let nTotal  = 0;
			let nMax    = 0;
			let nMin    = 100;
			if (oEleCC.nGardenNextStep == oGarden.nextStep) {
				if ((oEleCC.nGardenNextStep - Date.now() <= oEleCC.nGardenJuicerFreqMain) &&
				    (oEleCC.Timers['SellGodzamok'] == 0) && (oEleCC.Timers['AutoBuyZ'] == 0) && (oEleCC.Timers['ReRollGarden'] == 0) && (oEleCC.Timers['ReRollSugar'] == 0)) {
					if (oEleCC.Flags['AutoJuicer']) {
						oEleCC.GardenJuicerAuto();
					}
					if (oEleCC.Flags['GardenJuicer']) {
						oEleCC.nGardenJuicerQBrange = oEleCC.nGardenJuicerQBrangeDef;
						oEleCC.sGardenJuicerExp     = Game.WriteSave(1);
						for (let loop1 = 0; loop1 < 6; loop1++) {
							for (let loop2 = 0; loop2 < 6; loop2++) {
								let tile = oGarden.getTile(loop1, loop2);
								if ((tile[0] > 0) && (oEleCC.aGardenJuicerTarget.includes(oGarden.plantsById[tile[0] - 1].key))) {
									nTotal++;
									if (nMax < tile[1]) nMax = tile[1];
									if (nMin > tile[1]) nMin = tile[1];
									oEleCC.oGardenJuicerSet[loop1 + '_' + loop2] = tile[1];
								}
							}
						}
						if ((nTotal > 0) && (oEleCC.aGardenJuicerTarget.includes('queenbeet'))) oEleCC.nGardenJuicerQBrange = Math.max(oEleCC.nGardenJuicerQBrangeDef, nMax - nMin);
						oEleCC.Notify('Garden Juicer Check time.<br>' + 
							'Target: ' + oEleCC.aGardenJuicerTarget + ':' + nTotal + '<br>' + 
							(oEleCC.aGardenJuicerTarget.includes('queenbeet') ? 'range: ' + oEleCC.nGardenJuicerQBrange : ''), false);
					}
				}
			} else {
				if (oEleCC.Flags['AutoJuicer'] && oEleCC.bAutoJuicerReRoll) {
					// Garden ReRoll for JuicyQB!
					oEleCC.bAutoJuicerReRoll = false;
					oEleCC.ReRollGardenStart(oEleCC.sGardenJuicerExp);
				} else if ((oEleCC.Timers['SellGodzamok'] == 0) && (oEleCC.Timers['AutoBuyZ'] == 0) && (oEleCC.Timers['ReRollGarden'] == 0) && (oEleCC.Timers['ReRollSugar'] == 0) && (Object.keys(oEleCC.oGardenJuicerSet).length)) {
					let nCnt    = 0;
					for (let loop1 = 0; loop1 < 6; loop1++) {
						for (let loop2 = 0; loop2 < 6; loop2++) {
							let tile = oGarden.getTile(loop1, loop2);
							if ((tile[0] > 0) && (oEleCC.aGardenJuicerTarget.includes(oGarden.plantsById[tile[0] - 1].key))) {
								nTotal++;
								if (nMax < tile[1]) nMax = tile[1];
								if (nMin > tile[1]) nMin = tile[1];
								if ((loop1 + '_' + loop2 in oEleCC.oGardenJuicerSet) && (oEleCC.oGardenJuicerSet[loop1 + '_' + loop2] < tile[1])) nCnt++;
							}
						}
					}
					if (oEleCC.nGardenJuicerReRollCnt > 400) {
						bResult = true;
						oEleCC.Notify('Hmmm...', false);
					} else if (nTotal == 0) {
						bResult = true;
					} else if (oEleCC.aGardenJuicerTarget.includes('queenbeet')) {
						bResult = (nMax - nMin < oEleCC.nGardenJuicerQBrange);
					} else {
						bResult = (nCnt >= Math.ceil(nTotal / 2));
					}
				}
				if (bResult) {
					oEleCC.oGardenJuicerSet       = {};
					oEleCC.sGardenJuicerExp       = '';
					oEleCC.nGardenJuicerReRollCnt = 0;
					oEleCC.nGardenNextStep        = oGarden.nextStep;
				} else {
					// ReRoll
					oEleCC.nGardenJuicerReRollCnt++;
					Game.ImportSaveCode(oEleCC.sGardenJuicerExp);
				}
			}
			oEleCC.Timers['GardenJuicer'] = setTimeout(oEleCC.GardenJuicerTimer, (bResult ? oEleCC.nGardenJuicerFreqMain : oEleCC.nGardenJuicerFreqReRoll));
		} else {
			oEleCC.Timers['GardenJuicer'] = 0;
			oEleCC.oGardenJuicerSet       = {};
			oEleCC.sGardenJuicerExp       = '';
			oEleCC.nGardenNextStep        = 0;
			oEleCC.nGardenJuicerReRollCnt = 0;
			oEleCC.Notify('Garden Juicer stopped.', false);
		}
	},
	GardenJuicerTargetChange: (target) => {
		oEleCC.aGardenJuicerTarget.splice(0);
		if (target == 'J_E_D_D') {
			oEleCC.aGardenJuicerTarget.push('queenbeetLump');
			oEleCC.aGardenJuicerTarget.push('everdaisy');
			oEleCC.aGardenJuicerTarget.push('drowsyfern');
			oEleCC.aGardenJuicerTarget.push('duketater');
		} else if (target != '') {
			oEleCC.aGardenJuicerTarget.push(target);
		}
	},
	//--------------------------------------------------------------------------------------------------------------
	// Auto Spell Checker
	GrimoireIsEV: () => {
		return (Game.season == 'easter' || Game.season == 'valentines') ? 1 : 0;
	},
	GrimoireChoose: (arr) => {
		return arr[oEleCC.oLocalMath.floor(oEleCC.oLocalMath.random() * arr.length)];
	},
	GrimoireIsFall: (spell, obj) => {
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
		failFunc: (fail) => {
			let golden = 0; /* game */
			return fail + 0.15 * golden;
		},
		win: (cycle) => {
			oEleCC.oLocalMath.random();oEleCC.oLocalMath.random();			// by shimmer.initFunc
			for(let loop1 = 0;loop1 < cycle; loop1++) oEleCC.oLocalMath.random();	// by PlaySound or season shimmer
			let choices = [];
			choices.push('frenzy', 'multiply cookies');
			if (!Game.hasBuff('Dragonflight'))                                 choices.push('click frenzy');
			if (oEleCC.oLocalMath.random() < 0.1)                               choices.push('cookie storm', 'cookie storm', 'blab');
			if (Game.BuildingsOwned >= 10 && oEleCC.oLocalMath.random() < 0.25) choices.push('building special');
			if (oEleCC.oLocalMath.random() < 0.15)                              choices = ['cookie storm drop'];
			if (oEleCC.oLocalMath.random() < 0.0001)                            choices.push('free sugar lump');
			return oEleCC.GrimoireChoose(choices);
		},
		fail: (cycle) => {
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
	spellCheckHand: (next) => {
		let oGrimoire  = Game.Objects['Wizard tower'].minigame;
		if (oGrimoire) {
			oEleCC.oLocalMath.seedrandom(Game.seed + '/' + (oGrimoire.spellsCastTotal + next - 1));
			return oEleCC.GrimoireIsFall(oEleCC.GrimoireHand) ? oEleCC.GrimoireHand.win(oEleCC.GrimoireIsEV()) : oEleCC.GrimoireHand.fail(oEleCC.GrimoireIsEV());
		} else
			return '';
	},
	AutoCastStart: () => {
		oEleCC.Flags['AutoCast1'] = false;
		oEleCC.Flags['AutoCast2'] = false;
		oEleCC.Flags['AutoCastD'] = false;
		oEleCC.Flags['AutoCastT'] = true;
	},
	AutoCastStop: () => {
		oEleCC.Flags['AutoCast1'] = false;
		oEleCC.Flags['AutoCast2'] = false;
		oEleCC.Flags['AutoCastD'] = false;
		oEleCC.Flags['AutoCastT'] = false;
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
	ClickSpellCheckTimer: () => {
		let oGrimoire  = Game.Objects['Wizard tower'].minigame;
		if (oGrimoire) {
			if ((!oEleCC.Flags['AutoCast1']) && (!oEleCC.Flags['AutoCast2']) && (oGrimoire.magic > oGrimoire.getSpellCost(oGrimoire.spells['hand of fate'])) && (oGrimoire.magic == oGrimoire.magicM)) {
				let spellResult1 = oEleCC.spellCheckHand(1);
				let spellResult2 = oEleCC.spellCheckHand(2);
				if (spellResult1 == 'building special') {
					oEleCC.Flags['AutoCast1'] = true;
					oEleCC.Flags['AutoCastD'] = (spellResult2 == 'building special');
					oEleCC.Notify('Maybe I can cast <b>' + spellResult1 + (oEleCC.Flags['AutoCastD'] ? 'Double!!' : '') + '</b>', false);
				} else if ((spellResult1 == 'click frenzy') || (spellResult1 == 'elder frenzy')) {
					oEleCC.Flags['AutoCast2'] = true;
					oEleCC.Flags['AutoCastD'] = (spellResult2 == 'building special');
					oEleCC.Notify('Maybe I can cast <b>' + spellResult1 + (oEleCC.Flags['AutoCastD'] ? ' and ' + spellResult2 : '') + '</b>', false);
				} else {
					oEleCC.CastSpell('hand of fate');
					oEleCC.Notify('Hahaha...', false);
				}
			}
			// Auto Cast spell(2)
			if (oEleCC.Flags['AutoCast2']) {
				if (oEleCC.AnyHasBuff(oEleCC.aAutoCastTarget) && 
				    (!oEleCC.AnyHasBuff(['Clot', 'Dragonflight', 'Click frenzy', 'Elder frenzy'])) &&
				    (oEleCC.Timers['ReRollGarden'] == 0) && (oEleCC.nGardenJuicerReRollCnt == 0)) {
					if (oEleCC.CastSpell('hand of fate')) {
						oEleCC.Flags['AutoCast2'] = false;
						oEleCC.Flags['AutoCastD'] = false;
						oEleCC.Notify('Bibbidi-bobbidi...baa...', false);
					}
				}
			}
		}
	},
	//--------------------------------------------------------------------------------------------------------------
	// Sugar auto harvest
	ClickSugarTimer: () => {
		Game.clickLump();
		if (oEleCC.nSugarDesire <= Game.lumps) {
			// Rigidel restore
//			let oPantheon = Game.Objects['Temple'].minigame;
//			if (oPantheon && oEleCC.bRigidel) {
//				if (oEleCC.nRigidelSell >  0)  Game.Objects['Mine'].buy(oEleCC.nRigidelSell);
//				if (oEleCC.nPrevGod     != -1) oPantheon.slotGod(oPantheon.godsById[oEleCC.nPrevGod], 0);
//			}
			oEleCC.nSugarDesire = 0;
			oEleCC.sSugarExp    = '';
			oEleCC.TimerStop('ReRollSugar');
		} else {
			// ReRoll
			Game.ImportSaveCode(oEleCC.sSugarExp);
		}
	},
	//--------------------------------------------------------------------------------------------------------------
	// Test
	EleCCTest: () => {
		oEleCC.Notify('Test:' + oEleCC.name + '<br>' + 
			oEleCC.spellCheckHand(1) + ':' + oEleCC.spellCheckHand(2) + '<br>' +
			oEleCC.Flags['AutoCast1'] + ':' + oEleCC.Flags['AutoCast2'] + ':' + oEleCC.Flags['AutoCastD'],
			false);
	}
};
oEleCC.Init();
