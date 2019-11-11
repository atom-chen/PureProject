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
 * @Description: 宝石面板
 * @Author: xiejunwei
 * @Date: 2019-09-09 14:33:54
 * @LastEditTime: 2019-11-01 15:41:09
 */
var JewelPage = (function (_super) {
    __extends(JewelPage, _super);
    function JewelPage($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.oldIndex = 0;
        _this.totalProp = [];
        _this.skinName = "JewelPageSkin";
        return _this;
    }
    JewelPage.prototype.init = function () {
        _super.prototype.init.call(this);
        this.roleSelect.setHandler(this, this.onCLick);
        // let hand = Handler.create(this, this.onCLick, [], false);
        // this.roleSelect.handler = hand;
        // (this.cost["stuffName"] as eui.Label).textColor = 0x472c25;
        // this.cost.numColor_0 = 0x472c25;
    };
    JewelPage.red = function () {
        return GameCache.jewel.checkJewelInsert() || GameCache.jewel.checkJewelUpGrade();
    };
    JewelPage.changeMsg = function () {
        return [MsgConst.JEWEL_LIST, MsgConst.NEW_HERO];
    };
    JewelPage.prototype.roleRed = function (roleId) {
        return GameCache.jewel.checkJewelInsert(roleId) || GameCache.jewel.checkJewelUpGrade(roleId);
    };
    JewelPage.prototype.refreshRed = function () {
        _super.prototype.refreshRed.call(this);
        this.redShow();
    };
    JewelPage.prototype.open = function (param) {
        this.message(MsgConst.JEWEL_LIST, this.initData);
        this.addTouchEvent(this.iG, this.onGroupTouche);
        this.addTouchEvent(this.btn_2, this.openReplaceTips);
        this.addTouchEvent(this.btn_0, this.openReplaceTips);
        this.addTouchEvent(this.btn_1, this.upGradeFunc);
        this.addTouchEvent(this.pBtn, this.openTotalProp);
        this.initData();
        this.onGroupTouche();
    };
    JewelPage.prototype.onCLick = function () {
        this.initData();
    };
    JewelPage.prototype.initData = function () {
        var jewelList = GameCache.jewel.roleJewelList[this.roleSelect.roleId]; //人物宝石类别
        jewelList = jewelList ? jewelList : {};
        var towerLvl = GameCache.copytower.copyTowerLayer;
        var condi = GameConfig.jewel[0].condition;
        var first = true;
        for (var i = 0; i < 8; i++) {
            var item = this["jItem_" + i];
            var result = GameCache.jewel.checkJewelInsert(this.roleSelect.roleId, i) || GameCache.jewel.checkJewelUpGrade(this.roleSelect.roleId, i);
            App.ViewManager.showRedPoint(item, result);
            item.seleted = false;
            if (condi[i] <= towerLvl) {
                item.data = jewelList[i];
            }
            else {
                item.stateJuge(condi[i], first);
                first = false;
            }
        }
        this.initZdl();
        this.onGroupTouche();
    };
    JewelPage.prototype.onGroupTouche = function (e) {
        var tar = e ? parseInt(e.target.name) : this.oldIndex;
        this["jItem_" + this.oldIndex].seleted = false;
        this["jItem_" + tar].seleted = true;
        this.oldIndex = tar;
        this.initItem();
        this.redShow();
    };
    JewelPage.prototype.initItem = function () {
        var jewelList = GameCache.jewel.roleJewelList[this.roleSelect.roleId]; //人物宝石类别
        jewelList = jewelList ? jewelList : {};
        var data = jewelList[this.oldIndex];
        if (data) {
            var gem = GameConfig.jewel[data.id];
            var curProp = GlobalFun.ObjPlusOrMinus(gem.attr, gem.lvlAttr, data.lvl);
            var nextProp = GlobalFun.ObjPlusOrMinus(gem.attr, gem.lvlAttr, data.lvl + 1);
            this.propList.visible = true;
            this.btn_0.visible = false;
            this.g2.visible = true;
            var count = gem.consume[0].count * (1 + data.lvl * gem.lvlConsume);
            this.cost.setData(gem.consume[0].id, count);
            this.propList.setData(curProp, nextProp, this.roleSelect.job, 0xffc600, 0xffffff, 0x00ff0c, [], "PropItem2Skin");
        }
        else {
            this.propList.visible = false;
            this.btn_0.visible = true;
            this.g2.visible = false;
        }
    };
    JewelPage.prototype.openReplaceTips = function () {
        var condi = GameConfig.jewel[0].condition[this.oldIndex];
        var lvl = GameCache.copytower.copyTowerLayer;
        if (lvl < condi) {
            GlobalFun.SysMsg("爬塔层数不足" + condi + "层");
            return;
        }
        var view = new ViewProp();
        view.exData1 = this.oldIndex;
        view.exData2 = this.roleSelect.nSlRole;
        App.ViewManager.open(ViewConst.JEWELREPLACE, view);
    };
    JewelPage.prototype.upGradeFunc = function () {
        if (this.cost.checkEnough()) {
            Proxy.jewel.sendUpGrade(this.roleSelect.nSlRole, this.oldIndex);
        }
    };
    JewelPage.prototype.initZdl = function () {
        var jewelList = GameCache.jewel.roleJewelList[this.roleSelect.roleId]; //人物宝石类别
        jewelList = jewelList ? jewelList : {};
        var prop = [];
        for (var i in jewelList) {
            var gem = GameConfig.jewel[jewelList[i].id];
            var lvl = jewelList[i].lvl;
            var curProp = GlobalFun.ObjPlusOrMinus(gem.attr, gem.lvlAttr, lvl);
            prop = GlobalFun.ObjPlusOrMinus(prop, curProp);
        }
        this.totalProp = prop;
        this.zdl.value = ItemUtils.getZdlByProp(this.totalProp);
    };
    JewelPage.prototype.openTotalProp = function () {
        var view = new ViewProp();
        view.firData = {};
        view.firData["src"] = "totems_json.totems_texture_0_png";
        view.firData["prop"] = this.totalProp;
        App.ViewManager.open(ViewConst.TOTALPROP, view);
    };
    JewelPage.prototype.redShow = function () {
        App.ViewManager.showRedPoint(this.btn_0, GameCache.jewel.checkJewelInsert(this.roleSelect.roleId, this.oldIndex));
        App.ViewManager.showRedPoint(this.btn_1, GameCache.jewel.checkJewelUpGrade(this.roleSelect.roleId, this.oldIndex));
        App.ViewManager.showRedPoint(this.btn_2, GameCache.jewel.checkJewelInsert(this.roleSelect.roleId, this.oldIndex));
    };
    return JewelPage;
}(BaseSpriteView));
__reflect(JewelPage.prototype, "JewelPage");
//# sourceMappingURL=JewelPage.js.map