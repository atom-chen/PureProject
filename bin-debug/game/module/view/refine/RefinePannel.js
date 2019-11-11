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
 * @Description: 精炼面板
 * @Author: xiejunwei
 * @Date: 2019-08-13 16:26:05
 * @LastEditTime: 2019-10-31 21:12:38
 */
var RefinePannel = (function (_super) {
    __extends(RefinePannel, _super);
    function RefinePannel($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.seleIdx = 0;
        _this.skinName = "RefinePannelSkin";
        return _this;
    }
    RefinePannel.prototype.init = function () {
        _super.prototype.init.call(this);
        this.initPartName();
        // let hander = Handler.create(this, this.onCLick, [], false);
        // this.roleSelect.handler = hander;
        this.roleSelect.setHandler(this, this.onCLick);
        this.num.gap = 14;
        this.num.alignV = "mid";
        this.num.alignH = "center";
    };
    RefinePannel.red = function () {
        return GameCache.strength.checkRefineGrade();
    };
    RefinePannel.prototype.roleRed = function (roleId) {
        return GameCache.strength.checkRefineGrade(roleId);
    };
    RefinePannel.changeMsg = function () {
        return [MsgConst.EQUIP_REFINE, MsgConst.NEW_HERO];
    };
    RefinePannel.prototype.refreshRed = function () {
        _super.prototype.refreshRed.call(this);
        this.redShow();
    };
    RefinePannel.prototype.open = function (param) {
        this.message(MsgConst.EQUIP_REFINE, this.initData);
        this.message(MsgConst.EQUIP_REFINE, this.initZDL);
        this.message(MsgConst.EQUIP_REFINE, this.showEff);
        this.cost_0.cleanMsg();
        this.addTouchEvent(this.sGroup, this.onItemTouch);
        this.addTouchEvent(this.btn, this.refineFunc);
        this.addTouchEvent(this.mBtn, this.openMaster);
        this.onCLick();
    };
    RefinePannel.prototype.onCLick = function () {
        var eqData = GameCache.hero.getDataByIndex(this.roleSelect.nSlRole, GameCache.equip.roleEquipList);
        this.initEquipItem(eqData);
        this.autoSele();
        this.initZDL();
    };
    RefinePannel.prototype.initPartName = function () {
        for (var i = 0; i < 10; i++) {
            var eqItem = this["item_" + i];
            eqItem.partSource = "strength_json.strength_text_part" + i + "_png";
        }
    };
    RefinePannel.prototype.initEquipItem = function (eqData) {
        if (!eqData)
            eqData = [];
        for (var i = 0; i < 10; i++) {
            var uItem = eqData[i];
            var list = GameCache.hero.getDataByIndex(this.roleSelect.nSlRole, GameCache.equip.roleRefineList);
            var lvl = list && uItem && list[uItem.stdItem.part] ? list[uItem.stdItem.part] : 0;
            var eqItem = this["item_" + i];
            eqItem.color.visible = false;
            if (!uItem) {
                eqItem.reSet();
            }
            else {
                eqItem.data = uItem;
                eqItem.setHandler(this, this.openItemTips, [uItem]);
            }
            eqItem.strengthLvl = [lvl];
            eqItem.setIconImg("strength_json.strength_part" + i + "_png");
        }
    };
    RefinePannel.prototype.autoSele = function () {
        var minIdx = 0;
        var count = 0;
        var lvl = 0;
        this["item_" + this.seleIdx].select = false;
        for (var i = 0; i < 10; i++) {
            var eqItem = this["item_" + i];
            if (eqItem.data) {
                if (count == 0) {
                    lvl = eqItem.strenghLvl;
                    minIdx = i;
                    count++;
                    continue;
                }
                else {
                    if (eqItem.strenghLvl < lvl) {
                        lvl = eqItem.strenghLvl;
                        minIdx = i;
                        count++;
                        continue;
                    }
                }
            }
        }
        this.seleIdx = minIdx;
        this["item_" + minIdx].select = true;
        this.seleImg.source = "strength_json.strength_part" + this.seleIdx + "_png";
        this.initData();
    };
    RefinePannel.prototype.onItemTouch = function (e) {
        var tar = e ? parseInt(e.target.name) : this.seleIdx;
        this["item_" + this.seleIdx].select = false;
        this["item_" + tar].select = true;
        this.seleIdx = tar;
        this.seleImg.source = "strength_json.strength_part" + this.seleIdx + "_png";
        this.initData();
    };
    RefinePannel.prototype.initData = function () {
        var roleId = this.roleSelect.roleId;
        var list = GameCache.equip.roleRefineList[roleId];
        var eqItem = this["item_" + this.seleIdx];
        var lvl = 0;
        if (eqItem.data && list) {
            lvl = list[this.seleIdx];
            eqItem.strengthLvl = [lvl];
        }
        var conf = GameConfig.refine["ReEquip"][lvl];
        var nextConf = GameConfig.refine["ReEquip"][lvl + 1];
        // let cur = eqItem.data ? eqItem.data.stdItem.staitcAttrs : null;
        var plus1 = conf["part" + this.seleIdx];
        var plus2 = nextConf ? nextConf["part" + this.seleIdx] : null;
        // let prop_0 = GlobalFun.ObjPlusOrMinus(cur, plus1);
        // let prop_1 = GlobalFun.ObjPlusOrMinus(cur, plus2);
        var costConfig = GameConfig.strengthCost[lvl + 1];
        this.cost_0.visible = this.cost_1.visible = costConfig ? true : false;
        if (costConfig) {
            this.cost_0.setData(costConfig.reconsume[0].id, costConfig.reconsume[0].count);
            this.cost_1.setData(costConfig.reconsume[1].id, costConfig.reconsume[1].count);
        }
        this.propList.setData(plus1, plus2, this.roleSelect.job, 0xffc600, 0xffffff, 0x00ff0c, [], "PropItem2Skin");
    };
    RefinePannel.prototype.openItemTips = function (arg) {
        // let uItem: UserItem = arg;
        // let viewProp = new ViewProp();
        // let roleId = this.roleSelect.roleId + "";
        // let list = GameCache.equip.roleRefineList[roleId];
        // let lvl = list && list[uItem.stdItem.part] ? list[uItem.stdItem.part] : 1;
        // let plus;
        // let conf = GameConfig.refine["ReEquip"][lvl];
        // if (conf) plus = conf[`part${uItem.stdItem.part}`];
        // viewProp.itemData = uItem.stdItem;
        // viewProp.exData1 = uItem;
        // viewProp.exData2 = plus;
        // App.ViewManager.open(ViewConst.ITEMTIPS, viewProp);
    };
    RefinePannel.prototype.refineFunc = function () {
        var eqItem = this["item_" + this.seleIdx];
        if (eqItem.data) {
            if (this.cost_1.checkEnough() && this.cost_0.checkEnough()) {
                if (eqItem.strenghLvl == GameCache.hero.mainPro.pro(PropId.AP_LEVEL)) {
                    GlobalFun.SysMsg(Language.lang.refineLvlMax);
                    return;
                }
                Proxy.equip.sendRefine(this.roleSelect.nSlRole, this.seleIdx);
            }
        }
        else {
            GlobalFun.SysMsg(Language.lang.refineHint);
        }
    };
    RefinePannel.prototype.openMaster = function () {
        var viewProp = new ViewProp();
        viewProp.exData1 = this.roleSelect.nSlRole;
        viewProp.exData2 = 2;
        App.ViewManager.open(ViewConst.STRENGTHMASTER, viewProp);
    };
    RefinePannel.prototype.initZDL = function () {
        var roleId = this.roleSelect.roleId + "";
        var list = GameCache.equip.roleRefineList[roleId];
        var val = 0;
        if (list) {
            for (var i = 0; i < 10; i++) {
                var lvl = list[i];
                if (lvl == 0)
                    continue;
                var conf = GameConfig.refine["ReEquip"][lvl];
                val += ItemUtils.getZdlByProp(conf["part" + i]);
            }
            this.zdl.value = "+" + val;
        }
        else {
            this.zdl.value = 0;
        }
        var mLvl = list ? GlobalFun.Min(list)[0] : 0;
        var mConf = GameConfig.refine["ReMaster"];
        for (var i in mConf) {
            if (mConf[i].level > mLvl) {
                this.mPro.text = mLvl + "/" + mConf[i].level;
                break;
            }
            this.num.value = i;
        }
    };
    RefinePannel.prototype.showEff = function () {
        this.mc = App.DisplayUtils.addEffectToObj(this, "jinglian_cg_0_1", 1, 270, 380);
        // if (!this.mc) {
        //     let hand = Handler.create(this, this.hideEff, [], true);
        //     this.mc = App.DisplayUtils.addEffectToObj(this, "jinglian_cg_0_1", 1, 270, 380,hand);
        // }
        // this.mc.play(1);
        // this.mc.visible = true;
    };
    // private hideEff() {
    //     if (this.mc) {
    //         this.mc = null;
    //     }
    // }
    RefinePannel.prototype.redShow = function () {
        App.ViewManager.showRedPoint(this.btn, GameCache.strength.checkRefineGrade(this.roleSelect.roleId, this.seleIdx));
        for (var i = 0; i < 10; i++) {
            var eqItem = this["item_" + i];
            App.ViewManager.showRedPoint(eqItem, GameCache.strength.checkRefineGrade(this.roleSelect.roleId, i));
        }
    };
    return RefinePannel;
}(BaseSpriteView));
__reflect(RefinePannel.prototype, "RefinePannel");
//# sourceMappingURL=RefinePannel.js.map