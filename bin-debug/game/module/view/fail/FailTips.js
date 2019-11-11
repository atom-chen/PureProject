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
 * @Description: 失败窗口
 * @Author: xiejunwei
 * @Date: 2019-08-22 17:09:19
 * @LastEditTime: 2019-10-31 19:32:39
 */
var FailTips = (function (_super) {
    __extends(FailTips, _super);
    function FailTips() {
        var _this = _super.call(this, LayerManager.UI_TipsNoClick) || this;
        _this.skinName = "FailTipsSkin";
        return _this;
    }
    FailTips.prototype.init = function () {
        _super.prototype.init.call(this);
        this.itemList.itemRenderer = FailTipsItem;
    };
    FailTips.prototype.open = function (param) {
        _super.prototype.open.call(this);
        this.addTouchEvent(this.btn, this.btnFunc);
        // this.addTouchEvent(this.btn, this.rechargeFunc);
        // App.DisplayUtils.buttonDownTime(this.btn, 7, [this.countDown, Language.lang.autoExit]);
        var point = GameCache.hero.mainPro.pro(PropId.AP_VIP_POINT);
        this.img.source = point == 0 ? "fail_json.fail_texture_0_png" : "fail_json.fail_texture_2_png";
        this.initList();
    };
    FailTips.prototype.close = function (param) {
        _super.prototype.close.call(this);
        var conf = GameCache.map.mapConfig;
        // if (conf.type != SceneType.NORMAL_FIELD)
        //     PassMgr.switchGj(true);
    };
    FailTips.prototype.initList = function () {
        var conf = GameConfig.fail;
        var arr = [];
        for (var i in conf) {
            arr.push(conf[i]);
        }
        this.setListData(this.itemList, arr);
    };
    FailTips.prototype.btnFunc = function () {
        this.closeView();
    };
    FailTips.prototype.rechargeFunc = function () {
        GlobalFun.gotoCharge();
        this.closeView();
    };
    return FailTips;
}(BaseEuiWindow));
__reflect(FailTips.prototype, "FailTips");
//# sourceMappingURL=FailTips.js.map