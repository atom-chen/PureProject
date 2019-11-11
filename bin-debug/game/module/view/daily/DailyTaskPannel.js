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
 * @Description: 日常任务页签
 * @Author: liangzhaowei
 * @Date: 2019-08-01 19:32:56
 * @LastEditTime: 2019-10-25 14:01:11
 */
var DailyTaskPannel = (function (_super) {
    __extends(DailyTaskPannel, _super);
    function DailyTaskPannel($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.listStrea = [0, 0, 0, 0];
        _this.actNum = 0; //当前活跃度
        _this.allActNum = 0; //总活跃度
        _this.skinName = "DailyTaskPannelSkin";
        return _this;
    }
    DailyTaskPannel.prototype.init = function () {
        this.list.itemRenderer = DailyTaskItem;
        this.hudNum.gap = 14;
        for (var i = 0; i < 4; i++) {
            this["actNum" + i].text = GameConfig.DailyReward[i + 1].value + "";
        }
        this.hudNum.alignH = "center";
    };
    /**界面整个界面的红点 */
    DailyTaskPannel.red = function () {
        if (!GameCache.daily) {
            return false;
        }
        return GameCache.daily.getDailyTaskRed() || GameCache.daily.getDailyStreaRed();
    };
    /**需要刷新是红点消息列表 */
    DailyTaskPannel.changeMsg = function () {
        return [MsgConst.DAILY, MsgConst.PROPERTY + PropId.AP_ACTIVITY_AWARD_FLAG];
    };
    DailyTaskPannel.prototype.open = function (param) {
        if (param === void 0) { param = null; }
        this.message(MsgConst.DAILY, this.upCn);
        this.addTouchEvent(this.imgStrea0, this.onClick);
        this.addTouchEvent(this.imgStrea1, this.onClick);
        this.addTouchEvent(this.imgStrea2, this.onClick);
        this.addTouchEvent(this.imgStrea3, this.onClick);
        this.message(MsgConst.PROPERTY + PropId.AP_ACTIVITY_AWARD_FLAG, this.upCn);
        this.upCn();
        this.allActNum = GameCache.daily.getAllActNum();
        this.progressBar.maximum = this.allActNum;
    };
    DailyTaskPannel.prototype.upCn = function () {
        var arr = [];
        for (var index in GameConfig.daily) {
            var cfg = CommonUtils.copyDataHandler(GameConfig.daily[index]);
            var state = GameCache.daily.dailyListData[cfg.id] ? GameCache.daily.dailyListData[cfg.id].state : 0;
            if (state == 2) {
                cfg.sortof = cfg.id;
            }
            else if (state == 1) {
                cfg.sortof = 10000 + cfg.id;
            }
            else if (state == 3) {
                cfg.sortof = 20000 + cfg.id;
            }
            else if (state == 0) {
                cfg.sortof = 30000 + cfg.id;
            }
            else {
                cfg.sortof = 40000 + cfg.id;
            }
            arr.push(cfg);
        }
        arr.sort(this.sort);
        this.setListData(this.list, arr);
        this.actNum = GameCache.daily.getActNum();
        this.hudNum.value = this.actNum;
        this.progressBar.value = this.actNum;
        this.listStrea = GameCache.daily.getStreaList();
        this.refreshGetTrea();
    };
    DailyTaskPannel.prototype.sort = function (a, b) {
        return a.sortof - b.sortof;
    };
    DailyTaskPannel.prototype.refreshGetTrea = function () {
        var treaStList = this.listStrea;
        for (var index in treaStList) {
            var st = treaStList[index];
            this["imgGot" + index].visible = st === 2;
            this["imgStrea" + index].icon = "daily_json.daily_tr_" + index + st + "_png";
        }
    };
    DailyTaskPannel.prototype.onClick = function (e) {
        var getIndex = -1;
        var tIndex = 1;
        switch (e.currentTarget) {
            case this.imgStrea0:
                getIndex = this.listStrea[0] == 1 ? 0 : -1;
                tIndex = 1;
                break;
            case this.imgStrea1:
                getIndex = this.listStrea[1] == 1 ? 1 : -1;
                tIndex = 2;
                break;
            case this.imgStrea2:
                getIndex = this.listStrea[2] == 1 ? 2 : -1;
                tIndex = 3;
                break;
            case this.imgStrea3:
                getIndex = this.listStrea[3] == 1 ? 3 : -1;
                tIndex = 4;
                break;
            default:
                break;
        }
        if (getIndex >= 0) {
            Proxy.daily.getActRw(getIndex);
        }
        else {
            if (this.listStrea[tIndex - 1] == 0) {
                var data = new ViewProp();
                data.exData1 = tIndex;
                App.ViewManager.open(ViewConst.DAILYSHOWTIP, data);
            }
        }
    };
    return DailyTaskPannel;
}(CommunalPagePannel));
__reflect(DailyTaskPannel.prototype, "DailyTaskPannel");
//# sourceMappingURL=DailyTaskPannel.js.map