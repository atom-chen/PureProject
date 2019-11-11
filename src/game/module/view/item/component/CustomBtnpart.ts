/**
 * create by junwei on 07/29/2019
 * 自定义按钮功能模块
 */
class CustomBtnpart extends BaseCustComponent {
    public constructor() {
        super();
        this.skinName = "BtnPartSkin";
    }

    public wBtn: eui.Button;
    public sBtn: eui.Button;

    private lHandler: Handler;
    private rHandler: Handler;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.addTouchEvent(this.wBtn, this.lFunc);
        this.addTouchEvent(this.sBtn, this.rFunc);
    }

    protected dataChanged(): void {
        super.dataChanged();
    }

    public dispose(): void {
        super.dispose();
    }

    /**
     * 初始化模块
     * @param thisc,FuncArr,iconArr
     */
    public initPart(thisc, FuncArr: any[] = [], iconArr: string[] = [], arg): void {
        if (this.lHandler) {
            this.lHandler.dispose();
        }
        if (this.rHandler) {
            this.rHandler.dispose();
        }
        this.lHandler = Handler.create(thisc, FuncArr[0], [arg], true);
        this.rHandler = Handler.create(thisc, FuncArr[1], [arg], true);
        this.wBtn.icon = iconArr[0];
        this.sBtn.icon = iconArr[1];
    }

    private lFunc(): void {
        if (this.lHandler) this.lHandler.run();
    }
    private rFunc(): void {
        if (this.rHandler) this.rHandler.run();
    }

}
