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
 * @Description: 经验副本信息面板
 * @Author: xiejunwei
 * @Date: 2019-09-02 13:42:40
 * @LastEditTime: 2019-10-30 14:27:17
 */
var CopyExpInfo = (function (_super) {
    __extends(CopyExpInfo, _super);
    function CopyExpInfo() {
        var _this = _super.call(this, LayerManager.UI_Main) || this;
        _this.time = [];
        _this.skinName = "CopyExpInfoSkin";
        _this.top = 100;
        _this.right = 0;
        _this.bottom = 0;
        _this.left = 0;
        return _this;
    }
    CopyExpInfo.prototype.init = function () {
        _super.prototype.init.call(this);
        this.timeNum.gap = 23;
    };
    CopyExpInfo.prototype.open = function (param) {
        _super.prototype.open.call(this);
        this.message(MsgConst.COPY_EXP_TIME, this.beginCountDown);
        this.message(MsgConst.COPY_EXP_WAVE, this.initWave);
        this.message(MsgConst.COPY_EXP_INCOME, this.initIcome);
        this.beginCountDown();
        this.initIcome();
        this.initWave();
    };
    CopyExpInfo.prototype.close = function (param) {
        _super.prototype.close.call(this);
        App.TimerManager.remove(this.timeCount, this);
        GameCache.copy.copyExpData = {};
    };
    CopyExpInfo.prototype.beginCountDown = function () {
        this.time = GameCache.copy.copyExpData["time"];
        if (!this.time)
            return;
        if (!App.TimerManager.isExists(this.timeCount, this))
            App.TimerManager.addDelay(0, 1000, 0, this.timeCount, this);
    };
    CopyExpInfo.prototype.timeCount = function () {
        var delta_0 = this.time[0] - GameCache.server.serverTime;
        var delta_1 = this.time[1] - GameCache.server.serverTime;
        var total = this.time[2] - GameCache.server.serverTime;
        if (total >= 0) {
            var str = "";
            if (delta_0 > 0) {
                this.tG.visible = true;
                this.timeNum.value = Math.floor(delta_0 / 1000);
                str = App.DateUtils.getFormatBySecond(this.time[3]);
            }
            else {
                this.tG.visible = false;
                str = App.DateUtils.getFormatBySecond(total / 1000);
            }
            str = str.replace(/:/g, "s");
            this.num.value = str;
        }
        else {
            App.TimerManager.remove(this.timeCount, this);
        }
    };
    CopyExpInfo.prototype.initWave = function () {
        var waveNum = GameCache.copy.copyExpData["wave"];
        if (!waveNum) {
            var conf = GameConfig.copyExp;
            var fbid = GameCache.map.fbId;
            for (var i in conf) {
                if (conf[i].fubenId == fbid) {
                    waveNum = [1, conf[i].monsterInfo.length];
                    break;
                }
            }
        }
        this.wave.value = waveNum[0] + "l" + waveNum[1];
    };
    CopyExpInfo.prototype.initIcome = function () {
        var income = GameCache.copy.copyExpData["exp"];
        income = income ? income : 0;
        var str = GlobalFun.numCut(income);
        this.total.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.expIcome, str));
        var killNum = GameCache.copy.copyExpData["killCount"];
        killNum = killNum ? killNum : 0;
        this.killNum.value = killNum + "";
    };
    return CopyExpInfo;
}(BaseEuiWindow));
__reflect(CopyExpInfo.prototype, "CopyExpInfo");
//# sourceMappingURL=CopyExpInfo.js.map