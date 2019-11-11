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
 * @Description: 系统开启提示
 * @Author: xiejunwei
 * @Date: 2019-09-20 13:38:07
 */
var SysOpenHint = (function (_super) {
    __extends(SysOpenHint, _super);
    function SysOpenHint() {
        var _this = _super.call(this, LayerManager.UI_Main2) || this;
        _this.skinName = "SysOpenHintSkin";
        _this.top = _this.bottom = _this.left = _this.right = 0;
        return _this;
    }
    SysOpenHint.prototype.init = function () {
        _super.prototype.init.call(this);
    };
    SysOpenHint.prototype.open = function (param) {
        _super.prototype.open.call(this);
        var playList = param.firData;
        if (!playList.length) {
            this.playFinish();
            return;
        }
        App.DisplayUtils.addEffectToObj(this.g0, "opensys_0_1", -1, 160, 100);
        this.icon.source = RES_DIR_SYSOPEN_ICON + playList[0].icon;
        this.sName.source = RES_DIR_SYSOPEN_NAME + playList[0].name;
        var targetData = playList[0].location;
        var tarArr = targetData.split("#");
        var view = App.ViewManager.getView(ViewConst[tarArr[0]]);
        this.g0.horizontalCenter = 1;
        this.g0.verticalCenter = 1;
        // this.icon.horizontalCenter = this.icon.verticalCenter = 1;
        this.icon.x = (view.width - 105) >> 1;
        this.icon.y = (view.height - 111) >> 1;
        this.icon.visible = this.g0.visible = true;
        var tar = tarArr.length == 2 ? view[tarArr[1]] : view[tarArr[1]].getChildByName(tarArr[2]);
        if (!tar)
            this.playFinish();
        else {
            var xy = tar.parent.localToGlobal(tar.x, tar.y);
            xy = this.globalToLocal(xy.x, xy.y);
            this.playAnimate(xy.x, xy.y);
        }
    };
    SysOpenHint.prototype.close = function (param) {
        _super.prototype.close.call(this);
    };
    SysOpenHint.prototype.playAnimate = function (x, y) {
        this.tw = egret.Tween.get(this.icon);
        // this.tw.wait(3000).to({ x: x, y: y }, 1500).wait(3000).call(this.playFinish, this);
        this.tw.wait(1500).call(this.hide, this).to({ x: x, y: y }, 1500, egret.Ease.cubicInOut).wait(700).call(this.playFinish, this);
    };
    SysOpenHint.prototype.hide = function () {
        this.g0.visible = false;
    };
    SysOpenHint.prototype.playFinish = function () {
        if (this.tw) {
            egret.Tween.removeTweens(this.tw);
            this.tw = null;
        }
        this.icon.visible = false;
        this.closeView();
    };
    return SysOpenHint;
}(BaseEuiWindow));
__reflect(SysOpenHint.prototype, "SysOpenHint");
//# sourceMappingURL=SysOpenHint.js.map