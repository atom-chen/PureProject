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
 * @Description: 个人boss条目
 * @Author: xiejunwei
 * @Date: 2019-08-19 14:00:22
 * @LastEditTime: 2019-08-22 21:35:32
 */
var GRBossItem = (function (_super) {
    __extends(GRBossItem, _super);
    function GRBossItem() {
        return _super.call(this) || this;
    }
    GRBossItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addTouchEvent(this.enterBtn, this.enterFunc);
    };
    GRBossItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (!this.data.fubenid)
            return;
        this.initData();
    };
    GRBossItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    GRBossItem.prototype.initData = function () {
        this.item_0.data = this.data.reward_show[0];
        this.item_1.data = this.data.reward_show[1];
        this.item_2.data = this.data.reward_show[2];
        var bossConfig = GameConfig.monster[this.data.entityid];
        this.mImg.source = RES_DIR_MONSTERICON + bossConfig.icon + ".png";
        this.mName.text = bossConfig.name;
        this.mLvl.text = bossConfig.level;
        this.initState();
    };
    GRBossItem.prototype.initState = function () {
        var roleLvl = GameCache.hero.mainPro.pro(PropId.AP_LEVEL);
        if (roleLvl < this.data.conds) {
            this.enterBtn.visible = false;
            this.killed.visible = false;
            this.lLvl.visible = true;
            this.lImg.visible = true;
            this.lLvl.text = StringUtils.substitute(Language.lang.lvlCondition, this.data.conds);
        }
        else {
            this.lLvl.visible = false;
            this.lImg.visible = false;
            var data = GameCache.copy.getCopyData(this.data.fubenid);
            var enable = data && data.free ? true : false;
            // let enable = true;
            if (enable) {
                this.enterBtn.visible = true;
                this.killed.visible = false;
            }
            else {
                this.enterBtn.visible = false;
                this.killed.visible = true;
            }
        }
    };
    GRBossItem.prototype.enterFunc = function () {
        Proxy.copy.sendEnterFB(this.data.fubenid);
        App.ViewManager.close(ViewConst.BOSS);
    };
    return GRBossItem;
}(BaseCustComponent));
__reflect(GRBossItem.prototype, "GRBossItem");
//# sourceMappingURL=GRBossItem.js.map