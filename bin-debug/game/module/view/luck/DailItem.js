/*
 * @Description: 抽奖item内容
 * @Author: liangzhaowei
 * @Date: 2019-08-01 17:38:18
 * @LastEditTime: 2019-08-20 16:45:02
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
var DailItem = (function (_super) {
    __extends(DailItem, _super);
    function DailItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "DailItemSkin";
        return _this;
    }
    DailItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    DailItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.initData();
    };
    DailItem.prototype.initData = function () {
        if (this.data) {
            var data = this.data;
            this.icon.source = GlobalFun.getItemSourceById(data.id);
            this.lbNum.text = data.count + "";
        }
    };
    Object.defineProperty(DailItem.prototype, "setState", {
        set: function (state) {
            this.recv.visible = state;
            this.gNum.visible = !state;
        },
        enumerable: true,
        configurable: true
    });
    return DailItem;
}(BaseCustComponent));
__reflect(DailItem.prototype, "DailItem");
//# sourceMappingURL=DailItem.js.map