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
 * @Description: 符碑技能条目
 * @Author: xiejunwei
 * @Date: 2019-09-16 18:59:06
 */
var RuneSkillItem = (function (_super) {
    __extends(RuneSkillItem, _super);
    function RuneSkillItem() {
        var _this = _super.call(this) || this;
        _this._zdl = 0;
        return _this;
    }
    RuneSkillItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addTouchEvent(this.sIcon, this.openTips);
    };
    RuneSkillItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (!this.data.skillId)
            return;
        this.judgeState();
    };
    RuneSkillItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    RuneSkillItem.prototype.judgeState = function () {
        var conf = GameConfig.runeSkill[this.data.roleIdx + 1][this.data.skillId];
        if (!conf)
            return;
        this.sIcon.source = "rune_json.rune_skill_ico_" + this.data.job + "_" + conf.img + "_png";
        if (conf.conds > this.data.jLvl) {
            this.sIcon.filters = FilterUtils.DefaultGrayFilters;
            this.sName.filters = FilterUtils.DefaultGrayFilters;
            this.condi.text = StringUtils.substitute(Language.lang.openTxt, conf.conds);
        }
        else {
            this.sIcon.filters = null;
            this.sName.filters = null;
            this._zdl = ItemUtils.getZdlByProp(conf.attrs);
            this.condi.text = "";
        }
    };
    RuneSkillItem.prototype.openTips = function () {
        var view = new ViewProp();
        view.exData1 = [this.data.skillId, this.data.roleIdx];
        view.exData2 = this.data.jLvl;
        view.firData = this.data.job;
        App.ViewManager.open(ViewConst.RUNESKILL, view);
    };
    Object.defineProperty(RuneSkillItem.prototype, "zdl", {
        get: function () {
            return this._zdl;
        },
        enumerable: true,
        configurable: true
    });
    return RuneSkillItem;
}(BaseCustComponent));
__reflect(RuneSkillItem.prototype, "RuneSkillItem");
//# sourceMappingURL=RuneSkillItem.js.map