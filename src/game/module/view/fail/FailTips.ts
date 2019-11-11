/*
 * @Description: 失败窗口
 * @Author: xiejunwei
 * @Date: 2019-08-22 17:09:19
 * @LastEditTime: 2019-10-31 19:32:39
 */
class FailTips extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_TipsNoClick);
        this.skinName = "FailTipsSkin"
    }

    public btn: eui.Button;
    public enterBtn: eui.Button;
    public countDown: eui.Label;
    public itemList: eui.List;
    public img: eui.Image;

    public init(): void {
        super.init();
        this.itemList.itemRenderer = FailTipsItem;
    }


    public open(param: ViewProp): void {
        super.open();
        this.addTouchEvent(this.btn, this.btnFunc);
        // this.addTouchEvent(this.btn, this.rechargeFunc);
        // App.DisplayUtils.buttonDownTime(this.btn, 7, [this.countDown, Language.lang.autoExit]);

        let point = GameCache.hero.mainPro.pro(PropId.AP_VIP_POINT);
        this.img.source = point == 0 ? "fail_json.fail_texture_0_png" : "fail_json.fail_texture_2_png";

        this.initList();
    }

    public close(param: ViewProp): void {
        super.close();
        let conf = GameCache.map.mapConfig;
        // if (conf.type != SceneType.NORMAL_FIELD)
        //     PassMgr.switchGj(true);
    }


    private initList(): void {
        let conf = GameConfig.fail;
        let arr = [];
        for (let i in conf) {
            arr.push(conf[i]);
        }
        this.setListData(this.itemList, arr);
    }



    private btnFunc(): void {
        this.closeView();
    }

    private rechargeFunc(): void {
        GlobalFun.gotoCharge();
        this.closeView();
    }
}