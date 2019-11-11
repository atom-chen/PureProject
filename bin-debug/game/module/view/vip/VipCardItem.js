/*
 * @Description: vip卡片item
 * @Author: liangzhaowei
 * @Date: 2019-08-27 16:21:52
 * @LastEditTime: 2019-10-10 11:41:45
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var VipCardItem = (function (_super) {
    __extends(VipCardItem, _super);
    function VipCardItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "VipCardItemSkin";
        return _this;
    }
    VipCardItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.listLb.itemRenderer = VipWelfareItem;
        this.addTouchEvent(this.eBtn, this.onClick);
        this.addTouchEvent(this.lbMore, this.onClickMore);
    };
    VipCardItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.data.id) {
            var cfg = this.data;
            var listDec = [];
            for (var index in cfg.desc) {
                var obj = { bNew: false, dec: "" };
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
    };
    VipCardItem.prototype.onClick = function () {
        Proxy.vip.actCard(this.data.id);
    };
    VipCardItem.prototype.onClickMore = function () {
        if (this.data.id) {
            var viewP = new ViewProp();
            viewP.exData1 = this.data.id;
            App.ViewManager.open(ViewConst.VIPTIPS, viewP);
        }
    };
    return VipCardItem;
}(BaseCustComponent));
__reflect(VipCardItem.prototype, "VipCardItem");
//# sourceMappingURL=VipCardItem.js.map