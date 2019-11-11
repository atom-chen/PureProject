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
 * @Description: 系统开启数据
 * @Author: xiejunwei
 * @Date: 2019-09-20 13:57:53
 */
var SysOpenCache = (function (_super) {
    __extends(SysOpenCache, _super);
    function SysOpenCache() {
        var _this = _super.call(this) || this;
        _this.checkList = {};
        _this.checkInited = false;
        return _this;
    }
    /**
     * 初始化系统开启等级检查列表
     */
    SysOpenCache.prototype.initCheckList = function () {
        if (this.checkInited)
            return;
        var conf = GameConfig.modControl;
        var lvl = GameCache.hero.mainPro.pro(PropId.AP_LEVEL);
        var openday = GameCache.server.serverOpenDay;
        var questid = GameCache.quest.questId;
        for (var i in conf) {
            for (var j in conf[i]) {
                for (var k in conf[i][j]) {
                    var item = conf[i][j][k];
                    if (!item.location)
                        continue;
                    if (!App.ViewManager.checkOpenCondition(item, false)) {
                        var name_1 = i + j + k;
                        this.checkList[name_1] = {
                            icon: item.image[0],
                            name: item.image[1],
                            location: item["location"],
                            openLv: item.openLv,
                            openDay: item.openDay,
                            openQuest: item.openQuest,
                        };
                    }
                }
            }
        }
        this.checkInited = true;
    };
    SysOpenCache.prototype.clear = function () {
        this.checkList = {};
    };
    return SysOpenCache;
}(BaseCache));
__reflect(SysOpenCache.prototype, "SysOpenCache");
//# sourceMappingURL=SysOpenCache.js.map