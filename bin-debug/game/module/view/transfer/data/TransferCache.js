/*
 * @Description: 转职数据
 * @Author: liangzhaowei
 * @Date: 2019-10-28 17:37:37
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
var TransferCache = (function (_super) {
    __extends(TransferCache, _super);
    function TransferCache() {
        var _this = _super.call(this) || this;
        //转职内容
        _this.syData = {};
        return _this;
    }
    TransferCache.prototype.clear = function () {
        this.syData = {};
    };
    /**初始化套装内容 */
    TransferCache.prototype.initData = function (data) {
        this.syData[data.roldId] = data;
    };
    /**转数配表转换 */
    TransferCache.prototype.truanChange = function (job, trunNum, trunLv) {
        var index = 0;
        if ((typeof job == 'number') && (typeof trunNum == 'number') && (typeof trunLv == 'number')) {
            var roldIndex = GameCache.hero.transServerFromeId(job);
            index = trunLv + trunNum * 1000 + job * 1000 * 1000;
        }
        return index;
    };
    /**更新转生等级 */
    TransferCache.prototype.upTrunLv = function (roleId, num, lv, exp) {
        var data = this.syData[roleId];
        if (data) {
            data.turnNum = num;
            data.turnLv = lv;
            data.exp = exp;
        }
    };
    /**更新使用转职经验道具结果 */
    TransferCache.prototype.upItemInfo = function (roleId, exp, itemIndex, time) {
        var data = this.syData[roleId];
        if (data) {
            data.exp = exp;
            data.itemUseIime[itemIndex] = time;
        }
    };
    /**满足经验红点 */
    TransferCache.prototype.enoughExpRed = function (roleId) {
        var transferItem = this.syData[roleId];
        if (!transferItem) {
            return false;
        }
        /**都是拿下一级的去显示 */
        var cfgOr = GameConfig.transfer[GameCache.transfer.truanChange(GameCache.hero.getJobByRoleId(roleId), transferItem.turnNum, transferItem.turnLv)];
        if (!cfgOr) {
            return false;
        }
        var cfgtr = GameConfig.transfer[cfgOr.next];
        if (!cfgtr) {
            return false;
        }
        if (transferItem.exp >= cfgtr.transferExe) {
            return true;
        }
        return false;
    };
    /**满足升级红点 */
    TransferCache.prototype.enoughUpRed = function () {
        for (var index in GameConfig.transferconfig) {
            var cfg = GameConfig.transferconfig[index];
            var count = GameCache.bag.itemCount(cfg.id);
            if (count) {
                return true;
            }
        }
        return false;
    };
    return TransferCache;
}(BaseCache));
__reflect(TransferCache.prototype, "TransferCache");
//# sourceMappingURL=TransferCache.js.map