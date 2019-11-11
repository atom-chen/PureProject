class SystemTextTips extends eui.Component {

	private txt: eui.Label;

	private _text: string;
	private _init: boolean;
	public constructor() {
		super();
		this.skinName = "SystemTextTipsSkin";
		this.horizontalCenter = 0;
		this.touchEnabled = this.touchChildren = false;
		this._init = false;
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this._init = true;
		this.text = this._text;
	}

	public set text(str: string) {
		this._text = str;
		if (!this._init)
			return;
		this.txt.textFlow = TextFlowUtils.generateTextFlow(str);
		egret.Tween.removeTweens(this);
		this.alpha = 1;
		this.y = App.StageUtils.getHeight() - 280;
		egret.Tween.get(this).to({ y: this.y - 40 }, 1500).to({ alpha: 0 }, 500).call(this.remove, this);
	}

	private remove(): void {
		App.DisplayUtils.removeFromParent(this);
	}
}