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
 * @Description: 搭配窗口条目
 * @Author: xiejunwei
 * @Date: 2019-08-06 15:36:06
 * @LastEditTime: 2019-08-16 17:49:09
 */
var CoordinateItem = (function (_super) {
    __extends(CoordinateItem, _super);
    function CoordinateItem() {
        var _this = _super.call(this) || this;
        _this.itemArr = [];
        _this.bState = true;
        return _this;
    }
    CoordinateItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addTouchEvent(this.tBtn, this.onTouche);
    };
    CoordinateItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (!this.data.id)
            return;
        this.itemArr = [];
        this.initItem();
        this.btnState();
    };
    CoordinateItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.itemArr = [];
    };
    CoordinateItem.prototype.initItem = function () {
        this.active.visible = true;
        for (var i = 0; i < 8; i++) {
            var item = GameConfig.fashion[this.data.part[i]];
            var buy = GameCache.fashion.checkHave(item);
            if (!buy)
                this.active.visible = false;
            this["item_" + i].data = item;
            this.itemArr.push(item);
        }
    };
    CoordinateItem.prototype.reflashItemList = function () {
        for (var i = 0; i < 8; i++) {
            this["item_" + i].initState();
        }
    };
    CoordinateItem.prototype.btnState = function () {
        for (var i = 0; i < this.itemArr.length; i++) {
            var fashionId = GameCache.fashion.tempProp.pro(this.itemArr[i].part);
            if (fashionId != this.itemArr[i].shape) {
                this.bState = true;
                this.tBtn.icon = "fashion_json.fashion_try2_png";
                return;
            }
        }
        this.bState = false;
        this.tBtn.icon = "res/btn/takeOff.png";
    };
    CoordinateItem.prototype.onTouche = function () {
        if (this.bState) {
            GameCache.fashion.tryFashion(this.itemArr);
            App.ViewManager.close(ViewConst.COORDINATE);
        }
        else {
            GameCache.fashion.takeOff(this.itemArr);
            this.bState = true;
            this.tBtn.icon = "fashion_json.fashion_try2_png";
        }
    };
    CoordinateItem.prototype.tryFashion = function () {
        GameCache.fashion.tryFashion(this.itemArr);
    };
    CoordinateItem.prototype.takeOff = function () {
        GameCache.fashion.takeOff(this.itemArr);
    };
    return CoordinateItem;
}(BaseCustComponent));
__reflect(CoordinateItem.prototype, "CoordinateItem");
//# sourceMappingURL=CoordinateItem.js.map