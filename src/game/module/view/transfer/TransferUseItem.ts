/*
 * @Description: 转职职业展览item
 * @Author: liangzhaowei
 * @Date: 2019-10-29 17:26:55
 */


class TransferUseItem extends BaseCustComponent {
    public constructor() {
        super();
        this.skinName = "TransferUseItemSkin";
    }

    public lbNe: eui.Label;
    public lbLv: eui.Label;
    public lbUse: eui.Label;
    public eBtn: eui.Button;
    public item: ItemBase;
    public itemIcon: eui.Image;
    public gPrice: eui.Group;
    public lbLeft: eui.Label;


    /**不足条件时,跳转 */
    public bGotoCharge = true;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.addTouchEvent(this.eBtn, this.onClick)
    }

    protected dataChanged(): void {
        super.dataChanged();
        this.bGotoCharge = true;
        if (this.data.item) {
            let cfg: StdTransferconfig = this.data.item;
            if (cfg) {
                this.item.data = cfg.id;
                this.lbNe.text = StringUtils.substitute(Language.lang.lcn21, cfg.exp);
                if (cfg.consume && cfg.consume[0]) {
                    this.itemIcon.source = GlobalFun.getItemSourceById(cfg.consume[0].id);
                    this.lbLv.text = cfg.consume[0].count;
                    this.bGotoCharge = GlobalFun.getBagEnounghUseCondition(cfg.consume, null)
                }

                let trData: TransferItem = GameCache.transfer.syData[GameCache.hero.getRoleIdByIndex(this.data.slRoleId)];
                if (trData) {
                    let useTime = trData.itemUseIime[cfg.idex] || 0;
                    if (cfg.count > 0) {
                        this.lbUse.visible = true;
                        if (cfg.count - useTime > 0) {
                            this.lbUse.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.lcn22, cfg.count - useTime));
                        }
                        else {
                            this.lbUse.textFlow = TextFlowUtils.generateTextFlow(Language.lang.lcn23);
                        }
                    }
                    else {
                        this.lbUse.visible = false;
                    }
                }

                let count = GameCache.bag.itemCount(cfg.id);
                this.eBtn.icon = count > 0 ? "res/btn/use.png" : "res/btn/buyUse.png";
                if (count > 0) {
                    this.bGotoCharge = true;
                    this.lbLeft.text = StringUtils.substitute(Language.lang.lcn24, count);
                    this.lbLeft.visible = true;
                    this.gPrice.visible = false;
                }
                else {
                    this.lbLeft.visible = false;
                    this.gPrice.visible = true;
                }
                App.ViewManager.showRedPoint(this.eBtn, count > 0)
            }
        }
    }
    public onClick() {
        if (this.data.item) {
            if (!this.bGotoCharge) {
                GlobalFun.gotoCharge();
                App.ViewManager.close(ViewConst.TRANSFERUSE);
            }
            else {
                Proxy.transfer.sendSuitChange(this.data.slRoleId, this.data.item.idex)
            }
        }
    }

}