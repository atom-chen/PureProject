/*
 * @Description: 冒险数据
 * @Author: guolinsen
 * @Date: 2019-08-26 17:40:51
 * @LastEditTime: 2019-10-16 20:02:37
 */
class AdventrueCache extends BaseCache {

	public taskList: StdMaoxian[];
	public dataList: { finish, prize, progress }[] = [];

	public topAward: any;
	public topProgress: number = 0;
	public banner: string;
	private isInit: boolean = false;

	public constructor() {
		super();
	}

	clear() {
		this.isInit = false;
		this.dataList = [];
		this.topAward = null;
		this.topProgress = 0;
	}

	public isMaxLv(): boolean {
		let con = GameConfig.adventure[(GameCache.hero.mainPro.pro(PropId.AP_RISK_LVL) + 1) + ""];
		return con ? false : true;
	}

	public updatelv(lv) {
		this.isInit = true;
		let con = GameConfig.adventure[(lv + 1) + ""];
		if (!con) con = GameConfig.adventure[lv + ""];
		if (con) {
			let arr = this.taskList = [];
			for (let item in con) {
				let id = parseInt(item);
				if (id == 0) {
					this.topAward = con[item]["award"][0];
				} else {
					this.banner = con[item].image;
					arr[id - 1] = con[item];
				}
			}
		} else {
			this.taskList = null;
		}
		this.topProgress = 0;
		App.MessageCenter.dispatch(MsgConst.ADVENTURE_UPDATE_LV);
	}

	public updateSingle(id: number, finish: boolean, prize: boolean, progress: number, check: boolean = false) {
		if (!this.isInit) {
			this.updatelv(0);
		}
		if (!this.dataList) return;
		if (id == 0) {
			return;
		}
		let data: any = {};
		data.finish = finish;
		data.prize = prize;
		data.progress = progress;
		this.dataList[id - 1] = data;
		if (check) {
			this.checkFinish();
		}
	}

	public getData(id): { finish, prize, progress } {
		let data = this.dataList[id - 1];
		if (data) return data;
		return { finish: false, prize: false, progress: 0 };
	}

	public checkFinish() {
		this.topProgress = 0;
		for (let i = 0; i < this.taskList.length; i++) {
			let obj = this.taskList[i];
			if (this.dataList[obj.item - 1]) {
				if (this.dataList[obj.item - 1].prize) {
					this.topProgress++;
				}
			}
		}
	}

	public get topFinish(): boolean {
		return this.taskList && this.topProgress >= this.taskList.length;
	}
}