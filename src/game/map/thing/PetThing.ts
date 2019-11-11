/*
 * @Description: In User Settings Edit
 * @Author: guolinsen
 * @Date: 2019-07-25 11:34:17
 * @LastEditTime: 2019-08-06 11:50:04
 */
class PetThing extends AnimalThing {
	private nextTime: number = 0;
	private con;
	public constructor() {
		super();
		this.canTouch = null;
	}

	init(pro: PropertySet) {
		super.init(pro);
		this.con = GameConfig.pet[pro.pro(PropId.AP_ACTOR_ID)];
		this.title.setNameColor(pro.masterName == GameCache.hero.mainPro.charName ? ColorUtil.TITLE_HERO : ColorUtil.TITLE_NORMAL);
	}

	update(tick: number) {
		super.update(tick);
		if (this.nextTime <= tick) {
			this.nextTime = tick + 2000;
			this.think();
		}
	}

	setCellXY(x, y, server) {
		super.setCellXY(x, y, server);
	}

	private think() {
		if (!this.isMove) {
			let move = Math.random() > 0.6;
			if (move) {
				let dir = MathUtils.limitInteger(-2, 2);
				let _x = this.cellXY.x + dir;
				let _y = this.cellXY.y;
				if (GameCache.map.canStand(_x, _y)) {
					this.moveSpeed = GlobalVar.DEFAULT_MOVE_SPEED << 1;
					this.moveTo(_x, _y);
				}
			}
		}
		if (this.isJump) {
			this.jumpEnd();
		}
		let talk = Math.random() > 0.9;
		if (talk) {
			this.say(this.con["adle_talk"][MathUtils.limitInteger(0, this.con["adle_talk"].length)]);
		}
	}
}