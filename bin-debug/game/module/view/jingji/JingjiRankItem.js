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
 * @Description: 竞技场排行榜条目
 * @Author: xiejunwei
 * @Date: 2019-09-05 19:14:06
 * @LastEditTime: 2019-10-26 15:22:00
 */
var JingjiRankItem = (function (_super) {
    __extends(JingjiRankItem, _super);
    function JingjiRankItem() {
        return _super.call(this) || this;
    }
    JingjiRankItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    JingjiRankItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.data.rank) {
            this.initData();
        }
    };
    JingjiRankItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    JingjiRankItem.prototype.initData = function () {
        var conf = GameConfig.jingji[this.itemIndex];
        conf = conf ? conf : GameConfig.jingji["1"];
        this.item_0.data = conf.awardshow[0];
        this.item_1.data = conf.awardshow[1];
        this.item_2.data = conf.awardshow[2];
        this.mName.text = this.data.roleName;
        this.icon.source = GlobalFun.getRoleIcon(this.data.job); //RES_DIR_ROLE_ICON + "role_" + this.data.job + ".png";
        this.mLvl.text = this.data.lvl;
        if (this.data.rank <= 3) {
            this.rank.visible = false;
            this.rIcon.visible = true;
            this.rIcon.source = "jingji_json.jingji_medal_" + this.data.rank + "_png";
        }
        else {
            this.rank.visible = true;
            this.rIcon.visible = false;
            this.rank.value = this.data.rank;
        }
        var str = StringUtils.substitute(Language.lang.jingji_t7, this.data.winPoint);
        this.point.textFlow = TextFlowUtils.generateTextFlow(str);
    };
    return JingjiRankItem;
}(BaseCustComponent));
__reflect(JingjiRankItem.prototype, "JingjiRankItem");
//# sourceMappingURL=JingjiRankItem.js.map