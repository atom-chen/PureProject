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
    date:2019/6/24 14:10
    explain:角色pannel内容
*/
var RolePannelEquip = (function (_super) {
    __extends(RolePannelEquip, _super);
    function RolePannelEquip($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.skinName = "RolePannelEquipSkin";
        return _this;
    }
    /**界面整个界面的红点 */
    RolePannelEquip.red = function () {
        return false;
    };
    /** roleId 为角色id*/
    RolePannelEquip.prototype.roleRed = function (roleId) {
        return GameCache.equip.roleRed[roleId] ? GameCache.equip.roleRed[roleId] : false;
    };
    /**需要刷新是红点消息列表 */
    RolePannelEquip.changeMsg = function () {
        return [];
    };
    //初始化
    RolePannelEquip.prototype.init = function () {
        /**初始化部位 */
        for (var index in this.gPart.$children) {
            var item = this.gPart.$children[index];
            item.setColorImg();
            item.setIconImg("role_json.role_part_" + item.name + "_png");
            item.setHandler(this, function (thisObj) {
                if (thisObj.itemData) {
                    var plusData = [];
                    if (thisObj.strenghLvl > 0) {
                        var plusProp = GameCache.strength.getStrengthProp(thisObj.strenghLvl, thisObj.itemData.part);
                        plusData.push(plusProp);
                    }
                    if (thisObj.refineLvl > 0) {
                        var plusProp2 = GameCache.strength.getRefineProp(thisObj.refineLvl, thisObj.itemData.part);
                        plusData.push(plusProp2);
                    }
                    GlobalFun.itemTips(thisObj.userItem || thisObj.itemData, plusData);
                }
            }, [item]);
        }
        this.roleSelect.setHandler(this, this.roleClick);
        this.title = new ThingTitle();
        this.title.scaleX = 1.2;
        this.title.scaleY = 1.2;
        this.gNe.addChild(this.title);
    };
    /**角色选择回调 */
    RolePannelEquip.prototype.roleClick = function (param) {
        this.upRolePart();
    };
    RolePannelEquip.prototype.open = function (param) {
        if (param === void 0) { param = null; }
        /**设置角色选择下标 */
        if (param && param.exData1) {
            this.roleSelect.setRoleIndex(param.exData1);
        }
        this.role.setData(GameCache.hero.list[this.roleSelect.nSlRole].pro);
        /**更新装备内容 */
        this.message(MsgConst.EQUIP_INFO, this.upRolePart);
        this.message(MsgConst.EQUIP_ATTR_CHANGE, this.updateModelEquip);
        this.message(MsgConst.BAG_ITEM_NUM, this.quickWearBtn);
        this.message(MsgConst.PROPERTY + PropId.AP_BATTLE_POWER, this.updatePower);
        this.addTouchEvent(this.i2, this.onOpenPro);
        this.addTouchEvent(this.imgTransfer, this.onTransfer);
        this.addTouchEvent(this.oneBtn, this.quickWear);
        /**显示名称 */
        var pro = GameCache.hero.mainPro;
        if (pro) {
            this.title.setName(pro.charName);
            this.title.setBadge(pro.pro(PropId.AP_BADGE_LVL));
        }
        this.upRolePart();
    };
    RolePannelEquip.prototype.updatePower = function () {
        this.zdl.value = this.roleSelect.selectPro.pro(PropId.AP_BATTLE_POWER);
    };
    /**更新角色部位 */
    RolePannelEquip.prototype.upRolePart = function () {
        this.quickWearBtn();
        //战力显示
        this.updatePower();
        var eqList = GameCache.hero.getDataByIndex(this.roleSelect.nSlRole, GameCache.equip.roleEquipList);
        var eqLvl = GameCache.hero.getDataByIndex(this.roleSelect.nSlRole, GameCache.equip.roleStrengthList);
        var rfLvl = GameCache.hero.getDataByIndex(this.roleSelect.nSlRole, GameCache.equip.roleRefineList);
        for (var index in this.gPart.$children) {
            var item = this.gPart.$children[index];
            var eq = eqList ? eqList[item.name] : null;
            if (eq) {
                if (eqLvl && eqLvl[eq.stdItem.part]) {
                    eq.btStrong = eqLvl[eq.stdItem.part];
                    eq.btRefine = rfLvl[eq.stdItem.part];
                    item.strengthLvl = [eqLvl[eq.stdItem.part]];
                    item.refineLvl = rfLvl[eq.stdItem.part];
                }
                item.data = eq;
            }
            else {
                item.strengthLvl = [0];
                item.refineLvl = 0;
                if (item.data) {
                    item.reSet();
                    item.setColorImg();
                    item.setIconImg("role_json.role_part_" + item.name + "_png");
                }
            }
        }
        var heroList = GameCache.hero.list;
        if (heroList[this.roleSelect.nSlRole] && heroList[this.roleSelect.nSlRole].pro) {
            this.role.setData(heroList[this.roleSelect.nSlRole].pro);
        }
    };
    RolePannelEquip.prototype.onOpenPro = function () {
        var param = new ViewProp();
        param.exData1 = this.roleSelect.selectPro;
        App.ViewManager.open(ViewConst.ROLEPROTIPS, param);
    };
    /**更新模型装备 */
    RolePannelEquip.prototype.updateModelEquip = function () {
        this.role.refresh();
    };
    RolePannelEquip.prototype.quickWear = function () {
        GameCache.equip.quickWear(this.roleSelect.job);
    };
    /**转生跳转 */
    RolePannelEquip.prototype.onTransfer = function () {
        App.ViewManager.open(ViewConst.TRANSFER);
    };
    RolePannelEquip.prototype.quickWearBtn = function () {
        //检查是否有推荐装备
        var len = GameCache.bag.roleSuggestBag[this.roleSelect.job] ? Object.keys(GameCache.bag.roleSuggestBag[this.roleSelect.job]).length : 0;
        this.oneBtn.visible = len > 0;
    };
    return RolePannelEquip;
}(BaseSpriteView));
__reflect(RolePannelEquip.prototype, "RolePannelEquip");
//# sourceMappingURL=RolePannelEquip.js.map