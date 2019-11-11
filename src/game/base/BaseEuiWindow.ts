/*
 * @Description: 窗口的基类
 * @Author: guolinsen
 * @Date: 2019-08-02 14:56:37

 * @LastEditTime: 2019-10-28 16:26:11
 */
class BaseEuiWindow extends BaseEuiComponent {


    /**窗口Key值 */
    public viewKey: any = 0;
    public closeBtn;//关闭按钮
    protected closeDispose: boolean = true;//移除界面标志
    protected disposeTime: number = 0;
    /**是否点击空白处关闭界面(仅限于UI_Tips,UI_Win) */
    public bClickClose: boolean = true;


    public constructor($parent: egret.DisplayObjectContainer = null) {
        super($parent);
        if ($parent == null) {
            $parent = LayerManager.UI_Win;
            this._myParent = $parent;
        }
        this.isInit = false;

        // if (!DeviceUtils.IsMobile) {
        //     if (this.myParent == LayerManager.UI_Win || this.myParent == LayerManager.UI_TipsNoClick || this.myParent == LayerManager.UI_Tips) {
        //         this.scaleX = this.scaleY = 0.9;
        //     }
        // }
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        this._initOpen && this.openView.apply(this, this.openParam);
    }


    /**延时关闭*/
    public addDelayDestroy(t: number = 20000): void {
        if (!this.closeDispose) return;
        if (this.disposeTime > 0) return;
        this.disposeTime = egret.setTimeout(this.destroy, this, t);
    }


    private removeDelayDestroy(): void {
        if (this.disposeTime > 0) {
            egret.clearTimeout(this.disposeTime);
            this.disposeTime = 0;
        }
    }



    /**用于同一处理打开时的操作 */
    public open(param: any = null) {
        if (this["$modalTipsRect"]) {
            this.addTouchEvent(this["$modalTipsRect"], this.closeView);
        }

        if (this["closeBtn"]) {
            this.addTouchEvent(this["closeBtn"], this.onCloseBtn);
        }

        if (this["bg"] && this["bg"]["closeBtn"]) {
            this.addTouchEvent(this["bg"]["closeBtn"], this.closeView);
        }

    }


    // RESIZE_STAGE
    protected focusToStage() {
        this.message(MsgConst.RESIZE_STAGE, this.resizeStage);
        this.resizeStage();
    }

    public resizeStage() {
        this.height = App.StageUtils.getHeight();
        this.width = App.StageUtils.getWidth();
    }

    /**注意：只给view管理器使用 */
    public openView(param: ViewProp = null): void {
        if (this.isInit) {
            this._initOpen = false;
            this.open.call(this, param);
        } else {
            this._initOpen = true;
            this.openParam = param;
        }

    }

    /**关闭窗口 */
    public closeView(isClick?): void {
        //有些窗口没有viewKey值，为了统一关闭入口，第一个参数强制加入this；
        App.ViewManager.close(this.viewKey);

    }


    /**关闭按钮回调 */
    public onCloseBtn(btn?) {
        if (App.ViewManager.backOpen) {
            App.ViewManager.open(App.ViewManager.backOpen.key, App.ViewManager.backOpen);
        }
        App.ViewManager.close(this.viewKey);
    }

	/**重置打开，一般是窗口已经打开，重置一次打开事件和逻辑处理
	 * 注意：只给view管理器使用，防止界面读exml还没构建完成 
	 */
    public resetOpen(param): void {
        this.close.call(this, param);
        this.removeAllEvent.call(this);
        this.openView.call(this, param);
    }

    /**设置标题 */
    public setWinTitle(str) {
        if (this["bg"]) {
            this["bg"].setNameImg(str);
        }
    }
    /**设置标题完整路径 */
    public setWinTitleHold(str) {
        if (this["bg"]) {
            this["bg"].setNameImgHold(str);
        }
    }


    /**设置帮助按钮 */
    public setWinHeleTitle(id = null) {
        if (this["bg"]) {
            this["bg"].setHelpBtn(id);
        }
    }



    /**
     * 添加到父级
     */
    public addToParent(): void {
        if (this._myParent == LayerManager.UI_Tips || this._myParent == LayerManager.UI_Win) {
            // if (!this["$modalTipsLabel"]) {
            //     let label = new eui.Component();
            //     label.skinName = "ModalAddTipsSkin";
            //     label.bottom = -40;
            //     label.horizontalCenter = 0;
            //     label.width = 10;
            //     this.addChild(label);
            //     label.touchChildren = label.touchEnabled = false;
            //     this["$modalTipsLabel"] = label;
            // }
            if (this.bClickClose) {
                let re: eui.Rect = this["$modalTipsRect"];
                if (!re) {
                    re = new eui.Rect();
                    re.fillColor = 0x232121;
                    re.alpha = 0;
                    re.width = App.StageUtils.getWidth() + 80;
                    re.height = App.StageUtils.getHeight() + 80;
                    re.horizontalCenter = 0;
                    re.verticalCenter = 0;
                    re.x = re.y = -40;
                    this["$modalTipsRect"] = re;
                }
                // re.source = RES.getRes("tywin_json.tywin_bg_alpha_png");
                this._myParent.addChild(re);
                this.addTouchEvent(re, this.closeView)
            }

        }
        super.addToParent();
        this.removeDelayDestroy();
    }

    /**
       * 销毁
       */
    public destroy(): void {
        if (this.viewKey) {
            let k = this.viewKey;
            this.viewKey = null;
            App.ViewManager.destroy(k);
            return;
        }
        this.removeDelayDestroy();
        super.destroy();
    }


}