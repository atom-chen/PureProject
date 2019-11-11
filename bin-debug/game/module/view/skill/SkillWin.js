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
 * create by junwei on 06/26/2019
 * 技能窗口
 */
var SkillWin = (function (_super) {
    __extends(SkillWin, _super);
    function SkillWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "SkillWinSkin";
        return _this;
    }
    SkillWin.prototype.initUI = function () {
        _super.prototype.init.call(this);
    };
    SkillWin.prototype.open = function (param) {
        this.itemList.itemRenderer = SkillItem;
        var conf = GameConfig.skill;
        var skillArr = [];
        for (var i in conf) {
            var item = {
                id: conf[i].id,
                sId1: conf[i].skilleff1,
                sId2: conf[i].skilleff2,
                name: conf[i].name,
                desc: conf[i].desc
            };
            skillArr.push(item);
        }
        this.setListData(this.itemList, skillArr);
    };
    return SkillWin;
}(BaseEuiWindow));
__reflect(SkillWin.prototype, "SkillWin");
//# sourceMappingURL=SkillWin.js.map