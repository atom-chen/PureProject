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
// TypeScript file
var StrengthPannel = (function (_super) {
    __extends(StrengthPannel, _super);
    function StrengthPannel($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.curIdx = 0;
        _this.upDataEnable = true;
        _this.zValue = 1;
        _this.curLvl = 0;
        _this.skinName = "StrengthPannelSkin";
        return _this;
    }
    StrengthPannel.prototype.init = function () {
        _super.prototype.init.call(this);
        // let hander = Handler.create(this, this.onCLick, [], false);
        // this.roleSelect.handler = hander;
        this.roleSelect.setHandler(this, this.onCLick);
        this.initPartName();
        if (!this.mc2) {
            var mc = App.DisplayUtils.addEffectToObj(this, "chuizi_eff_0_1", -1, 266, 284);
            this.mc2 = mc;
        }
        this.mc2.play(-1);
        this.mc2.visible = true;
        this.num.gap = 14;
        // this.cost_0.lab.textColor = 0x3e1700;
        // this.cost_0.numColor_0 = 0x0cff00;
    };
    StrengthPannel.red = function () {
        return GameCache.strength.checkStrengthGrade();
    };
    StrengthPannel.prototype.roleRed = function (roleId) {
        return GameCache.strength.checkStrengthGrade(roleId);
    };
    StrengthPannel.changeMsg = function () {
        return [MsgConst.EQUIP_STRENGTH, MsgConst.NEW_HERO];
    };
    StrengthPannel.prototype.refreshRed = function () {
        _super.prototype.refreshRed.call(this);
        this.showRed();
    };
    StrengthPannel.prototype.open = function (viewProp) {
        this.onCLick();
        this.addTouchEvent(this.sBtn, this.strengthFunc);
        this.addTouchEvent(this.mBtn, this.openMaster);
        this.message(MsgConst.EQUIP_STRENGTH, this.setPlay);
    };
    StrengthPannel.prototype.onCLick = function () {
        var role = this.roleSelect.nSlRole;
        var eqData = GameCache.hero.getDataByIndex(role, GameCache.equip.roleEquipList);
        // if (!eqData) return;
        this.zdl.value = "+" + 0;
        App.TimerManager.removeAll(this);
        this.initEquipItem(eqData);
        this.initData();
        this.initZDL();
    };
    StrengthPannel.prototype.clsoe = function (ViewProp) {
        App.TimerManager.removeAll(this);
    };
    StrengthPannel.prototype.initPartName = function () {
        for (var i = 0; i < 10; i++) {
            var eqItem = this["item_" + i];
            eqItem.partSource = "strength_json.strength_text_part" + i + "_png";
            eqItem.touchEnabled = false;
        }
    };
    StrengthPannel.prototype.initEquipItem = function (eqData) {
        if (!eqData)
            eqData = [];
        this.upDataEnable = true;
        for (var i = 0; i < 10; i++) {
            var uItem = eqData[i];
            var roleId = this.roleSelect.roleId + "";
            var list = GameCache.equip.roleStrengthList[roleId];
            var lvl = list && list[i] ? list[i] : 0;
            var eqItem = this["item_" + i];
            eqItem.color.visible = false;
            if (!uItem) {
                this.upDataEnable = true;
                eqItem.reSet();
            }
            else {
                eqItem.data = uItem;
                // eqItem.strengthLvl = [10];
                eqItem.setHandler(this, this.openItemTips, [uItem]);
            }
            eqItem.strengthLvl = [lvl];
            eqItem.setIconImg("strength_json.strength_part" + i + "_png");
            eqItem.select = false;
        }
    };
    StrengthPannel.prototype.initData = function () {
        var roleId = this.roleSelect.roleId + "";
        var list = GameCache.equip.roleStrengthList[roleId];
        var idx = 0;
        var lvl = 0;
        if (list) {
            lvl = list[list.length - 1];
            idx = list.indexOf(lvl);
        }
        var conf = GameConfig.strengthProp["Equip"][lvl + 1];
        var curConf = GameConfig.strengthProp["Equip"][lvl];
        if (!conf)
            idx = 9;
        this.curIdx = idx;
        this.curLvl = lvl;
        this.initProp(lvl, idx);
        // let item: UserItem = (this[`item_${idx}`] as EquipItem).data;
        this["item_" + idx].select = true;
        // let plus1 = curConf[`part${idx}`];
        // let plus2 = conf ? conf[`part${idx}`] : null;
        // this.propList.setData(plus1, plus2, this.roleSelect.job, 0xffc600, 0xffffff, 0x00ff0c, [], "PropItem2Skin");
        var costConfig = GameConfig.strengthCost[lvl + 1];
        this.cost_0.visible = costConfig ? true : false;
        if (costConfig) {
            this.cost_0.setData(costConfig.consume[0].id, costConfig.consume[0].count);
        }
    };
    StrengthPannel.prototype.initProp = function (lvl, idx) {
        var conf = GameConfig.strengthProp["Equip"][lvl + 1];
        var curConf = GameConfig.strengthProp["Equip"][lvl];
        var plus1 = curConf["part" + idx];
        var plus2 = conf ? conf["part" + idx] : null;
        this.propList.setData(plus1, plus2, this.roleSelect.job, 0xffc600, 0xffffff, 0x00ff0c, [], "PropItem2Skin");
    };
    StrengthPannel.prototype.initZDL = function () {
        var roleId = this.roleSelect.roleId + "";
        var list = GameCache.equip.roleStrengthList[roleId];
        var val = 0;
        if (list) {
            for (var i = 0; i < 10; i++) {
                var lvl = list[i];
                if (lvl == 0)
                    continue;
                var conf = GameConfig.strengthProp["Equip"][lvl];
                val += ItemUtils.getZdlByProp(conf["part" + i]);
                // totalLvl += lvl;
            }
            this.zdl.value = "+" + val;
        }
        else {
            this.zdl.value = 0;
        }
        var mLvl = list && list[list.length - 1] ? list[list.length - 1] : 0;
        var mConf = GameConfig.strengthProp["Master"];
        for (var i in mConf) {
            if (mConf[i].level > mLvl) {
                // this.mLvl.text = StringUtils.substitute(Language.lang.jie, i);
                this.mPro.text = mLvl + "/" + mConf[i].level;
                break;
            }
            this.num.value = i;
        }
    };
    StrengthPannel.prototype.setPlay = function () {
        if (!App.TimerManager.isExists(this.effPlay, this)) {
            var eA = GameCache.strength.estimateLvl(this.curIdx, this.curLvl, this.roleSelect.nSlRole);
            // let eA = [0, 10];
            var count = eA;
            this.tarIdx = this.curIdx;
            if (count == 0)
                return;
            App.TimerManager.addDelay(0, 200, count, this.effPlay, this, this.onCLick, this);
        }
        this.showEff();
    };
    StrengthPannel.prototype.effPlay = function () {
        this.oldIdx = this.tarIdx;
        this.tarIdx = (this.tarIdx == 9) ? 0 : (this.tarIdx + 1);
        // this.zdl.value = "+" + (this.zdl.value + this.zValue);
        var eqItem = this["item_" + this.tarIdx];
        var oldItem = this["item_" + this.oldIdx];
        oldItem.select = false;
        eqItem.select = true;
        oldItem.strengthLvl = [oldItem.strenghLvl + 1];
        App.SoundManager.playEffect(SoundType.STRENGTH);
        this.initProp(oldItem.strenghLvl || 1, this.tarIdx);
    };
    StrengthPannel.prototype.showEff = function () {
        var mc = App.DisplayUtils.addEffectToObj(this, "qianghua_cg_0_1", 1, 270, 380);
    };
    //////////////跳动光标特效/////////////////
    StrengthPannel.prototype.strengthFunc = function () {
        if (this.upDataEnable) {
            if (this.cost_0.checkEnough()) {
                if (this.curLvl == GameCache.hero.mainPro.pro(PropId.AP_LEVEL)) {
                    GlobalFun.SysMsg(Language.lang.strengthLvlMax);
                }
                Proxy.equip.sendEquipStrength(this.roleSelect.nSlRole);
            }
            // this.setPlay();
        }
        else {
            GlobalFun.SysMsg(Language.lang.strengthPart);
        }
    };
    StrengthPannel.prototype.openItemTips = function (arg) {
        var uItem = arg;
        var viewProp = new ViewProp();
        var roleId = this.roleSelect.roleId + "";
        var list = GameCache.equip.roleStrengthList[roleId];
        var lvl = list && list[uItem.stdItem.part] ? list[uItem.stdItem.part] : 1;
        var plus;
        var conf = GameConfig.strengthProp["Equip"][lvl];
        if (conf)
            plus = conf["part" + uItem.stdItem.part];
        viewProp.itemData = uItem.stdItem;
        viewProp.exData1 = uItem;
        viewProp.exData2 = plus;
        App.ViewManager.open(ViewConst.ITEMTIPS, viewProp);
    };
    StrengthPannel.prototype.openMaster = function () {
        var viewProp = new ViewProp();
        viewProp.exData1 = this.roleSelect.nSlRole;
        viewProp.exData2 = 1;
        App.ViewManager.open(ViewConst.STRENGTHMASTER, viewProp);
    };
    StrengthPannel.prototype.showRed = function () {
        App.ViewManager.showRedPoint(this.sBtn, GameCache.strength.checkStrengthGrade(this.roleSelect.roleId));
    };
    return StrengthPannel;
}(BaseSpriteView));
__reflect(StrengthPannel.prototype, "StrengthPannel");
//# sourceMappingURL=StrengthPannel.js.map