/**
 * 模型-龙骨
*/
class ThingBody {
	private _root: egret.DisplayObjectContainer;
	private _onStage: boolean = false;
	private _pro: PropertySet;
	public body: DBAvatar;
	public callHandler: Handler;
	public dir: number = 1;

	public constructor(root) {
		this._root = root;
		this.createBody();
	}

	private createBody() {
		this.body = new DBAvatar();
		this.body.setRoot(this._root, Handler.create(this, this.bodyPlayEnd, null, false));
	}

	public init(pro: PropertySet) {
		this._pro = pro;
		this.body.rolePro = pro;
		let job: number = pro.pro(PropId.AP_JOB);
		let sex: number = pro.pro(PropId.AP_SEX);
		if (ThingKind.isHumanModel(pro.kind)) {
			this.loadBody(`${job}_${sex}`, true);
		} else {
			this.loadBody(pro.pro(PropId.AP_BODY_ID));
		}
	}

	/**
	 * 换装
	*/
	public changeSkin() {
		this.body.updateSkin();
	}

	private bodyPlayEnd(act: string) {
		if (this.callHandler) {
			this.callHandler.args = [act];
			this.callHandler.run();
		}
	}

	private loadBody(name, isNude = false) {
		this.body.load(name, true, isNude);
	}

	public playAction(act, num = 0) {
		this.body.play(act, num, this._onStage);
		if (!this._onStage) {
			num && this.bodyPlayEnd(act);
		}
	}

	/**1向右 -1 向左*/
	public setDir(dir) {
		this.dir = dir;
		this.body.setDir(dir);
	}

	public onRemove() {
		this.body.onRemove();
	}

	setStage(stage: boolean) {
		this._onStage = stage;
		if (stage) {
			this.body.recoverPlay();
		}
	}
}