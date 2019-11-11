/*
 * @Description: 技能效果编辑
 * @Author: xiejunwei
 * @Date: 2019-06-27 15:23:06
 * @LastEditTime: 2019-08-27 16:46:53
 */
class ConfigEditWin extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Message);
        this.skinName = "ConfigEditSkin";
        this.top = 0;
        this.left = 0;
    }

    public skid: eui.Label;
    public effId: eui.Label;
    public itemList: eui.List;
    public rBtn: eui.Button;
    public sBtn: eui.Button;
    public closeBtn: eui.Button;
    public tabBtn: eui.TabBar;
    public dBtn: eui.Button;
    public gBtn: eui.Button;
    public idInput: eui.TextInput;
    public typeTab: eui.TabBar;

    public sidArr: number[][] = [[], []];
    private skillId: number = 0;
    private sId: number = 0;
    public conf: any;
    private backUp: any;

    private tar: number[] = [];
    private tarPro: PropertySet;


    protected init(): void {
        super.init();
        this.typeTab.dataProvider = new eui.ArrayCollection(["施法效果", "击中效果"]);
    }

    public open(param: ViewProp): void {
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
    }

    public close(...param: any[]): void {
        GameCache.map.isAIMap = false;
        super.close();
    }

    private searchFunc(): void {
        let id = this.idInput.text;
        if (!id || id == this.skillId + "") return;
        this.backUp = {};
        this.sidArr = [[], []];
        this.skillId = parseInt(this.idInput.text);
        this.analyseData();
    }

    private typeSele(e?: egret.TouchEvent): void {
        let tar = this.typeTab.selectedIndex;
        this.tabBtn.dataProvider = new eui.ArrayCollection(this.sidArr[tar]);
        this.tabBtn.selectedIndex = 0;
        this.tabTouche();
    }

    private analyseData(): void {
        let conf: StdSkill = GameConfig.skill[this.skillId];
        this.skid.text = this.skillId + "";
        if (conf.skilleff1) {
            this.getNextId(conf.skilleff1, this.sidArr[0]);
        }
        if (conf.skilleff2) {
            this.getNextId(conf.skilleff2, this.sidArr[1]);
        }
        this.typeSele();
    }

    private getNextId(id, arr): void {
        let conf: StdSkillEff = GameConfig.skillEff[id];
        if (!conf) return;
        this.backUpFunc(id);
        arr.push(id + "");
        if (conf.nextId) {
            this.getNextId(conf.nextId, arr);
        }
        return;
    }

    private tabTouche(): void {
        let tar = this.tabBtn.selectedIndex;
        this.sId = this.sidArr[this.typeTab.selectedIndex][tar];
        this.effId.text = this.sId + "";
        this.initList();
    }

    private initList(): void {
        this.conf = GameConfig.skillEff[this.sId];
        let dataArr: any[] = [];
        for (let i in this.conf) {
            if (typeof (this.conf[i]) != "number" && typeof (this.conf[i]) != "string") continue;
            let item = {
                prop: i,
                value: this.conf[i],
                sId: this.sId
            }
            dataArr.push(item);
        }
        this.setListData(this.itemList, dataArr);
    }



    private generateFunc(): void {
        let mon = GameConfig.monster["1"];
        let propSet: PropertySet = new PropertySet();
        let charName: string = "测试怪物";
        propSet.recog = App.ThingManager.createRecog();
        propSet.setRoleName(charName);
        propSet.kind = ThingKind.Monster;
        propSet.fightAi = false;

        let x = GameCache.hero.focusPlayer.cellXY.x;
        let y = GameCache.hero.focusPlayer.cellXY.y;
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
    }

    private controlFunc(): void {
        if (this.typeTab.selectedIndex < 0) return;
        if (!this.skillId) return;
        switch (this.typeTab.selectedIndex) {
            case 0:
                this.testFunc();
                break;
            case 1:
                this.hitFunc();
                break;
        }
    }

    private doAll(): void {
        if (!this.skillId) return;
        this.testFunc();
        this.hitFunc();
    }

    private testFunc(): void {
        let ani: AnimalThing = App.ThingManager.getThing(this.tarPro.recog) as AnimalThing;
        App.FightManager.playUseSkill(GameCache.hero.focusPlayer, ani.cellXY.x, ani.cellXY.y, GameCache.skill.getDefaultUserSkill(this.skillId), this.tarPro.recog);
    }

    private hitFunc(): void {
        //let ani: AnimalThing = App.ThingManager.getThing(this.tarPro.recog) as AnimalThing;
        //App.FightManager.playBeHitSkill(GameCache.hero.focusPlayer, ani, this.skillId);
    }

    private backUpFunc(id): void {
        let obj = {};
        let conf = GameConfig.skillEff[id];
        for (let i in conf) {
            obj[i] = conf[i];
        }
        if (!this.backUp || !this.backUp[id]) {
            this.backUp[id] = obj;
        }
    }

    private reset(): void {
        if (!this.sId) return;
        let conf = GameConfig.skillEff[this.sId];
        for (let i in this.backUp[this.sId]) {
            conf[i] = this.backUp[this.sId][i];
        }
        this.initList();
    }

    private exitFunc(): void {
        App.ThingManager.removeThing(this.tarPro.recog);
        App.ViewManager.getView(ViewConst.MAIN_UI).visible = true;
        App.ViewManager.getView(ViewConst.MAIN_UI_COCER).visible = true;
        // this.backUp = null;
        // this.skid.text = this.effId.text = "";
        // this.sidArr = [];
        // this.sId = null;
        this.closeView();
    }
}