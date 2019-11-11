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
 * @Description: VIPBOSS面板
 * @Author: xiejunwei
 * @Date: 2019-09-20 11:35:23
 */
var VipBossPannel = (function (_super) {
    __extends(VipBossPannel, _super);
    function VipBossPannel($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.skinName = "VipBossPannelSkin";
        return _this;
    }
    VipBossPannel.prototype.init = function () {
        _super.prototype.init.call(this);
        this.itemList.itemRenderer = VipBossItem;
        this.tabBar.dataProvider = new eui.ArrayCollection([{ icon: "worldBoss_json.worldBoss_map_0_png" }, { icon: "worldBoss_json.worldBoss_map_1_png" }, { icon: "worldBoss_json.worldBoss_map_2_png" }]);
    };
    VipBossPannel.prototype.open = function (param) {
        this.tabBar.selectedIndex = param && param.secIndex || 0;
        this.message(MsgConst.BOSS_INFO, this.onTabTouche);
        Proxy.boss.sendBossInfo();
        this.addTouchEvent(this.sweepBtn, this.openVipTips);
        this.addTouchEvent(this.tabBar, this.onTabTouche);
        App.TimerManager.addDelay(50, 50, 1, this.onTabTouche, this);
    };
    VipBossPannel.prototype.onTabTouche = function () {
        var tar = this.tabBar.selectedIndex + 1;
        var arr = [];
        var bossData = GameCache.boss.bossData[BossType.VIPBOSS];
        for (var i in bossData) {
            var bossItem = bossData[i];
            if (bossItem.conf.page == tar)
                arr.push(bossItem);
        }
        this.setListData(this.itemList, arr);
    };
    VipBossPannel.prototype.sortFuncByLvl = function (aItem, bItem) {
        if (aItem.conf.conds < bItem.conf.conds) {
            return -1;
        }
        else {
            return 1;
        }
    };
    VipBossPannel.prototype.exitFunc = function () {
        Proxy.boss.sendBossFubenOpt(2, GameCache.boss.currentBossId);
    };
    VipBossPannel.prototype.openVipTips = function () {
        // GlobalFun.gotoCharge();
        var view = new ViewProp();
        view.firIndex = 0;
        App.ViewManager.open(ViewConst.VIP, view);
    };
    return VipBossPannel;
}(BaseSpriteView));
__reflect(VipBossPannel.prototype, "VipBossPannel");
//# sourceMappingURL=VipBossPannel.js.map