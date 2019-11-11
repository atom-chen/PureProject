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
 * create by junwei on 06/26/2019
 */
var ConfigEdItem = (function (_super) {
    __extends(ConfigEdItem, _super);
    function ConfigEdItem() {
        return _super.call(this) || this;
    }
    ConfigEdItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addEvent(egret.FocusEvent.FOCUS_IN, this.tInput, this.BeginInput);
        this.addEvent(egret.FocusEvent.FOCUS_OUT, this.tInput, this.EndInput);
    };
    ConfigEdItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.data.prop) {
            this.prop.text = this.data.prop;
            this.tInput.prompt = this.data.value + "";
        }
    };
    ConfigEdItem.prototype.BeginInput = function () {
        this.tInput.text = this.tInput.prompt;
    };
    ConfigEdItem.prototype.EndInput = function () {
        this.tInput.prompt = this.tInput.text;
        this.tInput.text = "";
        var conf = GameConfig.skillEff[this.data.sId];
        conf[this.data.prop] = typeof (this.data.value) == "number" ? parseInt(this.tInput.prompt) : this.tInput.prompt;
    };
    ConfigEdItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return ConfigEdItem;
}(BaseCustComponent));
__reflect(ConfigEdItem.prototype, "ConfigEdItem");
//# sourceMappingURL=ConfigEdItem.js.map