/*
 * @Description: 创角-英雄
 * @Author: guolinsen
 * @Date: 2019-08-26 11:33:49
 * @LastEditTime: 2019-09-11 21:10:20
 */
class CreateHeroView extends BaseEuiWindow {

	private createBtn: eui.Image;
	private tabBtn: eui.TabBar;
	private roleMdl: eui.Component;

	private body: DBAvatar;
	private listData: any[];
	private selectJob: number;

	public constructor() {
		super(LayerManager.UI_Main2);
		this.skinName = "CreateHeroSkin";
	}

	public open() {
		this.width = App.StageUtils.getWidth();
		this.height = App.StageUtils.getHeight();
		super.open();
		this.initTabIcon();
		this.addTouchEvent(this.createBtn, this.onCreate);
		this.addTouchEvent(this.tabBtn, this.tabTouch);
	}

	public init() {
		super.init();
		this.body = new DBAvatar();
		this.body.setRoot(this.roleMdl, null);
	}

	public initTabIcon() {
		let listData = []
		for (let i = 1; i < 4; i++) {
			let data = GameCache.hero.getProByJob(i);
			if (data) continue;
			let obj: any = {};
			obj.id = i;
			obj.icon = "createRole_json.createrole_role" + (i - 1) + "_b_png"
			obj.icon2 = "createRole_json.createrole_role" + (i - 1) + "_a_png"
			listData.push(obj);
		}
		this.tabBtn.dataProvider = new eui.ArrayCollection(listData);
		this.listData = listData;

		this.tabBtn.selectedIndex = MathUtils.limitInteger(0, listData.length);
		this.tabTouch();
	}

	private onCreate() {
		Proxy.adventure.sendPrize(0, this.selectJob, 1);
		this.closeView();
	}

	private tabTouch() {
		let obj = this.listData[this.tabBtn.selectedIndex];
		this.selectJob = obj["id"];

		this.body.load("c" + this.selectJob, true, false);
		this.body.play("stand");

	}

	public destroy() {
		if (this.body) {
			this.body.dispose();
			this.body = null;
		}
		super.destroy();
	}
}