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
 * @Description: 宝石替换TIPS
 * @Author: xiejunwei
 * @Date: 2019-09-10 22:21:08
 * @LastEditTime: 2019-10-25 16:18:38
 */
var JewelReplaceTips = (function (_super) {
    __extends(JewelReplaceTips, _super);
    function JewelReplaceTips() {
        var _this = _super.call(this, LayerManager.UI_Tips) || this;
        _this.skinName = "JewelRepalceTipsSkin";
        return _this;
    }
    JewelReplaceTips.prototype.init = function () {
        _super.prototype.init.call(this);
        this.itemList.itemRenderer = JewelReplaceItem;
        this.setWinTitle("jewel");
    };
    JewelReplaceTips.prototype.open = function (param) {
        _super.prototype.open.call(this);
        this.message(MsgConst.JEWEL_LIST, this.initList);
        this.curPart = param.exData1; //选择孔位
        this.roleIdx = param.exData2; //角色下标
        this.initList();
    };
    JewelReplaceTips.prototype.initList = function () {
        var roleId = GameCache.hero.getRoleIdByIndex(this.roleIdx);
        var jewBag = GameCache.jewel.jewelBag;
        var jewList = GameCache.jewel.roleJewelList[roleId];
        jewList = jewList ? jewList : {};
        var gem = jewList[this.curPart];
        var gemItem = gem ? GameConfig.jewel[gem.id] : null;
        if (gem) {
            var dItem = GameConfig.item[gem.id];
            var po = ItemUtils.getItemZDL(dItem);
            this.currentState = "sp";
            this["cur"] && (this["cur"].data = { item: dItem, curType: -1, lvl: gem.lvl, power: po });
        }
        else {
            this.currentState = "nor";
        }
        var listData = [];
        var havedType = []; //已装备类型
        var havedData = [];
        for (var i in jewList) {
            var item = GameConfig.jewel[jewList[i].id];
            havedType.push(item.part);
        }
        for (var i in jewBag) {
            var have = havedType.indexOf(parseInt(i)) != -1;
            for (var j in jewBag[i]) {
                if (!jewBag[i][j][0])
                    continue;
                var item = GameConfig.item[jewBag[i][j][0]];
                var gemConf = GameConfig.jewel[item.id];
                var power = ItemUtils.getZdlByProp(item.staitcAttrs);
                var obj = {
                    id: jewBag[i][j][0],
                    item: item,
                    curType: gemItem ? gemItem.part : 0,
                    lvl: 1,
                    roleIdx: this.roleIdx,
                    part: this.curPart,
                    have: have,
                    power: power
                };
                if (!have || (gemItem && gemItem.part == gemConf.part))
                    listData.push(obj);
                else
                    havedData.push(obj);
            }
        }
        listData = listData.sort(this.sortFunc);
        listData = listData.concat(havedData);
        this.setListData(this.itemList, listData);
    };
    JewelReplaceTips.prototype.sortFunc = function (a, b) {
        return a.power > b.power ? -1 : 1;
    };
    return JewelReplaceTips;
}(BaseEuiWindow));
__reflect(JewelReplaceTips.prototype, "JewelReplaceTips");
//# sourceMappingURL=JewelReplaceTips.js.map