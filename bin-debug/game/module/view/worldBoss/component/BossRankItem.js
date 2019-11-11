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
 * @Description: BOSS排行条目
 * @Author: xiejunwei
 * @Date: 2019-09-23 19:06:26
 */
var BossRankItem = (function (_super) {
    __extends(BossRankItem, _super);
    function BossRankItem() {
        return _super.call(this) || this;
    }
    BossRankItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    BossRankItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (!this.data || !this.data.bossid) {
            this.cleanFunc();
            return;
        }
        ;
        this.rName.text = this.data.roleName;
        this.value.text = GlobalFun.numCut(this.data.value);
        this.rNum.visible = this.data.rank > 3 || this.data.rank < 0;
        this.rImg.visible = !this.rNum.visible;
        this.rNum.text = this.data.rank <= 0 ? Language.lang.jingji_t8 : this.data.rank + "";
        if (this.rImg.visible) {
            this.rImg.source = "public_json.public_rank_" + this.data.rank + "_png";
        }
        else {
            this.rImg.source = null;
        }
    };
    BossRankItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    BossRankItem.prototype.cleanFunc = function () {
        this.rNum.text = this.rName.text = this.value.text = "";
        this.rImg.source = null;
    };
    return BossRankItem;
}(BaseCustComponent));
__reflect(BossRankItem.prototype, "BossRankItem");
//# sourceMappingURL=BossRankItem.js.map