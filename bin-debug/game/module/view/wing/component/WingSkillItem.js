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
 * @Description: 翅膀技能条目
 * @Author: xiejunwei
 * @Date: 2019-08-19 19:09:26
 * @LastEditTime: 2019-10-30 14:13:24
 */
var WingSkillItem = (function (_super) {
    __extends(WingSkillItem, _super);
    function WingSkillItem() {
        var _this = _super.call(this) || this;
        _this._zdl = 0;
        _this.lvl = 0;
        return _this;
    }
    WingSkillItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addTouchEvent(this, this.openTips);
    };
    WingSkillItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
    };
    WingSkillItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    WingSkillItem.prototype.initData = function (conf, lvl) {
        this.skillIcon.source = "wing_json.wing_skill_" + conf.img + "_png";
        this.lvl = lvl;
        this.skillId = conf.id;
        var open = lvl >= conf.id;
        this.condi.text = open ? conf.name : StringUtils.substitute(Language.lang.openTxt, conf.id);
        if (!open && !this.filters) {
            this.filters = FilterUtils.DefaultGrayFilters;
        }
        if (open) {
            this.filters = null;
            this._zdl = ItemUtils.getZdlByProp(conf.att);
        }
    };
    Object.defineProperty(WingSkillItem.prototype, "zdl", {
        get: function () {
            return this._zdl;
        },
        enumerable: true,
        configurable: true
    });
    WingSkillItem.prototype.openTips = function () {
        var view = new ViewProp();
        view.exData1 = this.skillId;
        view.exData2 = this.lvl;
        App.ViewManager.open(ViewConst.WINGSKILL, view);
    };
    return WingSkillItem;
}(BaseCustComponent));
__reflect(WingSkillItem.prototype, "WingSkillItem");
//# sourceMappingURL=WingSkillItem.js.map