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
 * @Description:
 * @Author: xiejunwei
 * @Date: 2019-09-06 11:21:20
 * @LastEditTime: 2019-10-31 13:36:36
 */
var JingjiInfo = (function (_super) {
    __extends(JingjiInfo, _super);
    function JingjiInfo() {
        var _this = _super.call(this, LayerManager.UI_Main) || this;
        _this.skinName = "JingjiInfoSkin";
        _this.top = 100;
        _this.horizontalCenter = 1;
        return _this;
    }
    JingjiInfo.prototype.init = function () {
        _super.prototype.init.call(this);
        this.time.gap = 15;
    };
    JingjiInfo.prototype.open = function (param) {
        _super.prototype.open.call(this);
        var pro = GameCache.jingji.targetDetail;
        if (pro) {
            App.BattleManager.start(pro, this.getResult, this);
        }
        if (!App.TimerManager.isExists(this.countTime, this))
            App.TimerManager.addDelay(0, 1000, 0, this.countTime, this);
    };
    JingjiInfo.prototype.close = function (param) {
        _super.prototype.close.call(this);
        App.TimerManager.remove(this.countTime, this);
        App.BattleManager.resetState();
        // GameCache.jingji.targetDetail = [];
    };
    JingjiInfo.prototype.countTime = function () {
        var time = GameCache.copy.copyTime[GameCache.map.fbId];
        var delta = time - GameCache.server.serverTime;
        if (time) {
            this.tg.visible = true;
            var str = "";
            if (delta >= 0) {
                str = App.DateUtils.getFormatBySecond(delta / 1000, DateUtils.TIME_FORMAT_1);
                str = str.replace(/:/g, "s");
                this.time.value = str;
                return;
            }
            else {
                this.tg.visible = false;
                GlobalVar.autoOpenGroup.push([ViewConst.FAIL]);
            }
        }
        else {
            this.tg.visible = false;
            GlobalVar.autoOpenGroup.push([ViewConst.FAIL]);
        }
        App.TimerManager.remove(this.countTime, this);
    };
    JingjiInfo.prototype.getResult = function (arg1, arg2) {
        if (arg1 > 0 && arg2 > 0)
            return;
        if (arg1 > arg2) {
            var conf = GameConfig.jingji[GameCache.jingji.targetIdx];
            conf = conf ? conf : GameConfig.jingji["1"];
            GameCache.award.openAwardTips(conf.awardshow, AwardSourceType.JINGJI);
        }
        else {
            GlobalVar.autoOpenGroup.push([ViewConst.FAIL]);
            PassMgr.switchGj(true);
            // App.ViewManager.open(ViewConst.FAIL);
        }
        App.TimerManager.remove(this.countTime, this);
        var result = arg1 > arg2 ? 1 : 0;
        Proxy.other.sendResult(result);
    };
    return JingjiInfo;
}(BaseEuiWindow));
__reflect(JingjiInfo.prototype, "JingjiInfo");
//# sourceMappingURL=JingjiInfo.js.map