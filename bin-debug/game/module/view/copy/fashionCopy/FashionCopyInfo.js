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
 * @Description: 时装副本信息
 * @Author: xiejunwei
 * @Date: 2019-10-28 14:07:56
 */
var FashionCopyInfo = (function (_super) {
    __extends(FashionCopyInfo, _super);
    function FashionCopyInfo() {
        var _this = _super.call(this, LayerManager.UI_Main) || this;
        _this.skinName = "FashionCopyInfoSkin";
        _this.top = 120;
        _this.right = 0;
        return _this;
    }
    FashionCopyInfo.prototype.init = function () {
        _super.prototype.init.call(this);
    };
    FashionCopyInfo.prototype.open = function (param) {
        _super.prototype.open.call(this);
        this.message(MsgConst.COPY_EVALUATION, this.initEva);
        this.message(MsgConst.COPY_TIME, this.startCount);
        this.wave.value = 1;
        this.startCount();
        this.eva.source = "copyInfo_json.copyInfo_" + 5 + "_png";
    };
    FashionCopyInfo.prototype.close = function (param) {
        _super.prototype.open.call(this);
    };
    FashionCopyInfo.prototype.initEva = function (count, copyId) {
        var conf = GameConfig.fashionCopy[copyId];
        var eva = conf.score[count - 1];
        this.eva.source = "copyInfo_json.copyInfo_" + eva + "_png";
        this.wave.value = count;
    };
    FashionCopyInfo.prototype.startCount = function () {
        if (App.TimerManager.isExists(this.initTime, this))
            App.TimerManager.remove(this.initTime, this);
        App.TimerManager.addDelay(0, 1000, 0, this.initTime, this);
    };
    FashionCopyInfo.prototype.initTime = function () {
        var id = GameCache.map.fbId;
        var time = GameCache.copy.copyTime[id];
        var serverTime = GameCache.server.serverTime;
        time = time ? time - serverTime : 0;
        time = time < 0 ? 0 : time;
        var str = "";
        if (!time || time == null)
            str = "00s00s00";
        time = time / 1000;
        str = App.DateUtils.getFormatBySecond(time, DateUtils.TIME_FORMAT_1);
        str = str.replace(/:/g, "s");
        this.time.value = str;
        if (time <= 0) {
            App.TimerManager.remove(this.initTime, this);
            return;
        }
    };
    return FashionCopyInfo;
}(BaseEuiWindow));
__reflect(FashionCopyInfo.prototype, "FashionCopyInfo");
//# sourceMappingURL=FashionCopyInfo.js.map