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
 * @Description: 炼狱装备数据
 * @Author: moyusheng
 * @Date: 2019-10-14 16:07:41
 */
var PurgatoryCache = (function (_super) {
    __extends(PurgatoryCache, _super);
    function PurgatoryCache() {
        var _this = _super.call(this) || this;
        /** 角色炼狱装备数据 */
        _this.purgatoryData = {};
        /** 各阶数个数记录 */
        _this.rsnData = {};
        return _this;
    }
    PurgatoryCache.prototype.clear = function () {
        this.purgatoryData = {};
        this.rsnData = {};
    };
    /** 初始化角色身上的炼狱装备 */
    PurgatoryCache.prototype.updatePurgatory = function (roleId, map) {
        if (map) {
            this.purgatoryData[roleId] || (this.purgatoryData[roleId] = []);
            for (var i in map) {
                this.purgatoryData[roleId][i] = map[i];
            }
            this.updateResonateLv(roleId);
        }
    };
    PurgatoryCache.prototype.getPurgatoryCfg = function (part, lv) {
        return GameConfig.purgatory[part][lv];
    };
    Object.defineProperty(PurgatoryCache.prototype, "maxLv", {
        get: function () {
            if (!this.cfgMaxLv) {
                this.cfgMaxLv = 0;
                var arr = GameConfig.purgatory[0];
                for (var i in arr) {
                    if (Number(i) > this.cfgMaxLv)
                        this.cfgMaxLv = Number(i);
                }
            }
            return this.cfgMaxLv;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 取得各个共鸣等级的装备件数
     * @param  {number} roleId
     * @returns number
     */
    PurgatoryCache.prototype.getResonateLvNum = function (roleId, lv) {
        var data = this.rsnData[roleId];
        var num = 0;
        if (!data) {
            return num;
        }
        data[lv] && (num = data[lv]);
        return num;
    };
    /**
     * 计算共鸣等级
     * @returns number
     */
    PurgatoryCache.prototype.updateResonateLv = function (roleId) {
        var eqData = this.purgatoryData[roleId];
        if (!eqData) {
            return;
        }
        var rsnMap = {};
        /** 各阶数个数记录 */
        for (var i in eqData) {
            var l = eqData[i];
            if (!l)
                continue;
            for (var k = 1; k <= l; k++) {
                rsnMap[k] || (rsnMap[k] = 0);
                rsnMap[k]++;
            }
        }
        this.rsnData[roleId] = rsnMap;
    };
    return PurgatoryCache;
}(BaseCache));
__reflect(PurgatoryCache.prototype, "PurgatoryCache");
//# sourceMappingURL=PurgatoryCache.js.map