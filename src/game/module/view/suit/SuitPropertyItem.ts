/**
 * effect: 套装详情item内容
 * author :lzw
 * data :2019.7.24 
 */

class SuitPropertyItem extends BaseCustComponent {
    public constructor() {
        super();
        this.skinName = "SuitPropertyItemSkin";
    }

    public lbNe: eui.Label;
    public lbLv: eui.Label;
    public eBtn: eui.Image;
    public imgZl: eui.Image;
    public imgAdd: eui.Image;
    public num: NumberMC;
    public prop: PropPart;/**属性 */



    protected childrenCreated(): void {
        super.childrenCreated();
        this.addTouchEvent(this.eBtn, this.onClick);
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (this.data.name) {
            this.prop.setData(this.data.att, []);
            this.lbNe.text = this.data.name;
            this.prop.setSortType("hor");
            this.lbLv.textFlow = TextFlowUtils.generateTextFlow(this.data.dec);
            this.num.value = ItemUtils.getZdlByProp(this.data.att);
            this.eBtn.visible = this.data.sortId < 1000;
            this.eBtn.source = this.data.eqLv >= this.data.showlevel ? "res/btn/activate_1.png" : "res/btn/activate_2.png";
        }
    }

    public onClick() {
        if (this.data.eqLv >= this.data.showlevel) {
            Proxy.suit.sendSuitGetLv(this.data.roleId, this.data.level);
        }
        else {
            GlobalFun.SysMsg(Language.lang.suit1)
        }
    }


}