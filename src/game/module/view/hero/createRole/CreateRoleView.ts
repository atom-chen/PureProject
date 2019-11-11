/*
 * @Description: 创角界面
 * @Author: liangzhaowei
 * @Date: 2019-07-23 20:51:01
 * @LastEditTime: 2019-10-17 15:52:57
 */
class CreateRoleView extends BaseEuiWindow {
	public imgCreateRole: eui.Image;
	public imgRedom: eui.Image;
	public imgRoleIcon1: eui.Image;
	public imgRoleIcon2: eui.Image;
	public imgRoleIcon3: eui.Image;
	public imgRoleIcon4: eui.Image;
	public lbRoleName: eui.TextInput;
	public roleMdl: eui.Component;
	public tabBtn: eui.TabBar;
	public errorTips: eui.Label;
	private _randomName: RandomName;
	public body: DBAvatar;


	/**角色选择下标 */
	public nSlRole = 0;

	private _root: egret.DisplayObjectContainer;
	private _onStage: boolean = false;
	private _pro: PropertySet;
	public callHandler: Handler;

	constructor() {
		super(LayerManager.UI_Win);
		this.skinName = "CreateRoleSkin";
		this._randomName = new RandomName();
		this.body = new DBAvatar();
		this.body.setRoot(this.roleMdl, null);
		this.isInit = true;
		this.bClickClose = false;
		this.horizontalCenter = 0;
		this.verticalCenter = 0;
		// this.initTabIcon();
	}

	public init() {
		this.focusToStage();
	}

	public open(param: ViewProp = null): void {
		this.lbRoleName.text = this._randomName.getRandomName(1);
		this.addTouchEvent(this.imgRedom, this.onClick);
		this.addTouchEvent(this.imgCreateRole, this.onClick);
		this.addTouchEvent(this.tabBtn, this.tabTouche);
		App.MessageCenter.addListener(MsgConst.CREATE_ROLE_ERROR, this.onError, this);
		App.SoundManager.playMusic(SoundType.CREATEROLE);

		this.nSlRole = MathUtils.limitInteger(0, 3);
		this.tabBtn.selectedIndex = this.nSlRole;
		this.tabTouche();

		App.ViewManager.getView(ViewConst.WELCOME); //提前加载欢迎界面资源
	}


	private onError(error: number) {
		if (Language.lang.createRoleError[error]) {
			this.errorTips.text = Language.lang.createRoleError[error];
		} else {
			this.errorTips.text = "error #" + error;
		}
	}

	public initTabIcon() {
		let listData = []
		for (let i = 0; i < 4; i++) {
			let obj = { id: 0, icon: "createRole_json.createrole_role0_b_png", icon2: "createRole_json.createrole_role0_a_png" };
			obj.id = i;
			obj.icon = "createRole_json.createrole_role" + i + "_b_png"
			obj.icon2 = "createRole_json.createrole_role" + i + "_a_png"
			listData.push(obj);
		}
		this.tabBtn.dataProvider = new eui.ArrayCollection(listData);
	}


	private tabTouche(): void {
		this.nSlRole = this.tabBtn.selectedIndex;

		this.body.load("c" + (this.nSlRole + 1), true, false);
		this.body.play("stand");
	}

	public close(param: ViewProp = null): void {
		this.destroy();
	}


	private bodyPlayEnd(act: string) {
		if (this.callHandler) {
			this.callHandler.args = [act];
			this.callHandler.run();
		}
	}

	private onClick(e: egret.TouchEvent): void {
		switch (e.currentTarget) {
			case this.imgRedom:
				this.lbRoleName.text = this._randomName.getRandomName(1);
				this.errorTips.text = "";
				break;
			case this.imgCreateRole:
				this.enterGame();
				break;
		}
	}

	public enterGame() {
		Proxy.login.sendCreateRole(
			this.lbRoleName.text,		//角色名字
			1,		//性别
			this.nSlRole + 1,   //职业
			0,					  //头像
			0,					  //阵营
			""					  //平台
		);
	}

	public destroy() {
		if (this.body) {
			this.body.dispose();
			this.body = null;
		}
		super.destroy();
	}

}
