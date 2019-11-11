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
 * @Description: 徽章页面
 * @Author: xiejunwei
 * @Date: 2019-08-27 17:25:50
 * @LastEditTime: 2019-11-01 14:36:19
 */
var BadgePage = (function (_super) {
    __extends(BadgePage, _super);
    function BadgePage($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.skinName = "BadgePageSkin";
        return _this;
    }
    BadgePage.prototype.init = function () {
        _super.prototype.init.call(this);
        var layout = new eui.TileLayout();
        layout.orientation = "row";
        layout.requestedRowCount = 2;
        layout.horizontalGap = 0;
        layout.verticalGap = 10;
        layout.paddingLeft = 12;
        this.propList.pG.layout = layout;
        this.lNum.gap = 23;
    };
    BadgePage.red = function () {
        return GameCache.badge.checkGrade();
    };
    BadgePage.changeMsg = function () {
        return [MsgConst.PROPERTY + PropId.AP_BADGE_LVL, MsgConst.PROPERTY + PropId.AP_CHKPOINT_LV];
    };
    BadgePage.prototype.refreshRed = function () {
        this.redShow();
    };
    BadgePage.prototype.open = function (param) {
        this.message(MsgConst.PROPERTY + PropId.AP_BADGE_LVL, this.initData);
        this.message(MsgConst.PROPERTY + PropId.AP_BADGE_LVL, this.showEff);
        this.addTouchEvent(this.btn0, this.upGradeFunc);
        this.initData();
    };
    BadgePage.prototype.initData = function () {
        var passLvl = GameCache.hero.mainPro.pro(PropId.AP_CHKPOINT_LV);
        var badgeLvl = GameCache.hero.mainPro.pro(PropId.AP_BADGE_LVL); // 当前徽章等级
        // let badgeLvl = 1;
        var conf = GameConfig.badge[badgeLvl];
        var nextConf = GameConfig.badge[badgeLvl + 1];
        // if (!conf) return;
        if (nextConf) {
            this.propList.setData(conf ? conf.attrs : [], nextConf.attrs, 0, 0xffc600, 0xffffff, 0x00ff0c, [], "PropItem3Skin");
            this.btn0.visible = true;
            this.cg.visible = true;
            var idx = passLvl > nextConf.Checkpoint ? 1 : 0;
            this.condi.textColor = passLvl > nextConf.Checkpoint ? 0x3ee822 : 0xff0000;
            this.condi.text = StringUtils.substitute(Language.lang.badge_0[idx], nextConf.Checkpoint);
            // this.sImg.visible = passLvl > nextConf.Checkpoint;
            this.lvlMax.visible = false;
        }
        else {
            this.btn0.visible = false;
            this.lvlMax.visible = true;
            this.cg.visible = false;
            this.img_1.visible = false;
            // this.sImg.visible = false;
        }
        this.initProgress(badgeLvl);
    };
    BadgePage.prototype.initProgress = function (lvl) {
        var conf = GameConfig.badge[lvl];
        var jLvl = conf ? conf.classLevel : 0;
        var tar = conf ? conf.starLevel : 0;
        for (var i = 0; i < 8; i++) {
            this["item_" + i].source = i <= tar - 1 ? "badge_json.badge_item_sele_png" : "badge_json.badge_item_unsele_png";
        }
        this.icon.source = RES_DIR_BADGE + jLvl + ".png";
        this.lNum.value = jLvl + "j";
        this.title.source = RES_DIR_BADGE + "n" + jLvl + ".png";
    };
    BadgePage.prototype.upGradeFunc = function () {
        var passLvl = GameCache.hero.mainPro.pro(PropId.AP_CHKPOINT_LV);
        var badgeLvl = GameCache.hero.mainPro.pro(PropId.AP_BADGE_LVL); // 当前徽章等级
        // this.showEff();
        // let badgeLvl = 1;
        var conf = GameConfig.badge[badgeLvl + 1];
        if (conf && conf.Checkpoint) {
            if (passLvl > conf.Checkpoint) {
                Proxy.badge.sendBadgeUpGrade();
            }
            else {
                GlobalFun.SysMsg(Language.lang.badgeNotEnough);
            }
        }
        else {
            GlobalFun.SysMsg(Language.lang.badgeMaxLvl);
        }
    };
    BadgePage.prototype.redShow = function () {
        App.ViewManager.showRedPoint(this.btn0, GameCache.badge.checkGrade());
    };
    BadgePage.prototype.showEff = function () {
        var badgeLvl = GameCache.hero.mainPro.pro(PropId.AP_BADGE_LVL); // 当前徽章等级
        var conf = GameConfig.badge[badgeLvl];
        var tar = conf ? conf.starLevel : 1;
        // let tar = Math.floor(Math.random() * 9) + 1;
        var item = this["item_" + (tar - 1)];
        var mc = App.DisplayUtils.addEffectToObj(this.itemGroup, "point2_0_1", 1, item.x + 30, item.y + 30);
    };
    return BadgePage;
}(BaseSpriteView));
__reflect(BadgePage.prototype, "BadgePage");
//# sourceMappingURL=BadgePage.js.map