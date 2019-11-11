/**
 * 传送阵
*/
class TransferThing extends BaseThing {
	private _body: eui.Image;
	public constructor() {
		super();
	}
	public init(pro: PropertySet) {
		super.init(pro);
		if (this._body == null) {
			this._body = new eui.Image();
			this._body.source = RES_DIR_TRANSFER;
			this.addChild(this._body);
			this._body.x = -55;
			this._body.y = -156;
		}
		this.title.setNameColor(ColorUtil.TITLE_NPC);
	}

	public dispose() {
		super.dispose();
		// if (this._body) {
		// 	this._body.source = null;
		// 	App.DisplayUtils.removeFromParent(this._body);
		// 	this._body = null;
		// }
	}
}