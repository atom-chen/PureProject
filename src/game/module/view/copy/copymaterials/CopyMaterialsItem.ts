/*
 * @Description: 材料副本条目
 * @Author: xiejunwei
 * @Date: 2019-08-21 20:04:08
 * @LastEditTime: 2019-10-26 15:13:49
 */
class CopyMaterialsItem extends BaseCustComponent {
    public constructor() {
        super();
    }

    public bg: eui.Image;
    public iG: eui.Group;
    public cost: ItemExpend;
    public desc: eui.Label;
    public title: eui.Image;
    public btn: eui.Button;

    public itemList: ItemList;

    private sweepCount: number = 0;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.addTouchEvent(this.btn, this.enterFunc);
        this.cost.gainWay.visible = false;
        this.cost.numColor_0 = 0x00b4fc;
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (!this.data.id) return;
        this.initdata();
    }

    public dispose(): void {
        if (this.itemList) this.itemList.dispose();
        super.dispose();
    }

    private initdata(): void {
        let roleLvl = GameCache.hero.mainPro.pro(PropId.AP_LEVEL);

        this.bg.source = "res/images/bg/copyMaterialsBg_" + this.data.backpic + ".png";
        this.title.source = "copymaterials_json.copymaterials_title_" + this.data.namepic + "_png";

        let copyData = GameCache.copy.getCopyData(this.data.id);
        this.cost.visible = false;
        this.btn.touchEnabled = true;
        if (copyData) {
            this.btn.icon = copyData.free ? "res/btn/enterBtn3.png" : "res/btn/sweepBtn2.png";
            this.sweepCount = copyData.sweep;
            if (this.data.level > roleLvl) {
                this.desc.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.copyEnterCondition, this.data.level));
                this.btn.icon = "res/btn/enterBtn3g.png";
                this.btn.touchEnabled = false;
            } else {
                this.btn.visible = true;
                if (!copyData.free) {
                    this.cost.visible = true;
                    this.cost.setData(copyData.consumes[0].id, copyData.consumes[0].count);
                    this.desc.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.copySweepCount, copyData.sweep));
                } else {
                    this.desc.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.copyEnterCount, copyData.free));
                }
            }
        }

        if (!this.itemList) {
            this.itemList = ObjectPool.get(ItemList);
        }


        this.itemList.setData(this.data.awardshow, this.iG);
    }

    private enterFunc(): void {
        if (this.cost.visible) {
            if (this.cost.isExpend) {
                if (this.sweepCount) {
                    Proxy.copy.sendSweep(this.data.id, 0);
                } else {
                    GlobalFun.checkVipLvl(Language.lang.copyText_0);
                }
            } else {
                //充值跳转
                let str = StringUtils.substitute(Language.lang.notEnought, Language.lang.yb);
                GlobalFun.SysMsg(str);
            }
        } else {
            Proxy.copy.sendEnterFB(this.data.id);
            App.ViewManager.close(ViewConst.COPY);
        }
    }

}