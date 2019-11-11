class BaseEuiLayer extends eui.Group {

	private modalRect: egret.Shape;
	protected numShow: number = 0;
	protected param: any;
	protected originalAlpha: number = 0;

	public constructor(param?: any) {
		super();
		this.param = param;
		this.percentWidth = 100;
		this.percentHeight = 100;
		this.touchEnabled = false;
		this.visible = false;
		if (param) {
			this.modal(param.modal, param.alpha);
		}
		this.numShow = this.numChildren;

	}

	// RESIZE_STAGE
	public set focusStage(flag: boolean) {
		if (flag) {
			App.MessageCenter.addListener(MsgConst.RESIZE_STAGE, this.resizeStage, this);
			this.resizeStage();
		} else {
			App.MessageCenter.removeListener(MsgConst.RESIZE_STAGE, this);
		}
	}

	protected resizeStage() {
		if (this.modalRect) {
			this.modalRect.graphics.clear();
			this.modalRect.graphics.beginFill(0x000000, 1);
			this.modalRect.graphics.drawRect(0, 0, App.StageUtils.getWidth(), App.StageUtils.getHeight());
			this.modalRect.cacheAsBitmap = true;
		}
	}

	protected modal(bo: boolean, alpha: number): void {
		if (bo) {
			this.modalRect = new egret.Shape();
			this.modalRect.alpha = alpha == null ? 0.8 : alpha;
			this.originalAlpha = this.modalRect.alpha;
			super.addChildAt(this.modalRect, 0);
			this.focusStage = true;
		}

	}

	/**外部重新设置需要的背景透明度 */
	public setRectAlpha(alpha: number) {
		if (this.modalRect) {
			this.modalRect.alpha = alpha;
		}
	}

	/**重置原本的透明度 */
	public resetAlpha() {
		if (this.modalRect) {
			this.modalRect.alpha = this.originalAlpha;
		}
	}

	public set visible(vis: boolean) {
		if (this.modalRect && this.param && this.param.modalClick) {
			if (this.visible == false && vis == true) {
				this.modalRect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.removeAll, this);
			}
			else if (this.visible == true && vis == false) {
				this.modalRect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.removeAll, this);
			}
		}
		this.$setVisible(vis);
	}

	public get visible(): boolean {
		return this.$visible;
	}

	public addChild(child): any {
		this.visible = true;
		return super.addChild(child);
	}
	public addChildAt(child, index): any {
		index += this.numShow;
		this.visible = true;
		return super.addChildAt(child, index);
	}
	public removeChild(child): any {
		let result = super.removeChild(child);
		if (this.numChildren - this.numShow <= 0) {
			this.visible = false;
		}
		return result;
	}
	public removeChildAt(index): any {
		let result = super.removeChildAt(index);
		if (this.numChildren - this.numShow <= 0) {
			this.visible = false;
		}
		return result;
	}

	private removeModalTop(): void {
		let len = this.numChildren - this.numShow;
		let view;
		if (len) {
			view = this.removeChildAt(this.numChildren - 1);
			view["closeView"] && view.closeView();
			len--;
		}
	}

	public removeAll(): void {
		let len = this.numChildren - this.numShow;
		let view;
		while (len) {
			view = this.removeChildAt(this.numShow);
			view["closeView"] && view.closeView();
			len--;
		}
	}

	public removeChildren(): void {
		this.removeAll();
	}

}