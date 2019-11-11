/*
 * @Description: 系统开启提示
 * @Author: xiejunwei
 * @Date: 2019-09-20 13:38:07
 */
class SysOpenHint extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Main2);
        this.skinName = "SysOpenHintSkin";

        this.top = this.bottom = this.left = this.right = 0;
    }

    public g0: eui.Group;
    public sName: eui.Image;
    public icon: eui.Image;


    public init(): void {
        super.init();
    }

    public open(param: ViewProp): void {
        super.open();
        let playList = param.firData;
        if (!playList.length) {
            this.playFinish();
            return;
        }

        App.DisplayUtils.addEffectToObj(this.g0, "opensys_0_1", -1, 160, 100)
        this.icon.source = RES_DIR_SYSOPEN_ICON + playList[0].icon;
        this.sName.source = RES_DIR_SYSOPEN_NAME + playList[0].name;
        let targetData: string = playList[0].location;
        let tarArr = targetData.split("#");
        let view = App.ViewManager.getView(ViewConst[tarArr[0]]);
        this.g0.horizontalCenter = 1;
        this.g0.verticalCenter = 1;
        // this.icon.horizontalCenter = this.icon.verticalCenter = 1;
        this.icon.x = (view.width - 105) >> 1;
        this.icon.y = (view.height - 111) >> 1;
        this.icon.visible = this.g0.visible = true;
        let tar = tarArr.length == 2 ? view[tarArr[1]] : view[tarArr[1]].getChildByName(tarArr[2]);
        if (!tar)
            this.playFinish();
        else {
            let xy = tar.parent.localToGlobal(tar.x, tar.y);
            xy = this.globalToLocal(xy.x, xy.y, );
            this.playAnimate(xy.x, xy.y);
        }

    }

    public close(param: ViewProp): void {
        super.close();
    }

    private tw: egret.Tween;
    private playAnimate(x, y): void {
        this.tw = egret.Tween.get(this.icon);
        // this.tw.wait(3000).to({ x: x, y: y }, 1500).wait(3000).call(this.playFinish, this);
        this.tw.wait(1500).call(this.hide, this).to({ x: x, y: y }, 1500, egret.Ease.cubicInOut).wait(700).call(this.playFinish, this);
    }

    private hide(): void {
        this.g0.visible = false;
    }

    private playFinish(): void {
        if (this.tw) {
            egret.Tween.removeTweens(this.tw);
            this.tw = null;
        }
        this.icon.visible = false;
        this.closeView();
    }
}