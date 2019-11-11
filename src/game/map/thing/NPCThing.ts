class NPCThing extends BaseThing {
	private _body: eui.Image;
	public constructor() {
		super();
	}

	public init(pro: PropertySet) {
		let con = GameConfig.npc[pro.pro(PropId.AP_BODY_ID)];
		if (!con) {
			throw ("npc配置没找到," + pro.pro(PropId.AP_BODY_ID));
		}
		if (this._body == null) {
			this._body = new eui.Image();
			this.addChild(this._body);
		}
		this._body.source = RES_DIR_NPC_BODY + con["modelid"] + ".png";
		this._body.x = con["offx"];
		this._body.y = con["offy"];
		pro.charName = con["name"];

		super.init(pro);
		this.title.setNameColor(ColorUtil.TITLE_NPC);
	}
	public dispose() {
		super.dispose();
		if (this._body) {
			this._body.source = null;
			App.DisplayUtils.removeFromParent(this._body);
			this._body = null;
		}
	}
	public get npcid(){
		return this.pro.pro(PropId.AP_BODY_ID);
	}
}