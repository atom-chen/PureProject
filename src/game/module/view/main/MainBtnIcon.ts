/*
    author:lzw
    date:2019/6/14 15:10
    explain:主界面按钮
*/
class MainBtnIcon extends BaseCustComponent {
    public constructor() {
        super();
        this.skinName = "MainBtnIconSkin";
    }


    public labelDisplay: eui.Label;
    public iconDisplay: eui.Image;
    public data;

    private mc: MovieClip;


    protected childrenCreated(): void {
        super.childrenCreated();
    }

    //初始化
    public initUI() {

    }


    /**更新内容 */
    public update(data) {

        this.data = data;


        /**icon图片 */
        if (this.data && this.data.icon) {
            this.iconDisplay.source = this.data.icon

            if (this.data.iconEff) {
                this.showEff();
            } else {
                this.hideEff();
            }
        }

    }

    private showEff() {
        if (!this.mc) {
            let mc = App.DisplayUtils.addEffectToObj(this, "actIcon_0_1", -1, 40, 40);
            this.mc = mc;
        }
        this.mc.play(-1);
        this.mc.visible = true;
    }

    public hideEff() {
        if (this.mc) {
            this.mc.visible = false;
            this.mc.stop();
        }
    }

    public dispose(): void {
        super.dispose();
    }

}