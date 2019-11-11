/*
 * @Description: 排行榜内容
 * @Author: liangzhaowei
 * @Date: 2019-09-25 11:32:52
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
var RankPannel = (function (_super) {
    __extends(RankPannel, _super);
    function RankPannel($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.rankListType = [];
        /**单个排行榜数据 */
        _this.rankType = 1;
        _this.skinName = "RankPannelSkin";
        return _this;
    }
    //初始化
    RankPannel.prototype.init = function () {
        this.listItem.itemRenderer = RankViewItem;
        var rankTypeIcon = [];
        for (var index in GameConfig.rank) {
            var rankData = GameConfig.rank[index];
            if (rankData.open) {
                this.rankListType.push(rankData.type);
                var obj = { icon2: "rank_json.rank_type_0_png", icon: "rank_json.rank_type_0_ud_png" };
                obj.icon = "rank_json.rank_type_" + rankData.type + "_ud_png";
                obj.icon2 = "rank_json.rank_type_" + rankData.type + "_png";
                rankTypeIcon.push(obj);
            }
        }
        this.tabBtn.dataProvider = new eui.ArrayCollection(rankTypeIcon);
        this.rankNum.gap = 15;
        this.rankValue.gap = 15;
        this.title = new ThingTitle();
        this.title.scaleX = 1.2;
        this.title.scaleY = 1.2;
        this.gNe.addChild(this.title);
    };
    RankPannel.prototype.open = function (param) {
        if (param === void 0) { param = null; }
        this.askRank();
        this.addTouchEvent(this.tabBtn, this.tabTouche);
        this.message(MsgConst.RANK_INFO, this.upCn);
    };
    RankPannel.prototype.askRank = function () {
        Proxy.rank.askRank(this.rankListType[this.tabBtn.selectedIndex]);
    };
    RankPannel.prototype.tabTouche = function () {
        if (this.rankType != this.tabBtn.selectedIndex) {
            this.askRank();
            this.upCn();
        }
    };
    /**更新内容 */
    RankPannel.prototype.upCn = function () {
        this.rankType = this.rankListType[this.tabBtn.selectedIndex];
        this.rankSigleData = GameCache.rank.rankData[this.rankType];
        if (!this.rankSigleData) {
            return;
        }
        /**排行榜数据 */
        this.setListData(this.listItem, this.rankSigleData.rankList, true);
        this.rankNum.value = this.rankSigleData.myRank;
        this.rankValue.value = this.rankSigleData.myValue;
        this.imgMore.visible = !this.rankSigleData.myRank;
        this.rankValue.visible = this.rankSigleData.myRank;
        this.imgDown.source = "rank_json.rank_down_" + this.rankSigleData.type + "_png";
        this.refreshRoleModel();
        /**显示名称 */
        if (this.rankSigleData.rankList && this.rankSigleData.rankList[0]) {
            var data = this.rankSigleData.rankList[0];
            this.title.setName(data.name);
            // this.title.setBadge(data.badgeLv);
        }
    };
    /**刷新模型内容 */
    RankPannel.prototype.refreshRoleModel = function () {
        if (this.rankSigleData && this.rankSigleData.firstRoleList) {
            for (var i = 0; i < 3; i++) {
                this["roleMdl" + i].visible = this.rankSigleData.firstRoleList[i];
                if (this.rankSigleData.firstRoleList[i]) {
                    this["roleMdl" + i].setData(this.rankSigleData.firstRoleList[i]);
                }
            }
        }
    };
    return RankPannel;
}(BaseSpriteView));
__reflect(RankPannel.prototype, "RankPannel");
//# sourceMappingURL=RankPannel.js.map