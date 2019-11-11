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
var PgtBossCache = (function (_super) {
    __extends(PgtBossCache, _super);
    function PgtBossCache() {
        var _this = _super.call(this) || this;
        _this.pgtBossMap = {};
        _this.pgtBossPage = {};
        _this.pgtChallenge = 0;
        _this.pgtBuy = 0;
        _this.pgtRefresh = 0;
        _this.pgtMaxPage = 0;
        _this.fbId2bossId = {};
        return _this;
    }
    PgtBossCache.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.pgtBossMap = {};
        this.pgtBossPage = {};
        this.pgtChallenge = 0;
        this.pgtBuy = 0;
        this.pgtRefresh = 0;
        this.pgtMaxPage = 0;
        this.pgtBossCfgMap = null;
        this.fbId2bossId = {};
    };
    /**
     * 更新炼狱boss信息
     * @param  {{bossId:number} datas
     * @param  {number} hp
     * @param  {number}[]} lastKill
     * @returns void
     */
    PgtBossCache.prototype.updatePgtBossData = function (info) {
        if (!info)
            return;
        for (var k in info) {
            var data = info[k];
            var cfg = GameConfig.purgatoryBoss[data.bossid];
            this.pgtBossMap[data.bossid] = data;
            if (!this.pgtBossPage[cfg.page]) {
                this.pgtBossPage[cfg.page] = [];
            }
            if (this.pgtBossPage[cfg.page].lastIndexOf(data.bossid) == -1) {
                this.pgtBossPage[cfg.page].push(data.bossid);
            }
            this.fbId2bossId[cfg.fubenid] = cfg.entityid;
        }
        // 排序
        for (var k in this.pgtBossPage) {
            var page = this.pgtBossPage[k];
            page.sort(function (a, b) {
                var cfgA = GameConfig.purgatoryBoss[a];
                var cfgB = GameConfig.purgatoryBoss[b];
                return cfgA.level - cfgB.level;
            });
        }
    };
    Object.defineProperty(PgtBossCache.prototype, "maxPage", {
        get: function () {
            if (this.pgtMaxPage)
                return this.pgtMaxPage;
            this.initCfg();
            return this.pgtMaxPage;
        },
        enumerable: true,
        configurable: true
    });
    PgtBossCache.prototype.initCfg = function () {
        this.pgtBossCfgMap = {};
        this.pgtMaxPage = 0;
        for (var k in GameConfig.purgatoryBoss) {
            var cfg = GameConfig.purgatoryBoss[k];
            (!this.pgtBossCfgMap[cfg.difficulty]) && (this.pgtBossCfgMap[cfg.difficulty] = {});
            var diffMap = this.pgtBossCfgMap[cfg.difficulty];
            diffMap[cfg.level] = cfg;
            if (cfg.page > this.pgtMaxPage) {
                this.pgtMaxPage = cfg.page;
            }
        }
    };
    /**
     * 获取炼狱boss配置
     * @param  {number} diff
     * @param  {number} lv
     */
    PgtBossCache.prototype.getPgtBossCfg = function (diff, lv) {
        if (!this.pgtBossCfgMap) {
            this.initCfg();
        }
        if (!this.pgtBossCfgMap[diff]) {
            return null;
        }
        return this.pgtBossCfgMap[diff][lv];
    };
    PgtBossCache.prototype.openExitTips = function (skipTips) {
        if (skipTips === void 0) { skipTips = false; }
        if (skipTips) {
            this.exit();
            return;
        }
        var view = new ViewProp();
        var obj = {};
        var cfg = GameConfig.purgatoryBoss[this.currentBossId];
        var desc = Language.lang.pgtBossExit;
        if (cfg) {
            var fbCfg = GameConfig.fuben[cfg.fubenid];
            desc = fbCfg.exitDec;
        }
        obj["desc"] = desc;
        obj["thisc"] = this;
        obj["func"] = this.exit;
        view.exData1 = obj;
        App.ViewManager.open(ViewConst.SYSTIPS, view);
    };
    PgtBossCache.prototype.exit = function () {
        if (!this.currentBossId && GameCache.map.fbId > 0) {
            this.currentBossId = this.fbId2bossId[GameCache.map.fbId];
        }
        Proxy.boss.sendBossFubenOpt(2, this.currentBossId);
    };
    PgtBossCache.prototype.takeAwd = function () {
        Proxy.boss.sendRecieveAw(this.currentBossId);
        this.exit();
    };
    PgtBossCache.prototype.getBuyMax = function () {
        var bought = this.pgtBuy ? this.pgtBuy : 0;
        var vipLvl = GameCache.vip.realValue();
        var vipConf = GameConfig.vip[vipLvl];
        var nextConf = GameConfig.vip[vipLvl + 1] ? GameConfig.vip[vipLvl + 1] : vipConf;
        var max = vipConf.PurgatoryBoss;
        var next = nextConf.PurgatoryBoss;
        return [max, bought, next];
    };
    return PgtBossCache;
}(BaseCache));
__reflect(PgtBossCache.prototype, "PgtBossCache");
//# sourceMappingURL=PgtBossCache.js.map