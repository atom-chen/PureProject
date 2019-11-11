/*
 * @Description: 闯关、关卡
 * @Author: guolinsen
 * @Date: 2019-07-26 16:32:55
 * @LastEditTime: 2019-10-31 11:31:10
 */
class PassCache extends BaseCache {
	public isOpen: boolean = false;
	public level: number = 0;
	public killNum: number = 0;
	public total: number = 0;

	private monConfig: any;
	private lastMonsterTime: number;


	public constructor() {
		super();
	}

	clear() {
		this.isOpen = false;
		this.level = 0;
		this.monConfig = null;
		this.killNum = 0;
		this.total = 0;
		this.lastMonsterTime = 0;
	}

	public updateLv(lv: number) {
		this.level = lv > 0 ? lv : 1;
		this.monConfig = this.getMonsterConfig(this.level);
		this.killNum = 0;
	}

	public getMapFile() {
		return this.monConfig["mapFile"];
	}

	public getMonsterConfig(num: number): any {
		if (!num) return null;
		let tier = num;	//当前最高多少层
		let config = this.getMonsterConfig2(tier);
		if (config.circle) {
			let start: number = config.circle;
			let end: number = config.id;
			let la: number = (tier - start) % (end - start) + start;
			config = this.getMonsterConfig2(la);
		}
		return config;
	}

	private getMonsterConfig2(tier): any {
		let config = GameConfig.passMonster;
		for (tier; tier >= 0; tier--) {
			if (config[tier]) {
				return config[tier];
			}
		}
	}

	/****************************************************************************************************/
	/*****************************************下面是逻辑操作**********************************************/
	/****************************************************************************************************/
	private monsterNum: number = 0;
	private posIndex: number = 0;
	private recog: number = 0; //生成怪物的句柄
	public open() {
		if (this.isOpen) return;
		this.isOpen = true;
		App.MessageCenter.addListener(MsgConst.BATTLE_KILL, this.onMonsterKill, this);
		App.TimerManager.add(1000, this.onTimer, this);
		this.monsterNum = 0;
		this.posIndex = 0;
		this.total = PassMgr.guajiTotal();
		this.createMonster();
		PassMgr.guajiProgress();
	}

	public close() {
		if (!this.isOpen) return;
		this.isOpen = false;
		this.killNum = this.total = 0;
		App.MessageCenter.removeAll(this);
		App.TimerManager.remove(this.onTimer, this);
	}

	private onTimer() {
		if (this.monsterNum <= 3) {
			this.createMonster();
		}
	}

	private onMonsterKill() {
		this.monsterNum--;
		let cur: number = egret.getTimer();
		this.killNum++;
		PassMgr.guajiProgress();
		if (this.lastMonsterTime == 0 || cur - this.lastMonsterTime >= 2000) {
			//发送击杀
			this.lastMonsterTime = cur;
		}
		if (GameCache.quest.questId >= 0 && GameConfig.clientGlobal.passQuestID.indexOf(GameCache.quest.questId) > -1) {
			Proxy.quest.sendQuestProgress(GameCache.quest.questId, 1);
		}
	}

	private createMonster() {
		let con = this.monConfig;
		let mon = con["monster"];
		mon = mon[MathUtils.limitInteger(0, mon.length)];
		let hp = con["hp"];
		let count = con["count"];
		while (count > 0) {
			count--;
			let pos = this.randomPos();
			let propSet: PropertySet = new PropertySet();
			let charName: string = mon["name"];
			propSet.recog = App.ThingManager.createRecog();
			propSet.setRoleName(charName);
			propSet.kind = ThingKind.Monster;
			propSet.fightAi = true;
			propSet.skillList = GlobalVar.MONSTER_DEFAULTSKILL;

			let x = pos[0] + (Math.random() > 0.5 ? 1 : -1) * (MathUtils.limitInteger(0, pos[2]));
			let y = pos[1];

			propSet.pro(PropId.AP_HP, hp);
			propSet.pro(PropId.AP_MAX_HP, hp);
			propSet.pro(PropId.AP_X, x);
			propSet.pro(PropId.AP_Y, y);
			propSet.pro(PropId.AP_MOVE_SPEED, 600);
			propSet.pro(PropId.AP_ATTACK_SPEED, 2000);
			propSet.pro(PropId.AP_BODY_ID, mon["modelid"]);
			propSet.pro(PropId.AP_ACTOR_ID, 0);
			App.ThingManager.createThingToList(propSet);

			this.monsterNum++;
		}
	}

	private randomPos(): number[] {
		let con = this.monConfig;
		let posList = con["pos"];
		let len = posList.length;
		let idx = Math.floor(Math.random() * len);
		if (idx == this.posIndex) {
			idx = this.posIndex - 1 < 0 ? len - 1 : this.posIndex - 1;
		}
		this.posIndex = idx;
		return posList[idx];
	}

	private effs: eui.Image[] = [];
	public playBossEffect() {
		let effs = this.effs;
		for (let i = 0; i < 5; i++) {
			let img = effs[i];
			if (!img) {
				img = new eui.Image();
				img.source = RES_DIR_BG + "passEff.png";
				img.anchorOffsetX = 345;
				img.anchorOffsetY = 150;
				effs[i] = img;
			}
			img.alpha = 0;
			img.scaleX = 1.6;
			img.scaleY = 1.6;
			LayerManager.UI_Message.addChild(img);
			img.x = App.StageUtils.getWidth() >> 1;
			img.y = 260;
			egret.Tween.removeTweens(this);
			egret.Tween.get(img).wait(i * 60).to({ alpha: 1, scaleX: 0.8, scaleY: 0.8 }, 400, egret.Ease.bounceIn)
				.call(this.removeBossEff, this, [img, i]);
		}
	}

	private removeBossEff(img: eui.Image, i) {
		if (i == this.effs.length - 1) {
			egret.Tween.get(img).wait(800).to({ scaleX: 0.5, scaleY: 0.5, alpha: 0 }, 200, egret.Ease.cubicInOut)
				.call(this.removeBossEff, this, [img, 0]);
		} else {
			App.DisplayUtils.removeFromParent(img);
		}
	}
}