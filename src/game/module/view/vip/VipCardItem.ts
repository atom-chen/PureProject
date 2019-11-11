/*
 * @Description: vip卡片item
 * @Author: liangzhaowei
 * @Date: 2019-08-27 16:21:52
 * @LastEditTime: 2019-10-10 11:41:45
 */

class VipCardItem extends BaseCustComponent {
    public constructor() {
        super();
        this.skinName = "VipCardItemSkin";
    }


    public imgPrice: eui.Image;
    public gPrice: eui.Group;
    public imgItem0: eui.Image;
    public lbNum0: eui.Label;
    public imgItem1: eui.Image;
    public lbNum1: eui.Label;
    public imgVip: eui.Image;
    public lbMore: eui.Label;
    public eBtn: eui.Button;
    public listLb: eui.List;
    public eff: eui.Component;
    public passEff: MovieClip;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.listLb.itemRenderer = VipWelfareItem;
        this.addTouchEvent(this.eBtn, this.onClick)
        this.addTouchEvent(this.lbMore, this.onClickMore)
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (this.data.id) {
            let cfg: StdVipcard = this.data;
            let listDec = [];
            for (let index in cfg.desc) {
                let obj = { bNew: false, dec: "" };
                obj.dec = cfg.desc[index];
                listDec.push(obj);
            }

            /**图片 */
            this.imgPrice.visible = cfg.condsIcon ? true : false;
            if (cfg.condsIcon) {
                this.imgPrice.source = cfg.condsIcon;
            }


            this.gPrice.visible = cfg.OriDiamondConds ? true : false;

            /**原价 价格 */
            if (cfg.OriDiamondConds) {
                this.imgItem0.source = GlobalFun.getItemSourceById(cfg.OriDiamondConds.id);
                this.lbNum0.text = cfg.OriDiamondConds.count + "";
            }


            /** 价格 */
            if (cfg.diamondConds) {
                this.imgItem1.source = GlobalFun.getItemSourceById(cfg.diamondConds.id);
                this.lbNum1.text = cfg.diamondConds.count + "";
            }
            this.imgVip.source = cfg.icon;
            this.eBtn.icon = GameCache.vip.vipCardSt[cfg.id] ? "public_json.luck_img2_png" : "res/btn/ljkt.png";
            this.eBtn.touchEnabled = !GameCache.vip.vipCardSt[cfg.id];

            /**特效 */
            if ((!GameCache.vip.vipCardSt[cfg.id]) && cfg.effect) {
                if (!this.passEff) {
                    this.passEff = App.DisplayUtils.addEffectToObj(this.eff, "vipCard_0_1", -1);
                }
                this.passEff.play(-1);
                this.passEff.visible = true;
            }
            else {
                if (this.passEff) {
                    this.passEff.visible = false;
                    this.passEff.stop();
                }
            }



            this.setListData(this.listLb, listDec);
        }
    }


    public onClick() {
        Proxy.vip.actCard(this.data.id)
    }

    public onClickMore() {
        if (this.data.id) {
            let viewP: ViewProp = new ViewProp();
            viewP.exData1 = this.data.id;
            App.ViewManager.open(ViewConst.VIPTIPS, viewP)
        }
    }



}