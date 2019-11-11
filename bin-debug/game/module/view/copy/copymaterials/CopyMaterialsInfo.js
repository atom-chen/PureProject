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
 * @Description: 材料副本信息面板
 * @Author: xiejunwei
 * @Date: 2019-08-22 11:10:14
 * @LastEditTime: 2019-10-28 20:25:09
 */
var CopyMaterialsInfo = (function (_super) {
    __extends(CopyMaterialsInfo, _super);
    function CopyMaterialsInfo() {
        var _this = _super.call(this, LayerManager.UI_Main) || this;
        _this.fbid = 0;
        _this.skinName = "CopyMaterialsInfoSkin";
        _this.top = 120;
        _this.right = 0;
        return _this;
    }
    CopyMaterialsInfo.prototype.init = function () {
        _super.prototype.init.call(this);
        this.num.gap = 14;
    };
    CopyMaterialsInfo.prototype.open = function (param) {
        this.message(MsgConst.COPY_EVALUATION, this.initEva);
        this.message(MsgConst.COPY_TIME, this.startCount);
        this.addTouchEvent(this.exitBtn, this.openExitTips);
        this.fbid = GameCache.map.fbId;
        this.initData();
        this.startCount();
    };
    CopyMaterialsInfo.prototype.close = function (param) {
        _super.prototype.close.call(this);
        App.TimerManager.removeAll(this);
    };
    CopyMaterialsInfo.prototype.initData = function () {
        var fbid = GameCache.map.fbId;
        var conf = GameConfig.copyMaterials[fbid];
        this.eva.source = "copymaterials_json.copymaterials_5_png";
        var aw = conf.awarddec[0];
        var item = GameConfig.item[aw.id];
        this.txt_0.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.copyAward_0, item.name, aw.count));
        this.txt_1.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.copyAward_1, "30%"));
    };
    CopyMaterialsInfo.prototype.openExitTips = function () {
        GameCache.copy.openExitTips();
    };
    CopyMaterialsInfo.prototype.initEva = function (count) {
        var fbid = GameCache.map.fbId;
        var conf = GameConfig.copyMaterials[fbid];
        this.eva.source = "copymaterials_json.copymaterials_" + conf.score[count - 1] + "_png";
        ;
        count = count - 1 <= 0 ? 0 : count - 1;
        var aw = conf.awarddec[count];
        var item = GameConfig.item[aw.id];
        this.txt_0.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.copyAward_0, item.name, aw.count));
    };
    CopyMaterialsInfo.prototype.initTime = function () {
        var time = GameCache.copy.copyTime[this.fbid];
        var serverTime = GameCache.server.serverTime;
        time = time ? time - serverTime : 0;
        time = time < 0 ? 0 : time;
        var str = "";
        if (!time || time == null)
            str = "00s00s00";
        time = time / 1000;
        str = App.DateUtils.getFormatBySecond(time, DateUtils.TIME_FORMAT_1);
        str = str.replace(/:/g, "s");
        this.num.value = str;
        if (time <= 0) {
            App.TimerManager.remove(this.initTime, this);
            return;
        }
    };
    CopyMaterialsInfo.prototype.startCount = function () {
        if (App.TimerManager.isExists(this.initTime, this))
            App.TimerManager.remove(this.initTime, this);
        App.TimerManager.addDelay(0, 1000, 0, this.initTime, this);
    };
    return CopyMaterialsInfo;
}(BaseEuiWindow));
__reflect(CopyMaterialsInfo.prototype, "CopyMaterialsInfo");
//# sourceMappingURL=CopyMaterialsInfo.js.map