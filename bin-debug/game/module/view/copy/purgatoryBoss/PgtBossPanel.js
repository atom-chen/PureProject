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
 * @Description: 炼狱boss
 * @Author: moyusheng
 * @Date: 2019-10-21 16:14:50
 */
var PgtBossPanel = (function (_super) {
    __extends(PgtBossPanel, _super);
    function PgtBossPanel($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.isLock = false;
        _this.skinName = "PgtBossPanelSkin";
        return _this;
    }
    PgtBossPanel.prototype.init = function () {
        _super.prototype.init.call(this);
        // 分页图标
        var pageNames = [];
        for (var i = 1; i <= GameCache.pgtBoss.maxPage; i++) {
            pageNames.push({ icon: RES_DIR_PAGEICON + "pgt_boss_tab_" + i + ".png" });
        }
        // 控制分割线的显示
        for (var i = 1; i < 5; i++) {
            var line = this["line" + i];
            line.visible = i < GameCache.pgtBoss.maxPage;
        }
        this.tab.dataProvider = new eui.ArrayCollection(pageNames);
        this.power.alignV = "mid";
        this.power.gap = 21;
        this.hpBar.labelDisplay.visible = false;
    };
    PgtBossPanel.prototype.open = function (param) {
        if (param === void 0) { param = null; }
        _super.prototype.open.call(this, param);
        this.message(MsgConst.PURGATORY_BOSS_UPDATE, this.initPanel);
        this.message(MsgConst.BAG_ITEM_NUM, this.initPanel);
        // Proxy.boss.pgtBossInfoReq();
        this.addTouchEvent(this.btnChallenge, this.onBtnChallengeClick);
        this.addTouchEvent(this.addBtn, this.onBtnAddClick);
        this.addTouchEvent(this.imgCost, this.onCostTouch);
        this.addEvent(egret.TouchEvent.CHANGE, this.bossList, this.onListClick);
        this.addEvent(egret.TouchEvent.CHANGE, this.tab, this.onTabChanged);
        this.awdList.itemRenderer = ItemBase;
        this.bossList.itemRenderer = PgtBossItem;
        this.tab.selectedIndex = 0;
        this.initPanel();
    };
    PgtBossPanel.prototype.initPanel = function () {
        this.updatePgtInfo();
        var entityIds = GameCache.pgtBoss.pgtBossPage[this.page];
        if (!entityIds || entityIds.length == 0)
            return;
        this.entityId = entityIds[0];
        this.setListData(this.bossList, entityIds.concat([]));
        this.bossList.scrollV = 0;
        this.updateBossInfo();
    };
    PgtBossPanel.prototype.updateBossInfo = function () {
        var cfg = GameConfig.purgatoryBoss[this.entityId];
        var mstCfg = GameConfig.monster[cfg.entityid];
        this.boss.showMonster(mstCfg.modelid);
        this.boss.scaleY = this.boss.scaleX = 0.7;
        var data = GameCache.pgtBoss.pgtBossMap[this.entityId];
        this.labName.text = mstCfg.name;
        this.power.value = cfg.power;
        this.hpBar.maximum = 100;
        this.hpBar.value = data.hp;
        this.labHp.text = data.hp + "%";
        var _a = cfg.consume[0], type = _a.type, id = _a.id, count = _a.count;
        this.item = { type: type, id: id, count: count };
        var itemCfg = GameConfig.item[id];
        this.imgCost.source = "" + RES_DIR_IMAGES_ITEM + itemCfg.icon + ".png";
        var itemCount = GameCache.bag.itemCount(id);
        var costColor = itemCount >= count ? "c0xffc600" : "c0xff0000";
        var str = StringUtils.substitute(Language.lang.pgtBossCost, count, costColor, itemCount);
        this.labCost.textFlow = TextFlowUtils.generateTextFlow(str);
        this.setListData(this.awdList, cfg.reward_show);
        //判断是否解锁
        this.isLock = false;
        var lastCfg = GameCache.pgtBoss.getPgtBossCfg(cfg.difficulty - 1, cfg.level);
        if (lastCfg) {
            var lastData = GameCache.pgtBoss.pgtBossMap[lastCfg.entityid];
            this.isLock = lastData.complete == 0;
        }
        var cd = this.getCd(data);
        this.labLock.visible = false;
        if (cd > 0) {
            var cdStr = cd > 0 ? App.DateUtils.getFormatBySecond(cd) : "00:00:00";
            this.labBossCd.text = StringUtils.substitute(Language.lang.pgtBossCd, cdStr);
            // 隐藏挑战按钮，消耗等信息
            this.imgCost.visible = this.labCost.visible = this.btnChallenge.visible = false;
            this.labBossCd.visible = true;
            if (!App.TimerManager.isExists(this.timeCount, this))
                App.TimerManager.addDelay(0, 1000, 0, this.timeCount, this);
        }
        else {
            this.labBossCd.text = null;
            this.btnChallenge.visible = true;
            this.labBossCd.visible = false;
            // boss是否解锁
            this.btnChallenge.enabled = this.imgCost.visible = this.labCost.visible = !this.isLock;
            this.labLock.visible = this.isLock;
            this.labLock.text = Language.lang.pgtBossLock;
            this.btnChallenge.filters = this.isLock ? FilterUtils.DefaultGrayFilters : null;
        }
    };
    PgtBossPanel.prototype.updatePgtInfo = function () {
        if (!App.TimerManager.isExists(this.timeCount, this))
            App.TimerManager.addDelay(0, 1000, 0, this.timeCount, this);
        this.labCount.text = StringUtils.substitute(Language.lang.pgtBossChallenge, GameCache.pgtBoss.pgtChallenge, GameConfig.globalConfig.PurgatoryChallenge);
        this.labTime.text = StringUtils.substitute(Language.lang.pgtBossRefreshTime, App.DateUtils.getFormatBySecond(this.getRefreshTime()));
    };
    PgtBossPanel.prototype.timeCount = function () {
        var data = GameCache.pgtBoss.pgtBossMap[this.entityId];
        var cd = this.getCd(data);
        if (cd > 0) {
            var cdStr = App.DateUtils.getFormatBySecond(cd);
            this.labBossCd.text = StringUtils.substitute(Language.lang.pgtBossCd, cdStr);
        }
        else {
            this.labBossCd.text = null;
        }
        var refreshTime = this.getRefreshTime();
        this.labTime.text = StringUtils.substitute(Language.lang.pgtBossRefreshTime, refreshTime > 0 ? App.DateUtils.getFormatBySecond(refreshTime) : "00:00:00");
    };
    PgtBossPanel.prototype.onCostTouch = function () {
        if (!this.item) {
            return;
        }
        GlobalFun.openItemTips(this.item.id);
    };
    PgtBossPanel.prototype.onTabChanged = function (e) {
        this.initPanel();
    };
    PgtBossPanel.prototype.onListClick = function (e) {
        this.entityId = e.target.selectedItem;
        // 刷新
        this.updateBossInfo();
    };
    /**挑战 */
    PgtBossPanel.prototype.onBtnChallengeClick = function () {
        GameCache.pgtBoss.currentBossId = this.entityId;
        var cfg = GameConfig.purgatoryBoss[this.entityId];
        if (GameCache.hero.mainPro.pro(PropId.AP_LEVEL) < cfg.level) {
            GlobalFun.SysMsg(Language.lang.roleLevelLack);
            return;
        }
        var itemCount = GameCache.bag.itemCount(this.item.id);
        if (itemCount < this.item.count) {
            if (this.item.id == GlobalVar.GOLD) {
                GlobalFun.gotoCharge();
            }
            else {
                GlobalFun.openItemTips(this.item.id);
            }
            return;
        }
        if (GameCache.pgtBoss.pgtChallenge == 0) {
            GlobalFun.openEnterBuy("pgtboss");
            return;
        }
        Proxy.boss.sendBossFubenOpt(1, this.entityId);
        App.ViewManager.close(ViewConst.COPY);
    };
    /** 购买次数 */
    PgtBossPanel.prototype.onBtnAddClick = function () {
        GlobalFun.openEnterBuy("pgtboss");
    };
    /**
     * 获取boss复活cd（秒）
     * @param  {PgtBossData} data
     * @returns number
     */
    PgtBossPanel.prototype.getCd = function (data) {
        if (!data)
            return 0;
        var delta = data.cd - GameCache.server.serverTime;
        // let remain = cfg.time * 1000 - delta;
        return delta <= 0 ? 0 : delta / 1000;
    };
    /**
     * 获取刷新时间（秒）
     * @returns number
     */
    PgtBossPanel.prototype.getRefreshTime = function () {
        if (!GameCache.pgtBoss.pgtRefresh)
            return 0;
        var delta = GameCache.pgtBoss.pgtRefresh - GameCache.server.serverTime;
        return delta <= 0 ? 0 : delta / 1000;
    };
    PgtBossPanel.prototype.close = function () {
        _super.prototype.close.call(this);
        this.awdList.itemRenderer = null;
        this.bossList.itemRenderer = null;
        App.TimerManager.remove(this.timeCount, this);
    };
    Object.defineProperty(PgtBossPanel.prototype, "page", {
        // (分页)
        get: function () {
            return this.tab.selectedIndex + 1;
        },
        enumerable: true,
        configurable: true
    });
    return PgtBossPanel;
}(BaseSpriteView));
__reflect(PgtBossPanel.prototype, "PgtBossPanel");
//# sourceMappingURL=PgtBossPanel.js.map