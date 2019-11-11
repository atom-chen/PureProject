/*
 * @Description: 首冲数据
 * @Author: liangzhaowei
 * @Date: 2019-09-02 17:15:45
 * @LastEditTime: 2019-09-04 15:44:13
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
var FirstChargeCache = (function (_super) {
    __extends(FirstChargeCache, _super);
    function FirstChargeCache() {
        var _this = _super.call(this) || this;
        /**首冲领取列表 */
        _this.firstGetList = [];
        /**累冲领取列表 */
        _this.totalGetList = [];
        /**首冲金额列表 */
        _this.firstChargeCfg = [];
        _this.firstChargeSt = 0;
        _this.secondChargeSt = {};
        return _this;
    }
    FirstChargeCache.prototype.clear = function () {
        this.firstGetList = [];
        this.totalGetList = [];
        this.firstChargeCfg = [];
        this.secondChargeSt = {};
        this.firstChargeSt = 0;
    };
    /**更新数据  类型1:首冲2:累充*/
    FirstChargeCache.prototype.update = function (data, type) {
        if (type == 1) {
            this.firstGetList = data;
        }
        else if (type == 2) {
            this.totalGetList = data;
        }
    };
    /** 获取首冲金额列表*/
    FirstChargeCache.prototype.getFirstChargeCfg = function () {
        if (this.firstChargeCfg.length == 0) {
            for (var index in GameConfig.chognzhi) {
                var cfg = GameConfig.chognzhi[index];
                if (cfg.fourfoldDimond) {
                    this.firstChargeCfg.push(cfg);
                }
            }
        }
        return this.firstChargeCfg;
    };
    return FirstChargeCache;
}(BaseCache));
__reflect(FirstChargeCache.prototype, "FirstChargeCache");
//# sourceMappingURL=FirstChargeCache.js.map