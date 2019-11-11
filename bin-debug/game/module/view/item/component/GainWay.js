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
/**
 * create by junwei on 07/02/2019
 * 物品获取途径模块
 */
var GainWay = (function (_super) {
    __extends(GainWay, _super);
    function GainWay() {
        var _this = _super.call(this) || this;
        _this.skinName = "GainWaySkin";
        return _this;
    }
    GainWay.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addEvent(egret.TextEvent.LINK, this.wTxt, this.onLink);
        this.title.text = Language.lang.getway;
    };
    GainWay.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (!this.data || !this.data["length"]) {
            this.wTxt.text = "";
        }
        else {
            this.setData();
        }
    };
    GainWay.prototype.dispose = function () {
        this.wTxt.text = "";
        _super.prototype.dispose.call(this);
    };
    GainWay.prototype.setData = function () {
        var data = this.data;
        var str = "";
        var count = 1;
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var i = data_1[_i];
            if (count % 3 == 0) {
                str += i.value + "\n";
            }
            else {
                str += i.value + "      ";
            }
            count++;
        }
        this.wTxt.textFlow = TextFlowUtils.generateTextFlow(str);
    };
    GainWay.prototype.onLink = function (e) {
        var arr = e.text.split("_");
        var text = arr[0] + ":" + arr[1];
        TextFlowUtils.hrefType(text);
        App.ViewManager.close(ViewConst.ITEMTIPS);
    };
    return GainWay;
}(BaseCustComponent));
__reflect(GainWay.prototype, "GainWay");
//# sourceMappingURL=GainWay.js.map