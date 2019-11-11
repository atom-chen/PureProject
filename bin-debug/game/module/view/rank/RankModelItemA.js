/*
 * @Description: 排行榜item内容
 * @Author: liangzhaowei
 * @Date: 2019-08-01 17:38:18
 * @LastEditTime: 2019-08-23 14:17:18
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
var RankModelItemA = (function (_super) {
    __extends(RankModelItemA, _super);
    function RankModelItemA() {
        var _this = _super.call(this) || this;
        _this.skinName = "RankModelItemASkin";
        return _this;
    }
    RankModelItemA.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    RankModelItemA.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.data.layer) {
            this.lbNe.text = this.data.name;
            this.lbLv.text = StringUtils.substitute(Language.lang.lcn5, this.data.layer);
        }
        this.setRankNum(this.imgRank, this.lbRank, this.itemIndex + 1);
    };
    RankModelItemA.prototype.setRankNum = function (imgRank, lbRank, num) {
        var strImg = ["rank_json.rank_nb_1_png", "rank_json.rank_nb_2_png", "rank_json.rank_nb_3_png"];
        imgRank.visible = num < 4;
        if (strImg[num - 1]) {
            imgRank.source = strImg[num - 1];
        }
        lbRank.visible = num >= 4;
        lbRank.text = num + "";
    };
    return RankModelItemA;
}(BaseCustComponent));
__reflect(RankModelItemA.prototype, "RankModelItemA");
//# sourceMappingURL=RankModelItemA.js.map