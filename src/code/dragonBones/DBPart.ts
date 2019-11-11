/*
 * @Description: 角色龙骨部位
 * @Author: guolinsen
 * @Date: 2019-08-13 16:46:35
 * @LastEditTime: 2019-09-26 11:23:09
 */
class DBPart {
	/**裸模*/
	static NUDE: string = "nude";
	/**头发*/
	static HAIR: string = "hair";
	/**头盔*/
	static HAT: string = "hat";
	/**眼睛*/
	static EYE: string = "eye";
	/**眼镜*/
	static GLASSES: string = "glasses";
	/**衣服*/
	static ARMOUR: string = "armour";
	/**裤子*/
	static PANTS: string = "pants";
	/**主武器*/
	static WEAPON: string = "weapon";
	/**副武器*/
	static ASSIST: string = "assist";
	/**翅膀*/
	static WING: string = "wing";
	/**背部*/
	static BACK: string = "back";
	/**怪物*/
	static MONSTER: string = "monster";

	static CACHE: number = 0;

	public constructor() {
	}

	private static _partId: any;
	public static get PartId(): any {
		let part = this._partId;
		if (!part) {
			part = {};

			part[this.ARMOUR] = PropId.AP_BODY_ID;
			part[this.HAT] = PropId.AP_HAT;
			part[this.EYE] = PropId.AP_EYE;
			part[this.PANTS] = PropId.AP_PANTS;
			part[this.WEAPON] = PropId.AP_WEAPON;
			part[this.ASSIST] = PropId.AP_ASSIST;
			part[this.GLASSES] = PropId.AP_GLASSES;
			part[this.HAIR] = PropId.AP_HAIR;
			part[this.BACK] = PropId.AP_BACK;
			part[this.WING] = PropId.AP_SWING;

			this._partId = part;
		}
		return part;
	}

	public static getDefault(job: number, sex: number, k: string): any {
		if (k == this.WEAPON) return 0;
		if (k == this.ASSIST) return 0;
		if (k == this.GLASSES) return 0;
		if (k == this.BACK) return 0;
		if (k == this.HAT) return 0;
		if (k == this.WING) return 0;
		return `${job}_${sex}_${k}`;
	}

	private static _partNameList: any;
	public static getPartNameList(k): string[] {
		let part = this._partNameList;
		if (!part) {
			part = {};

			part[this.ARMOUR] = ["1", "2"];
			part[this.HAT] = [""];
			part[this.EYE] = [""];
			part[this.PANTS] = [""];
			part[this.WEAPON] = [""];
			part[this.ASSIST] = [""];
			part[this.GLASSES] = [""];
			part[this.HAIR] = ["1", "2"];
			part[this.BACK] = [""];
			part[this.WING] = [""];

			this._partNameList = part;
		}
		return part[k];
	}
}