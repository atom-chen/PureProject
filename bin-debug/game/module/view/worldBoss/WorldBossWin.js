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
 * @Description: BOSS窗口
 * @Author: xiejunwei
 * @Date: 2019-07-30 15:23:05
 * @LastEditTime: 2019-08-19 11:23:39
 */
var BossWin = (function (_super) {
    __extends(BossWin, _super);
    function BossWin() {
        return _super.call(this) || this;
        // this.skinName = "CommunalPageWin2Skin";
    }
    return BossWin;
}(CommunalPageWin));
__reflect(BossWin.prototype, "BossWin");
//# sourceMappingURL=WorldBossWin.js.map