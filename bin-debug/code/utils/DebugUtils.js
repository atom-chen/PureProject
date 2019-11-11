var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by linsen
 * Debug调试工具
 */
var DebugUtils = (function () {
    function DebugUtils() {
    }
    DebugUtils.logOnline = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    return DebugUtils;
}());
__reflect(DebugUtils.prototype, "DebugUtils");
/**日志保存，用于线上调试*/
var logOnline = DebugUtils.logOnline;
//# sourceMappingURL=DebugUtils.js.map