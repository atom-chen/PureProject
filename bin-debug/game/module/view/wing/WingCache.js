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
 * @Description: 翅膀数据
 * @Author: xiejunwei
 * @Date: 2019-08-14 19:09:02
 * @LastEditTime: 2019-10-24 17:38:49
 */
var WingCache = (function (_super) {
    __extends(WingCache, _super);
    function WingCache() {
        var _this = _super.call(this) || this;
        _this.wingUpcost = 0; //翅膀消耗道具ID
        _this.wingData = {};
        return _this;
    }
    WingCache.prototype.clear = function () {
        this.wingData = {};
    };
    WingCache.prototype.initWingData = function (roleId, lvl, exp, count) {
        var obj = {
            lvl: lvl,
            exp: exp,
            count: count
        };
        this.wingData[roleId] = obj;
        App.MessageCenter.dispatch(MsgConst.WING_INFO);
        if (!this.wingUpcost)
            this.wingUpcost = GameConfig.wing[1].consumeItems[0].id;
    };
    /**
     * 判断升级
     */
    WingCache.prototype.checkGrade = function (roleId) {
        if (!roleId) {
            var roleList = GameCache.hero.list;
            for (var i = 0; i < roleList.length; i++) {
                if (this.checkGrade(roleList[i].pro.pro(PropId.AP_ACTOR_ID)))
                    return true;
            }
            return false;
        }
        var data = GameCache.wing.wingData[roleId];
        var lvl = data && data.lvl ? data.lvl : 0;
        var conf = GameConfig.wing[lvl + 1];
        if (!conf)
            return false;
        var main = GameCache.wing.wingData[GameCache.hero.mainPro.pro(PropId.AP_ACTOR_ID)];
        var count = main ? main.count : 0;
        var vipLvl = GameCache.vip.realValue();
        var limit = GameConfig.vip[vipLvl].wing;
        if (limit - count) {
            //判断金币
            var coin = GameCache.hero.mainPro.pro(PropId.AP_COIN);
            if (coin >= conf.consumeGold[0].count)
                return true;
        }
        else {
            //判断道具  
            var count_1 = GameCache.bag.itemCount(conf.consumeItems[0].id);
            if (count_1 >= conf.consumeItems[0].count)
                return true;
        }
        return false;
    };
    return WingCache;
}(BaseCache));
__reflect(WingCache.prototype, "WingCache");
//# sourceMappingURL=WingCache.js.map