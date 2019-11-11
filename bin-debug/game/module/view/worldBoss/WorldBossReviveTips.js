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
 * @Description: 世界BOSS复活提示
 * @Author: xiejunwei
 * @Date: 2019-08-05 16:31:06
 * @LastEditTime: 2019-09-25 17:46:45
 */
var WorldBossReviveTips = (function (_super) {
    __extends(WorldBossReviveTips, _super);
    function WorldBossReviveTips() {
        var _this = _super.call(this, LayerManager.UI_Message) || this;
        _this.skinName = "WorldBossReviveTipsSkin";
        _this.right = 10;
        _this.bottom = 200;
        return _this;
    }
    WorldBossReviveTips.prototype.init = function () {
        _super.prototype.init.call(this);
    };
    WorldBossReviveTips.prototype.open = function (param) {
        _super.prototype.open.call(this);
        this.addTouchEvent(this.cBtn, this.closeFunc);
        this.addTouchEvent(this.enterBtn, this.enterFunc);
        this.initLabel();
    };
    WorldBossReviveTips.prototype.initLabel = function () {
        var id = GameCache.boss.bossHintGroup.shift();
        var conf = GameConfig.monster[id];
        if (!id || !conf) {
            this.closeView();
            return;
        }
        ;
        // this.bName.text = "ID:" + conf.id + " " + conf.name;
        this.bName.text = StringUtils.substitute(Language.lang.wbName, conf.level, conf.name);
        this.bossId = id;
        this.icon.source = RES_DIR_MONSTERICON + conf.icon + ".png";
    };
    WorldBossReviveTips.prototype.closeFunc = function () {
        this.initLabel();
    };
    WorldBossReviveTips.prototype.enterFunc = function () {
        var bossData;
        for (var i in GameCache.boss.bossData) {
            if (GameCache.boss.bossData[i][this.bossId]) {
                bossData = GameCache.boss.bossData[i][this.bossId];
                break;
            }
        }
        var view = new ViewProp();
        switch (bossData.type) {
            case BossType.WORLDBOSS:
                view.firIndex = 0;
                break;
            case BossType.VIPBOSS:
                view.firIndex = 2;
                break;
                ;
        }
        view.secIndex = bossData.conf.page - 1;
        App.ViewManager.open(ViewConst.BOSS, view);
        // Proxy.boss.sendBossFubenOpt(1, parseInt(this.bossId));
        this.closeView();
    };
    return WorldBossReviveTips;
}(BaseEuiWindow));
__reflect(WorldBossReviveTips.prototype, "WorldBossReviveTips");
//# sourceMappingURL=WorldBossReviveTips.js.map