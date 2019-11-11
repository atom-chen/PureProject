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
 * @Description: 副本数据
 * @Author: xiejunwei
 * @Date: 2019-08-20 10:33:38
 * @LastEditTime: 2019-10-30 19:09:31
 */
var CopyCache = (function (_super) {
    __extends(CopyCache, _super);
    function CopyCache() {
        var _this = _super.call(this) || this;
        _this.buffBuy = [0, 0];
        _this.recordItemArr = [];
        _this.copyData = {};
        _this.copyEvaData = {};
        _this.copyTime = {};
        _this.copyExpData = {};
        _this.copyExpBuyData = {};
        _this.copyBuyData = {};
        _this.fashionCopyData = {};
        return _this;
    }
    CopyCache.prototype.clear = function () {
        this.copyData = {};
        this.copyEvaData = {};
        this.copyTime = {};
        this.buffBuy = [0, 0];
        this.copyExpData = {};
        this.copyExpBuyData = {};
        this.copyBuyData = {};
        this.fashionCopyData = {};
        this.recordItemArr = [];
    };
    CopyCache.prototype.initCopyData = function (fbid, enter, free, sweep, limit) {
        if (!this.copyData[fbid]) {
            var conf = GameConfig.fuben[fbid];
            var obj = {
                id: fbid,
                enter: enter,
                totalLimit: limit,
                free: free,
                freeTimes: 0,
                sweep: sweep,
                consumeTimes: 0,
                consumes: {} //价格或付费道具
            };
            if (conf.enterCfg) {
                for (var i in conf.enterCfg[0]) {
                    obj[i] = conf.enterCfg[0][i];
                }
            }
            this.copyData[fbid] = obj;
        }
        else {
            this.copyData[fbid].enter = enter;
            this.copyData[fbid].free = free;
            this.copyData[fbid].sweep = sweep;
        }
    };
    CopyCache.prototype.getCopyData = function (id) {
        return this.copyData[id] || null;
    };
    CopyCache.prototype.initCopyEvaData = function (fbid, count) {
        var conf = GameConfig.fuben[fbid];
        var eva = 0;
        var item;
        switch (conf.type) {
            case CopyType.MATERIAL:
                item = GameConfig.copyMaterials[fbid];
                eva = item.score[count - 1];
                break;
            case CopyType.FASHION:
                item = GameConfig.fashionCopy[fbid];
                eva = item.score[count - 1];
                break;
        }
        this.copyEvaData[fbid] = eva;
    };
    CopyCache.prototype.openExitTips = function (skipTips, desc) {
        if (skipTips === void 0) { skipTips = false; }
        if (skipTips) {
            this.exitCopy();
            return;
        }
        var view = new ViewProp();
        var obj = {};
        var fbid = GameCache.map.fbId;
        var conf = GameConfig.fuben[fbid];
        desc = desc ? desc : conf.exitDec;
        obj["desc"] = desc ? desc : Language.lang.copyExit;
        obj["thisc"] = this;
        obj["func"] = this.exitCopy;
        view.exData1 = obj;
        App.ViewManager.open(ViewConst.SYSTIPS, view);
    };
    CopyCache.prototype.exitCopy = function () {
        Proxy.copy.sendQuit(GameCache.map.fbId);
    };
    CopyCache.prototype.getCopyExpId = function () {
        var roleLvl = GameCache.hero.mainPro.pro(PropId.AP_LEVEL);
        var conf = GameConfig.copyExp;
        var id = 0;
        var idx;
        for (var i in conf) {
            if (roleLvl <= conf[i].level[1] && roleLvl >= conf[i].level[0]) {
                id = conf[i].fubenId;
                idx = i;
                break;
            }
        }
        if (id == 0) {
            var max = Object.keys(conf).length;
            id = conf[max].fubenId;
            idx = max;
        }
        return [idx, id];
    };
    CopyCache.prototype.getCopyExpBuyData = function () {
        var bought = this.copyExpBuyData ? this.copyExpBuyData.boughtCount : 0;
        var vipLvl = GameCache.vip.realValue();
        var vipConf = GameConfig.vip[vipLvl];
        var nextConf = GameConfig.vip[vipLvl + 1] ? GameConfig.vip[vipLvl + 1] : vipConf;
        var max = vipConf.expCopy;
        var next = nextConf.expCopy;
        return [max, bought, next];
    };
    CopyCache.prototype.saveCopyEnterBuy = function (fbid, count_0, count_1) {
        var copyConfig = GameConfig.fuben[fbid];
        switch (copyConfig.type) {
            case CopyType.FASHION:
                this.copyBuyData[GameConfig.globalConfig.fashionCopyId] = {
                    enterCount: count_0,
                    boughtCount: count_1
                };
                break;
            default:
                GameCache.copy.copyBuyData[fbid] = {
                    enableCount: count_0,
                    boughtCount: count_1
                };
                break;
        }
        App.MessageCenter.dispatch(MsgConst.COPY_COUNT);
    };
    CopyCache.prototype.enterCopyExp = function () {
        var fbid = this.getCopyExpId()[1];
        Proxy.copy.sendEnterFB(fbid);
    };
    CopyCache.prototype.openPassRank = function (myRank, arr) {
        var view = new ViewProp();
        view.exData1 = {};
        view.exData1["title"] = "passRank";
        view.exData1["myRank"] = myRank;
        view.exData1["myValue"] = GameCache.hero.mainPro.pro(PropId.AP_CHKPOINT_LV) - 1;
        view.exData1["listData"] = arr;
        App.ViewManager.open(ViewConst.RANKB, view);
    };
    CopyCache.prototype.getFashionCopyBuyData = function () {
        var fbid = GameConfig.globalConfig.fashionCopyId;
        var bought = this.copyBuyData[fbid] ? this.copyBuyData[fbid].boughtCount : 0;
        var vipLvl = GameCache.vip.realValue();
        var vipConf = GameConfig.vip[vipLvl];
        var nextConf = GameConfig.vip[vipLvl + 1] ? GameConfig.vip[vipLvl + 1] : vipConf;
        var max = vipConf.fashionCopyBuyNum;
        var next = nextConf.fashionCopyBuyNum;
        return [max, bought, next];
    };
    /**
     * 判读材料副本次数
     */
    CopyCache.prototype.checkMaterial = function () {
        var roleLvl = GameCache.hero.mainPro.pro(PropId.AP_LEVEL);
        var conf = GameConfig.copyMaterials;
        for (var i in conf) {
            var cItem = conf[i];
            var data = GameCache.copy.getCopyData(i);
            if (cItem.level > roleLvl)
                continue;
            if (!data)
                return true;
            if (data.free)
                return true;
        }
        return false;
    };
    /**
     * 判断经验副本次数
     */
    CopyCache.prototype.checkCopyExp = function () {
        var dataArr = GameCache.copy.getCopyExpId();
        var conf = GameConfig.copyExp[dataArr[0]];
        var fbid = dataArr[1];
        var expConf = GameConfig.fuben[fbid];
        var data = this.copyExpBuyData ? this.copyExpBuyData : null;
        var boughtCount = data && data.boughtCount ? data.boughtCount : 0;
        var enterCount = data && data.enterCount ? data.enterCount : 0;
        var count = boughtCount + expConf.enterCfg[0].freeTimes - enterCount;
        if (count <= 0)
            return false;
        var itemCount = GameCache.bag.itemCount(conf.consume[0].id);
        return itemCount >= conf.consume[0].count;
    };
    CopyCache.prototype.exitFashionCopy = function () {
        this.recordItemArr = [];
        PassMgr.switchGj(true);
    };
    return CopyCache;
}(BaseCache));
__reflect(CopyCache.prototype, "CopyCache");
//# sourceMappingURL=CopyCache.js.map