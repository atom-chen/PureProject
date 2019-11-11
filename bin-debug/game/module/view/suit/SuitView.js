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
    author:lzw
    date:2019/7/24 16:10
    explain:套装内容
*/
var SuitView = (function (_super) {
    __extends(SuitView, _super);
    function SuitView($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.nSlRole = 0; //当前选择角色
        _this.listSuitInfo = []; //套装兑换列表数据
        _this.skinName = "SuitViewSkin";
        return _this;
    }
    //初始化
    SuitView.prototype.init = function () {
        this.list.itemRenderer = SuitItem;
        this.roleSelect.setHandler(this, this.roleClick);
        this.imgItem.source = GlobalFun.getItemSourceById(GameCache.suit.nResolveId);
    };
    /**模块红点函数 不需要计算的写在前面 */
    SuitView.red = function () {
        if (!GameCache.suit) {
            return false;
        }
        if (GameCache.suit.sortResolveList().length > 0) {
            return true;
        }
        for (var index in GameCache.hero.list) {
            var roleData = GameCache.hero.list[index];
            if (GameCache.suit.suitPropertyList(roleData.id)) {
                return true;
            }
            if (GameCache.suit.suitChangeListRed(roleData.pro.job, roleData.id)) {
                return true;
            }
        }
        return false;
    };
    /** roleId 为角色id*/
    SuitView.prototype.roleRed = function (roleId) {
        if (GameCache.suit.suitPropertyList(roleId)) {
            return true;
        }
        if (GameCache.suit.suitChangeListRed(GameCache.hero.getJobByRoleId(roleId), roleId)) {
            return true;
        }
        return false;
    };
    /**需要刷新是红点消息列表 */
    SuitView.changeMsg = function () {
        return [MsgConst.SUIT_CHANGE, MsgConst.SUIT_RESOLVE, MsgConst.SUIT_INFO];
    };
    /**界面内循环刷新红点函数 */
    SuitView.prototype.refreshRed = function () {
        _super.prototype.refreshRed.call(this);
        if (!GameCache.suit) {
            return;
        }
        App.ViewManager.showRedPoint(this.gResolve, GameCache.suit.sortResolveRed());
        App.ViewManager.showRedPoint(this.gProperty, GameCache.suit.suitPropertyList(this.roleSelect.roleId));
    };
    SuitView.prototype.open = function (param) {
        if (param === void 0) { param = null; }
        this.addTouchEvent(this.imgProperty, this.onClick);
        this.addTouchEvent(this.imgResolve, this.onClick);
        // this.addItemClick(this.list, this.itemClick);
        this.message(MsgConst.BAG_ITEM_NUM + GameCache.suit.nResolveId, this.updateHaveItem);
        this.message(MsgConst.SUIT_CHANGE, this.upList);
        this.message(MsgConst.EQUIP_INFO, this.upList);
        this.upList();
        this.updateHaveItem();
    };
    /**更新列表内容 */
    SuitView.prototype.upList = function () {
        this.listSuitInfo = GameCache.suit.suitChangeList(this.roleSelect.job, this.roleSelect.serverId, this.roleSelect.roleId);
        this.setListData(this.list, this.listSuitInfo);
    };
    SuitView.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.imgProperty:
                var param = new ViewProp();
                param.exData1 = this.roleSelect.serverId;
                param.exData2 = this.roleSelect.roleId;
                App.ViewManager.open(ViewConst.SUITPROPERTY, param);
                break;
            case this.imgResolve:
                /**后端需要主角色id寻找数据 */
                var param1 = new ViewProp();
                param1.exData1 = GameCache.hero.getServerIdByIndex(0);
                App.ViewManager.open(ViewConst.SUITRESOLVE, param1);
                break;
            default:
                break;
        }
    };
    /**更新拥有物品 */
    SuitView.prototype.updateHaveItem = function () {
        this.lbNum.text = GameCache.bag.itemCount(GameCache.suit.nResolveId) + "";
        this.upList();
    };
    /**角色选择回调 */
    SuitView.prototype.roleClick = function (param) {
        this.nSlRole = param;
        this.upList();
    };
    return SuitView;
}(BaseSpriteView));
__reflect(SuitView.prototype, "SuitView");
//# sourceMappingURL=SuitView.js.map