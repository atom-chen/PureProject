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
/**
 * 全局配置
*/
var ClientGlobalConfig = (function (_super) {
    __extends(ClientGlobalConfig, _super);
    function ClientGlobalConfig() {
        var _this = _super.call(this) || this;
        /**主线闯关任务id*/
        _this.passQuestID = [];
        _this.init();
        return _this;
    }
    ClientGlobalConfig.prototype.init = function () {
        var con = ConfigCache.getConfig("clientGlobal");
        for (var k in con) {
            this[k] = con[k]["value"];
        }
    };
    return ClientGlobalConfig;
}(BaseClass));
__reflect(ClientGlobalConfig.prototype, "ClientGlobalConfig");
//# sourceMappingURL=ClientGlobalConfig.js.map