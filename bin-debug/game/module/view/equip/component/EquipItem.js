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
 * create by junwei on 07/23/2019
 */
var EquipItem = (function (_super) {
    __extends(EquipItem, _super);
    function EquipItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._strenghLvl = 0;
        _this._refineLv = 0;
        return _this;
    }
    EquipItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    EquipItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
    };
    Object.defineProperty(EquipItem.prototype, "strengthLvl", {
        set: function (value) {
            if (!value || !value.length)
                return;
            if (!this.strength) {
                this.strength = new eui.Label();
                this.strength.textColor = 0x06ff00;
                this.strength.stroke = 2;
                this.strength.strokeColor = 0x000000;
                this.strength.size = 16;
                this.strength.top = 7;
                this.strength.left = 9;
                this.addChild(this.strength);
            }
            if (value[0] != 0) {
                this.strength.text = value[0];
                this._strenghLvl = value[0];
            }
            else {
                this.strength.text = "";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EquipItem.prototype, "strenghLvl", {
        get: function () {
            return this._strenghLvl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EquipItem.prototype, "refineLvl", {
        get: function () {
            return this._refineLv;
        },
        set: function (value) {
            if (value > 0) {
                this._refineLv = value;
            }
            if (!this.refine) {
                this.refine = new eui.Label();
                this.refine.textColor = 0x00ccff;
                this.refine.stroke = 2;
                this.refine.strokeColor = 0x000000;
                this.refine.size = 16;
                this.refine.bottom = 7;
                this.refine.right = 9;
                this.addChild(this.refine);
            }
            this.refine.text = value > 0 ? ("+" + value) : "";
        },
        enumerable: true,
        configurable: true
    });
    EquipItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return EquipItem;
}(ItemBase));
__reflect(EquipItem.prototype, "EquipItem");
//# sourceMappingURL=EquipItem.js.map