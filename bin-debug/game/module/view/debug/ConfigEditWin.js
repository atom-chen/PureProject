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
 * @Description: 技能效果编辑
 * @Author: xiejunwei
 * @Date: 2019-06-27 15:23:06
 * @LastEditTime: 2019-08-27 16:46:53
 */
var ConfigEditWin = (function (_super) {
    __extends(ConfigEditWin, _super);
    function ConfigEditWin() {
        var _this = _super.call(this, LayerManager.UI_Message) || this;
        _this.sidArr = [[], []];
        _this.skillId = 0;
        _this.sId = 0;
        _this.tar = [];
        _this.skinName = "ConfigEditSkin";
        _this.top = 0;
        _this.left = 0;
        return _this;
    }
    ConfigEditWin.prototype.init = function () {
        _super.prototype.init.call(this);
        this.typeTab.dataProvider = new eui.ArrayCollection(["施法效果", "击中效果"]);
    };
    ConfigEditWin.prototype.open = function (param) {
        GameCache.map.isAIMap = true;
        this.itemList.itemRenderer = ConfigEdItem;
        this.typeTab.selectedIndex = 0;
        this.addTouchEvent(this.typeTab, this.typeSele);
        this.addTouchEvent(this.closeBtn, this.exitFunc);
        this.addTouchEvent(this.gBtn, this.controlFunc);
        this.addTouchEvent(this.dBtn, this.doAll);
        this.addTouchEvent(this.sBtn, this.searchFunc);
        this.addTouchEvent(this.tabBtn, this.tabTouche);
        this.addTouchEvent(this.rBtn, this.reset);
        this.generateFunc();
    };
    ConfigEditWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        GameCache.map.isAIMap = false;
        _super.prototype.close.call(this);
    };
    ConfigEditWin.prototype.searchFunc = function () {
        var id = this.idInput.text;
        if (!id || id == this.skillId + "")
            return;
        this.backUp = {};
        this.sidArr = [[], []];
        this.skillId = parseInt(this.idInput.text);
        this.analyseData();
    };
    ConfigEditWin.prototype.typeSele = function (e) {
        var tar = this.typeTab.selectedIndex;
        this.tabBtn.dataProvider = new eui.ArrayCollection(this.sidArr[tar]);
        this.tabBtn.selectedIndex = 0;
        this.tabTouche();
    };
    ConfigEditWin.prototype.analyseData = function () {
        var conf = GameConfig.skill[this.skillId];
        this.skid.text = this.skillId + "";
        if (conf.skilleff1) {
            this.getNextId(conf.skilleff1, this.sidArr[0]);
        }
        if (conf.skilleff2) {
            this.getNextId(conf.skilleff2, this.sidArr[1]);
        }
        this.typeSele();
    };
    ConfigEditWin.prototype.getNextId = function (id, arr) {
        var conf = GameConfig.skillEff[id];
        if (!conf)
            return;
        this.backUpFunc(id);
        arr.push(id + "");
        if (conf.nextId) {
            this.getNextId(conf.nextId, arr);
        }
        return;
    };
    ConfigEditWin.prototype.tabTouche = function () {
        var tar = this.tabBtn.selectedIndex;
        this.sId = this.sidArr[this.typeTab.selectedIndex][tar];
        this.effId.text = this.sId + "";
        this.initList();
    };
    ConfigEditWin.prototype.initList = function () {
        this.conf = GameConfig.skillEff[this.sId];
        var dataArr = [];
        for (var i in this.conf) {
            if (typeof (this.conf[i]) != "number" && typeof (this.conf[i]) != "string")
                continue;
            var item = {
                prop: i,
                value: this.conf[i],
                sId: this.sId
            };
            dataArr.push(item);
        }
        this.setListData(this.itemList, dataArr);
    };
    ConfigEditWin.prototype.generateFunc = function () {
        var mon = GameConfig.monster["1"];
        var propSet = new PropertySet();
        var charName = "测试怪物";
        propSet.recog = App.ThingManager.createRecog();
        propSet.setRoleName(charName);
        propSet.kind = ThingKind.Monster;
        propSet.fightAi = false;
        var x = GameCache.hero.focusPlayer.cellXY.x;
        var y = GameCache.hero.focusPlayer.cellXY.y;
        this.tar = [x, y];
        propSet.pro(PropId.AP_HP, Number.MAX_VALUE);
        propSet.pro(PropId.AP_MAX_HP, Number.MAX_VALUE);
        propSet.pro(PropId.AP_X, x);
        propSet.pro(PropId.AP_Y, y);
        propSet.pro(PropId.AP_MOVE_SPEED, 500);
        propSet.pro(PropId.AP_ATTACK_SPEED, 1000);
        propSet.pro(PropId.AP_BODY_ID, mon["modelid"]);
        this.tarPro = propSet;
        App.ThingManager.createThingToList(propSet);
    };
    ConfigEditWin.prototype.controlFunc = function () {
        if (this.typeTab.selectedIndex < 0)
            return;
        if (!this.skillId)
            return;
        switch (this.typeTab.selectedIndex) {
            case 0:
                this.testFunc();
                break;
            case 1:
                this.hitFunc();
                break;
        }
    };
    ConfigEditWin.prototype.doAll = function () {
        if (!this.skillId)
            return;
        this.testFunc();
        this.hitFunc();
    };
    ConfigEditWin.prototype.testFunc = function () {
        var ani = App.ThingManager.getThing(this.tarPro.recog);
        App.FightManager.playUseSkill(GameCache.hero.focusPlayer, ani.cellXY.x, ani.cellXY.y, GameCache.skill.getDefaultUserSkill(this.skillId), this.tarPro.recog);
    };
    ConfigEditWin.prototype.hitFunc = function () {
        //let ani: AnimalThing = App.ThingManager.getThing(this.tarPro.recog) as AnimalThing;
        //App.FightManager.playBeHitSkill(GameCache.hero.focusPlayer, ani, this.skillId);
    };
    ConfigEditWin.prototype.backUpFunc = function (id) {
        var obj = {};
        var conf = GameConfig.skillEff[id];
        for (var i in conf) {
            obj[i] = conf[i];
        }
        if (!this.backUp || !this.backUp[id]) {
            this.backUp[id] = obj;
        }
    };
    ConfigEditWin.prototype.reset = function () {
        if (!this.sId)
            return;
        var conf = GameConfig.skillEff[this.sId];
        for (var i in this.backUp[this.sId]) {
            conf[i] = this.backUp[this.sId][i];
        }
        this.initList();
    };
    ConfigEditWin.prototype.exitFunc = function () {
        App.ThingManager.removeThing(this.tarPro.recog);
        App.ViewManager.getView(ViewConst.MAIN_UI).visible = true;
        App.ViewManager.getView(ViewConst.MAIN_UI_COCER).visible = true;
        // this.backUp = null;
        // this.skid.text = this.effId.text = "";
        // this.sidArr = [];
        // this.sId = null;
        this.closeView();
    };
    return ConfigEditWin;
}(BaseEuiWindow));
__reflect(ConfigEditWin.prototype, "ConfigEditWin");
//# sourceMappingURL=ConfigEditWin.js.map