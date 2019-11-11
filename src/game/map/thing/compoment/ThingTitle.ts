/**
 * 名称容器
*/
class ThingTitle extends egret.DisplayObjectContainer {
	private txtName: egret.TextField;
	private familyName: egret.TextField;
	private nameBG: egret.Bitmap;
	private badge: eui.Image;
	public constructor() {
		super();
		this.touchEnabled = false;
		this.touchChildren = false;

		this.nameBG = new egret.Bitmap();
		this.nameBG.scale9Grid = new egret.Rectangle(11, 10, 8, 1);
		this.nameBG.height = 25;
		this.nameBG.y = 6;
		this.addChild(this.nameBG);

		this.txtName = App.DisplayUtils.newTextField('', 0, 0, ColorUtil.TITLE_NORMAL, 'center', 14);
		this.txtName.y = 11;
		this.addChild(this.txtName);

		this.familyName = App.DisplayUtils.newTextField('', 0, 0, ColorUtil.C_GREEN, 'center', 14);
		this.familyName.y = 35;
		this.addChild(this.familyName);

	}
	setNameColor(color: number) {
		this.txtName.textColor = color;
	}
	setName(str: string) {
		this.nameBG.texture = RES.getRes("zjm_json.zjm_name_bg_png");
		this.txtName.text = str;
		this.initLayout();
	}

	setBadge(lvl: number) {
		if (lvl <= 0) {
			if (this.badge) this.badge.source = null;
			return;
		}
		if (!this.badge) {
			this.badge = new eui.Image();
			this.badge.height = 22;
			this.badge.width = 40;
			this.badge.y = 7;
			this.addChild(this.badge);
		}
		lvl = Math.floor(lvl / 10);
		this.badge.source = RES_DIR_BADGE + "t" + lvl + ".png";
		if (this.badge) this.badge.x = -Math.floor(this.nameBG.width / 2) - 42;
	}

	private initLayout(): void {
		this.nameBG.width = this.txtName.width + 14;
		this.txtName.anchorOffsetX = Math.floor(this.txtName.width / 2);
		this.familyName.anchorOffsetX = Math.floor(this.familyName.width / 2);
		this.nameBG.anchorOffsetX = Math.floor(this.nameBG.width / 2);
		if (this.badge) this.badge.x = -Math.floor(this.nameBG.width / 2) - 42;
	}

	public setFamilyName(fname: string): void {
		this.familyName.text = fname;
		this.initLayout();
	}

	/**回收时执行的重置数值方法*/
	public reset(): void {

	}


}