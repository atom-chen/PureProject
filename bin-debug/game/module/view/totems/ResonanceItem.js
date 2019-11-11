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
 * @Description: 共鸣条目
 * @Author: xiejunwei
 * @Date: 2019-08-27 14:33:30
 * @LastEditTime: 2019-10-24 13:58:26
 */
var ResonanceItem = (function (_super) {
    __extends(ResonanceItem, _super);
    function ResonanceItem() {
        return _super.call(this) || this;
    }
    ResonanceItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addTouchEvent(this.upBtn, this.upGradeFunc);
    };
    ResonanceItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (!this.data)
            return;
        this.initData();
    };
    ResonanceItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    ResonanceItem.prototype.initData = function () {
        var id = this.data;
        var tlvl = GameCache.totems.resonanceData[id] ? GameCache.totems.resonanceData[id] : 0;
        var conf = GameConfig.resonance[id][tlvl];
        this.skillName.text = StringUtils.substitute(Language.lang.resonanSkillName, conf.skillName, tlvl);
        this.desc.textFlow = TextFlowUtils.generateTextFlow(conf.desc);
        var totemsData = GameCache.totems.totemsData[conf.number[0]];
        var minLvl = totemsData ? totemsData.jie : 0;
        var acti = true;
        for (var i = 0; i < conf.number.length; i++) {
            var type = conf.number[i];
            this["item_" + i].data = type;
            var td = GameCache.totems.totemsData[type];
            var lvl = td ? td.jie : 0;
            if (!td || td.id == 1)
                acti = false; // 存在图腾未激活
            minLvl = minLvl > lvl ? lvl : minLvl;
        }
        this.upBtn.icon = tlvl > 0 ? "res/btn/promote_2.png" : "res/btn/activate_1.png";
        this.upBtn.visible = acti && (minLvl >= conf.classLvl || conf.classLvl == 0);
        this.unacti.visible = !acti;
    };
    ResonanceItem.prototype.upGradeFunc = function () {
        var id = this.data;
        if (typeof (id) == "string")
            id = parseInt(id);
        Proxy.totems.sendResonanceUpGrade(id);
    };
    return ResonanceItem;
}(BaseCustComponent));
__reflect(ResonanceItem.prototype, "ResonanceItem");
//# sourceMappingURL=ResonanceItem.js.map