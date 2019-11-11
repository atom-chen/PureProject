/*
 * @Description: 主界面UI
 * @Author: liangzhaowei
 * @Date: 2019-08-22 21:36:55
 * @LastEditTime: 2019-11-01 15:45:54
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
var MainUI = (function (_super) {
    __extends(MainUI, _super);
    function MainUI() {
        var _this = _super.call(this, LayerManager.UI_Main) || this;
        _this.tRefreshIcon = {}; //需要刷新的按钮需要在ui中添加需要打开的窗口名字
        _this.stopTag = false;
        _this.skinName = "MainUISkin";
        _this.closeDispose = false;
        return _this;
        // this.init();
    }
    MainUI.prototype.init = function () {
        this.tRefreshIcon[this.mailBtn.name] = this.mailBtn;
        this.tRefreshIcon[this.buffIcon.name] = this.buffIcon;
        // this.onBtnIconChange();
        this.initEvent();
        this.roleBtnList = [];
        this.updateRoleList();
    };
    /** 主界面按钮添加条件 */
    MainUI.prototype.mainBtnIconAddConditon = function (name) {
        if (name == "FIRSTCHARGE") {
            return this.firstChargeIconAct();
        }
        else {
            return App.ViewManager.checkWin(name);
        }
    };
    /**首冲条件 */
    MainUI.prototype.firstChargeIconAct = function () {
        var mixList = GameCache.firstcharge.firstGetList.concat(GameCache.firstcharge.totalGetList);
        var firstCount = GameCache.firstcharge.firstChargeSt || 0;
        if (firstCount > 0 && mixList.length > 0) {
            var total = mixList.reduce(function (a, b) { return a + b; });
            if (total >= 12) {
                return false;
            }
        }
        // else {
        //     if (mixList.length <= 0) {
        //         return false;
        //     }
        // }
        return true;
    };
    /**首冲按钮显示 */
    MainUI.prototype.upFirstChargeIcon = function () {
        var chargeBtn = this.gBtnLeft.getChildByName("FIRSTCHARGE");
        if (chargeBtn) {
            if (!this.firstChargeIconAct()) {
                App.DisplayUtils.removeFromParent(chargeBtn);
            }
        }
    };
    /**对主界面按钮进行添加或移除 */
    MainUI.prototype.onBtnIconChange = function () {
        var cfg = GameConfig.mainIconCtr;
        for (var index in cfg) {
            if (cfg[index].sort) {
                var type = Math.floor(cfg[index].sort / 100);
                var parent_1 = this.gBtnLeft;
                switch (type) {
                    case 1:
                        parent_1 = this.gBtnLeft;
                        break;
                    case 2:
                        parent_1 = this.gBtnRight;
                        break;
                    case 3:
                        parent_1 = this.gBtnUp;
                        break;
                    default:
                        break;
                }
                var mainBtn = this.tRefreshIcon[cfg[index].name];
                var bInclude = this.mainBtnIconAddConditon(cfg[index].name);
                if (!mainBtn) {
                    var btnIcon = new MainBtnIcon();
                    btnIcon.touchChildren = false;
                    btnIcon.name = cfg[index].name;
                    btnIcon.update(cfg[index]);
                    parent_1.addChild(btnIcon);
                    btnIcon.includeInLayout = bInclude;
                    btnIcon.visible = bInclude;
                    this.tRefreshIcon[btnIcon.name] = btnIcon;
                }
                else {
                    mainBtn.includeInLayout = bInclude;
                    mainBtn.visible = bInclude;
                }
            }
        }
    };
    /**初始化事件内容 */
    MainUI.prototype.initEvent = function () {
        this.addTouchEvent(this.gBtnUp, this.onGroupTouch);
        this.addTouchEvent(this.gBtnLeft, this.onGroupTouch);
        this.addTouchEvent(this.gBtnRight, this.onGroupTouch);
        this.addTouchEvent(this.mailBtn, this.onGroupTouch);
        this.addTouchEvent(this.passBtn, this.onGroupTouch);
        this.addTouchEvent(this.chatGroup, this.onGroupTouch);
        this.addTouchEvent(this.chatLab, this.openChat);
        this.addTouchEvent(this.sysLab, this.openSys);
        this.addTouchEvent(this.buffIcon, this.onBuff);
        this.chatLab.addEventListener(egret.TextEvent.LINK, this.onLink, this);
        this.addEvent(egret.TextEvent.LINK, this.sysLab, this.onLink);
        this.focusToStage();
        this.message(MsgConst.ENTER_SCENE, this.switchPassinfo);
        this.message(MsgConst.ENTER_SCENE, this.btnGroupVisible);
        this.message(MsgConst.NEW_HERO, this.updateRoleList);
        this.message(MsgConst.FIRST_CHARGE, this.upFirstChargeIcon);
        this.message(MsgConst.CHAT_INFO, this.initChat);
        this.message(MsgConst.SYS_INFO_MESSAGE, this.initSysInfo);
        this.message(MsgConst.PROPERTY + PropId.AP_LEVEL, this.onBtnIconChange);
        this.message(MsgConst.SERVER_TIME_CHANGE, this.onBtnIconChange);
        this.message(MsgConst.QUEST_REFRESH_MAIN, this.onBtnIconChange);
    };
    MainUI.prototype.onGroupTouch = function (e) {
        var name = e ? e.target.name : "";
        if (name || name != "") {
            App.ViewManager.open(ViewConst[name]);
        }
    };
    MainUI.prototype.onBuff = function () {
        App.ViewManager.toggle(ViewConst.BUFF);
    };
    /**在手机上关闭的时候并没有移除,因此需要继续接收事件来刷新 */
    MainUI.prototype.removeAllEvent = function () {
    };
    /**在有必要整个移除的时候,需要重写调用父类方法来移除事件以及整个界面 */
    MainUI.prototype.dispose = function () {
        _super.prototype.removeAllEvent.call(this);
        _super.prototype.dispose.call(this);
        this.chatLab.removeEventListener(egret.TextEvent.LINK, this.onLink, this);
    };
    MainUI.prototype.updateRoleList = function () {
        var roleList = GameCache.hero.list;
        var btnList = this.roleBtnList;
        var group = this.buffGroup;
        var k = 0;
        for (var i = 1; i < roleList.length; i++) {
            var job = roleList[i].pro.job;
            var btn = btnList[k];
            if (btn && btn.job == job) {
                k++;
                continue;
            }
            else {
                if (!btn) {
                    btn = new MainCreateRoleBtn();
                    group.addChildAt(btn, k);
                    btnList.push(btn);
                }
                btn.job = job;
            }
            k++;
        }
        if (roleList.length < GlobalVar.ROLE_MAX) {
            var btn = btnList[k];
            if (!btn) {
                btn = new MainCreateRoleBtn();
                group.addChildAt(btn, k);
                btnList.push(btn);
            }
            btn.job = 0;
            if ((btn.name != "") && (!this.tRefreshIcon[btn.name])) {
                this.tRefreshIcon[btn.name] = btn;
            }
        }
    };
    MainUI.prototype.guajiProgress = function () {
        if (GameCache.pass.killNum >= GameCache.pass.total) {
            this.gjPro.visible = false;
            if (!this.passEff) {
                var mc = App.DisplayUtils.addEffectToObj(this.passBtn, "guanqia_0_1", -1, 68, 62);
                this.passEff = mc;
            }
            this.passEff.play(-1);
            this.passEff.visible = true;
            if (GameConfig.clientGlobal.barrierGuide >= GameCache.pass.level) {
                //GameCache.novice.playGuide(GameConfig.clientGlobal.barrierBOSSGuideID);
                if (!this.passGuide) {
                    this.passGuide = new NoviceGuideStep(true);
                    this.passGuide.start(GameConfig.noviceGuide[GameConfig.clientGlobal.barrierBOSSGuideID]);
                }
            }
        }
        else {
            this.gjPro.visible = true;
            this.gjPro.text = GameCache.pass.killNum + "/" + GameCache.pass.total;
            if (this.passEff) {
                this.passEff.visible = false;
                this.passEff.stop();
            }
            if (this.passGuide) {
                this.passGuide.dispose();
                this.passGuide = null;
            }
        }
    };
    MainUI.prototype.switchPassinfo = function () {
        if (GameCache.map.mapId == GlobalVar.GUAJI_SCENE) {
            if (!this.passInfo) {
                this.passInfo = new PassInfo();
                this.passInfo.skinName = "PassInfoSkin";
                this.infoGroup.addChild(this.passInfo);
            }
            this.passInfo.visible = true;
            this.passInfo.lvlChange();
            this.passInfo.top = 0;
            this.passInfo.right = 0;
            this.passBtn.visible = true;
        }
        else {
            this.passBtn.visible = false;
            if (!this.passInfo)
                return;
            this.passInfo.visible = false;
        }
    };
    MainUI.prototype.btnGroupVisible = function () {
        var conf = GameCache.map.mapConfig;
        if (conf && conf.LRbtnSHow) {
            for (var _i = 0, _a = conf.LRbtnSHow; _i < _a.length; _i++) {
                var i = _a[_i];
                this[i[0]].visible = i[1] == 1;
            }
        }
    };
    MainUI.prototype.initChat = function () {
        App.FrameHandler.add(GameCache.chat.getPrevireChat, GameCache.chat, true, this.chatLab);
    };
    MainUI.prototype.initSysInfo = function () {
        App.FrameHandler.add(GameCache.chat.getSysMessage, GameCache.chat, true, this.sysLab);
    };
    MainUI.prototype.onLink = function (e) {
        var text = e.text;
        TextFlowUtils.hrefType(text);
        if (App.ViewManager.isShow(ViewConst.CHAT))
            App.ViewManager.close(ViewConst.CHAT);
        else
            this.stopTag = true;
    };
    MainUI.prototype.openChat = function () {
        if (this.stopTag) {
            this.stopTag = false;
            return;
        }
        var param = new ViewProp();
        param.exData2 = 1;
        App.ViewManager.open(ViewConst.CHAT, param);
    };
    MainUI.prototype.openSys = function () {
        if (this.stopTag) {
            this.stopTag = false;
            return;
        }
        if (true) {
            App.ViewManager.open(ViewConst.DEBUG);
        }
        var param = new ViewProp();
        param.exData2 = 0;
        App.ViewManager.open(ViewConst.CHAT, param);
    };
    return MainUI;
}(BaseEuiWindow));
__reflect(MainUI.prototype, "MainUI");
//# sourceMappingURL=MainUI.js.map