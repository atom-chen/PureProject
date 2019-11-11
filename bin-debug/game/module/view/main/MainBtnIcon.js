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
    author:lzw
    date:2019/6/14 15:10
    explain:主界面按钮
*/
var MainBtnIcon = (function (_super) {
    __extends(MainBtnIcon, _super);
    function MainBtnIcon() {
        var _this = _super.call(this) || this;
        _this.skinName = "MainBtnIconSkin";
        return _this;
    }
    MainBtnIcon.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    //初始化
    MainBtnIcon.prototype.initUI = function () {
    };
    /**更新内容 */
    MainBtnIcon.prototype.update = function (data) {
        this.data = data;
        /**icon图片 */
        if (this.data && this.data.icon) {
            this.iconDisplay.source = this.data.icon;
            if (this.data.iconEff) {
                this.showEff();
            }
            else {
                this.hideEff();
            }
        }
    };
    MainBtnIcon.prototype.showEff = function () {
        if (!this.mc) {
            var mc = App.DisplayUtils.addEffectToObj(this, "actIcon_0_1", -1, 40, 40);
            this.mc = mc;
        }
        this.mc.play(-1);
        this.mc.visible = true;
    };
    MainBtnIcon.prototype.hideEff = function () {
        if (this.mc) {
            this.mc.visible = false;
            this.mc.stop();
        }
    };
    MainBtnIcon.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return MainBtnIcon;
}(BaseCustComponent));
__reflect(MainBtnIcon.prototype, "MainBtnIcon");
//# sourceMappingURL=MainBtnIcon.js.map