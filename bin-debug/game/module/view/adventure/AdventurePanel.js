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
 * @Description: 冒险系统
 * @Author: guolinsen
 * @Date: 2019-08-26 11:02:19
 * @LastEditTime: 2019-10-25 15:47:38
 */
var AdventurePanel = (function (_super) {
    __extends(AdventurePanel, _super);
    function AdventurePanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "AdventurePanelSkin";
        return _this;
    }
    /**界面整个界面的红点 */
    AdventurePanel.red = function () {
        return GameCache.adventure.topFinish;
    };
    /**需要刷新是红点消息列表 */
    AdventurePanel.changeMsg = function () {
        return [MsgConst.ADVENTURE_UPDATE_SINGLE, MsgConst.ADVENTURE_UPDATE_LV];
    };
    AdventurePanel.prototype.init = function () {
        this.list.itemRenderer = AdventureItem;
    };
    AdventurePanel.prototype.open = function () {
        _super.prototype.open.call(this);
        this.addTouchEvent(this.itemAddImg, this.onAct);
        this.addTouchEvent(this.roleAddImg, this.onAct);
        this.message(MsgConst.ADVENTURE_UPDATE_LV, this.onUpdateLv);
        this.message(MsgConst.ADVENTURE_UPDATE_SINGLE, this.onUpdateLv);
        this.onUpdateLv();
    };
    AdventurePanel.prototype.onAct = function () {
        if (GameCache.adventure.isMaxLv()) {
            GlobalFun.SysMsg(Language.lang.adventrueMaxLv);
            return;
        }
        if (!GameCache.adventure.topAward)
            return;
        if (GameCache.adventure.topAward.type == AwardType.CREATE_HERO) {
            App.ViewManager.open(ViewConst.CREATE_HERO);
        }
        else {
            Proxy.adventure.sendPrize(0);
        }
    };
    AdventurePanel.prototype.onUpdateLv = function () {
        this.updateTop();
        this.flushFun(this.onUpdate, true);
    };
    AdventurePanel.prototype.updateTop = function () {
        var award = GameCache.adventure.topAward;
        var isRole = GameCache.adventure.topAward.type == AwardType.CREATE_HERO;
        this.role.visible = isRole;
        this.item.visible = !isRole;
        var finish = GameCache.adventure.taskList.length == GameCache.adventure.topProgress;
        var eff = false;
        if (isRole) {
            this.roleAddImg.visible = finish;
            this.roleLockImg.visible = !finish;
            eff = finish;
            this.roleTextImg.source = "adventure_json.adventureRole" + GameCache.hero.list.length + "_png";
        }
        else {
            this.itemPrize.data = award;
        }
        if (eff)
            this.showEff();
        else
            this.hideEff();
        this.banner.source = "" + RES_DIR_ADVENTURE + GameCache.adventure.banner + ".png";
    };
    AdventurePanel.prototype.showEff = function () {
        if (!this.mc) {
            var mc = App.DisplayUtils.addEffectToObj(this, "maoxian_zhaomu_0_1", -1, 436, 96);
            this.mc = mc;
        }
        this.mc.play(-1);
        this.mc.visible = true;
    };
    AdventurePanel.prototype.hideEff = function () {
        if (this.mc) {
            this.mc.visible = false;
            this.mc.stop();
        }
    };
    AdventurePanel.prototype.onUpdate = function () {
        this.setListData(this.list, GameCache.adventure.taskList);
        this.pro.maximum = GameCache.adventure.taskList.length;
        this.pro.value = GameCache.adventure.topProgress;
    };
    return AdventurePanel;
}(BaseSpriteView));
__reflect(AdventurePanel.prototype, "AdventurePanel");
//# sourceMappingURL=AdventurePanel.js.map