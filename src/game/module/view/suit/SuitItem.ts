/**
 * effect: 套装item内容
 * author :lzw
 * data :2019.7.24 
 */

class SuitItem extends BaseCustComponent {
    public constructor() {
        super();
        this.skinName = "SuitItemSkin";
    }



    public lbLv: eui.Label;
    public lbNe: eui.Label;
    public eBtn: eui.Button;
    public imgItem: eui.Image;
    public lbNum: eui.Label;
    public imgZl: eui.Image;
    public imgAdd: eui.Image;
    public num: NumberMC;
    public gZll: eui.Group;
    public itemBase: ItemBaseCornerMark;

    // public changeNum = 0;


    protected childrenCreated(): void {
        super.childrenCreated();
        this.imgItem.source = GlobalFun.getItemSourceById(GameCache.suit.nResolveId);
        this.addTouchEvent(this.eBtn, this.onClick);
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (this.data.item) {
            let itemData: StdItem = GameConfig.item[this.data.item];
            if (itemData) {
                this.lbLv.text = "Lv" + this.data.level;
                this.lbLv.textColor = ItemUtils.getItemColor(itemData.showQuality);
                this.lbNe.textFlow = TextFlowUtils.generateTextFlow(ItemUtils.getItemNamewithColor(itemData));
                let needCount = 10000;
                if (GameConfig.equipExchange[this.data.item] && GameConfig.equipExchange[this.data.item].needNum && GameConfig.equipExchange[this.data.item].needNum[0]) {
                    this.lbNum.text = GameConfig.equipExchange[this.data.item] ? "X" + GameConfig.equipExchange[this.data.item].needNum[0].count : "";
                    needCount = GameConfig.equipExchange[this.data.item].needNum[0].count
                }
                let bHave = GameCache.bag.itemCount(itemData.id) > 0;
                let bRed = false;
                if (!bHave) {
                    bRed = GameCache.bag.itemCount(GameCache.suit.nResolveId) >= needCount;
                }
                let bEquip = GameCache.equip.bEquip(itemData);
                if (bRed && bEquip) {
                    bRed = false;
                }

                App.ViewManager.showRedPoint(this.eBtn, bRed);
                this.num.value = ItemUtils.getItemZDL(itemData);
                this.setPower(itemData);
                this.itemBase.data = itemData;


            }
        }
    }

    public onClick() {
        Proxy.suit.sendSuitChange(this.data.roleId, this.data.item, 1);
    }

    /**设置战斗力差距 */
    public setPower(item: StdItem) {
        this.gZll.visible = this.data.gap != 0;
        this.imgAdd.source = this.data.gap > 0 ? "public_json.public_add_2_png" : "public_json.public_minus_1_png";
        this.imgZl.source = this.data.gap > 0 ? "public_json.public_zhanli_2_png" : "public_json.public_zhanli_1_png";
        this.num.type = this.data.gap > 0 ? "num_yellow_1_" : "num_green_1_";
        this.num.value = Math.abs(this.data.gap);

        let strImg = "";
        if (this.data.gap > 0) {
            strImg = "public_json.public_g_allow_png"
        }
        else if (this.data.gap < 0) {
            strImg = "public_json.public_r_allow_png"
        }
        this.itemBase.setMarkImg(strImg);
    }

}