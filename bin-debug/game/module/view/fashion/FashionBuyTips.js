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
 * @Description: 时装购买确认
 * @Author: xiejunwei
 * @Date: 2019-08-12 17:05:58
 * @LastEditTime: 2019-10-17 20:06:02
 */
var FashionBuyTips = (function (_super) {
    __extends(FashionBuyTips, _super);
    function FashionBuyTips() {
        var _this = _super.call(this, LayerManager.UI_Tips) || this;
        _this.itemArr = [];
        _this.skinName = "FashionBuyTipsSkin";
        return _this;
    }
    // private need = {};
    FashionBuyTips.prototype.init = function () {
        _super.prototype.init.call(this);
        this.itemList.itemRenderer = ItemBase;
        // this.cost.lab.textColor = this.cost.numColor_0 = 0xffffff;
        this.setWinTitle("fashion");
        this.t0.text = Language.lang.consume;
    };
    FashionBuyTips.prototype.open = function (param) {
        _super.prototype.open.call(this);
        this.addTouchEvent(this.buyBtn, this.buyFashion);
        this.addTouchEvent(this.cBtn, this.closeView);
        this.initPrice(param.exData1);
        this.initList(param.exData1);
        this.role = param.exData2;
    };
    FashionBuyTips.prototype.initList = function (itemArr) {
        this.itemArr = [];
        this.setListData(this.itemList, itemArr);
        this.itemArr = itemArr.concat();
    };
    FashionBuyTips.prototype.initPrice = function (itemArr) {
        var _this = this;
        if (itemArr === void 0) { itemArr = []; }
        // let needNum = 0;
        var need = {};
        for (var _i = 0, itemArr_1 = itemArr; _i < itemArr_1.length; _i++) {
            var i = itemArr_1[_i];
            for (var _a = 0, _b = i["needNum"]; _a < _b.length; _a++) {
                var j = _b[_a];
                if (!need[j.id])
                    need[j.id] = 0;
                need[j.id] += j.count;
            }
            // needNum += i["needNum"][0].count;
        }
        for (var i in need) {
            var itemExpand = new ItemExpend();
            itemExpand.skinName = "ItemExpend5Skin";
            this.costGroup.addChild(itemExpand);
            itemExpand.currentState = "single";
        }
        App.TimerManager.addDelay(50, 50, 1, function () {
            var count = 0;
            for (var i in need) {
                var itemExpand = _this.costGroup.getChildAt(count);
                itemExpand.setData(parseInt(i), need[i]);
                count++;
            }
        }, this);
        // this.cost.setData(itemArr[0]["needNum"][0].id, needNum);
    };
    FashionBuyTips.prototype.close = function (param) {
        _super.prototype.close.call(this);
        this.itemArr = [];
        for (var i = 0; i < this.costGroup.numChildren; i++) {
            var item = this.costGroup.getChildAt(i);
            App.DisplayUtils.removeFromParent(item);
            item.dispose();
            item = null;
        }
        // this.need = {};
    };
    FashionBuyTips.prototype.buyFashion = function () {
        // if (this.cost.isExpend) {
        //     GameCache.fashion.fashionBuy(this.itemArr);
        //     GameCache.fashion.dish = {}; //购买清空试穿列表
        //     App.ViewManager.close(ViewConst.FASHIONBUY);
        // }
        for (var i = 0; i < this.costGroup.numChildren; i++) {
            var item = this.costGroup.getChildAt(i);
            if (!item.checkEnough())
                return;
        }
        GameCache.fashion.fashionBuy(this.itemArr);
        GameCache.fashion.dish = {}; //购买清空试穿列表
        App.ViewManager.close(ViewConst.FASHIONBUY);
    };
    return FashionBuyTips;
}(BaseEuiWindow));
__reflect(FashionBuyTips.prototype, "FashionBuyTips");
//# sourceMappingURL=FashionBuyTips.js.map