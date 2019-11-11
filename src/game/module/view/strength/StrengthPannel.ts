// TypeScript file
class StrengthPannel extends BaseSpriteView {
    public constructor($parent: egret.DisplayObjectContainer = null) {
        super($parent);
        this.skinName = "StrengthPannelSkin";
    }

    public roleSelect: RoleSelect;
    public sGroup: eui.Group;
    public cost_0: ItemExpend;
    public sBtn: eui.Button;
    public propList: PropPart;
    public zdl: ZdlPrint;
    // public mLvl: eui.Label;
    public mPro: eui.Label;
    public mBtn: eui.Image;
    public num: NumberMC;

    private mc: MovieClip;
    private mc2: MovieClip;

    private curIdx: number = 0;
    private upDataEnable: boolean = true;
    private zValue: number = 1;
    private curLvl: number = 0;


    protected init(): void {
        super.init();
        // let hander = Handler.create(this, this.onCLick, [], false);
        // this.roleSelect.handler = hander;
        this.roleSelect.setHandler(this, this.onCLick);
        this.initPartName();
        if (!this.mc2) {
            let mc = App.DisplayUtils.addEffectToObj(this, "chuizi_eff_0_1", -1, 266, 284);
            this.mc2 = mc;
        }
        this.mc2.play(-1);
        this.mc2.visible = true;
        this.num.gap = 14;
        // this.cost_0.lab.textColor = 0x3e1700;
        // this.cost_0.numColor_0 = 0x0cff00;
    }

    static red() {
        return GameCache.strength.checkStrengthGrade();
    }

    public roleRed(roleId) {
        return GameCache.strength.checkStrengthGrade(roleId);
    }

    static changeMsg() {
        return [MsgConst.EQUIP_STRENGTH, MsgConst.NEW_HERO];
    }

    public refreshRed() {
        super.refreshRed();
        this.showRed();
    }

    public open(viewProp: ViewProp): void {
        this.onCLick();
        this.addTouchEvent(this.sBtn, this.strengthFunc);
        this.addTouchEvent(this.mBtn, this.openMaster);

        this.message(MsgConst.EQUIP_STRENGTH, this.setPlay);
    }

    public onCLick(): void {
        let role = this.roleSelect.nSlRole;
        let eqData = GameCache.hero.getDataByIndex(role, GameCache.equip.roleEquipList);
        // if (!eqData) return;
        this.zdl.value = "+" + 0;
        App.TimerManager.removeAll(this);
        this.initEquipItem(eqData);
        this.initData();
        this.initZDL();
    }

    public clsoe(ViewProp: ViewProp): void {
        App.TimerManager.removeAll(this);
    }

    private initPartName(): void {
        for (let i = 0; i < 10; i++) {
            let eqItem = (this[`item_${i}`] as EquipItem);
            eqItem.partSource = "strength_json.strength_text_part" + i + "_png";
            eqItem.touchEnabled = false;
        }
    }

    private initEquipItem(eqData): void {
        if (!eqData) eqData = [];
        this.upDataEnable = true;
        for (let i = 0; i < 10; i++) {
            let uItem: UserItem = eqData[i];
            let roleId = this.roleSelect.roleId + "";
            let list = GameCache.equip.roleStrengthList[roleId];
            let lvl = list && list[i] ? list[i] : 0;
            let eqItem = (this[`item_${i}`] as EquipItem);
            eqItem.color.visible = false;
            if (!uItem) {
                this.upDataEnable = true;
                eqItem.reSet();
            } else {
                eqItem.data = uItem;
                // eqItem.strengthLvl = [10];
                eqItem.setHandler(this, this.openItemTips, [uItem]);
            }
            eqItem.strengthLvl = [lvl];
            eqItem.setIconImg("strength_json.strength_part" + i + "_png");
            eqItem.select = false;
        }
    }

    private initData(): void {
        let roleId = this.roleSelect.roleId + "";
        let list = GameCache.equip.roleStrengthList[roleId];
        let idx = 0;
        let lvl = 0;
        if (list) {
            lvl = list[list.length - 1];
            idx = list.indexOf(lvl);
        }
        let conf = GameConfig.strengthProp["Equip"][lvl + 1];
        let curConf = GameConfig.strengthProp["Equip"][lvl];
        if (!conf) idx = 9;
        this.curIdx = idx;
        this.curLvl = lvl;
        this.initProp(lvl, idx);
        // let item: UserItem = (this[`item_${idx}`] as EquipItem).data;
        (this[`item_${idx}`] as EquipItem).select = true;

        // let plus1 = curConf[`part${idx}`];
        // let plus2 = conf ? conf[`part${idx}`] : null;
        // this.propList.setData(plus1, plus2, this.roleSelect.job, 0xffc600, 0xffffff, 0x00ff0c, [], "PropItem2Skin");

        let costConfig = GameConfig.strengthCost[lvl + 1];
        this.cost_0.visible = costConfig ? true : false;
        if (costConfig) {
            this.cost_0.setData(costConfig.consume[0].id, costConfig.consume[0].count);
        }
    }

