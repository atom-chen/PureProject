/*
 * @Description: 失败跳转条目
 * @Author: xiejunwei
 * @Date: 2019-09-25 13:52:44
 */
class FailTipsItem extends BaseCustComponent {
    public constructor() {
        super();
    }

    public desc: eui.Label;
    public btn: eui.Button;
    public icon: eui.Image;
    public iName: eui.Image;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.addTouchEvent(this.btn, this.linkFunc);
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (!this.data.id) return;

        this.desc.text = this.data.dec;
        this.icon.source = RES_DIR_SYSOPEN_ICON + this.data.icon;
        this.iName.source = RES_DIR_SYSOPEN_NAME + this.data.icon_name;
    }

    public dispose(): void {
        super.dispose();
    }

    private linkFunc(): void {
        TextFlowUtils.hrefType(this.data.jump);
        App.ViewManager.close(ViewConst.FAIL);
    }

}