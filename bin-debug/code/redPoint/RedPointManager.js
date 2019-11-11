/*
 * @Description: 红点管理器
 * @Author: liangzhaowei
 * @Date: 2019-09-06 15:54:31
 * @LastEditTime: 2019-09-10 20:42:37
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
var RedPointManager = (function (_super) {
    __extends(RedPointManager, _super);
    /**
     * 构造函数
     */
    function RedPointManager() {
        var _this = _super.call(this) || this;
        /**记录每次刷新view对应的结果 */
        _this.redViewResult = {};
        /**记录每次刷新周期view对应的结果 避免刷新周期内重复刷新 */
        _this.redViewCycleResult = {};
        _this.redViewResult = {};
        return _this;
    }
    /**清理*/
    RedPointManager.prototype.clear = function () {
    };
    return RedPointManager;
}(BaseClass));
__reflect(RedPointManager.prototype, "RedPointManager");
//# sourceMappingURL=RedPointManager.js.map