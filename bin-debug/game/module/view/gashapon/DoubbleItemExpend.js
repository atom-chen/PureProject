/*
 * @Description:
 * @Author: liangzhaowei
 * @Date: 2019-10-08 15:51:48
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
var DoubbleItemExpend = (function (_super) {
    __extends(DoubbleItemExpend, _super);
    function DoubbleItemExpend() {
        var _this = _super.call(this) || this;
        _this.skinName = "DoubbleItemExpendSkin";
        return _this;
    }
    DoubbleItemExpend.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.currentState = "doubble";
    };
    DoubbleItemExpend.prototype.setData = function (data) {
        if (data && data[0]) {
            for (var i = 0; i < 2; i++) {
                if (data[i]) {
                    var item = data[i];
                    this["item" + i].source = GlobalFun.getItemSourceById(item.id);
                    this["num" + i].text = item.count + "";
                }
            }
        }
    };
    return DoubbleItemExpend;
}(BaseCustComponent));
__reflect(DoubbleItemExpend.prototype, "DoubbleItemExpend");
//# sourceMappingURL=DoubbleItemExpend.js.map