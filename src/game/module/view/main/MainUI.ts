/*
 * @Description: 主界面UI
 * @Author: liangzhaowei
 * @Date: 2019-08-22 21:36:55
 * @LastEditTime: 2019-11-01 15:45:54
 */

class MainUI extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Main);
        this.skinName = "MainUISkin";
        this.closeDispose = false;
        // this.init();
    }


    /////////////////////////////////////////////////////////////////////////////
    // MainUISkin.exml
    /////////////////////////////////////////////////////////////////////////////
    public gBtnUp: eui.Group;
    public gBtnLeft: eui.Group;
    public gBtnRight: eui.Group;
    public infoGroup: eui.Group;
    public buffGroup: eui.Group;
    public mailBtn: eui.Image;
    public passBtn: eui.Group;
    public gjPro: eui.Label;
    public chatGroup: eui.Group;
    public sysLab: eui.Label;
    public chatLab: eui.Label;
    public buffIcon: eui.Image;

    /////////////////////////////////////////////////////////////////////////////
    public actorHp: ActorHp;
    public passEff: MovieClip;
    private passGuide: NoviceGuideStep;
    private roleBtnList: MainCreateRoleBtn[];
    public tRefreshIcon = {};//需要刷新的按钮需要在ui中添加需要打开的窗口名字

    public init(): void {
        this.tRefreshIcon[this.mailBtn.name] = this.mailBtn;
        this.tRefreshIcon[this.buffIcon.name] = this.buffIcon;

        // this.onBtnIconChange();
        this.initEvent();
        this.roleBtnList = [];
        this.updateRoleList();

    }



    /** 主界面按钮添加条件 */
    public mainBtnIconAddConditon(name: string) {
        if (name == "FIRSTCHARGE") {
            return this.firstChargeIconAct();
        }
        else {
            return App.ViewManager.checkWin(name);
        }
    }

    /**首冲条件 */
    public firstChargeIconAct() {

        let mixList = GameCache.firstcharge.firstGetList.concat(GameCache.firstcharge.totalGetList);
        let firstCount = GameCache.firstcharge.firstChargeSt || 0
        if (firstCount > 0 && mixList.length > 0) {
            let total = mixList.reduce(function (a, b) { return a + b; });
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
    }

    /**首冲按钮显示 */
    public upFirstChargeIcon() {
        let chargeBtn = this.gBtnLeft.getChildByName("FIRSTCHARGE")
        if (chargeBtn) {
            if (!this.firstChargeIconAct()) {
                App.DisplayUtils.removeFromParent(chargeBtn);
            }
        }
    }



    /**对主界面按钮进行添加或移除 */
    public onBtnIconChange() {
        let cfg = GameConfig.mainIconCtr;
        for (let index in cfg) {
            if (cfg[index].sort) {
                let type = Math.floor(cfg[index].sort / 100);
                let parent = this.gBtnLeft;
                switch (type) {
                    case 1:
                        parent = this.gBtnLeft;
                        break;
                    case 2:
                        parent = this.gBtnRight;
                        break;
                    case 3:
                        parent = this.gBtnUp;
                        break;

                    default:
                        break;
                }

                let mainBtn: MainBtnIcon = this.tRefreshIcon[cfg[index].name];
                let bInclude = this.mainBtnIconAddConditon(cfg[index].name);
                if (!mainBtn) {
                    let btnIcon = new MainBtnIcon();
                    btnIcon.touchChildren = false;
                    btnIcon.name = cfg[index].name;
                    btnIcon.update(cfg[index]);
                    parent.addChild(btnIcon);
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
    }


    /**初始化事件内容 */
    public initEvent() {
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

    }

    public onGroupTouch(e: egret.TouchEvent): void {
        let name = e ? e.target.name : "";
        if (name || name != "") {
            App.ViewManager.open(ViewConst[name]);
        }
    }

    private onBuff() {
        App.ViewManager.toggle(ViewConst.BUFF);
    }


    /**在手机上关闭的时候并没有移除,因此需要继续接收事件来刷新 */
    protected removeAllEvent() {

    }

    /**在有必要整个移除的时候,需要重写调用父类方法来移除事件以及整个界面 */
    public dispose() {
        super.removeAllEvent();
        super.dispose();
        this.chatLab.removeEventListener(egret.TextEvent.LINK, this.onLink, this);
    }


    private updateRoleList() {
        let roleList = GameCache.hero.list;
        let btnList = this.roleBtnList;
        let group = this.buffGroup;
        let k = 0;
        for (let i = 1; i < roleList.length; i++) {
            let job = roleList[i].pro.job;
            let btn = btnList[k];
            if (btn && btn.job == job) {
                k++;
                continue;
            } else {
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
            let btn = btnList[k];
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
    }

    public guajiProgress(): void {
        if (GameCache.pass.killNum >= GameCache.pass.total) {
            this.gjPro.visible = false;
            if (!this.passEff) {
                let mc = App.DisplayUtils.addEffectToObj(this.passBtn, "guanqia_0_1", -1, 68, 62);
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
        } else {
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
    }

    private passInfo: PassInfo;
    private switchPassinfo(): void {
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
        } else {
            this.passBtn.visible = false;
            if (!this.passInfo) return;
            this.passInfo.visible = false;
        }
    }

    private btnGroupVisible(): void {
        let conf = GameCache.map.mapConfig;
        if (conf && conf.LRbtnSHow) {
            for (let i of conf.LRbtnSHow) {
                (this[i[0]] as eui.Group).visible = i[1] == 1;
            }
        }
    }

    private initChat(): void {
        App.FrameHandler.add(GameCache.chat.getPrevireChat, GameCache.chat, true, this.chatLab);
    }

    private initSysInfo(): void {
        App.FrameHandler.add(GameCache.chat.getSysMessage, GameCache.chat, true, this.sysLab);
    }

    private stopTag = false;
    private onLink(e: egret.TextEvent): void {
        let text = e.text;
        TextFlowUtils.hrefType(text);
        if (App.ViewManager.isShow(ViewConst.CHAT))
            App.ViewManager.close(ViewConst.CHAT);
        else
            this.stopTag = true;
    }

    private openChat(): void {
        if (this.stopTag) {
            this.stopTag = false;
            return;
        }
        let param = new ViewProp();
        param.exData2 = 1;
        App.ViewManager.open(ViewConst.CHAT, param);

    }

    private openSys(): void {
        if (this.stopTag) {
            this.stopTag = false;
            return;
        }
        if (DEBUG) {
            App.ViewManager.open(ViewConst.DEBUG);
        }
        let param = new ViewProp();
        param.exData2 = 0;
        App.ViewManager.open(ViewConst.CHAT, param);

    }

}