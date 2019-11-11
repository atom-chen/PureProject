/*
 * @Description: 日常数据
 * @Author: liangzhaowei
 * @Date: 2019-08-14 15:00:25
 * @LastEditTime: 2019-10-25 14:00:46
 */
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
var DailyCache = (function (_super) {
    __extends(DailyCache, _super);
    function DailyCache() {
        var _this = _super.call(this) || this;
        _this.dailyListData = {};
        return _this;
    }
    DailyCache.prototype.clear = function () {
        this.dailyListData = {};
    };
    /**初始化日常列表内容 */
    DailyCache.prototype.initServer = function (list) {
        this.dailyListData = list;
    };
    /**更新数据 */
    DailyCache.prototype.upData = function (pBytes) {
        var id = pBytes.readByte();
        if (id && this.dailyListData[id]) {
            this.dailyListData[id].update(pBytes);
        }
        else {
            var pet = new DailyItem();
            pet.id = id;
            pet.update(pBytes);
            this.dailyListData[id] = pet;
        }
    };
    /**获取当前活跃度 */
    DailyCache.prototype.getActNum = function () {
        var num = 0;
        for (var index in this.dailyListData) {
            var daily = this.dailyListData[index];
            if (daily.state == 3) {
                num = GameConfig.daily[daily.id] ? (num + GameConfig.daily[daily.id].award) : num;
            }
        }
        return num;
    };
    /**获取总活跃度 */
    DailyCache.prototype.getAllActNum = function () {
        var num = GameConfig.DailyReward[4].value;
        // for (let index in GameConfig.daily) {
        // 	let daily: StdDaily = GameConfig.daily[index];
        // 	if (daily && daily.award) {
        // 		num = num + daily.award
        // 	}
        // }
        return num;
    };
    DailyCache.prototype.getStreaList = function () {
        var pro = GameCache.hero.mainPro;
        var actGetBit = 0;
        if (pro) {
            actGetBit = pro.pro(PropId.AP_ACTIVITY_AWARD_FLAG);
        }
        var listStrea = [0, 0, 0, 0];
        for (var index in listStrea) {
            // if ((this.getActNum() / this.getAllActNum()) >= (parseInt(index) + 1) * 25 / 100) {
            if (this.getActNum() >= GameConfig.DailyReward[parseInt(index) + 1].value) {
                if (GlobalFun.BitHas(actGetBit, parseInt(index))) {
                    listStrea[index] = 2;
                }
                else {
                    listStrea[index] = 1;
                }
            }
            else {
                listStrea[index] = 0;
            }
        }
        return listStrea;
    };
    /**获取日常红点 */
    DailyCache.prototype.getDailyTaskRed = function () {
        for (var index in this.dailyListData) {
            var daily = this.dailyListData[index];
            if (daily.state == 2) {
                return true;
            }
        }
        return false;
    };
    /**获取日常活跃度红点 */
    DailyCache.prototype.getDailyStreaRed = function () {
        var list = this.getStreaList();
        for (var index in list) {
            var st = list[index];
            if (st == 1) {
                return true;
            }
        }
        return false;
    };
    return DailyCache;
}(BaseCache));
__reflect(DailyCache.prototype, "DailyCache");
//# sourceMappingURL=DailyCache.js.map