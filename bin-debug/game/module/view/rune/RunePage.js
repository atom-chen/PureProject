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
 * @Description: 符碑面板
 * @Author: xiejunwei
 * @Date: 2019-09-16 18:54:50
 */
var RunePage = (function (_super) {
    __extends(RunePage, _super);
    function RunePage($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.oldLvl = 0;
        _this.curid = 0;
        _this.tempId = 0;
        _this.skinName = "RunePageSkin";
        return _this;
    }
    RunePage.prototype.init = function () {
        _super.prototype.init.call(this);
        // let hander = Handler.create(this, this.onCLick, [], false);
        // this.roleSelect.handler = hander;
        this.roleSelect.setHandler(this, this.onCLick, []);
        this.num.gap = 22;
    };
    RunePage.red = function () {
        if (GameCache.rune.checkGrade()) {
            return true;
        }
        return false;
    };
    RunePage.prototype.roleRed = function (roleId) {
        if (GameCache.rune.checkGrade(roleId)) {
            return true;
        }
        return false;
    };
    RunePage.changeMsg = function () {
        return [MsgConst.RUNE_INFO, MsgConst.NEW_HERO];
    };
    RunePage.prototype.refreshRed = function () {
        _super.prototype.refreshRed.call(this);
        this.redShow();
    };
    RunePage.prototype.open = function (param) {
        this.message(MsgConst.RUNE_INFO, this.initData);
        this.message(MsgConst.RUNE_INFO, this.lvlUpAnimate);
        this.addTouchEvent(this.pBtn, this.lvlUp);
        this.onCLick();
    };
    RunePage.prototype.close = function (param) {
        _super.prototype.close.call(this);
    };
    RunePage.prototype.onCLick = function () {
        this.cleanAnimate();
        // this.initData();
        App.TimerManager.addDelay(50, 50, 1, this.initData, this);
    };
    RunePage.prototype.initData = function () {
        var data = GameCache.rune.runeData[this.roleSelect.roleId];
        if (!data)
            data = {
                exp: 0,
                id: 0,
                lvl: 0,
                star: 0
            };
        var id = data.id;
        this.curid = data.id;
        var conf = GameConfig.rune[this.roleSelect.nSlRole + 1][id];
        var nextConf = GameConfig.rune[this.roleSelect.nSlRole + 1][id + 1];
        this.pro.maximum = conf.upExp;
        if (!App.TimerManager.isExists(this.proAnimate, this)) {
            this.pro.value = data.exp;
        }
        this.starPro.setData(10, conf.starLevel);
        if (nextConf) {
            this.cost.visible = true;
            this.lvlMax.visible = false;
            this.item.visible = true;
            this.pBtn.visible = true;
            this.cost.setData(nextConf.item[0].id, nextConf.item[0].count);
            this.item.data = nextConf.item[0].id;
        }
        else {
            this.cost.visible = false;
            this.item.visible = false;
            this.pBtn.visible = false;
            this.lvlMax.visible = true;
        }
        var str = StringUtils.substitute(Language.lang.rune_0, conf.classLevel, conf.starLevel);
        this.num.value = str;
        this.num.x = Math.floor((510 - str.length * 22) / 2);
        this.initSkill(conf.classLevel);
        var plus = nextConf ? nextConf.attrs : [];
        this.propList.setData(conf.attrs, plus, this.roleSelect.job, 0xffc600, 0xffffff, 0x00ff0c, [], "PropItem2Skin");
        this.initZdl();
    };
    RunePage.prototype.initSkill = function (lvl) {
        if (this.oldLvl != 0 && this.oldLvl == lvl)
            return;
        this.oldLvl = lvl;
        for (var i = 0; i < 4; i++) {
            var obj = {
                roleIdx: this.roleSelect.nSlRole,
                job: this.roleSelect.job,
                jLvl: lvl,
                skillId: i + 1
            };
            this["skill_" + i].data = obj;
        }
    };
    RunePage.prototype.initZdl = function () {
        var value = 0;
        for (var i = 0; i < 4; i++) {
            value += this["skill_" + i].zdl;
        }
        this.zdl.value = value + this.propList.zdl;
    };
    RunePage.prototype.lvlUp = function () {
        if (this.cost.checkEnough()) {
            var need = GameCache.rune.getUpGradeNum(this.roleSelect.nSlRole);
            if (this.cost.have < need)
                need = this.cost.have;
            this.tempId = this.curid;
            Proxy.rune.sendRuneLvlUp(this.roleSelect.nSlRole, need, this.cost.item);
        }
    };
    RunePage.prototype.lvlUpAnimate = function () {
        if (App.TimerManager.isExists(this.proAnimate, this)) {
            App.TimerManager.remove(this.proAnimate, this);
        }
        var data = GameCache.rune.runeData[this.roleSelect.roleId];
        var id = data.id;
        var tar = id == this.tempId ? data.exp : this.pro.maximum;
        var delta = (tar - this.pro.value) / 10;
        // let dur = 
        // App.TimerManager.addDelay(0, 1000, 0, this.proAnimate, this, null, null, tar, delta);
        App.TimerManager.addDelay(100, 100, 0, this.proAnimate, this, null, null, tar, delta);
    };
    RunePage.prototype.cleanAnimate = function () {
        if (App.TimerManager.isExists(this.proAnimate, this)) {
            App.TimerManager.remove(this.proAnimate, this);
        }
        this.pro.value = GameCache.rune.runeData[this.roleSelect.roleId].exp;
        // this.initData();
    };
    RunePage.prototype.proAnimate = function (tar, delta) {
        if (this.pro.value < tar) {
            this.pro.value += delta;
        }
        else {
            this.cleanAnimate();
        }
    };
    RunePage.prototype.redShow = function () {
        App.ViewManager.showRedPoint(this.pBtn, GameCache.rune.checkGrade(this.roleSelect.roleId));
    };
    return RunePage;
}(BaseSpriteView));
__reflect(RunePage.prototype, "RunePage");
//# sourceMappingURL=RunePage.js.map