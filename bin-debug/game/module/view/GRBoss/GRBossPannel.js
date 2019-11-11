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
 * @Description: 个人boss面板
 * @Author: xiejunwei
 * @Date: 2019-08-19 14:00:11
 * @LastEditTime: 2019-10-18 15:32:57
 */
var GRBossPannel = (function (_super) {
    __extends(GRBossPannel, _super);
    function GRBossPannel($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.skinName = "GRBossPannelSkin";
        _this.grBossData = {};
        return _this;
    }
    GRBossPannel.prototype.init = function () {
        _super.prototype.init.call(this);
        this.initListData();
        this.itemList.itemRenderer = GRBossItem;
        this.tabBar.dataProvider = new eui.ArrayCollection([{ icon: "worldBoss_json.worldBoss_map_0_png" }, { icon: "worldBoss_json.worldBoss_map_1_png" }, { icon: "worldBoss_json.worldBoss_map_2_png" }]);
    };
    GRBossPannel.prototype.open = function (param) {
        this.message(MsgConst.COPY_COUNT, this.onTabTouche);
        this.message(MsgConst.PROPERTY + PropId.AP_LEVEL, this.sweetBtnVisible);
        this.addTouchEvent(this.tabBar, this.onTabTouche);
        this.addTouchEvent(this.sweepBtn, this.sweepFunc);
        this.tabBar.selectedIndex = 0;
        App.TimerManager.addDelay(50, 50, 1, this.initList, this);
        this.sweetBtnVisible();
    };
    GRBossPannel.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.grBossData = {};
    };
    GRBossPannel.prototype.onTabTouche = function () {
        // let tar = this.tabBar.selectedIndex || 0;
        this.initList();
    };
    GRBossPannel.prototype.initList = function () {
        var tar = this.tabBar.selectedIndex || 0;
        this.setListData(this.itemList, this.grBossData[tar + 1].concat());
    };
    GRBossPannel.prototype.initListData = function () {
        var conf = GameConfig.grBoss;
        for (var i in conf) {
            var bossData = conf[i];
            if (!this.grBossData[bossData.page])
                this.grBossData[bossData.page] = [];
            this.grBossData[bossData.page].push(bossData);
        }
    };
    GRBossPannel.prototype.sweepFunc = function () {
        var conf = this.grBossData[1][0];
        Proxy.copy.sendSweep(conf.fubenid, 0);
    };
    GRBossPannel.prototype.sweetBtnVisible = function () {
        var roleLvl = GameCache.hero.mainPro.pro(PropId.AP_LEVEL);
        this.sweepBtn.visible = roleLvl >= GameConfig.globalConfig.personalBossLimit;
    };
    return GRBossPannel;
}(BaseSpriteView));
__reflect(GRBossPannel.prototype, "GRBossPannel");
//# sourceMappingURL=GRBossPannel.js.map