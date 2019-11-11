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
 * @Description: 副本爬塔页签
 * @Author: liangzhaowei
 * @Date: 2019-08-01 19:32:56
 * @LastEditTime: 2019-10-26 13:54:50
 */
var CopyTowerPannel = (function (_super) {
    __extends(CopyTowerPannel, _super);
    function CopyTowerPannel($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        /**当前层级 */
        _this.nTower = 1;
        _this.skinName = "CopyTowerPannelSkin";
        return _this;
    }
    /**界面整个界面的红点 */
    CopyTowerPannel.red = function () {
        if (!GameCache.copytower.copyTowerData) {
            return false;
        }
        return GameCache.copytower.bGetDailyRw() || GameCache.copytower.copyTowerData.luckLeftTime > 0;
    };
    /**需要刷新是红点消息列表 */
    CopyTowerPannel.changeMsg = function () {
        return [MsgConst.CPOY_TOWER];
    };
    /**界面内循环刷新红点函数 */
    CopyTowerPannel.prototype.refreshRed = function () {
        _super.prototype.refreshRed.call(this);
        if (!GameCache.copytower.copyTowerData) {
            return;
        }
        App.ViewManager.showRedPoint(this.btnRw, GameCache.copytower.bGetDailyRw());
        App.ViewManager.showRedPoint(this.btnLuck, GameCache.copytower.copyTowerData.luckLeftTime > 0);
    };
    CopyTowerPannel.prototype.init = function () {
        this.list.itemRenderer = ItemBase;
    };
    CopyTowerPannel.prototype.open = function (param) {
        if (param === void 0) { param = null; }
        this.addTouchEvent(this.btnRw, this.onClick);
        this.addTouchEvent(this.btnLuck, this.onClick);
        this.addTouchEvent(this.btnClg, this.onClick);
        this.addTouchEvent(this.btnRank, this.onClick);
        this.message(MsgConst.CPOY_TOWER, this.upCn);
        this.message(MsgConst.CPOY_TOWER_RANK, this.upRank);
        Proxy.copytower.getRank(3);
        this.upCn();
    };
    /**更新内容 */
    CopyTowerPannel.prototype.upCn = function () {
        this.nTower = GameCache.copytower.copyTowerData ? GameCache.copytower.copyTowerData.layer + 1 : 1;
        this.stdMiwu = GameConfig.miwuTower[this.nTower];
        if (this.stdMiwu) {
            this.setListData(this.list, this.stdMiwu.awardshow);
            /**层级显示 */
            for (var i = 0; i < 4; i++) {
                var str = "";
                var showTower = this.nTower - 2 + i;
                if (showTower > 0) {
                    str = StringUtils.substitute(Language.lang.lcn3, showTower);
                }
                this["lb" + i].text = str;
            }
        }
        if (this.stdMiwu.specialShow && this.stdMiwu.specialShow[0]) {
            var rwData = this.stdMiwu.specialShow[0];
            this.rw.data = rwData;
            this.lbRwNe.text = GameConfig.item[rwData.id] ? GameConfig.item[rwData.id].name : "";
        }
    };
    /**更新排行榜数据 */
    CopyTowerPannel.prototype.upRank = function () {
        var rankList = GameCache.copytower.rankList;
        for (var index in rankList) {
            var rankData = rankList[index];
            if (this["lbNe" + index]) {
                this["lbNe" + index].text = rankData.name;
                this["lbLv" + index].text = StringUtils.substitute(Language.lang.lcn5, rankData.layer);
            }
        }
    };
    CopyTowerPannel.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.btnRw:
                var data = new ViewProp();
                data.exData1 = this.stdMiwu;
                App.ViewManager.open(ViewConst.COPYTOWERRW, data);
                break;
            case this.btnLuck:
                var getTime = GameCache.copytower.copyTowerData ? GameCache.copytower.copyTowerData.luckHaveTime : 1; //当前抽取奖励次数
                if (getTime < 1) {
                    getTime = 1;
                }
                var getIndex = Math.ceil(getTime / 10) * 10;
                var config = GameConfig.miwuTowerJackpot[getIndex];
                if (config && config.jackpot) {
                    var data1 = new ViewProp();
                    data1.exData1 = config.jackpot;
                    App.ViewManager.open(ViewConst.LUCKYDAIL, data1);
                }
                break;
            case this.btnClg:
                Proxy.copytower.gotoCopy();
                App.ViewManager.close(ViewConst.COPY);
                break;
            case this.btnRank:
                Proxy.copytower.getRank(30);
                App.ViewManager.open(ViewConst.RANKMODELWINA);
                break;
            default:
                break;
        }
    };
    return CopyTowerPannel;
}(CommunalPagePannel));
__reflect(CopyTowerPannel.prototype, "CopyTowerPannel");
//# sourceMappingURL=CopyTowerPannel.js.map