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
 * @Description: 属性变更飘字
 * @Author: guolinsen
 * @Date: 2019-07-31 11:28:01
 * @LastEditTime: 2019-09-18 14:30:17
 */
var ProChangeTips = (function (_super) {
    __extends(ProChangeTips, _super);
    function ProChangeTips() {
        var _this = _super.call(this) || this;
        _this.curShow = [];
        _this._h = 34; //每行高度
        return _this;
    }
    ProChangeTips.prototype.addPro = function (list) {
        this.onShow(list);
    };
    ProChangeTips.prototype.onShow = function (list) {
        for (var i = 0; i < this.curShow.length; i++) {
            var tar = this.curShow[i];
            tar.disappear();
        }
        this.curShow.length = 0;
        App.TimerManager.remove(this.checkClear, this);
        this.show(list);
    };
    ProChangeTips.prototype.show = function (data) {
        if (this.curShow.length == 0)
            App.TimerManager.add(50, this.checkClear, this);
        var i = 0;
        var len = data.length;
        this.reset(len);
        var item;
        this._bottom = 300;
        for (; i < len; i++) {
            item = ObjectPool.get(ProChangeItem);
            item.setData(data[i]["type"], data[i]["value"]);
            LayerManager.UI_Message.addChild(item);
            this.curShow.push(item);
            item.y = this._bottom;
            item.time = App.TimerManager.getSyncTime() + 2000;
            egret.Tween.get(item).to({ y: this._bottom - (len - i) * this._h }, 300);
        }
    };
    ProChangeTips.prototype.reset = function (num) {
        var i = 0;
        var len = this.curShow.length;
        var r = num + len;
        var item;
        for (; i < len; i++) {
            item = this.curShow[i];
            egret.Tween.removeTweens(item);
            egret.Tween.get(item).to({ y: this._bottom - (r - i) * this._h }, 300);
        }
    };
    ProChangeTips.prototype.checkClear = function () {
        if (!this.curShow.length) {
            App.TimerManager.remove(this.checkClear, this);
            return;
        }
        var time = App.TimerManager.getSyncTime();
        for (var i = 0; i < this.curShow.length; i++) {
            var tar = this.curShow[i];
            if (tar.time <= time) {
                egret.Tween.removeTweens(tar);
                this.curShow.splice(i, 1);
                i--;
                tar.disappear();
            }
        }
    };
    return ProChangeTips;
}(BaseClass));
__reflect(ProChangeTips.prototype, "ProChangeTips");
var ProChangeItem = (function (_super) {
    __extends(ProChangeItem, _super);
    function ProChangeItem() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = _this.touchChildren = false;
        _this.attName = new eui.Image;
        _this.attName.x = 50;
        _this.attName.y = 4;
        _this.addChild(_this.attName);
        _this.attValue = new NumberMC();
        _this.attValue.y = 6;
        _this.addChild(_this.attValue);
        return _this;
    }
    ProChangeItem.prototype.setData = function (type, value) {
        var nTx = RES.getRes("num_json.pro_type_" + type + "_png");
        this.attName.source = nTx;
        var str;
        if (value > 0) {
            this.attValue.updateType("num_json.pro_green_");
            str = "+" + value;
        }
        else {
            this.attValue.updateType("num_json.pro_red_");
            str = value;
        }
        if (!nTx)
            return;
        this.attValue.x = this.attName.x + nTx.textureWidth + 2;
        this.attValue.value = str;
        this.x = 120 - this.attValue.x;
    };
    ProChangeItem.prototype.disappear = function () {
        egret.Tween.get(this).to({ x: -this.width }, 300, egret.Ease.sineIn).call(this.dispose, this);
    };
    ProChangeItem.prototype.dispose = function () {
        App.DisplayUtils.removeFromParent(this);
        egret.Tween.removeTweens(this);
        ObjectPool.push(this);
    };
    return ProChangeItem;
}(egret.DisplayObjectContainer));
__reflect(ProChangeItem.prototype, "ProChangeItem");
//# sourceMappingURL=ProChangeTips.js.map