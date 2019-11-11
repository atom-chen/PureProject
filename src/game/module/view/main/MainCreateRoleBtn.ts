/*
 * @Description: 主界面副角色列表按钮
 * @Author: guolinsen
 * @Date: 2019-08-28 18:04:51
 * @LastEditTime: 2019-10-25 15:52:33
 */
class MainCreateRoleBtn extends BaseCustComponent {
	private _job: number = 0;
	public index = 1;
	public img: eui.Image;
	public constructor() {
		super();
		this.skinName = "MainCreateRoleBtnSkin";
	}
	protected init(): void {
		this.addTouchEvent(this, this.onTouch);
	}

	public set job(v: number) {
		if (v) {
			this.img.source = `zjm_json.zjm_createRole${v}_png`;
			this.name = ""
		} else {
			this.img.source = "zjm_json.zjm_createrole_bg_png";
			this.name = ViewConst[ViewConst.ADVENTURE];
		}
		this._job = v;
	}

	public get job(): number {
		return this._job;
	}



	private onTouch() {
		if (this._job == 0) {
			App.ViewManager.open(ViewConst.ADVENTURE);
		} else {
			let viewData = new ViewProp();
			viewData.exData1 = this.index;
			App.ViewManager.open(ViewConst.ROLE, viewData);
		}
	}
}