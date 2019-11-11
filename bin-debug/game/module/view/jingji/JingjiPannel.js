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
 * @Description: 竞技面板
 * @Author: xiejunwei
 * @Date: 2019-09-03 19:06:41
 * @LastEditTime: 2019-10-26 15:54:06
 */
var JingjiPannel = (function (_super) {
    __extends(JingjiPannel, _super);
    function JingjiPannel($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.skinName = "JingJiPannelSkin";
        return _this;
    }
    JingjiPannel.prototype.init = function () {
        _super.prototype.init.call(this);
        this.itemList.itemRenderer = JingjiItem;
    };
    JingjiPannel.red = function () {
        return GameCache.jingji.checkEnter();
    };
    JingjiPannel.changeMsg = function () {
        return [MsgConst.JINGJI_PERSONAL_DATA];
    };
    JingjiPannel.prototype.open = function (param) {
        this.message(MsgConst.JINGJI_LIST, this.initList);
        this.message(MsgConst.JINGJI_PERSONAL_DATA, this.initData);
        this.addTouchEvent(this.reBtn, this.reFreshFunc);
        this.addTouchEvent(this.bBtn, this.openBuyTips);
        this.addTouchEvent(this.rankBtn, function () {
            App.ViewManager.open(ViewConst.JINGJIRANK);
        });
        Proxy.other.sendListRefresh(0);
        this.initRoleData();
        this.initData();
    };
    JingjiPannel.prototype.initRoleData = function () {
        this.roleName.text = GameCache.hero.mainPro.charName;
        this.mLvl.text = GameCache.hero.mainPro.pro(PropId.AP_LEVEL) + "";
        var zdl = 0;
        this.icon.source = GlobalFun.getRoleIcon(GameCache.hero.mainPro.pro(PropId.AP_JOB)); //RES_DIR_ROLE_ICON + "role_" + GameCache.hero.mainPro.pro(PropId.AP_JOB) + ".png";
        for (var _i = 0, _a = GameCache.hero.list; _i < _a.length; _i++) {
            var i = _a[_i];
            zdl += i.pro.pro(PropId.AP_BATTLE_POWER);
        }
        this.zdl.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.jingji_t1, zdl));
    };
    JingjiPannel.prototype.initData = function () {
        var data = GameCache.jingji.jingjiData;
        this.point.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.jingji_t2, data.winPoint));
        this.win.text = data.pointRank ? StringUtils.substitute(Language.lang.jingji_t3, data.pointRank) : Language.lang.jingji_t4;
        var countStr = StringUtils.substitute(Language.lang.remain, data.remain + "/10");
        this.count.textFlow = TextFlowUtils.generateTextFlow(countStr);
        this.time.text = "";
        if (data.recoverTime) {
            var time = (data.recoverTime - GameCache.server.serverTime) / 1000;
            if (time > 0) {
                var str = App.DateUtils.getFormatBySecond(time, DateUtils.TIME_FORMAT_1);
                this.time.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.resetTime, str));
                if (!App.TimerManager.isExists(this.timeCount, this))
                    App.TimerManager.addDelay(0, 1000, 0, this.timeCount, this);
            }
        }
    };
    JingjiPannel.prototype.timeCount = function () {
        var time = (GameCache.jingji.jingjiData.recoverTime - GameCache.server.serverTime) / 1000;
        if (time >= 0) {
            var str = App.DateUtils.getFormatBySecond(time, DateUtils.TIME_FORMAT_1);
            this.time.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.resetTime, str));
        }
        else {
            this.time.text = "";
            App.TimerManager.remove(this.timeCount, this);
        }
    };
    JingjiPannel.prototype.initList = function () {
        var arr = GameCache.jingji.jingjiList;
        this.setListData(this.itemList, arr);
    };
    JingjiPannel.prototype.reFreshFunc = function () {
        Proxy.other.sendListRefresh(1);
    };
    JingjiPannel.prototype.openBuyTips = function () {
        GlobalFun.openEnterBuy("jingji");
    };
    return JingjiPannel;
}(BaseSpriteView));
__reflect(JingjiPannel.prototype, "JingjiPannel");
//# sourceMappingURL=JingjiPannel.js.map