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
 * @Description: 系统设置
 * @Author: guolinsen
 * @Date: 2019-08-12 16:00:03
 * @LastEditTime: 2019-10-31 10:01:40
 */
var SettingsCache = (function (_super) {
    __extends(SettingsCache, _super);
    function SettingsCache() {
        var _this = _super.call(this) || this;
        _this.oData = {}; //默认数据
        _this.data = {}; //已变更的数据
        return _this;
    }
    SettingsCache.prototype.clear = function () {
        this.data = {};
    };
    /**初始化默认设置*/
    SettingsCache.prototype.init = function () {
        this.oData = (_a = {},
            _a[SettingType.BOSS_REMIND] = 0,
            _a[SettingType.VIP_BOSS_REMIND] = 0,
            _a[SettingType.AUTO_RECYCLE] = 0,
            _a);
        var _a;
    };
    /**
     * 更新数据
     * type 设置类型 参考SettingType
     * value 变更后的值
     * save 是否立即保存至服务器
    */
    SettingsCache.prototype.update = function (type, value, save) {
        this.data[type] = value;
        if (save) {
            this.saveToServer();
        }
    };
    SettingsCache.prototype.saveToServer = function () {
        Proxy.other.sendSystemConfigSave(this.data);
    };
    SettingsCache.prototype.getValue = function (type) {
        return this.data[type] || this.oData[type] || 0;
    };
    return SettingsCache;
}(BaseClass));
__reflect(SettingsCache.prototype, "SettingsCache");
//# sourceMappingURL=SettingsCache.js.map