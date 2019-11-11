/*
 * @Description: 精炼面板
 * @Author: xiejunwei
 * @Date: 2019-08-13 16:26:05
 * @LastEditTime: 2019-10-31 21:12:38
 */
class RefinePannel extends BaseSpriteView {
    public constructor($parent: egret.DisplayObjectContainer = null) {
        super($parent);
        this.skinName = "RefinePannelSkin";
    }

    public instruction: InstructionPart;
    public roleSelect: RoleSelect;
    public propList: PropPart;
    public sGroup: eui.Group;
    public mBtn: eui.Image;
    public btn: eui.Button;
    public zdl: ZdlPrint;
    public cost_0: ItemExpend;
    public cost_1: ItemExpend;
    public seleImg: eui.Image;
    // public mLvl: eui.Label;
    public num: NumberMC;
    public mPro: eui.Label;

    private mc: MovieClip;

    private seleIdx = 0;

    public init(): void {
        super.init();
        this.initPartName();
        // let hander = Handler.create(this, this.onCLick, [], false);
        // this.roleSelect.handler = hander;
        this.roleSelect.setHandler(this, this.onCLick);
        this.num.gap = 14;
        this.num.alignV = "mid";
        this.num.alignH = "center";
    }

    static red() {
        return GameCache.strength.checkRefineGrade();
    }

    public roleRed(roleId) {
        return GameCache.strength.checkRefineGrade(roleId);
    }

    static changeMsg() {
        return [MsgConst.EQUIP_REFINE, MsgConst.NEW_HERO];
    }

    public refreshRed() {
        super.refreshRed();
        this.redShow();
    }

    public open(param: ViewProp): void {
        this.message(MsgConst.EQUIP_REFINE, this.initData);
        this.message(MsgConst.EQUIP_REFINE, this.initZDL);
        this.message(MsgConst.EQUIP_REFINE, this.showEff);

        this.cost_0.cleanMsg();

        this.addTouchEvent(this.sGroup, this.onItemTouch);
        this.addTouchEvent(this.btn, this.refineFunc);
        this.addTouchEvent(this.mBtn, this.openMaster);
        this.onCLick();
    }



    public onCLick(): void {
        let eqData = GameCache.hero.getDataByIndex(this.roleSelect.nSlRole, GameCache.equip.roleEquipList);
        this.initEquipItem(eqData);
        this.autoSele();
        this.initZDL();
    }

    private initPartName(): void {
        for (let i = 0; i < 10; i++) {
            let eqItem = (this[`item_${i}`] as EquipItem);
            eqItem.partSource = "strength_json.strength_text_part" + i + "_png";
        }
    }

    private initEquipItem(eqData): void {
        if (!eqData) eqData = [];
        for (let i = 0; i < 10; i++) {
            let uItem: UserItem = eqData[i];
            let list = GameCache.hero.getDataByIndex(this.roleSelect.nSlRole, GameCache.equip.roleRefineList);
            let lvl = list && uItem && list[uItem.stdItem.part] ? list[uItem.stdItem.part] : 0;
            let eqItem = (this[`item_${i}`] as EquipItem);
            eqItem.color.visible = false;
            if (!uItem) {
                eqItem.reSet();
            } else {
                eqItem.data = uItem;
                eqItem.setHandler(this, this.openItemTips, [uItem]);
            }
            eqItem.strengthLvl = [lvl];
            eqItem.setIconImg("strength_json.strength_part" + i + "_png");
        }
    }

    private autoSele(): void {
        let minIdx = 0;
        let count = 0;
        let lvl = 0;
        (this[`item_${this.seleIdx}`] as EquipItem).select = false;
        for (let i = 0; i < 10; i++) {
            let eqItem = (this[`item_${i}`] as EquipItem);
            if (eqItem.data) {
                if (count == 0) {
                    lvl = eqItem.strenghLvl;
                    minIdx = i;
                    count++;
                    continue;
                } else {
                    if (eqItem.strenghLvl < lvl) {
                        lvl = eqItem.strenghLvl;
                        minIdx = i;
                        count++;
                        continue;
                    }
                }
            }
        }
        this.seleIdx = minIdx;
        (this[`item_${minIdx}`] as EquipItem).select = true;
        this.seleImg.source = "strength_json.strength_part" + this.seleIdx + "_png";
        this.initData();
    }

    private onItemTouch(e: egret.TouchEvent): void {
        let tar = e ? parseInt(e.target.name) : this.seleIdx;
        (this[`item_${this.seleIdx}`] as EquipItem).select = false;
        (this[`item_${tar}`] as EquipItem).select = true;
        this.seleIdx = tar;
        this.seleImg.source = "strength_json.strength_part" + this.seleIdx + "_png";
        this.initData();
    }

