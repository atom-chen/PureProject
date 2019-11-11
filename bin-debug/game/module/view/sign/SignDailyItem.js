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
 * @Description: 每日签到奖励
 * @Author: guolinsen
 * @Date: 2019-09-10 14:15:25
 * @LastEditTime: 2019-09-11 23:09:13
 */
var SignDailyItem = (function (_super) {
    __extends(SignDailyItem, _super);
    function SignDailyItem() {
        return _super.call(this) || this;
    }
    //用于子类继承
    SignDailyItem.prototype.init = function () {
        this.item.setBgImg(null);
    };
    SignDailyItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        var data = this.data;
        this.indexTx.text = data.id + "";
        this.item.data = data.reward[0];
        var finish = GameCache.sign.signCounts >= data.id;
        this.removeTouch();
        if (finish) {
            this.finish1.visible = this.finish2.visible = true;
            this.canSign.visible = false;
        }
        else {
            this.finish1.visible = this.finish2.visible = false;
            this.canSign.visible = GameCache.sign.signCounts + GameCache.sign.canSign >= data.id;
            this.canSign.visible && this.addTouch();
        }
    };
    SignDailyItem.prototype.addTouch = function () {
        this.item.enabled = false;
        this.addTouchEvent(this, this.onTouch);
    };
    SignDailyItem.prototype.removeTouch = function () {
        this.item.enabled = true;
        this.removeAllEvent();
    };
    SignDailyItem.prototype.onTouch = function () {
        Proxy.sign.sendPrize(this.data.id);
    };
    return SignDailyItem;
}(BaseCustComponent));
__reflect(SignDailyItem.prototype, "SignDailyItem");
//# sourceMappingURL=SignDailyItem.js.map