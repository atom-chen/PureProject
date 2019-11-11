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
 * @Description: 翅膀面板页面
 * @Author: xiejunwei
 * @Date: 2019-08-14 14:27:43
 * @LastEditTime: 2019-11-01 15:45:39
 */
var WingPage = (function (_super) {
    __extends(WingPage, _super);
    function WingPage($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.countNum = 0;
        _this.realvalue = 0;
        _this.lastTime = 0;
        _this.cacheGroup = [];
        _this.btnTime = 0;
        _this.skinName = "WingPageSkin";
        _this.body = new DBAvatar();
        _this.body.setRoot(_this.roleMdl, null);
        return _this;
    }
    WingPage.prototype.init = function () {
        _super.prototype.init.call(this);
        this.roleSelect.setHandler(this, this.onCLick, []);
        this.cost_0.lab.textFlow = this.cost_1.lab.textFlow = TextFlowUtils.generateTextFlow("<(c0x4c2f27)" + Language.lang.consume + ">");
        this.cost_0.gainWay.visible = this.cost_1.gainWay.visible = false;
        // this.cost_0.numColor_0 = this.cost_1.numColor_0 = 0x4c2f27;
        this.cBox.labelDisplay["color"] = 0x4c2f27;
        this.propList.setGap(11);
    };
    WingPage.red = function () {
        if (GameCache.wing.checkGrade()) {
            return true;
        }
        return false;
    };
    WingPage.prototype.roleRed = function (roleId) {
        if (GameCache.wing.checkGrade(roleId)) {
            return true;
        }
        return false;
    };
    WingPage.changeMsg = function () {
        return [MsgConst.WING_INFO, MsgConst.PROPERTY + PropId.AP_COIN];
    };
    WingPage.prototype.refreshRed = function () {
        _super.prototype.refreshRed.call(this);
    };
    WingPage.prototype.open = function (param) {
        this.message(MsgConst.WING_INFO, this.initData);
        this.addTouchEvent(this.btn_0, this.wingUpgrade);
        this.addTouchEvent(this.btn_1, this.wingUpgrade);
        this.addTouchEvent(this.btn_2, this.wingUpgrade);
        this.onCLick();
    };
    WingPage.prototype.destroy = function () {
        if (this.body) {
            this.body.dispose();
            this.body = null;
        }
        _super.prototype.destroy.call(this);
    };
    WingPage.prototype.onCLick = function () {
        this.pro.slideDuration = 0;
        this.initData();
    };
    WingPage.prototype.initData = function () {
        var data = GameCache.wing.wingData[this.roleSelect.roleId];
        if (!data) {
            data = {
                lvl: 0,
                exp: 0,
                count: 10
            };
        }
        var conf = GameConfig.wing[data.lvl];
        var nextConf = GameConfig.wing[data.lvl + 1];
        if (!conf)
            return;
        this.realvalue = data.exp;
        if (this.pro.maximum != conf.wingExp) {
            this.pro.maximum = conf.wingExp;
            App.FrameHandler.add(this.jugeTimeSpace, this, true, data.exp);
        }
        else {
            this.jugeTimeSpace(data.exp);
        }
        this.cost_0.visible = this.cost_1.visible = nextConf ? true : false;
        if (nextConf) {
            this.cost_1.setData(nextConf.consumeItems[0].id, nextConf.consumeItems[0].count);
            this.cost_0.setData(nextConf.consumeGold[0].id, nextConf.consumeGold[0].count);
        }
        var sexul = this.roleSelect.sex + "";
        if (conf.wingAppearance) {
            this.roleMdl.visible = true;
            this.body.load(conf.wingAppearance[this.roleSelect.job - 1] + sexul, true, false);
            this.body.play("stand");
        }
        else {
            this.roleMdl.visible = false;
        }
        var plus = nextConf ? nextConf.levelAtt : [];
        this.propList.setData(conf.levelAtt, plus, this.roleSelect.job, 0xffc600, 0xffffff, 0x00ff0c, [], "PropItem2Skin");
        var vipLvl = GameCache.vip.realValue();
        var limit = GameConfig.vip[vipLvl].wing;
        var mainData = GameCache.wing.wingData[GameCache.hero.getRoleIdByIndex(0)];
        var num = mainData ? mainData.count : 0;
        this.countNum = limit - num;
        this.count.text = "(" + (limit - num) + ")";
        this.starPro.setData(10, conf.starlevel);
        this.lvlT.text = conf.classLvl + "\u9636" + conf.starlevel + "\u661F";
        this.initSkill(conf.classLvl);
        this.initZdl();
    };
    WingPage.prototype.jugeTimeSpace = function (val) {
        var delta = egret.getTimer() - this.lastTime;
        this.lastTime = egret.getTimer();
        if (delta < 100) {
            this.cacheGroup.push(val);
            if (!App.TimerManager.isExists(this.delayFunc, this)) {
                App.TimerManager.addDelay(200, 100, 0, this.delayFunc, this);
            }
        }
        else {
            this.pro.value = val;
        }
    };
    WingPage.prototype.delayFunc = function () {
        if (this.cacheGroup.length) {
            this.pro.value = this.cacheGroup.shift();
        }
        else {
            App.TimerManager.remove(this.delayFunc, this);
            this.pro.value = this.realvalue;
        }
    };
    WingPage.prototype.initSkill = function (lvl) {
        var conf = GameConfig.wingSkill;
        var count = 0;
        for (var i in conf) {
            this["skill_" + count].initData(conf[i], lvl);
            count++;
        }
    };
    WingPage.prototype.initZdl = function () {
        var value = 0;
        for (var i = 0; i < 4; i++) {
            value += this["skill_" + i].zdl;
        }
        this.zdl.value = value + this.propList.zdl;
    };
    WingPage.prototype.wingUpgrade = function (e) {
        var tar = parseInt(e.target.name);
        var delta = egret.getTimer() - this.btnTime;
        if (delta < 250) {
            return;
        }
        ;
        this.cacheGroup = [];
        this.btnTime = egret.getTimer();
        if (tar == 2) {
            if (!this.countNum) {
                if (!this.cost_1.checkEnough())
                    return;
                else
                    Proxy.wing.sendWingUpgrade(this.roleSelect.nSlRole, tar);
            }
            else {
                if (this.cost_0.isExpend || this.cost_1.isExpend) {
                    Proxy.wing.sendWingUpgrade(this.roleSelect.nSlRole, tar);
                }
                else {
                    this.cost_1.checkEnough();
                }
            }
            return;
        }
        if (this["cost_" + tar].checkEnough()) {
            if (!this.countNum && tar == 0) {
                GlobalFun.SysMsg(Language.lang.wing_0);
                return;
            }
            Proxy.wing.sendWingUpgrade(this.roleSelect.nSlRole, tar);
        }
    };
    return WingPage;
}(BaseSpriteView));
__reflect(WingPage.prototype, "WingPage");
//# sourceMappingURL=WingPage.js.map