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
var NumberMC = (function (_super) {
    __extends(NumberMC, _super);
    function NumberMC($value, $type, $gap) {
        if ($value === void 0) { $value = 0; }
        if ($type === void 0) { $type = "0"; }
        if ($gap === void 0) { $gap = 0; }
        var _this = _super.call(this) || this;
        _this.roll = false;
        _this._value = 0;
        _this._type = "0";
        _this._init = false;
        _this._gap = 0;
        _this._alignV = "top";
        _this._alignH = "left";
        _this._value = $value;
        _this._type = $type + "";
        _this._gap = $gap;
        return _this;
    }
    /**更新图集类型，不马上更新显示*/
    NumberMC.prototype.updateType = function (type) {
        this._type = type;
    };
    /**从对象池获取一个 */
    NumberMC.pool = function ($value, $type) {
        if ($value === void 0) { $value = 0; }
        if ($type === void 0) { $type = 0; }
        return ObjectPool.get(NumberMC, $value, $type);
    };
    NumberMC.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    NumberMC.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this._init = true;
        if (this._type == "0")
            return;
        this.upNumber();
    };
    Object.defineProperty(NumberMC.prototype, "value", {
        get: function () {
            if (this.rolling)
                return this._rollValue;
            return this._value;
        },
        set: function (num) {
            if (this._value == num)
                return;
            this._value = num;
            this.rolling = false;
            this.upNumber();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumberMC.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (num) {
            if (this._type == num)
                return;
            this._type = num;
            this.upNumber();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumberMC.prototype, "gap", {
        get: function () {
            return this._gap;
        },
        set: function (num) {
            if (this._gap == num)
                return;
            this._gap = num;
            this.upNumber();
        },
        enumerable: true,
        configurable: true
    });
    NumberMC.prototype.initMask = function () {
        // if (!this._mask) {
        // 	this._mask = new eui.Rect();
        // }
        // this._mask.width = this.width;
        // this._mask.height = this.height;
        // this.addChild(this._mask);
        // this.mask = this._mask;
    };
    Object.defineProperty(NumberMC.prototype, "alignV", {
        set: function (val) {
            if (this._alignV === val)
                return;
            this._alignV = val;
            this.upAlign();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumberMC.prototype, "alignH", {
        set: function (val) {
            if (this._alignH === val)
                return;
            this._alignH = val;
            this.upAlign();
        },
        enumerable: true,
        configurable: true
    });
    NumberMC.prototype.upAlign = function () {
        switch (this._alignH) {
            case "center":
                this.anchorOffsetX = this.width / 2;
                break;
            case "left":
                this.anchorOffsetX = 0;
                break;
            case "right":
                this.anchorOffsetX = this.width;
                break;
            default:
                this.anchorOffsetX = 0;
        }
        switch (this._alignV) {
            case "mid":
                this.anchorOffsetY = this.height / 2;
                break;
            case "top":
                this.anchorOffsetY = 0;
                break;
            case "bottom":
                this.anchorOffsetY = this.height;
                break;
            default:
                this.anchorOffsetY = 0;
        }
    };
    NumberMC.prototype.upNumber = function () {
        if (!this._init)
            return;
        //this.removeAll();
        var numStr = this._value + "";
        var tempBm;
        var lastX = 0;
        var num = this.numChildren;
        var len = numStr.length;
        var i = 0;
        for (; i < len; i++) {
            if (i < num) {
                tempBm = this.getChildAt(i);
            }
            else {
                tempBm = ObjectPool.get(eui.Image);
                this.addChild(tempBm);
            }
            tempBm.source = this.getSingleNumPic(numStr.charAt(i), this._type);
            tempBm.x = lastX;
            var g = this._gap;
            if (!g) {
                var tx = RES.getRes(tempBm.source);
                g = tx && tx.textureWidth;
            }
            lastX = lastX + g;
        }
        while (len < num) {
            var bit = this.removeChildAt(i);
            bit.source = null;
            ObjectPool.push(bit);
            len++;
        }
        if (!tempBm) {
            return;
        }
        this.width = tempBm.x + tempBm.width;
        this.height = tempBm.height;
        this.upAlign();
        this.playRoll();
    };
    NumberMC.prototype.playRoll = function () {
        if (this.roll && !this.rolling) {
            this.rolling = true;
            this._rollValue = this._value;
            this._value = 0;
            this.initMask();
            egret.Tween.removeTweens(this);
            egret.Tween.get(this).to({ rollValue: this._rollValue }, 1000).call(this.tweenComp, this);
        }
    };
    Object.defineProperty(NumberMC.prototype, "rollValue", {
        get: function () {
            return this._value;
        },
        set: function (num) {
            if (this._value == num)
                return;
            this._value = Math.floor(num);
            this.upNumber();
        },
        enumerable: true,
        configurable: true
    });
    NumberMC.prototype.tweenComp = function () {
        this.rolling = false;
        this.rollHand && this.rollHand.run();
    };
    //获得单个数字资源
    NumberMC.prototype.getSingleNumPic = function (num, type) {
        if (num == ".")
            num = "dot";
        // let bm: egret.Bitmap = ObjectPool.get(egret.Bitmap);
        // bm.texture = RES.getRes(`${type}${num}_png`);
        //return RES.getRes(`${type}${num}_png`);
        return "" + type + num + "_png";
    };
    /**数字简单的一些处理，销毁用destroy */
    NumberMC.prototype.removeAll = function () {
        var len = this.numChildren;
        while (len) {
            len--;
            var bit = this.removeChildAt(len);
            bit.source = null;
            ObjectPool.push(bit);
        }
    };
    NumberMC.prototype.dispose = function () {
        this.removeAll();
        //ObjectPool.push(this);
    };
    Object.defineProperty(NumberMC.prototype, "cnValue", {
        /**汉子转数字处理,最高为99 */
        set: function (num) {
            if (this._cnValue == num)
                return;
            this._cnValue = num;
            this.rolling = false;
            if (num < 10) {
                this._value = num;
            }
            if (num >= 10 && num < 20) {
                var mod = num % 10 == 0 ? "" : num % 10;
                this._value = "X" + mod;
            }
            if (num >= 20) {
                var mod = num % 10 == 0 ? "" : num % 10;
                this._value = Math.floor(num / 10) + "X" + mod;
            }
            this.upNumber();
        },
        enumerable: true,
        configurable: true
    });
    return NumberMC;
}(eui.Component));
__reflect(NumberMC.prototype, "NumberMC");
window["NumberMC"] = NumberMC;
//# sourceMappingURL=NumberMC.js.map