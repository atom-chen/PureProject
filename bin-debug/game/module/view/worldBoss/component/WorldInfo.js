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
 * @Description: 世界boss信息展示
 * @Author: xiejunwei
 * @Date: 2019-08-01 15:15:12
 * @LastEditTime: 2019-09-30 14:53:16
 */
var WorldInfo = (function (_super) {
    __extends(WorldInfo, _super);
    function WorldInfo() {
        var _this = _super.call(this, LayerManager.UI_Main) || this;
        _this.skinName = "WorldInfoSkin";
        _this.verticalCenter = 10;
        _this.horizontalCenter = 0;
        _this.left = 5;
        _this.right = 5;
        return _this;
    }
    WorldInfo.prototype.init = function () {
        _super.prototype.init.call(this);
        this.itemList.itemRenderer = BossRankItem;
    };
    WorldInfo.prototype.open = function () {
        InfoViewController.customBtn(this.btnGroup);
        // this.message(MsgConst.HERO_DIE, this.initRevive);
        this.mySelf.data = null;
        this.message(MsgConst.BOSS_RANK_INFO, this.initRank);
        this.addTouchEvent(this.btn_1, this.buyBuff);
        this.mySelf.rName.text = GameCache.hero.mainPro.charName;
        this.mySelf.value.text = "0";
    };
    WorldInfo.prototype.close = function () {
        _super.prototype.close.call(this);
        this.setListData(this.itemList, []);
        this.mySelf.data = null;
        GameCache.copy.buffBuy = [0, 0];
    };
    WorldInfo.prototype.initRevive = function () {
        // if (!this.rBtn.visible) this.rBtn.visible = true;
        // let roleList = GameCache.hero.list;
        // let autoOpen = true;
        // for (let i of roleList) {
        //     if (!i.isDie) autoOpen = false;
        // }
        // if (autoOpen) App.ViewManager.open(ViewConst.REVIVE);
    };
    WorldInfo.prototype.openRevive = function () {
        App.ViewManager.open(ViewConst.REVIVE);
    };
    WorldInfo.prototype.openStrength = function () {
        App.ViewManager.open(ViewConst.SHOPTIPS);
    };
    WorldInfo.prototype.buyBuff = function () {
        App.ViewManager.open(ViewConst.BUYBUFF);
    };
    WorldInfo.prototype.initRank = function (data) {
        this.setListData(this.itemList, data[0]);
        if (data[0]) {
            var obj = {
                bossid: data[0],
                rank: data[1],
                roleId: GameCache.hero.mainPro.pro(PropId.AP_ACTOR_ID),
                value: data[2],
                roleName: GameCache.hero.mainPro.charName
            };
            this.initMyself(obj);
        }
        else {
            this.initMyself(null);
        }
    };
    WorldInfo.prototype.initMyself = function (obj) {
        this.mySelf.data = obj;
    };
    return WorldInfo;
}(BaseEuiWindow));
__reflect(WorldInfo.prototype, "WorldInfo");
//# sourceMappingURL=WorldInfo.js.map