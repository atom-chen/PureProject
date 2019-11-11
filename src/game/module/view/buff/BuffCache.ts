/*
 * @Description: Buff数据
 * @Author: guolinsen
 * @Date: 2019-09-02 20:47:59
 * @LastEditTime: 2019-09-05 19:50:20
 */
class BuffCache extends BaseCache {
	private data: any = {};
	public constructor() {
		super();
		App.TimerManager.add(1000, this.onTime, this);
	}
	clear() {
		this.data = {};
	}

	public getBuffList(recog): BuffVo[] {
		return this.data[recog] ? this.data[recog] : [];
	}

	private onTime() {
		let t = App.TimerManager.getSyncTime();
		let update: boolean = false;
		for (let recog in this.data) {
			let list: BuffVo[] = this.data[recog];
			let i = 0;
			let a = list.length;
			let find: boolean = false;
			for (; i < a; i++) {
				let buff = list[i];
				if (buff.restTime > 0 && buff.restTime <= t) {
					list.splice(i, 1);
					i--;
					a--;
					update = true;
				}
			}
		}
		update && App.MessageCenter.dispatch(MsgConst.BUFF_UPDATE);
	}

	public addBuff(recog, id, type, group, restTime, name, value, interval, icon) {
		let list: BuffVo[] = this.data[recog];
		if (!list) list = this.data[recog] = [];
		let i = 0;
		let a = list.length;
		let find: boolean = false;
		for (; i < a; i++) {
			let buff = list[i];
			if (group != buff.group) {
				continue;
			}
			if (icon && icon != buff.icon) {
				continue;
			}
			let j = 0;
			let b = buff.attr.length;
			for (; j < b; j++) {
				let attr = buff.attr[j];
				if (attr.type == type) {
					attr.value = value;
					find = true;
					break;
				}
			}
			if (!find && icon) {
				let attr = new BuffValue();
				attr.type = type;
				attr.value = value;
				attr.interval = interval;
				buff.attr.push(attr);
				find = true;
			}
			if (find) break;
		}
		if (!find) {
			let buff = new BuffVo();
			buff.id = id;
			buff.group = group;
			buff.name = name;
			buff.restTime = restTime;
			buff.interval = interval;
			buff.icon = icon;
			let attr = new BuffValue();
			attr.type = type;
			attr.value = value;
			attr.interval = interval;
			buff.attr.push(attr);
			list.push(buff);
		}
		App.MessageCenter.dispatch(MsgConst.BUFF_UPDATE, recog);
	}

	public delteBuff1(recog: number, type, group): void {
		let list: BuffVo[] = this.data[recog];
		if (!list) return;
		let i = 0;
		let a = list.length;
		let find: boolean = false;
		for (; i < a; i++) {
			let buff = list[i];
			if (buff.group == group) {
				let j = 0;
				let b = buff.attr.length;
				for (; j < b; j++) {
					let attr = buff.attr[j];
					if (attr.type == type) {
						list.splice(i, 1);
						find = true;
						break;
					}
				}
			}
			if (find) break;
		}
		App.MessageCenter.dispatch(MsgConst.BUFF_UPDATE, recog);
	}

	public delteBuff2(recog: number, id): void {
		let list: BuffVo[] = this.data[recog];
		if (!list) return;
		let i = 0;
		let a = list.length;
		for (; i < a; i++) {
			let buff = list[i];
			if (buff.id == id) {
				list.splice(i, 1);
				break;
			}
		}
		App.MessageCenter.dispatch(MsgConst.BUFF_UPDATE, recog);
	}

	public updateBuff(recog, id, value): void {
		let list: BuffVo[] = this.data[recog];
		if (!list) return;
		let i = 0;
		let a = list.length;
		for (; i < a; i++) {
			let buff = list[i];
			if (buff.id == id) {

				break;
			}
		}
		App.MessageCenter.dispatch(MsgConst.BUFF_UPDATE, recog);
	}
}