    private initProp(lvl, idx) {
        let conf = GameConfig.strengthProp["Equip"][lvl + 1];
        let curConf = GameConfig.strengthProp["Equip"][lvl];
        let plus1 = curConf[`part${idx}`];
        let plus2 = conf ? conf[`part${idx}`] : null;
        this.propList.setData(plus1, plus2, this.roleSelect.job, 0xffc600, 0xffffff, 0x00ff0c, [], "PropItem2Skin");
    }

    private initZDL(): void {
        let roleId = this.roleSelect.roleId + "";
        let list = GameCache.equip.roleStrengthList[roleId];
        let val = 0;
        if (list) {
            for (let i = 0; i < 10; i++) {
                let lvl = list[i];
                if (lvl == 0) continue;
                let conf = GameConfig.strengthProp["Equip"][lvl];
                val += ItemUtils.getZdlByProp(conf[`part${i}`]);
                // totalLvl += lvl;
            }
            this.zdl.value = "+" + val;
        } else {
            this.zdl.value = 0;
        }

        let mLvl = list && list[list.length - 1] ? list[list.length - 1] : 0;
        let mConf = GameConfig.strengthProp["Master"];
        for (let i in mConf) {
            if (mConf[i].level > mLvl) {
                // this.mLvl.text = StringUtils.substitute(Language.lang.jie, i);
                this.mPro.text = mLvl + "/" + mConf[i].level;
                break;
            }
            this.num.value = i;
        }
    }

    //////////////跳动光标特效/////////////////
    private oldIdx: number;
    private tarIdx: number;
    private setPlay(): void {
        if (!App.TimerManager.isExists(this.effPlay, this)) {
            let eA = GameCache.strength.estimateLvl(this.curIdx, this.curLvl, this.roleSelect.nSlRole);
            // let eA = [0, 10];
            let count = eA
            this.tarIdx = this.curIdx;
            if (count == 0) return;
            App.TimerManager.addDelay(0, 200, count, this.effPlay, this, this.onCLick, this);
        }
        this.showEff();
    }

    private effPlay(): void {
        this.oldIdx = this.tarIdx;
        this.tarIdx = (this.tarIdx == 9) ? 0 : (this.tarIdx + 1);
        // this.zdl.value = "+" + (this.zdl.value + this.zValue);
        let eqItem = (this[`item_${this.tarIdx}`] as EquipItem);
        let oldItem = (this[`item_${this.oldIdx}`] as EquipItem)
        oldItem.select = false;
        eqItem.select = true;
        oldItem.strengthLvl = [oldItem.strenghLvl + 1];
        App.SoundManager.playEffect(SoundType.STRENGTH);
        this.initProp(oldItem.strenghLvl || 1, this.tarIdx);
    }

    private showEff() {
        let mc = App.DisplayUtils.addEffectToObj(this, "qianghua_cg_0_1", 1, 270, 380);
    }



    //////////////跳动光标特效/////////////////


    private strengthFunc(): void {
        if (this.upDataEnable) {
            if (this.cost_0.checkEnough()) {
                if (this.curLvl == GameCache.hero.mainPro.pro(PropId.AP_LEVEL)) {
                    GlobalFun.SysMsg(Language.lang.strengthLvlMax);
                }
                Proxy.equip.sendEquipStrength(this.roleSelect.nSlRole);
            }
            // this.setPlay();
        } else {
            GlobalFun.SysMsg(Language.lang.strengthPart);
        }
    }


    public openItemTips(arg): void {
        let uItem: UserItem = arg;
        let viewProp = new ViewProp();
        let roleId = this.roleSelect.roleId + "";
        let list = GameCache.equip.roleStrengthList[roleId];
        let lvl = list && list[uItem.stdItem.part] ? list[uItem.stdItem.part] : 1;
        let plus;
        let conf = GameConfig.strengthProp["Equip"][lvl];
        if (conf) plus = conf[`part${uItem.stdItem.part}`];
        viewProp.itemData = uItem.stdItem;
        viewProp.exData1 = uItem;
        viewProp.exData2 = plus;
        App.ViewManager.open(ViewConst.ITEMTIPS, viewProp);
    }

    public openMaster(): void {
        let viewProp = new ViewProp();
        viewProp.exData1 = this.roleSelect.nSlRole;
        viewProp.exData2 = 1;
        App.ViewManager.open(ViewConst.STRENGTHMASTER, viewProp);
    }

    private showRed(): void {
        App.ViewManager.showRedPoint(this.sBtn, GameCache.strength.checkStrengthGrade(this.roleSelect.roleId));
    }
}