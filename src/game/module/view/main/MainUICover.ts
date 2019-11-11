/*
 * @Description:主界面覆盖UI
 * @Author: liangzhaowei
 * @Date: 2019-07-18 20:47:03
 * @LastEditTime: 2019-10-22 17:01:39
 */

class MainUICover extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Main2);
        this.skinName = "MainUICoverSkin";
        this.closeDispose = false;
    }


    /////////////////////////////////////////////////////////////////////////////
    // MainUICoverSkin.exml
    /////////////////////////////////////////////////////////////////////////////
    public progressBar1: eui.ProgressBar;
    public progressBar2: eui.ProgressBar;
    public lbName: eui.Label;
    public lbLevel: eui.Label;
    // public lbJob: eui.Label;
    public main2: eui.Group;
    public btnGroup: eui.Group;
    public btn1: eui.Button;
    public btn2: eui.Button;
    public btn3: eui.Button;
    public btn4: eui.Button;
    public btn5: eui.Button;
    public fightNum: NumberMC;
    public lbGold: eui.Label;
    public lbCoin: eui.Label;
    public btnVip: eui.Button;
    public imgRole: eui.Image;
    /////////////////////////////////////////////////////////////////////////////
    public redView;

    public tRefreshIcon = {};//需要刷新的按钮需要在ui中添加需要打开的窗口名字

    public init(): void {
        this.tRefreshIcon = {};
        this.tRefreshIcon[this.btn2.name] = this.btn2;
        this.tRefreshIcon[this.btn3.name] = this.btn3;
        this.tRefreshIcon[this.btn4.name] = this.btn4;
        this.tRefreshIcon[this.btn5.name] = this.btn5;
        this.redView = new RedPointView(this);
        this.addChild(this.redView);
    }

    public open(param: ViewProp = null): void {
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

    }

    private onLoginInit() {
        let pro = GameCache.hero.mainPro;
        this.lbName.text = pro.charName;
        this.onRoleInfo();
    }

    public showRole() {
        if (GameCache.hero.mainPro.pro(PropId.AP_JOB)) {
            this.imgRole.source = "zjm_json.zjm_touxiang_" + GameCache.hero.mainPro.pro(PropId.AP_JOB) + "_png";
        }
    }


    //角色属性
    public onRoleInfo() {
        this.onLevel();
        this.onShowFight();
        this.onGold();
        this.onCoin();
        this.onExp();
        this.onHp();
        this.onVip();
        this.showRole();
    }


    /**更新属性------------------------------ */

    public onExp(delay = true) {
        if (delay) {
            App.FrameHandler.add(this.onExp, this, true, false);
            return;
        }
        let pro = GameCache.hero.mainPro;
        if (pro) {
            this.progressBar2.maximum = pro.pro(PropId.AP_MAX_EXP);
            this.progressBar2.value = pro.pro(PropId.AP_EXP);
            let r = pro.pro(PropId.AP_EXP) / pro.pro(PropId.AP_MAX_EXP);
            r > 1 && (r = 1);
            App.DisplayUtils.addEffectToObj(this.progressBar2.parent, "exp_0_1", 1, this.progressBar2.x + r * this.progressBar2.width, this.progressBar2.y + 6);
        }
    }


    public onVip() {
        this.btnVip.icon = "zjm_json.zjm_vip_" + GameCache.vip.realValue() + "_png";
    }

    public onHp(delay = true) {
        if (delay) {
            App.FrameHandler.add(this.onHp, this, true, false);
            return;
        }
        let list = GameCache.hero.list;
        let cur = 0, max = 0;
        for (let hero of list) {
            cur += hero.pro.pro(PropId.AP_HP);
            max += hero.pro.pro(PropId.AP_MAX_HP);
        }
        this.progressBar1.maximum = max;
        this.progressBar1.value = cur;
    }

    private onLevel(delay = true) {
        if (delay) {
            App.FrameHandler.add(this.onLevel, this, true, false);
            return;
        }
        let pro = GameCache.hero.mainPro;
        if (pro) {
            let str = StringUtils.substitute(Language.lang.mainLvl, pro.pro(PropId.AP_LEVEL), "c0xFFF1E6", "c0xFFF1E6");
            this.lbLevel.textFlow = TextFlowUtils.generateTextFlow(str);
        }
    }

    public onGold(delay = true) {
        if (delay) {
            App.FrameHandler.add(this.onGold, this, true, false);
            return;
        }
        let pro = GameCache.hero.mainPro;
        if (pro) {
            this.lbGold.text = pro.pro(PropId.AP_YUANBAO) + "";
        }
    }

    public onCoin(delay = true) {
        if (delay) {
            App.FrameHandler.add(this.onCoin, this, true, false);
            return;
        }
        let pro = GameCache.hero.mainPro;
        if (pro) {
            this.lbCoin.text = pro.pro(PropId.AP_COIN) + ""
        }
    }

    public onShowFight(delay = true) {
        if (delay) {
            App.FrameHandler.add(this.onShowFight, this, true, false);
            return;
        }
        let n = GlobalFun.getTotalPower();
        if (n) {
            this.fightNum.value = n + "";
        }
        if (!GameCache.global.oldPower) {
            GameCache.global.oldPower = n;
        } else {
            if (GameCache.global.oldPower == n) return;
            if (App.ViewManager.isShow(ViewConst.FIGHT_CHANGE)) {
                this.onChangeFight();
            }
            else if (!App.TimerManager.isExists(this.onChangeFight, this)) {
                App.TimerManager.addDelay(500, 1, 1, this.onChangeFight, this);
            }
        }
    }

    private onChangeFight() {
        App.ViewManager.open(ViewConst.FIGHT_CHANGE);
    }

    /**更新属性------------------------------ */


    private onClickGroBtn(e: egret.TouchEvent) {
        let tar = e.target;
        if (tar instanceof eui.Button) {
            if (tar.name != "GUAJI") {
                App.ViewManager.toggle(ViewConst[tar.name]);
            } else {
                this.switchGj();
            }
        }
    }

    public onClickVip() {
        App.ViewManager.open(ViewConst.VIP);
    }

    //挂机按钮图片切换
    private switchGjIcon(): void {
        if (GameCache.map.mapId == GlobalVar.GUAJI_SCENE) {
            this.btn1.icon = "zjm_json.zjm_zc_png";
        } else {
            this.btn1.icon = "zjm_json.zjm_gj_png";
        }
    }

    /**挂机切换 */
    private switchGj(): void {
        PassMgr.switchGj();
    }

    public getBagBtn(): eui.Button {
        return this.btn5;
    }
}