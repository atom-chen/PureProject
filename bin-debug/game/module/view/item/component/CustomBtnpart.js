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
 * create by junwei on 07/29/2019
 * 自定义按钮功能模块
 */
var CustomBtnpart = (function (_super) {
    __extends(CustomBtnpart, _super);
    function CustomBtnpart() {
        var _this = _super.call(this) || this;
        _this.skinName = "BtnPartSkin";
        return _this;
    }
    CustomBtnpart.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addTouchEvent(this.wBtn, this.lFunc);
        this.addTouchEvent(this.sBtn, this.rFunc);
    };
    CustomBtnpart.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
    };
    CustomBtnpart.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    /**
     * 初始化模块
     * @param thisc,FuncArr,iconArr
     */
    CustomBtnpart.prototype.initPart = function (thisc, FuncArr, iconArr, arg) {
        if (FuncArr === void 0) { FuncArr = []; }
        if (iconArr === void 0) { iconArr = []; }
        if (this.lHandler) {
            this.lHandler.dispose();
        }
        if (this.rHandler) {
            this.rHandler.dispose();
        }
        this.lHandler = Handler.create(thisc, FuncArr[0], [arg], true);
        this.rHandler = Handler.create(thisc, FuncArr[1], [arg], true);
        this.wBtn.icon = iconArr[0];
        this.sBtn.icon = iconArr[1];
    };
    CustomBtnpart.prototype.lFunc = function () {
        if (this.lHandler)
            this.lHandler.run();
    };
    CustomBtnpart.prototype.rFunc = function () {
        if (this.rHandler)
            this.rHandler.run();
    };
    return CustomBtnpart;
}(BaseCustComponent));
__reflect(CustomBtnpart.prototype, "CustomBtnpart");
//# sourceMappingURL=CustomBtnpart.js.map