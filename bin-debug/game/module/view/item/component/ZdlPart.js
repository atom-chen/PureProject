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
 * create by junwei on 07/03/2019
 * 战斗力模块
 */
var ZdlPart = (function (_super) {
    __extends(ZdlPart, _super);
    function ZdlPart() {
        var _this = _super.call(this) || this;
        _this.skinName = "ZdlPartSkin";
        return _this;
    }
    // public title: eui.Label;
    ZdlPart.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        // this.zdl.type = "itemtips_json.itemtips_";
        this.zdl.gap = 16;
        this.zdl.alignV = "mid";
        // this.title.text = Language.lang.zdltitle;
    };
    ZdlPart.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.data["length"])
            this.setData();
    };
    ZdlPart.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    ZdlPart.prototype.setData = function () {
        var value = ItemUtils.getZdlByProp(this.data) + "";
        // let str = value.split("").reverse().join("");
        // let nValue = "";
        // for (let i = 0; i < str.length; i++) {
        //     nValue += str[i];
        //     if ((i + 1) % 3 == 0 && (i + 1) != str.length) {
        //         nValue += "d"
        //     }
        // }
        // nValue = nValue.split("").reverse().join("");
        this.zdl.value = value;
    };
    return ZdlPart;
}(BaseCustComponent));
__reflect(ZdlPart.prototype, "ZdlPart");
//# sourceMappingURL=ZdlPart.js.map