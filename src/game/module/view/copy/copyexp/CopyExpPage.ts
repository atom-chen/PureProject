/*
 * @Description: 经验副本面板
 * @Author: xiejunwei
 * @Date: 2019-09-02 15:09:12
 * @LastEditTime: 2019-10-28 19:35:09
 */
class CopyExpPage extends BaseSpriteView {

    public constructor($parent: egret.DisplayObjectContainer = null) {
        super($parent);
        this.skinName = "CopyExpPageSkin";
    }

    public instruction: InstructionPart;
    public buyBtn: eui.Image;
    public item_1: ItemBase;
    public item_0: ItemBase;
    public cost: ItemExpend;
    public btn_0: eui.Button;
    public count: eui.Label;
    public ruleText: eui.Label;

    private enterCount: number = 0;

    protected init(): void {
        super.init();
    }

    static red() {
        return GameCache.copy.checkCopyExp();
    }

    static changeMsg() {
        return [MsgConst.COPY_COUNT];
    }

    public open(param: ViewProp): void {
        this.addTouchEvent(this.btn_0, this.enterCopy);
        this.addTouchEvent(this.buyBtn, this.countBuy);
        this.message(MsgConst.COPY_COUNT, this.initData);
        this.initData();
    }



    private initData(): void {
        let dataArr = GameCache.copy.getCopyExpId();
        let conf = GameConfig.copyExp[dataArr[0]];
        this.item_0.data = conf.consume[0];
        this.cost.setData(conf.consume[0].id, conf.consume[0].count);
        let fbid = GameCache.copy.getCopyExpId()[1];
        let expConf = GameConfig.fuben[fbid];
        // let count = GameCache.copy.copyData[39] ? GameCache.copy.copyData[39].enter : 0;
        // count = 3 - count < 0 ? 0 : 3 - count;
        // this.enterCount = count;
        let data = GameCache.copy.copyExpBuyData ? GameCache.copy.copyExpBuyData : null;
        let boughtCount = data && data.boughtCount ? data.boughtCount : 0
        let enterCount = data && data.enterCount ? data.enterCount : 0
        let count = boughtCount + expConf.enterCfg[0].freeTimes - enterCount;
        this.enterCount = count;
        let str = StringUtils.substitute(Language.lang.remain, count + "/3");
        this.count.textFlow = TextFlowUtils.generateTextFlow(str);
    }



    private enterCopy(): void {
        // if (this.enterCount == 1) {
        //     let gold = GameCache.hero.mainPro.pro(PropId.AP_YUANBAO);
        //     if (gold < 100) {
        //         GlobalFun.SysMsg("钻石不足");
        //         return;
        //     }
        // }
        if (this.enterCount == 0) {
            GlobalFun.SysMsg(Language.lang.jingji_t5);
            this.countBuy();
            return;
        }
        if (!this.cost.checkEnough()) {
            return;
        }
        GameCache.copy.enterCopyExp();
        App.ViewManager.close(ViewConst.COPY);
    }

    private countBuy(): void {
        GlobalFun.openEnterBuy("exp");
    }
}
