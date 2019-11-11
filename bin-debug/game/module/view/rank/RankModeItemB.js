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
 * @Description: 通用排行榜条目
 * @Author: xiejunwei
 * @Date: 2019-10-17 18:01:22
 */
var RankModeItemB = (function (_super) {
    __extends(RankModeItemB, _super);
    function RankModeItemB() {
        return _super.call(this) || this;
    }
    RankModeItemB.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    RankModeItemB.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (!this.data.rank) {
            return;
        }
        this.bg.source = this.itemIndex % 2 == 0 ? "public_json.public_rect_11_png" : "public_json.public_rect_9_png";
        this.imgRank.visible = this.data.rank < 4;
        this.rankNum.visible = !this.imgRank.visible;
        if (this.imgRank.visible) {
            this.imgRank.source = "public_json.public_rank_" + this.data.rank + "_png";
        }
        else {
            this.rankNum.text = this.data.rank + "";
        }
        this.rName.text = this.data.roleName;
        this.value_0.text = this.data.value;
        this.zdl.text = this.data.zdl;
    };
    RankModeItemB.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return RankModeItemB;
}(BaseCustComponent));
__reflect(RankModeItemB.prototype, "RankModeItemB");
//# sourceMappingURL=RankModeItemB.js.map