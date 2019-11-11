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
 * @Description: 通用排行榜
 * @Author: xiejunwei
 * @Date: 2019-10-17 18:01:13
 */
var RankModeWinB = (function (_super) {
    __extends(RankModeWinB, _super);
    function RankModeWinB() {
        var _this = _super.call(this, LayerManager.UI_Tips) || this;
        _this.skinName = "RankModelWinBSkin";
        return _this;
    }
    RankModeWinB.prototype.init = function () {
        _super.prototype.init.call(this);
        this.list.itemRenderer = RankModeItemB;
    };
    RankModeWinB.prototype.open = function (param) {
        _super.prototype.open.call(this);
        this.message(MsgConst.PASS_RANK_INFO, this.initRank);
        if (!param || !param.exData1)
            return;
        this.setWinTitle(param.exData1["title"]);
        this.initData(param.exData1["myRank"], param.exData1["myValue"], param.exData1["listData"]);
    };
    RankModeWinB.prototype.close = function (param) {
        _super.prototype.close.call(this);
    };
    RankModeWinB.prototype.initRank = function (arr, myRank, myValue) {
        this.initData(myRank, myValue, arr);
    };
    RankModeWinB.prototype.initData = function (myRank, myValue, listData) {
        if (myRank <= 0) {
            this.imgRank.visible = false;
            this.lbRank.textFlow = TextFlowUtils.generateTextFlow("<(c" + ColorUtil.C_RED + ")" + Language.lang.jingji_t4 + ">");
        }
        else {
            this.imgRank.visible = myRank < 4;
            this.lbRank.visible = !this.imgRank.visible;
            if (this.imgRank.visible)
                this.imgRank.source = "public_json.public_rank_" + myRank + "_png";
            this.lbRank.textFlow = TextFlowUtils.generateTextFlow("<(c" + ColorUtil.C_COFFEE + ")" + myRank + ">");
        }
        this.lbLv.text = myValue + "";
        this.setListData(this.list, listData);
    };
    return RankModeWinB;
}(BaseEuiWindow));
__reflect(RankModeWinB.prototype, "RankModeWinB");
//# sourceMappingURL=RankModeWinB.js.map