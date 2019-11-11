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
/**
 * create by junwei on 07/25/2019
 * 强化大师窗口
 */
var StrengthMasterTips = (function (_super) {
    __extends(StrengthMasterTips, _super);
    function StrengthMasterTips() {
        var _this = _super.call(this, LayerManager.UI_Tips) || this;
        _this.skinName = "StrengthMasterTipsSkin";
        return _this;
    }
    StrengthMasterTips.prototype.init = function () {
    };
    StrengthMasterTips.prototype.open = function (param) {
        this.initData(param.exData1, param.exData2);
    };
    StrengthMasterTips.prototype.initData = function (role, type) {
        var lvlList;
        var conf;
        switch (type) {
            case 1:
                lvlList = GameCache.hero.getDataByIndex(role, GameCache.equip.roleStrengthList);
                conf = GameConfig.strengthProp["Master"];
                this.icon.source = "strength_json.strength_master_png";
                break;
            case 2:
                lvlList = GameCache.hero.getDataByIndex(role, GameCache.equip.roleRefineList);
                conf = GameConfig.refine["ReMaster"];
                this.icon.source = "strength_json.strength_refineMaster_png";
                break;
        }
        var totalLvl = 0;
        if (lvlList) {
            totalLvl = lvlList[lvlList.length - 1];
        }
        var curJie = Math.floor(totalLvl / 10);
        var nextLvl = curJie + 1;
        this.currentState = conf[nextLvl] ? "s1" : "s2";
        this.prop_0.setData(conf[curJie].attrs, [], 0, 0x826f76, 0x826f76, 0x826f76, ["+", ""]);
        this.zdl_0.text = "+" + ItemUtils.getZdlByProp(conf[curJie].attrs);
        if (conf[nextLvl]) {
            this.prop_1.setData(conf[nextLvl].attrs, [], 0, 0xffffff, 0xffffff, 0xffffff, ["+", ""]);
            this.zdl_1.text = "+" + ItemUtils.getZdlByProp(conf[nextLvl].attrs);
        }
        else {
            nextLvl = curJie;
        }
        for (var i in conf) {
            if (conf[i].level > totalLvl) {
                this.mPro.text = totalLvl + "/" + conf[i].level;
                break;
            }
            this.mLvl.text = StringUtils.substitute(Language.lang.jie, i);
            this.num.value = i;
        }
    };
    return StrengthMasterTips;
}(BaseEuiWindow));
__reflect(StrengthMasterTips.prototype, "StrengthMasterTips");
//# sourceMappingURL=StrengthMasterTips.js.map