/*
 * @Description: 通用系统提示
 * @Author: xiejunwei
 * @Date: 2019-07-31 20:45:48
 * @LastEditTime: 2019-10-26 14:21:09
 */
class SysTips extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_TipsNoClick);
        this.skinName = "SysTipsSkin";
        this.horizontalCenter = 1;
        this.verticalCenter = 1;
    }

    public desc: eui.Label;
    public btn0: eui.Button;
    public btn1: eui.Button;

    private handler: Handler;

    public init(): void {
        super.init();
        this.setWinTitle("hint2");
    }

    public open(param: ViewProp): void {
        super.open()
        this.initData(param);
        this.addTouchEvent(this.btn0, this.closeView);
        this.addTouchEvent(this.btn1, this.onCLick);
        this.currentState = param.exData1["state"] == 1 ? "single" : "normal";
    }

    public close(param: ViewProp): void {
        super.close();
        if (this.handler) {
            this.handler.dispose();
            this.handler = null;
        }
    }

    private initData(param: ViewProp): void {
        this.desc.textFlow = TextFlowUtils.generateTextFlow(param.exData1.desc);
        if (this.handler) {
            this.handler.dispose();
        }
        this.handler = Handler.create(param.exData1.thisc, param.exData1.func, [], false);
    }

    private onCLick(): void {
        if (this.handler) {
            this.handler.run();
        }
        this.closeView();
    }
}
