/*
 * @Description: 排行榜item内容
 * @Author: liangzhaowei
 * @Date: 2019-08-01 17:38:18
 * @LastEditTime: 2019-10-17 15:19:48
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
var RankViewItem = (function (_super) {
    __extends(RankViewItem, _super);
    function RankViewItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "RankViewItemSkin";
        return _this;
    }
    RankViewItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addTouchEvent(this, this.onClick);
    };
    RankViewItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        var data = this.data;
        if (data.wid) {
            this.lbNe.text = data.name;
            this.rankValue.value = data.rankValue;
            this.imgVip.source = "zjm_json.zjm_vip_" + data.vipLv + "_png";
            this.setRankNum(this.imgRank, this.rankNum, data.rank, this.rankRe);
            this.imgDes.source = "rank_json.rank_des_" + data.rankType + "_png";
        }
        this.bg.source = (this.itemIndex % 2) == 1 ? "public_json.public_rect_9_png" : "public_json.public_rect_11_png";
    };
    RankViewItem.prototype.setRankNum = function (imgRank, lbRank, num, imgBg) {
        var strImg = ["public_json.public_rank_1_png", "public_json.public_rank_2_png", "public_json.public_rank_3_png"];
        imgRank.visible = num < 4;
        if (strImg[num - 1]) {
            imgRank.source = strImg[num - 1];
        }
        lbRank.visible = num >= 4;
        lbRank.value = num;
        if (num >= 4) {
            imgBg.source = null;
        }
        else {
            imgBg.source = "rank_json.rank_rect_" + num + "_png";
        }
    };
    RankViewItem.prototype.onClick = function (e) {
        var data = this.data;
        if (data) {
            Proxy.rank.askRoleInfo(data.wid);
        }
    };
    return RankViewItem;
}(BaseCustComponent));
__reflect(RankViewItem.prototype, "RankViewItem");
//# sourceMappingURL=RankViewItem.js.map