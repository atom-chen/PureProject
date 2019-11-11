/**
 * 人物属性tips
 * 2019年7月24日 linsen
*/
class RoleProTipsView extends BaseEuiWindow {
	public tips1: eui.Group;
	public att1: eui.Group;
	public pro1: BaseCustComponent;
	public pro2: BaseCustComponent;
	public tips2: eui.Group;
	public att2: eui.Group;
	public pro3: BaseCustComponent;
	public pro4: BaseCustComponent;

	private proShow: any;

	public constructor() {
		super();
		this.skinName = "RoleProTipsSkin";
	}

	open(param: ViewProp) {
		super.open(param);
		this.getProShow();

		let pro: PropertySet = param.exData1;
		let proCon = GameConfig.prop;
		for (let k in this.proShow) {
			let list = this.proShow[k];
			let proList = [];
			let i = 0;
			let a = list.length;
			for (; i < a; i++) {
				let type = parseInt(list[i]["id"]);
				let value = pro.pro(type);
				proCon[type] && (type = proCon[type]["toBuffId"])
				let obj = {
					type: type,
					value: value
				}
				proList.push(obj);
			}
			this["pro" + k].setData(proList, [] , pro.job);
		}
	}

	private getProShow() {
		if (!this.proShow) {
			let pro = this.proShow = {};
			let con = GameConfig.prop;
			for (let k in con) {
				let obj = con[k];
				if (obj["showPos"]) {
					let index = Math.floor(obj["showPos"] / 10);
					if (!pro[index]) pro[index] = [];
					pro[index].push(obj);
				}
			}
			for (let i in pro) {
				pro[i].sort(this.sort);
			}
		}
	}

	private sort(p1, p2): number {
		if (p1["showPos"] > p2["showPos"]) return 1;
		if (p1["showPos"] < p2["showPos"]) return -1;
		return 0;
	}
}