class BaseWinBg extends eui.Component implements eui.UIComponent {


    /////////////////////////////////////////////////////////////////////////////
    // BaseWinBg.exml
    /////////////////////////////////////////////////////////////////////////////
    public close2Btn: eui.Button;
    public winTitle: eui.Image;
    public syBtn: InstructionPart;

    public recordId: number;

    /////////////////////////////////////////////////////////////////////////////

    public constructor() {
        super();
        this.skinName = "BaseWinBgSkin";
    }



    public setNameImg(str: string) {
        if (str) {
            this.winTitle.source = RES_DIR_WIN_TITTLE + str + ".png";
        }
    }

    public setNameImgHold(str: string) {
        if (str) {
            this.winTitle.source = str;
        }
    }

    /**设置帮助按钮 */
    public setHelpBtn(id) {
        if (this.syBtn && this.winTitle) {
            /**winTitle宽度还没读到,需要延时显示 */
            if (this.winTitle.width == 0 && id) {
                this.recordId = id;
                this.syBtn.visible = false;
                App.TimerManager.addFrame(10, this.delayShow, this, 1);
                return;
            }
            if (id) {
                this.syBtn.visible = true;
                this.syBtn.x = this.winTitle.x + this.winTitle.width + 10;
                this.syBtn.name = id + "";
            }
            else {
                this.syBtn.visible = false;
            }
        }
    }

    public delayShow() {
        if (this.recordId) {
            this.setHelpBtn(this.recordId);
            this.recordId = 0;
        }
    }

    public remove(): void {
    }

    public dispose(): void {
        this.disposeChildren(this);
    }

    private disposeChildren(dis): void {
        if (!dis.numChildren) {
            return;
        }
        let len = dis.numChildren;
        let child;
        while (len) {
            len--;
            child = dis.removeChildAt(0);
            if (child instanceof eui.Image && child.texture) {
                (child as eui.Image).source = null;
            }
            if (child["stop"]) {
                child["stop"]();
            }
            if (child["dispose"]) {
                child["dispose"]();
            }
            this.disposeChildren(child);
        }
    }

}

// window["BaseWinBg"] = BaseWinBg;