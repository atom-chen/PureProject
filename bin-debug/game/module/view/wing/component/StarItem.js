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
 * @Description: 星型进度条条目
 * @Author: xiejunwei
 * @Date: 2019-08-15 16:20:43
 * @LastEditTime: 2019-08-15 16:23:16
 */
var StarItem = (function (_super) {
    __extends(StarItem, _super);
    function StarItem() {
        return _super.call(this) || this;
    }
    StarItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    StarItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
    };
    StarItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return StarItem;
}(BaseCustComponent));
__reflect(StarItem.prototype, "StarItem");
//# sourceMappingURL=StarItem.js.map