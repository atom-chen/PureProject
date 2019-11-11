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
 * @Description: 徽章数据
 * @Author: xiejunwei
 * @Date: 2019-08-27 20:29:39
 * @LastEditTime: 2019-10-24 15:29:23
 */
var BadgeCache = (function (_super) {
    __extends(BadgeCache, _super);
    function BadgeCache() {
        return _super.call(this) || this;
    }
    BadgeCache.prototype.clear = function () {
    };
    BadgeCache.prototype.checkGrade = function () {
        var passLvl = GameCache.hero.mainPro.pro(PropId.AP_CHKPOINT_LV);
        var badgeLvl = GameCache.hero.mainPro.pro(PropId.AP_BADGE_LVL); // 当前徽章等级
        var conf = GameConfig.badge[badgeLvl + 1];
        if (!conf || !conf.Checkpoint)
            return false;
        return passLvl > conf.Checkpoint;
    };
    return BadgeCache;
}(BaseCache));
__reflect(BadgeCache.prototype, "BadgeCache");
//# sourceMappingURL=BadgeCache.js.map