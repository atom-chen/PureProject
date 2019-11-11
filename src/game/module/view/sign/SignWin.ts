/*
 * @Description: 签到面板
 * @Author: guolinsen
 * @Date: 2019-09-10 14:12:10
 * @LastEditTime: 2019-09-11 11:56:33
 */
class SignWin extends BaseEuiWindow {

	public dailyList: eui.List;
	public item0: ItemBase;
	public item1: ItemBase;
	public item2: ItemBase;
	public item3: ItemBase;
	public flag0: eui.Image;
	public flag1: eui.Image;
	public flag2: eui.Image;
	public flag3: eui.Image;
	public totalDay: eui.Label;
	public day0: eui.Label;
	public day1: eui.Label;
	public day2: eui.Label;
	public day3: eui.Label;

	public constructor() {
		super();
		this.skinName = "SignWinSkin";
	}

	//用于子类继承
	protected init(): void {
		for (let j = 0; j < 4; j++) {
			this[`item${j}`].setBgImg(null);
			this[`item${j}`].showArrow = false;
			this[`item${j}`].showColor = false;
			this[`item${j}`].setHandler(this, this.onItemTouch, [this[`item${j}`]]);
		}
		this.dailyList.itemRenderer = SignDailyItem;
	}

	open() {
		super.open();
		this.message(MsgConst.PROPERTY + PropId.AP_SIGNIN, this.doUpdate);
		this.message(MsgConst.PROPERTY + PropId.AP_CHECKINS, this.doUpdate);
		this.update();
	}

	private onItemTouch(item: ItemBase): void {
		let index = parseInt(item.name);
		if (index >= 0) {
			let con: StdDailysign = GameCache.sign.totalAwardList[index];
			if (con) {
				let flag = GameCache.sign.getAwardState(index);
				if (!flag && GameCache.sign.signCounts >= con.need) {
					Proxy.sign.sendPrize(con.id);
				} else {
					GlobalFun.itemTips(con.reward[0].id);
				}
			}
		}
	}

	private doUpdate() {
		this.flushFun(this.update, true);
	}

	private update() {
		this.setListData(this.dailyList, GameCache.sign.dailyAwardList);
		this.updateTotal();
	}

	private updateTotal() {
		this.totalDay.text = GameCache.sign.signCounts + "";
		let list = GameCache.sign.totalAwardList;
		let i = 0;
		let a = list.length;
		for (; i < a; i++) {
			let flag = GameCache.sign.getAwardState(i);
			if (!flag) {
				break;
			}
		}
		if (i + 4 >= a) {
			i = a - 4;
		}
		for (let j = 0; j < 4; j++) {
			let index = j + i;
			this[`item${j}`].name = index;
			this[`item${j}`].data = list[index].reward[0];
			this[`day${j}`].text = StringUtils.substitute(Language.lang.signDay, list[index].need);
			let flag = GameCache.sign.getAwardState(index);
			if (flag) {
				this[`finish${j}`].visible = true;
			} else {
				this[`finish${j}`].visible = false;
				this[`flag${j}`].visible = GameCache.sign.signCounts >= list[index].need;
			}
		}
	}


}