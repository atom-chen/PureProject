/*
 * @Description:主界面覆盖UI
 * @Author: liangzhaowei
 * @Date: 2019-07-18 20:47:03
 * @LastEditTime: 2019-10-22 17:01:39
 */
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
var MainUICover = (function (_super) {
    __extends(MainUICover, _super);
    function MainUICover() {
        var _this = _super.call(this, LayerManager.UI_Main2) || this;
        _this.tRefreshIcon = {}; //需要刷新的按钮需要在ui中添加需要打开的窗口名字
        _this.skinName = "MainUICoverSkin";
        _this.closeDispose = false;
        return _this;
    }
    MainUICover.prototype.init = function () {
        this.tRefreshIcon = {};
        this.tRefreshIcon[this.btn2.name] = this.btn2;
        this.tRefreshIcon[this.btn3.name] = this.btn3;
        this.tRefreshIcon[this.btn4.name] = this.btn4;
        this.tRefreshIcon[this.btn5.name] = this.btn5;
        this.redView = new RedPointView(this);
        this.addChild(this.redView);
    };
    MainUICover.prototype.open = function (param) {
        if (param === void 0) { param = null; }
        this.addTouchEvent(this.main2, this.onClickGroBtn);
        this.addTouchEvent(this.btnVip, this.onClickVip);
        this.message(MsgConst.LOGIN_INIT, this.onLoginInit);
        this.message(MsgConst.ENTER_SCENE, this.switchGjIcon);
        this.message(MsgConst.PROPERTY + PropId.AP_EXP, this.onExp);
        this.message(MsgConst.PROPERTY + PropId.AP_MAX_EXP, this.onExp);
        this.message(MsgConst.PROPERTY + PropId.AP_HP, this.onHp);
        this.message(MsgConst.PROPERTY + PropId.AP_MAX_HP, this.onHp);
        this.message(MsgConst.PROPERTY + PropId.AP_LEVEL, this.onLevel);
        this.message(MsgConst.PROPERTY + PropId.AP_VIP_TEMPROARY, this.onVip);
        this.message(MsgConst.PROPERTY + PropId.AP_VIP_GRADE, this.onVip);
        this.message(MsgConst.PROPERTY + PropId.AP_COIN, this.onCoin);
        this.message(MsgConst.PROPERTY + PropId.AP_YUANBAO, this.onGold);
        this.message(MsgConst.PROPERTY + PropId.AP_BATTLE_POWER, this.onShowFight);
        this.focusToStage();
    };
    MainUICover.prototype.onLoginInit = function () {
        var pro = GameCache.hero.mainPro;
        this.lbName.text = pro.charName;
        this.onRoleInfo();
    };
    MainUICover.prototype.showRole = function () {
        if (GameCache.hero.mainPro.pro(PropId.AP_JOB)) {
            this.imgRole.source = "zjm_json.zjm_touxiang_" + GameCache.hero.mainPro.pro(PropId.AP_JOB) + "_png";
        }
    };
    //角色属性
    MainUICover.prototype.onRoleInfo = function () {
        this.onLevel();
        this.onShowFight();
        this.onGold();
        this.onCoin();
        this.onExp();
        this.onHp();
        this.onVip();
        this.showRole();
    };
    /**更新属性------------------------------ */
    MainUICover.prototype.onExp = function (delay) {
        if (delay === void 0) { delay = true; }
        if (delay) {
            App.FrameHandler.add(this.onExp, this, true, false);
            return;
        }
        var pro = GameCache.hero.mainPro;
        if (pro) {
            this.progressBar2.maximum = pro.pro(PropId.AP_MAX_EXP);
            this.progressBar2.value = pro.pro(PropId.AP_EXP);
            var r = pro.pro(PropId.AP_EXP) / pro.pro(PropId.AP_MAX_EXP);
            r > 1 && (r = 1);
            App.DisplayUtils.addEffectToObj(this.progressBar2.parent, "exp_0_1", 1, this.progressBar2.x + r * this.progressBar2.width, this.progressBar2.y + 6);
        }
    };
    MainUICover.prototype.onVip = function () {
        this.btnVip.icon = "zjm_json.zjm_vip_" + GameCache.vip.realValue() + "_png";
    };
    MainUICover.prototype.onHp = function (delay) {
        if (delay === void 0) { delay = true; }
        if (delay) {
            App.FrameHandler.add(this.onHp, this, true, false);
            return;
        }
        var list = GameCache.hero.list;
        var cur = 0, max = 0;
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var hero = list_1[_i];
            cur += hero.pro.pro(PropId.AP_HP);
            max += hero.pro.pro(PropId.AP_MAX_HP);
        }
        this.progressBar1.maximum = max;
        this.progressBar1.value = cur;
    };
    MainUICover.prototype.onLevel = function (delay) {
        if (delay === void 0) { delay = true; }
        if (delay) {
            App.FrameHandler.add(this.onLevel, this, true, false);
            return;
        }
        var pro = GameCache.hero.mainPro;
        if (pro) {
            var str = StringUtils.substitute(Language.lang.mainLvl, pro.pro(PropId.AP_LEVEL), "c0xFFF1E6", "c0xFFF1E6");
            this.lbLevel.textFlow = TextFlowUtils.generateTextFlow(str);
        }
    };
    MainUICover.prototype.onGold = function (delay) {
        if (delay === void 0) { delay = true; }
        if (delay) {
            App.FrameHandler.add(this.onGold, this, true, false);
            return;
        }
        var pro = GameCache.hero.mainPro;
        if (pro) {
            this.lbGold.text = pro.pro(PropId.AP_YUANBAO) + "";
        }
    };
    MainUICover.prototype.onCoin = function (delay) {
        if (delay === void 0) { delay = true; }
        if (delay) {
            App.FrameHandler.add(this.onCoin, this, true, false);
            return;
        }
        var pro = GameCache.hero.mainPro;
        if (pro) {
            this.lbCoin.text = pro.pro(PropId.AP_COIN) + "";
        }
    };
    MainUICover.prototype.onShowFight = function (delay) {
        if (delay === void 0) { delay = true; }
        if (delay) {
            App.FrameHandler.add(this.onShowFight, this, true, false);
            return;
        }
        var n = GlobalFun.getTotalPower();
        if (n) {
            this.fightNum.value = n + "";
        }
        if (!GameCache.global.oldPower) {
            GameCache.global.oldPower = n;
        }
        else {
            if (GameCache.global.oldPower == n)
                return;
            if (App.ViewManager.isShow(ViewConst.FIGHT_CHANGE)) {
                this.onChangeFight();
            }
            else if (!App.TimerManager.isExists(this.onChangeFight, this)) {
                App.TimerManager.addDelay(500, 1, 1, this.onChangeFight, this);
            }
        }
    };
    MainUICover.prototype.onChangeFight = function () {
        App.ViewManager.open(ViewConst.FIGHT_CHANGE);
    };
    /**更新属性------------------------------ */
    MainUICover.prototype.onClickGroBtn = function (e) {
        var tar = e.target;
        if (tar instanceof eui.Button) {
            if (tar.name != "GUAJI") {
                App.ViewManager.toggle(ViewConst[tar.name]);
            }
            else {
                this.switchGj();
            }
        }
    };
    MainUICover.prototype.onClickVip = function () {
        App.ViewManager.open(ViewConst.VIP);
    };
    //挂机按钮图片切换
    MainUICover.prototype.switchGjIcon = function () {
        if (GameCache.map.mapId == GlobalVar.GUAJI_SCENE) {
            this.btn1.icon = "zjm_json.zjm_zc_png";
        }
        else {
            this.btn1.icon = "zjm_json.zjm_gj_png";
        }
    };
    /**挂机切换 */
    MainUICover.prototype.switchGj = function () {
        PassMgr.switchGj();
    };
    MainUICover.prototype.getBagBtn = function () {
        return this.btn5;
    };
    return MainUICover;
}(BaseEuiWindow));
__reflect(MainUICover.prototype, "MainUICover");
//# sourceMappingURL=MainUICover.js.map