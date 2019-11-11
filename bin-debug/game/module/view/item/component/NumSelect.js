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
 * 数量选择
 */
var NumSelect = (function (_super) {
    __extends(NumSelect, _super);
    function NumSelect() {
        var _this = _super.call(this) || this;
        _this._num = 0;
        _this._max = 0;
        _this._min = 0;
        return _this;
    }
    NumSelect.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addTouchEvent(this.mBtn, this.onToucheFunc);
        this.addTouchEvent(this.pBtn, this.onToucheFunc);
        this.addTouchEvent(this.maxBtn, this.onToucheFunc);
        this.addTouchEvent(this.minBtn, this.onToucheFunc);
        this.addTouchEvent(this.tmBtn, this.onToucheFunc);
        this.addTouchEvent(this.tpBtn, this.onToucheFunc);
        this.addEvent(egret.FocusEvent.FOCUS_OUT, this.nInput, this.inputData);
    };
    NumSelect.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
    };
    NumSelect.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    Object.defineProperty(NumSelect.prototype, "num", {
        get: function () {
            return this._num;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 初始化最大最小值
     */
    NumSelect.prototype.initData = function (max, min, star) {
        this._max = max;
        this._min = min;
        this._num = star ? star : 0;
        this.nInput.text = this._num + "";
    };
    NumSelect.prototype.onToucheFunc = function (e) {
        var tar = e.target.name;
        switch (tar) {
            case "minus":
                this._num = this._num - 1 < this._min ? this._min : this._num - 1;
                break;
            case "plus":
                this._num = this._num + 1 > this._max ? this._max : this._num + 1;
                break;
            case "max":
                this._num = this._max;
                break;
            case "min":
                this._num = this._min;
                break;
            case "tmBtn":
                this._num = this._num - 10 < this._min ? this._min : this._num - 10;
                break;
            case "tmBtn":
                this._num = this._num + 10 > this._max ? this._max : this._num + 10;
                break;
        }
        this.nInput.text = this._num + "";
        this.handlerRun();
    };
    NumSelect.prototype.inputData = function () {
        var num = parseInt(this.nInput.text);
        if (isNaN(num))
            num = 1;
        this._num = num;
        this.nInput.text = num + "";
    };
    NumSelect.prototype.handlerRun = function () {
        if (this._handler) {
            this._handler.run();
        }
    };
    return NumSelect;
}(BaseCustComponent));
__reflect(NumSelect.prototype, "NumSelect");
//# sourceMappingURL=NumSelect.js.map