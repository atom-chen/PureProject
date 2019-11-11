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
/**
 * effect: 套装详情窗口
 * author :lzw
 * data :2019.7.24
 */
var SuitPropertyWin = (function (_super) {
    __extends(SuitPropertyWin, _super);
    function SuitPropertyWin() {
        var _this = _super.call(this, LayerManager.UI_Tips) || this;
        _this.listData = []; //配表数据
        _this.skinName = "SuitPropertyWinSkin";
        return _this;
    }
    SuitPropertyWin.prototype.init = function () {
        _super.prototype.init.call(this);
        this.cfg = GameConfig.equipAddition;
        this.list.itemRenderer = SuitPropertyItem;
        this.setWinTitleHold("suit_json.suit_title_tzfx_png");
    };
    SuitPropertyWin.prototype.open = function (param) {
        _super.prototype.open.call(this);
        this.serverRoleId = param.exData1;
        this.roleId = param.exData2;
        this.message(MsgConst.SUIT_CHANGE, this.upList);
        this.message(MsgConst.SUIT_INFO, this.upCn);
        this.message(MsgConst.SUIT_INFO, this.upList);
        this.upList();
        Proxy.equip.sendQueryMyEquip();
        this.upCn();
    };
    SuitPropertyWin.prototype.upCn = function () {
        this.num.text = GameCache.suit.roleSuit[this.roleId] ? GameCache.suit.roleSuit[this.roleId].fight + "" : "0";
    };
    /**更新列表数据 */
    SuitPropertyWin.prototype.upList = function () {
        this.listData = [];
        for (var index in this.cfg) {
            var obj = CommonUtils.copyDataHandler(this.cfg[index]);
            obj.roleId = this.serverRoleId;
            var sortId = this.cfg[index].level;
            obj.sortId = sortId;
            var eqData = GameCache.equip.roleEquipList[this.roleId];
            obj.eqLv = 0;
            obj.fight = GameCache.suit.roleSuit[this.roleId].fight || 0;
            if (eqData) {
                for (var eqIndex in eqData) {
                    var eq = eqData[eqIndex];
                    if (eq && eq.stdItem && eq.stdItem.level && eq.stdItem.showQuality == 6) {
                        obj.eqLv = obj.eqLv + eq.stdItem.level;
                    }
                }
            }
            if (GameCache.suit.roleSuit[this.roleId] && GameCache.suit.roleSuit[this.roleId].lvList) {
                var passed = GameCache.suit.roleSuit[this.roleId].lvList.indexOf(obj.level);
                if (passed > -1) {
                    obj.sortId = obj.sortId + 1000;
                }
            }
            this.listData.push(obj);
        }
        /**根据战力影响排序 */
        this.listData.sort(this.sort);
        this.setListData(this.list, this.listData);
    };
    /**排序 */
    SuitPropertyWin.prototype.sort = function (a, b) {
        return a.sortId - b.sortId;
    };
    return SuitPropertyWin;
}(BaseEuiWindow));
__reflect(SuitPropertyWin.prototype, "SuitPropertyWin");
//# sourceMappingURL=SuitPropertyWin.js.map