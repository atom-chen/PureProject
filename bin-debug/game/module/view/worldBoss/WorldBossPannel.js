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
 * @Description: 世界BOSS面板
 * @Author: xiejunwei
 * @Date: 2019-07-30 15:33:28
 * @LastEditTime: 2019-10-28 15:27:13
 */
var WorldBossPannel = (function (_super) {
    __extends(WorldBossPannel, _super);
    function WorldBossPannel($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.skinName = "WorldBossPannelSkin";
        _this.bossListData = {};
        return _this;
    }
    WorldBossPannel.prototype.init = function () {
        _super.prototype.init.call(this);
        this.itemList.itemRenderer = WorldBossItem;
        this.tabBar.dataProvider = new eui.ArrayCollection([{ icon: "worldBoss_json.worldBoss_map_0_png" }, { icon: "worldBoss_json.worldBoss_map_1_png" }, { icon: "worldBoss_json.worldBoss_map_2_png" }]);
        // this.initList();
    };
    WorldBossPannel.red = function () {
        return GameCache.boss.getEnableEnterWB();
    };
    WorldBossPannel.changeMsg = function () {
        return [MsgConst.WORLDBOSS_COUNT];
    };
    WorldBossPannel.prototype.refreshRed = function () {
    };
    WorldBossPannel.prototype.open = function (param) {
        this.tabBar.selectedIndex = param && param.secIndex || 0;
        this.message(MsgConst.BOSS_INFO, this.onTabTouche);
        this.message(MsgConst.WORLDBOSS_COUNT, this.initTime);
        Proxy.boss.sendBossInfo();
        this.addTouchEvent(this.buyBtn, this.openBuy);
        this.addTouchEvent(this.tabBar, this.onTabTouche);
        this.initTime();
        // App.TimerManager.addDelay(50, 50, 1, this.onTabTouche, this);
    };
    WorldBossPannel.prototype.close = function (param) {
        _super.prototype.close.call(this);
    };
    WorldBossPannel.prototype.onTabTouche = function () {
        var tar = this.tabBar.selectedIndex + 1;
        var arr = [];
        var bossData = GameCache.boss.bossData[BossType.WORLDBOSS];
        for (var i in bossData) {
            var bossItem = bossData[i];
            if (bossItem.conf.page == tar)
                arr.push(bossItem);
        }
        this.setListData(this.itemList, arr);
    };
    WorldBossPannel.prototype.sortFuncByLvl = function (aItem, bItem) {
        if (aItem.conf.conds < bItem.conf.conds) {
            return -1;
        }
        else {
            return 1;
        }
    };
    WorldBossPannel.prototype.exitFunc = function () {
        Proxy.boss.sendBossFubenOpt(2, GameCache.boss.currentBossId);
    };
    WorldBossPannel.prototype.initTime = function () {
        var data = GameCache.boss.worldEnterCount;
        var c = data && data.count ? data.count : 0;
        var a = GameConfig.globalConfig.worldBossNum;
        var remain = a + data.buyCount - c;
        this.count.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.remain, remain + "/" + a));
        if (data.timeChkPoint) {
            this.cTime.visible = true;
            this.time = 3600 - Math.floor((GameCache.server.serverTime - data.timeChkPoint) / 1000);
            if (this.time >= 0) {
                if (!App.TimerManager.isExists(this.timeCount, this))
                    App.TimerManager.addDelay(0, 1000, 0, this.timeCount, this);
            }
        }
        else {
            this.cTime.visible = false;
            if (App.TimerManager.isExists(this.timeCount, this))
                App.TimerManager.remove(this.timeCount, this);
        }
    };
    WorldBossPannel.prototype.timeCount = function () {
        if (this.time < 0) {
            App.TimerManager.remove(this.timeCount, this);
            this.time = 0;
            return;
        }
        this.cTime.text = StringUtils.substitute(Language.lang.resetTime, App.DateUtils.getFormatBySecond(this.time, DateUtils.TIME_FORMAT_1));
        this.time--;
    };
    WorldBossPannel.prototype.openBuy = function () {
        // App.ViewManager.open(ViewConst.WBBUY);
        GlobalFun.openEnterBuy("wboss");
    };
    return WorldBossPannel;
}(BaseSpriteView));
__reflect(WorldBossPannel.prototype, "WorldBossPannel");
//# sourceMappingURL=WorldBossPannel.js.map