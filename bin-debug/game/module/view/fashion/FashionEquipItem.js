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
/*
 * @Description: 时装展示item
 * @Author: xiejunwei
 * @Date: 2019-09-16 12:02:19
 */
var FashionEquipItem = (function (_super) {
    __extends(FashionEquipItem, _super);
    function FashionEquipItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FashionEquipItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    FashionEquipItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (!this.data)
            return;
        if (this.itemData) {
            this.initHandler();
            this.initPartImg(this.itemData.part);
        }
    };
    FashionEquipItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    FashionEquipItem.prototype.initPartImg = function (part) {
        if (!this.partImg) {
            this.partImg = new eui.Image();
            this.partImg.x = 5;
            this.partImg.y = 51;
            this.addChild(this.partImg);
        }
        this.partImg.source = "fashion_json.fashion_part_" + part + "_png";
    };
    FashionEquipItem.prototype.initHandler = function () {
        this.setHandler(this, this.openTips);
    };
    FashionEquipItem.prototype.openTips = function () {
        if (!this.itemData)
            return;
        var btnSrc = "";
        var func = [];
        var buy = GameCache.fashion.checkHave(this.itemData);
        var buystr = buy ? "res/btn/share.png" : "res/btn/buy.png";
        btnSrc = "res/btn/takeOff.png";
        func = [this.takeOff, this.buyFashion];
        var view = new ViewProp();
        view.itemData = this.itemData;
        var obj = {
            thisc: this,
            func: func,
            icon: [btnSrc, buystr]
        };
        view.firData = obj;
        App.ViewManager.open(ViewConst.ITEMTIPS, view);
    };
    FashionEquipItem.prototype.sendMsg = function () {
        GameCache.fashion.tryFashion([this.itemData]);
        App.ViewManager.close(ViewConst.ITEMTIPS);
    };
    FashionEquipItem.prototype.buyFashion = function () {
        var item = GameConfig.item[this.itemData["needNum"][0].id];
        var need = this.itemData["needNum"][0].count;
        var have = GameCache.bag.itemCount(this.itemData["needNum"][0].id);
        var buy = GameCache.fashion.checkHave(this.itemData);
        if (!buy) {
            if (need <= have) {
                GameCache.fashion.fashionBuy([this.itemData]);
            }
            else {
                var str = StringUtils.substitute(Language.lang.notEnought, item.name);
                GlobalFun.SysMsg(str);
            }
        }
        App.ViewManager.close(ViewConst.ITEMTIPS);
    };
    FashionEquipItem.prototype.takeOff = function () {
        GameCache.fashion.takeOff([this.itemData]);
        App.ViewManager.close(ViewConst.ITEMTIPS);
    };
    return FashionEquipItem;
}(ItemBase));
__reflect(FashionEquipItem.prototype, "FashionEquipItem");
//# sourceMappingURL=FashionEquipItem.js.map