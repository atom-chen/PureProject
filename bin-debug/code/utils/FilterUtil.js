var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 滤镜工具类
 *
 */
var FilterUtils = (function () {
    function FilterUtils() {
    }
    Object.defineProperty(FilterUtils, "DefaultGrayFilters", {
        get: function () {
            if (this._DefaultGrayFilters == null) {
                this._DefaultGrayFilters = [
                    new egret.ColorMatrixFilter([
                        0.3086, 0.6094, 0.082, 0, 0,
                        0.3086, 0.6094, 0.082, 0, 0,
                        0.3086, 0.6094, 0.082, 0, 0,
                        0, 0, 0, 1, 0
                    ])
                ];
            }
            return this._DefaultGrayFilters;
        },
        enumerable: true,
        configurable: true
    });
    return FilterUtils;
}());
__reflect(FilterUtils.prototype, "FilterUtils");
//# sourceMappingURL=FilterUtil.js.map