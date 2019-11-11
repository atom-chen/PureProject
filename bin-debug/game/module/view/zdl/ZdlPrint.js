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
 * create by junwei on 07/25/2019
 * 战斗力显示
 */
var ZdlPrint = (function (_super) {
    __extends(ZdlPrint, _super);
    function ZdlPrint() {
        var _this = _super.call(this) || this;
        _this.zdlValue = 0;
        return _this;
    }
    ZdlPrint.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.zdl.gap = 17;
    };
    ZdlPrint.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (typeof (this.data) == "number") {
            this.zdl.value = this.data;
        }
        else if (typeof (this.data) == "string") {
            this.zdl.value = parseInt(this.data);
        }
    };
    Object.defineProperty(ZdlPrint.prototype, "value", {
        get: function () {
            return this.zdl.value;
        },
        set: function (val) {
            if (typeof (val) == "number") {
                this.zdl.value = val;
            }
            else if (typeof (val) == "string") {
                this.zdl.value = parseInt(val);
            }
        },
        enumerable: true,
        configurable: true
    });
    ZdlPrint.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return ZdlPrint;
}(BaseCustComponent));
__reflect(ZdlPrint.prototype, "ZdlPrint");
//# sourceMappingURL=ZdlPrint.js.map