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
var PurgatoryUpgrade = (function (_super) {
    __extends(PurgatoryUpgrade, _super);
    function PurgatoryUpgrade() {
        var _this = _super.call(this, LayerManager.UI_Tips) || this;
        _this.bagCount1 = 0;
        _this.bagCount2 = 0;
        _this.skinName = "PurgatoryUpgradeSkin";
        return _this;
    }
    PurgatoryUpgrade.prototype.open = function (param) {
        _super.prototype.open.call(this);
        this.message(MsgConst.BAG_ITEM_NUM, this.initData);
        this.addTouchEvent(this.btnUp, this.onBtnUpgrageClick);
        this.roleIdx = Number(param.exData1["roleIdx"]);
        this.cfgFrom = param.exData1["cfgFrom"];
        this.cfgTo = param.exData1["cfgTo"];
        // 没有装备信息代表是激活
        if (!this.cfgFrom) {
            this.currentState = "s0";
            this.title.source = "purgatory_json.purgatory_lab_active_png";
        }
        else {
            this.currentState = "s1";
            this.title.source = "purgatory_json.purgatory_lab_upgrade_png";
        }
        this.initData();
    };
    PurgatoryUpgrade.prototype.initData = function () {
        this.eqName.text = this.cfgTo.name;
        var job = GameCache.hero.mainPro.pro(PropId.AP_JOB);
        var icon = this.cfgTo.icon[job - 1];
        icon || (icon = this.cfgTo.icon[0]);
        this.item3.setIconImg("" + RES_DIR_PURGATORY_ICON + icon + ".png");
        this.bagCount1 = GameCache.bag.itemCount(this.cfgTo.cost1.id);
        var itemCfg1 = GameConfig.item[this.cfgTo.cost1.id];
        this.item0.data = itemCfg1;
        var color = this.bagCount1 >= this.cfgTo.cost1.count ? "c0xffffff" : "c0xff0000";
        this.num0.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.purgatoryItemNum, this.bagCount1, this.cfgTo.cost1.count, color));
        this.bagCount2 = GameCache.bag.itemCount(this.cfgTo.cost2.id);
        var itemCfg2 = GameConfig.item[this.cfgTo.cost2.id];
        this.item2.data = itemCfg2;
        color = this.bagCount2 >= this.cfgTo.cost2.count ? "c0xffffff" : "c0xff0000";
        this.num2.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.purgatoryItemNum, this.bagCount2, this.cfgTo.cost2.count, color));
        if (this.cfgFrom) {
            icon = this.cfgTo.icon[job - 1];
            icon || (icon = this.cfgFrom.icon[0]);
            this.item1.setIconImg("" + RES_DIR_PURGATORY_ICON + icon + ".png");
            this.num1.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.purgatoryItemNum, 1, 1, "c0xffffff"));
        }
    };
    /**
     * 升级
     * @returns void
     */
    PurgatoryUpgrade.prototype.onBtnUpgrageClick = function () {
        if (this.bagCount1 >= this.cfgTo.cost1.count && this.bagCount2 >= this.cfgTo.cost2.count) {
            Proxy.purgatory.upgradeReq(this.roleIdx, this.cfgTo.type, this.cfgTo.level, this.cfgTo.cost1.id, this.cfgTo.cost2.id);
            App.ViewManager.close(ViewConst.PURGATORY_UPGRADE);
        }
    };
    return PurgatoryUpgrade;
}(BaseEuiWindow));
__reflect(PurgatoryUpgrade.prototype, "PurgatoryUpgrade");
//# sourceMappingURL=PurgatoryUpgrade.js.map