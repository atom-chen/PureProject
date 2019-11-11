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
 * @Description: 冒险数据
 * @Author: guolinsen
 * @Date: 2019-08-26 17:40:51
 * @LastEditTime: 2019-10-16 20:02:37
 */
var AdventrueCache = (function (_super) {
    __extends(AdventrueCache, _super);
    function AdventrueCache() {
        var _this = _super.call(this) || this;
        _this.dataList = [];
        _this.topProgress = 0;
        _this.isInit = false;
        return _this;
    }
    AdventrueCache.prototype.clear = function () {
        this.isInit = false;
        this.dataList = [];
        this.topAward = null;
        this.topProgress = 0;
    };
    AdventrueCache.prototype.isMaxLv = function () {
        var con = GameConfig.adventure[(GameCache.hero.mainPro.pro(PropId.AP_RISK_LVL) + 1) + ""];
        return con ? false : true;
    };
    AdventrueCache.prototype.updatelv = function (lv) {
        this.isInit = true;
        var con = GameConfig.adventure[(lv + 1) + ""];
        if (!con)
            con = GameConfig.adventure[lv + ""];
        if (con) {
            var arr = this.taskList = [];
            for (var item in con) {
                var id = parseInt(item);
                if (id == 0) {
                    this.topAward = con[item]["award"][0];
                }
                else {
                    this.banner = con[item].image;
                    arr[id - 1] = con[item];
                }
            }
        }
        else {
            this.taskList = null;
        }
        this.topProgress = 0;
        App.MessageCenter.dispatch(MsgConst.ADVENTURE_UPDATE_LV);
    };
    AdventrueCache.prototype.updateSingle = function (id, finish, prize, progress, check) {
        if (check === void 0) { check = false; }
        if (!this.isInit) {
            this.updatelv(0);
        }
        if (!this.dataList)
            return;
        if (id == 0) {
            return;
        }
        var data = {};
        data.finish = finish;
        data.prize = prize;
        data.progress = progress;
        this.dataList[id - 1] = data;
        if (check) {
            this.checkFinish();
        }
    };
    AdventrueCache.prototype.getData = function (id) {
        var data = this.dataList[id - 1];
        if (data)
            return data;
        return { finish: false, prize: false, progress: 0 };
    };
    AdventrueCache.prototype.checkFinish = function () {
        this.topProgress = 0;
        for (var i = 0; i < this.taskList.length; i++) {
            var obj = this.taskList[i];
            if (this.dataList[obj.item - 1]) {
                if (this.dataList[obj.item - 1].prize) {
                    this.topProgress++;
                }
            }
        }
    };
    Object.defineProperty(AdventrueCache.prototype, "topFinish", {
        get: function () {
            return this.taskList && this.topProgress >= this.taskList.length;
        },
        enumerable: true,
        configurable: true
    });
    return AdventrueCache;
}(BaseCache));
__reflect(AdventrueCache.prototype, "AdventrueCache");
//# sourceMappingURL=AdventrueCache.js.map