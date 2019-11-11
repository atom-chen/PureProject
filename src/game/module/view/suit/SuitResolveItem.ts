/**
 * effect: 套装分解item内容
 * author :lzw
 * data :2019.7.24 
 */

class SuitResolveItem extends BaseCustComponent {
    public constructor() {
        super();
        this.skinName = "SuitResolveItemSkin";
    }

    public lbNe: eui.Label;
    public lbAct: eui.Label;
    public eBtn: eui.Button;
    public imgItem: eui.Image;
    public lbNum: eui.Label;
    public itemBase: ItemBase


    protected childrenCreated(): void {
        super.childrenCreated();
        this.addTouchEvent(this.eBtn, this.onClick);
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (this.data.id) {
            this.lbNe.textFlow = TextFlowUtils.generateTextFlow(ItemUtils.getItemNamewithColor(this.data));
            this.imgItem.source = GlobalFun.getItemSourceById(GameCache.suit.nResolveId);
            if (GameConfig.equipExchange[this.data.id] && GameConfig.equipExchange[this.data.id].needNum[0]) {
                this.lbNum.text = GameConfig.equipExchange[this.data.id] ? "X" + GameConfig.equipExchange[this.data.id].needNum[0].count : "";
            }
            this.itemBase.data = this.data.id;
        }
    }
    public onClick() {
        Proxy.suit.sendSuitResolve(this.data.roleId, this.data.id, 1);
    }

}