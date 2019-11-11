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
 * @Description: 炼狱共鸣属性
 * @Author: moyusheng
 * @Date: 2019-10-16 13:45:02
 */
var PurgatoryResonateProp = (function (_super) {
    __extends(PurgatoryResonateProp, _super);
    function PurgatoryResonateProp() {
        var _this = _super.call(this, LayerManager.UI_Tips) || this;
        _this.skinName = "PurgatoryResonatePropSkin";
        return _this;
    }
    PurgatoryResonateProp.prototype.init = function () {
    };
    PurgatoryResonateProp.prototype.open = function (param) {
        _super.prototype.open.call(this);
        this.pG.removeChildren();
        if (param) {
            this.title.source = param.winTitle;
            if (param.firData instanceof Array) {
                for (var _i = 0, _a = param.firData; _i < _a.length; _i++) {
                    var item = _a[_i];
                    this.pG.addChild(item);
                }
            }
        }
    };
    PurgatoryResonateProp.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        for (var _i = 0, _a = this.pG.$children; _i < _a.length; _i++) {
            var item = _a[_i];
            App.DisplayUtils.removeFromParent(item);
            item.dispose();
            ObjectPool.push(item);
        }
    };
    PurgatoryResonateProp.prototype.close = function () {
        _super.prototype.close.call(this);
        this.dispose();
    };
    return PurgatoryResonateProp;
}(BaseEuiWindow));
__reflect(PurgatoryResonateProp.prototype, "PurgatoryResonateProp");
//# sourceMappingURL=PurgatoryResonateProp.js.map