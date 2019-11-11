/**
 * create by junwei on 07/03/2019
 * 属性模块
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
var PropPartResonate = (function (_super) {
    __extends(PropPartResonate, _super);
    function PropPartResonate() {
        var _this = _super.call(this) || this;
        _this.skinName = "PropPartResonateSkin";
        return _this;
    }
    PropPartResonate.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    PropPartResonate.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
    };
    PropPartResonate.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        for (var _i = 0, _a = this.pG.$children; _i < _a.length; _i++) {
            var item = _a[_i];
            App.DisplayUtils.removeFromParent(item);
            ObjectPool.push(item);
        }
    };
    /**
     * @param propList 属性 color1为属性文字颜色 color2 满足条件颜色 color3 不满足颜色 , str为长度2的字符串数组，用作分割符
     */
    PropPartResonate.prototype.setData = function (title, propList) {
        this.pG.removeChildren();
        this.title.textFlow = TextFlowUtils.generateTextFlow(title);
        for (var _i = 0, propList_1 = propList; _i < propList_1.length; _i++) {
            var prop = propList_1[_i];
            var lab = ObjectPool.get(eui.Label);
            lab.maxWidth = 318;
            lab.size = 16;
            lab.textFlow = TextFlowUtils.generateTextFlow(prop);
            this.pG.addChild(lab);
        }
    };
    return PropPartResonate;
}(BaseCustComponent));
__reflect(PropPartResonate.prototype, "PropPartResonate");
//# sourceMappingURL=PropPartResonate.js.map