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
 * @Description: 竞技场排行榜
 * @Author: xiejunwei
 * @Date: 2019-09-04 20:51:21
 * @LastEditTime: 2019-09-06 15:09:22
 */
var JingjiRankTips = (function (_super) {
    __extends(JingjiRankTips, _super);
    function JingjiRankTips() {
        var _this = _super.call(this, LayerManager.UI_Tips) || this;
        _this.skinName = "JingjiRankTipsSkin";
        return _this;
    }
    JingjiRankTips.prototype.init = function () {
        _super.prototype.init.call(this);
        this.itemList.itemRenderer = JingjiRankItem;
        this.bg.setNameImg("rank");
    };
    JingjiRankTips.prototype.open = function (param) {
        _super.prototype.open.call(this);
        this.message(MsgConst.JINGJI_RANK, this.initList);
        this.t0.textFlow = TextFlowUtils.generateTextFlow(Language.lang.jingji_t6);
        Proxy.other.sendPointRank(10);
    };
    JingjiRankTips.prototype.initList = function (arr) {
        if (arr === void 0) { arr = []; }
        this.setListData(this.itemList, arr);
    };
    return JingjiRankTips;
}(BaseEuiWindow));
__reflect(JingjiRankTips.prototype, "JingjiRankTips");
//# sourceMappingURL=JingjiRankTips.js.map