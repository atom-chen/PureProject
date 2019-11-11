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
 * @Description: 家族cache
 * @Author: moyusheng
 * @Date: 2019-10-29 10:41:02
 */
var FamilyCache = (function (_super) {
    __extends(FamilyCache, _super);
    function FamilyCache() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FamilyCache.prototype.clear = function () {
        this.isInFamily = false;
        this.fInfo = null;
        this.isAuto = false;
        this.limitId = null;
        this.mList = null;
        this.applyList = null;
        this.fList = null;
    };
    /**
     * 解散
     * @returns void
     */
    FamilyCache.prototype.dismiss = function () {
        this.isInFamily = false;
        this.fInfo = null;
        this.mList = null;
        this.applyList = null;
        this.isAuto = false;
        GameCache.hero.focusPlayer.title.setFamilyName("");
    };
    return FamilyCache;
}(BaseCache));
__reflect(FamilyCache.prototype, "FamilyCache");
//# sourceMappingURL=FamilyCache.js.map