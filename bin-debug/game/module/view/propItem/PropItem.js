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
 * create by junwei on 06/28/2019
 * 属性条目
 */
var PropItem = (function (_super) {
    __extends(PropItem, _super);
    function PropItem() {
        return _super.call(this) || this;
    }
    PropItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    PropItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.initData();
    };
    PropItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    PropItem.prototype.initData = function () {
        if (this.data && this.data.type) {
            if (this["prop2"]) {
                var arr = this.getPropstring2(this.data);
                this.prop.textFlow = arr[0];
                this["prop2"].textFlow = arr[1];
                this["prop2"].visible = this["arrow"].visible = arr[1] ? true : false;
            }
            else {
                this.prop.textFlow = this.getPropString(this.data);
            }
        }
    };
    PropItem.prototype.getPropString = function (prop) {
        var conf = GameConfig.buffId[prop.type];
        var plus = prop["newValue"];
        if (!conf)
            return;
        var str = "";
        if (plus) {
            str = "<(c" + prop["color"][0] + ")" + conf["attname"] + ">  <(c" + prop["color"][1] + ")" + prop["str"][0] + prop.oldValue + ">     <(c" + prop["color"][2] + ")" + prop["str"][1] + plus + ">";
        }
        else {
            str = "<(c" + prop["color"][0] + ")" + conf["attname"] + ">  <(c" + prop["color"][1] + ")" + prop["str"][0] + prop.oldValue + ">";
        }
        return TextFlowUtils.generateTextFlow(str);
    };
    PropItem.prototype.getPropstring2 = function (prop) {
        var conf = GameConfig.buffId[prop.type];
        var plus = prop["newValue"];
        if (!conf) {
            return [null, null];
        }
        ;
        var str_0 = "";
        var str_1 = "";
        str_0 = "<(c" + prop["color"][0] + ")" + conf["attname"] + ":>  <(c" + prop["color"][1] + ")" + prop.oldValue + ">";
        str_1 = "<(c" + prop["color"][2] + ")" + plus + ">";
        var a = TextFlowUtils.generateTextFlow(str_0);
        var b = plus && plus > prop.oldValue ? TextFlowUtils.generateTextFlow(str_1) : null;
        return [a, b];
    };
    return PropItem;
}(BaseCustComponent));
__reflect(PropItem.prototype, "PropItem");
//# sourceMappingURL=PropItem.js.map