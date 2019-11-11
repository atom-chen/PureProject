/*
 * @Description: 翅膀面板页面
 * @Author: xiejunwei
 * @Date: 2019-08-14 14:27:43
 * @LastEditTime: 2019-11-01 15:45:39
 */
class WingPage extends BaseSpriteView {
    public constructor($parent: egret.DisplayObjectContainer = null) {
        super($parent);
        this.skinName = "WingPageSkin";

        this.body = new DBAvatar();
        this.body.setRoot(this.roleMdl, null);
    }

    public roleSelect: RoleSelect;
    public propList: PropPart;
    public zdl: ZdlPrint;
    public instruction: InstructionPart;
    public cBox: eui.CheckBox;
    public btn_0: eui.Button;
    public btn_1: eui.Button;
    public btn_2: eui.Button;
    public cost_0: ItemExpend;
    public cost_1: ItemExpend;
    public pro: eui.ProgressBar;
    public count: eui.Label;
    public starPro: StarProgress;
    public lvlT: eui.Label;
    public body: DBAvatar;
    public roleMdl: eui.Component;

    protected init(): void {
        super.init();
        this.roleSelect.setHandler(this, this.onCLick, []);
        this.cost_0.lab.textFlow = this.cost_1.lab.textFlow = TextFlowUtils.generateTextFlow(`<(c0x4c2f27)${Language.lang.consume}>`);
        this.cost_0.gainWay.visible = this.cost_1.gainWay.visible = false;
        // this.cost_0.numColor_0 = this.cost_1.numColor_0 = 0x4c2f27;
        this.cBox.labelDisplay["color"] = 0x4c2f27;
        this.propList.setGap(11);
    }

    static red() {
        if (GameCache.wing.checkGrade()) {
            return true
        }
        return false;
    }

    public roleRed(roleId) {
        if (GameCache.wing.checkGrade(roleId)) {
            return true;
        }
        return false;
    }


    static changeMsg() {
        return [MsgConst.WING_INFO, MsgConst.PROPERTY + PropId.AP_COIN];
    }

    public refreshRed() {
        super.refreshRed();
    }

    public open(param: ViewProp): void {
        this.message(MsgConst.WING_INFO, this.initData);

        this.addTouchEvent(this.btn_0, this.wingUpgrade);
        this.addTouchEvent(this.btn_1, this.wingUpgrade);
        this.addTouchEvent(this.btn_2, this.wingUpgrade);
        this.onCLick();
    }

    public destroy() {
        if (this.body) {
            this.body.dispose();
            this.body = null;
        }
        super.destroy();
    }


    public onCLick(): void {
        this.pro.slideDuration = 0;
        this.initData();
    }

    private countNum = 0;
    private realvalue = 0;
    private initData(): void {
        let data = GameCache.wing.wingData[this.roleSelect.roleId];
        if (!data) {
            data = {
                lvl: 0,
                exp: 0,
                count: 10
            }
        }
        let conf = GameConfig.wing[data.lvl];
        let nextConf = GameConfig.wing[data.lvl + 1];
        if (!conf) return;


        this.realvalue = data.exp;
        if (this.pro.maximum != conf.wingExp) {
            this.pro.maximum = conf.wingExp;
            App.FrameHandler.add(this.jugeTimeSpace, this, true, data.exp);
        } else {
            this.jugeTimeSpace(data.exp);
        }


        this.cost_0.visible = this.cost_1.visible = nextConf ? true : false;
        if (nextConf) {
            this.cost_1.setData(nextConf.consumeItems[0].id, nextConf.consumeItems[0].count);
            this.cost_0.setData(nextConf.consumeGold[0].id, nextConf.consumeGold[0].count);
        }
        let sexul = this.roleSelect.sex + "";
        if (conf.wingAppearance) {
            this.roleMdl.visible = true;
            this.body.load(conf.wingAppearance[this.roleSelect.job - 1] + sexul, true, false);
            this.body.play("stand");
        } else {
            this.roleMdl.visible = false;
        }
        let plus = nextConf ? nextConf.levelAtt : [];
        this.propList.setData(conf.levelAtt, plus, this.roleSelect.job, 0xffc600, 0xffffff, 0x00ff0c, [], "PropItem2Skin");

        let vipLvl = GameCache.vip.realValue();
        let limit = GameConfig.vip[vipLvl].wing;
        let mainData = GameCache.wing.wingData[GameCache.hero.getRoleIdByIndex(0)];
        let num = mainData ? mainData.count : 0;
        this.countNum = limit - num;
        this.count.text = `(${limit - num})`;
        this.starPro.setData(10, conf.starlevel);
        this.lvlT.text = `${conf.classLvl}阶${conf.starlevel}星`;

        this.initSkill(conf.classLvl);
        this.initZdl();
    }

    private lastTime: number = 0;
    private cacheGroup = [];
    private jugeTimeSpace(val): void {
        let delta = egret.getTimer() - this.lastTime;
        this.lastTime = egret.getTimer();

        if (delta < 100) {
            this.cacheGroup.push(val);
            if (!App.TimerManager.isExists(this.delayFunc, this)) {
                App.TimerManager.addDelay(200, 100, 0, this.delayFunc, this);
            }
        } else {
            this.pro.value = val;
        }
    }

    private delayFunc(): void {
        if (this.cacheGroup.length) {
            this.pro.value = this.cacheGroup.shift();
        } else {
            App.TimerManager.remove(this.delayFunc, this);
            this.pro.value = this.realvalue;
        }
    }

    private initSkill(lvl: number): void {
        let conf = GameConfig.wingSkill;
        let count = 0;
        for (let i in conf) {
            (this[`skill_${count}`] as WingSkillItem).initData(conf[i], lvl);
            count++;
        }
    }

    private initZdl(): void {
        let value = 0;
        for (let i = 0; i < 4; i++) {
            value += (this[`skill_${i}`] as WingSkillItem).zdl;
        }
        this.zdl.value = value + this.propList.zdl;
    }

    private btnTime: number = 0;
    private wingUpgrade(e: egret.TouchEvent): void {
        let tar = parseInt(e.target.name);
        let delta = egret.getTimer() - this.btnTime;
        if (delta < 250) {
            return;
        };
        this.cacheGroup = [];
        this.btnTime = egret.getTimer();
        if (tar == 2) {
            if (!this.countNum) {
                if (!this.cost_1.checkEnough())
                    return;
                else
                    Proxy.wing.sendWingUpgrade(this.roleSelect.nSlRole, tar);
            } else {
                if (this.cost_0.isExpend || this.cost_1.isExpend) {
                    Proxy.wing.sendWingUpgrade(this.roleSelect.nSlRole, tar);
                } else {
                    this.cost_1.checkEnough();
                }
            }
            return;
        }
        if ((this[`cost_${tar}`] as ItemExpend).checkEnough()) {
            if (!this.countNum && tar == 0) {
                GlobalFun.SysMsg(Language.lang.wing_0);
                return;
            }
            Proxy.wing.sendWingUpgrade(this.roleSelect.nSlRole, tar);
        }
    }

}