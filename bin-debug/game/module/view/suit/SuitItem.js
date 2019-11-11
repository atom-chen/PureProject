/**
 * effect: 套装item内容
 * author :lzw
 * data :2019.7.24
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
var SuitItem = (function (_super) {
    __extends(SuitItem, _super);
    function SuitItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "SuitItemSkin";
        return _this;
    }
    // public changeNum = 0;
    SuitItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.imgItem.source = GlobalFun.getItemSourceById(GameCache.suit.nResolveId);
        this.addTouchEvent(this.eBtn, this.onClick);
    };
    SuitItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.data.item) {
            var itemData = GameConfig.item[this.data.item];
            if (itemData) {
                this.lbLv.text = "Lv" + this.data.level;
                this.lbLv.textColor = ItemUtils.getItemColor(itemData.showQuality);
                this.lbNe.textFlow = TextFlowUtils.generateTextFlow(ItemUtils.getItemNamewithColor(itemData));
                var needCount = 10000;
                if (GameConfig.equipExchange[this.data.item] && GameConfig.equipExchange[this.data.item].needNum && GameConfig.equipExchange[this.data.item].needNum[0]) {
                    this.lbNum.text = GameConfig.equipExchange[this.data.item] ? "X" + GameConfig.equipExchange[this.data.item].needNum[0].count : "";
                    needCount = GameConfig.equipExchange[this.data.item].needNum[0].count;
                }
                var bHave = GameCache.bag.itemCount(itemData.id) > 0;
                var bRed = false;
                if (!bHave) {
                    bRed = GameCache.bag.itemCount(GameCache.suit.nResolveId) >= needCount;
                }
                var bEquip = GameCache.equip.bEquip(itemData);
                if (bRed && bEquip) {
                    bRed = false;
                }
                App.ViewManager.showRedPoint(this.eBtn, bRed);
                this.num.value = ItemUtils.getItemZDL(itemData);
                this.setPower(itemData);
                this.itemBase.data = itemData;
            }
        }
    };
    SuitItem.prototype.onClick = function () {
        Proxy.suit.sendSuitChange(this.data.roleId, this.data.item, 1);
    };
    /**设置战斗力差距 */
    SuitItem.prototype.setPower = function (item) {
        this.gZll.visible = this.data.gap != 0;
        this.imgAdd.source = this.data.gap > 0 ? "public_json.public_add_2_png" : "public_json.public_minus_1_png";
        this.imgZl.source = this.data.gap > 0 ? "public_json.public_zhanli_2_png" : "public_json.public_zhanli_1_png";
        this.num.type = this.data.gap > 0 ? "num_yellow_1_" : "num_green_1_";
        this.num.value = Math.abs(this.data.gap);
        var strImg = "";
        if (this.data.gap > 0) {
            strImg = "public_json.public_g_allow_png";
        }
        else if (this.data.gap < 0) {
            strImg = "public_json.public_r_allow_png";
        }
        this.itemBase.setMarkImg(strImg);
    };
    return SuitItem;
}(BaseCustComponent));
__reflect(SuitItem.prototype, "SuitItem");
//# sourceMappingURL=SuitItem.js.map