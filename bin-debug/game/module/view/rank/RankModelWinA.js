/*
 * @Description: 排行榜样式A
 * @Author: liangzhaowei
 * @Date: 2019-08-20 14:32:19
 * @LastEditTime: 2019-08-30 14:54:14
 */
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
var RankModelWinA = (function (_super) {
    __extends(RankModelWinA, _super);
    function RankModelWinA() {
        var _this = _super.call(this, LayerManager.UI_Tips) || this;
        _this.skinName = "RankModelWinASkin";
        return _this;
    }
    RankModelWinA.prototype.init = function () {
        _super.prototype.init.call(this);
        this.list.itemRenderer = RankModelItemA;
        this.setWinTitle("fogTower");
    };
    RankModelWinA.prototype.open = function (param) {
        _super.prototype.open.call(this);
        this.message(MsgConst.CPOY_TOWER_RANK, this.upList);
    };
    RankModelWinA.prototype.upList = function () {
        this.setListData(this.list, GameCache.copytower.rankList);
        this.setRankNum(this.imgRank, this.lbRank, GameCache.copytower.myRank);
        var str = "";
        if (GameCache.copytower.copyTowerData) {
            var layer = GameCache.copytower.copyTowerData.layer > 0 ? GameCache.copytower.copyTowerData.layer : 1;
            str = StringUtils.substitute(Language.lang.lcn5, GameCache.copytower.copyTowerData.layer);
        }
        this.lbLv.text = str;
    };
    RankModelWinA.prototype.setRankNum = function (imgRank, lbRank, num) {
        if (num > 0) {
            var strImg = ["rank_json.rank_nb_1_png", "rank_json.rank_nb_2_png", "rank_json.rank_nb_3_png"];
            imgRank.visible = num < 4;
            if (strImg[num - 1]) {
                imgRank.source = strImg[num - 1];
            }
            lbRank.visible = num >= 4;
            lbRank.text = num + "";
        }
        else {
            lbRank.text = Language.lang.lcn6;
            imgRank.visible = false;
        }
    };
    return RankModelWinA;
}(BaseEuiWindow));
__reflect(RankModelWinA.prototype, "RankModelWinA");
//# sourceMappingURL=RankModelWinA.js.map