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
 * 人物属性tips
 * 2019年7月24日 linsen
*/
var RoleProTipsView = (function (_super) {
    __extends(RoleProTipsView, _super);
    function RoleProTipsView() {
        var _this = _super.call(this) || this;
        _this.skinName = "RoleProTipsSkin";
        return _this;
    }
    RoleProTipsView.prototype.open = function (param) {
        _super.prototype.open.call(this, param);
        this.getProShow();
        var pro = param.exData1;
        var proCon = GameConfig.prop;
        for (var k in this.proShow) {
            var list = this.proShow[k];
            var proList = [];
            var i = 0;
            var a = list.length;
            for (; i < a; i++) {
                var type = parseInt(list[i]["id"]);
                var value = pro.pro(type);
                proCon[type] && (type = proCon[type]["toBuffId"]);
                var obj = {
                    type: type,
                    value: value
                };
                proList.push(obj);
            }
            this["pro" + k].setData(proList, [], pro.job);
        }
    };
    RoleProTipsView.prototype.getProShow = function () {
        if (!this.proShow) {
            var pro = this.proShow = {};
            var con = GameConfig.prop;
            for (var k in con) {
                var obj = con[k];
                if (obj["showPos"]) {
                    var index = Math.floor(obj["showPos"] / 10);
                    if (!pro[index])
                        pro[index] = [];
                    pro[index].push(obj);
                }
            }
            for (var i in pro) {
                pro[i].sort(this.sort);
            }
        }
    };
    RoleProTipsView.prototype.sort = function (p1, p2) {
        if (p1["showPos"] > p2["showPos"])
            return 1;
        if (p1["showPos"] < p2["showPos"])
            return -1;
        return 0;
    };
    return RoleProTipsView;
}(BaseEuiWindow));
__reflect(RoleProTipsView.prototype, "RoleProTipsView");
//# sourceMappingURL=RoleProTipsView.js.map