    private initData(): void {
        let roleId = this.roleSelect.roleId;
        let list = GameCache.equip.roleRefineList[roleId];
        let eqItem = (this[`item_${this.seleIdx}`] as EquipItem);
        let lvl = 0;
        if (eqItem.data && list) {
            lvl = list[this.seleIdx];
            eqItem.strengthLvl = [lvl];
        }
        let conf = GameConfig.refine["ReEquip"][lvl];
        let nextConf = GameConfig.refine["ReEquip"][lvl + 1];

        // let cur = eqItem.data ? eqItem.data.stdItem.staitcAttrs : null;
        let plus1 = conf[`part${this.seleIdx}`];
        let plus2 = nextConf ? nextConf[`part${this.seleIdx}`] : null;

        // let prop_0 = GlobalFun.ObjPlusOrMinus(cur, plus1);
        // let prop_1 = GlobalFun.ObjPlusOrMinus(cur, plus2);

        let costConfig = GameConfig.strengthCost[lvl + 1];
        this.cost_0.visible = this.cost_1.visible = costConfig ? true : false;
        if (costConfig) {
            this.cost_0.setData(costConfig.reconsume[0].id, costConfig.reconsume[0].count);
            this.cost_1.setData(costConfig.reconsume[1].id, costConfig.reconsume[1].count);
        }
        this.propList.setData(plus1, plus2, this.roleSelect.job, 0xffc600, 0xffffff, 0x00ff0c, [], "PropItem2Skin");
    }

    public openItemTips(arg): void {
        // let uItem: UserItem = arg;
        // let viewProp = new ViewProp();
        // let roleId = this.roleSelect.roleId + "";
        // let list = GameCache.equip.roleRefineList[roleId];
        // let lvl = list && list[uItem.stdItem.part] ? list[uItem.stdItem.part] : 1;
        // let plus;
        // let conf = GameConfig.refine["ReEquip"][lvl];
        // if (conf) plus = conf[`part${uItem.stdItem.part}`];
        // viewProp.itemData = uItem.stdItem;
        // viewProp.exData1 = uItem;
        // viewProp.exData2 = plus;
        // App.ViewManager.open(ViewConst.ITEMTIPS, viewProp);
    }

    private refineFunc(): void {
        let eqItem = (this[`item_${this.seleIdx}`] as EquipItem);
        if (eqItem.data) {
            if (this.cost_1.checkEnough() && this.cost_0.checkEnough()) {
                if (eqItem.strenghLvl == GameCache.hero.mainPro.pro(PropId.AP_LEVEL)) {
                    GlobalFun.SysMsg(Language.lang.refineLvlMax);
                    return;
                }
                Proxy.equip.sendRefine(this.roleSelect.nSlRole, this.seleIdx);
            }
        } else {
            GlobalFun.SysMsg(Language.lang.refineHint);
        }
    }

    public openMaster(): void {
        let viewProp = new ViewProp();
        viewProp.exData1 = this.roleSelect.nSlRole;
        viewProp.exData2 = 2;
        App.ViewManager.open(ViewConst.STRENGTHMASTER, viewProp);
    }

    private initZDL(): void {
        let roleId = this.roleSelect.roleId + "";
        let list = GameCache.equip.roleRefineList[roleId];
        let val = 0;
        if (list) {
            for (let i = 0; i < 10; i++) {
                let lvl = list[i];
                if (lvl == 0) continue;
                let conf = GameConfig.refine["ReEquip"][lvl];
                val += ItemUtils.getZdlByProp(conf[`part${i}`]);
            }
            this.zdl.value = "+" + val;
        } else {
            this.zdl.value = 0;
        }

        let mLvl = list ? GlobalFun.Min(list)[0] : 0;
        let mConf = GameConfig.refine["ReMaster"];
        for (let i in mConf) {
            if (mConf[i].level > mLvl) {
                this.mPro.text = mLvl + "/" + mConf[i].level;
                break;
            }
            this.num.value = i;
        }
    }

    private showEff(): void {
        this.mc = App.DisplayUtils.addEffectToObj(this, "jinglian_cg_0_1", 1, 270, 380);
        // if (!this.mc) {
        //     let hand = Handler.create(this, this.hideEff, [], true);
        //     this.mc = App.DisplayUtils.addEffectToObj(this, "jinglian_cg_0_1", 1, 270, 380,hand);
        // }
        // this.mc.play(1);
        // this.mc.visible = true;
    }

    // private hideEff() {
    //     if (this.mc) {
    //         this.mc = null;
    //     }
    // }

    private redShow(): void {
        App.ViewManager.showRedPoint(this.btn, GameCache.strength.checkRefineGrade(this.roleSelect.roleId, this.seleIdx));
        for (let i = 0; i < 10; i++) {
            let eqItem = (this[`item_${i}`] as EquipItem)
            App.ViewManager.showRedPoint(eqItem, GameCache.strength.checkRefineGrade(this.roleSelect.roleId, i));
        }
    }
}