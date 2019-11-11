/*
 * @Description: 符碑面板
 * @Author: xiejunwei
 * @Date: 2019-09-16 18:54:50
 */
class RunePage extends BaseSpriteView {

    public constructor($parent: egret.DisplayObjectContainer = null) {
        super($parent);
        this.skinName = "RunePageSkin";
    }

    public pro: eui.ProgressBar;
    public zdl: ZdlPrint;
    public roleSelect: RoleSelect;
    public starPro: StarProgress;
    public cost: ItemExpend;
    public item: ItemBase;
    public propList: PropPart;
    public rName: eui.Image;
    public lvlMax: eui.Image;
    public pBtn: eui.Button;
    public skill_0: RuneSkillItem;
    public skill_1: RuneSkillItem;
    public skill_2: RuneSkillItem;
    public skill_3: RuneSkillItem;
    public num: NumberMC;

    private oldLvl: number = 0;
    private curid: number = 0;

    public init(): void {
        super.init();
        // let hander = Handler.create(this, this.onCLick, [], false);
        // this.roleSelect.handler = hander;
        this.roleSelect.setHandler(this, this.onCLick, []);
        this.num.gap = 22;
    }

    static red() {
        if (GameCache.rune.checkGrade()) {
            return true
        }
        return false;
    }

    public roleRed(roleId) {
        if (GameCache.rune.checkGrade(roleId)) {
            return true;
        }
        return false;
    }

    static changeMsg() {
        return [MsgConst.RUNE_INFO, MsgConst.NEW_HERO];
    }

    public refreshRed() {
        super.refreshRed();
        this.redShow();
    }

    public open(param: ViewProp): void {
        this.message(MsgConst.RUNE_INFO, this.initData);
        this.message(MsgConst.RUNE_INFO, this.lvlUpAnimate);
        this.addTouchEvent(this.pBtn, this.lvlUp);

        this.onCLick();
    }

    public close(param: ViewProp): void {
        super.close();
    }

    public onCLick(): void {
        this.cleanAnimate();
        // this.initData();
        App.TimerManager.addDelay(50, 50, 1, this.initData, this);
    }

    private initData(): void {
        let data = GameCache.rune.runeData[this.roleSelect.roleId];
        if (!data) data = {
            exp: 0,
            id: 0,
            lvl: 0,
            star: 0
        };
        let id = data.id;
        this.curid = data.id;
        let conf = GameConfig.rune[this.roleSelect.nSlRole + 1][id];
        let nextConf = GameConfig.rune[this.roleSelect.nSlRole + 1][id + 1];
        this.pro.maximum = conf.upExp;
        if (!App.TimerManager.isExists(this.proAnimate, this)) {
            this.pro.value = data.exp;
        }

        this.starPro.setData(10, conf.starLevel);

        if (nextConf) {
            this.cost.visible = true;
            this.lvlMax.visible = false;
            this.item.visible = true;
            this.pBtn.visible = true
            this.cost.setData(nextConf.item[0].id, nextConf.item[0].count);
            this.item.data = nextConf.item[0].id;
        } else {
            this.cost.visible = false;
            this.item.visible = false;
            this.pBtn.visible = false
            this.lvlMax.visible = true;
        }

        let str = StringUtils.substitute(Language.lang.rune_0, conf.classLevel, conf.starLevel);
        this.num.value = str;
        this.num.x = Math.floor((510 - str.length * 22) / 2);

        this.initSkill(conf.classLevel);

        let plus = nextConf ? nextConf.attrs : [];
        this.propList.setData(conf.attrs, plus, this.roleSelect.job, 0xffc600, 0xffffff, 0x00ff0c, [], "PropItem2Skin");
        this.initZdl();
    }

    private initSkill(lvl): void {
        if (this.oldLvl != 0 && this.oldLvl == lvl) return;
        this.oldLvl = lvl;
        for (let i = 0; i < 4; i++) {
            let obj = {
                roleIdx: this.roleSelect.nSlRole,
                job: this.roleSelect.job,
                jLvl: lvl,
                skillId: i + 1
            };
            (this[`skill_${i}`] as RuneSkillItem).data = obj;
        }
    }

    private initZdl(): void {
        let value = 0;
        for (let i = 0; i < 4; i++) {
            value += (this[`skill_${i}`] as RuneSkillItem).zdl;
        }
        this.zdl.value = value + this.propList.zdl;
    }

    private tempId = 0;
    public lvlUp(): void {
        if (this.cost.checkEnough()) {
            let need = GameCache.rune.getUpGradeNum(this.roleSelect.nSlRole);
            if (this.cost.have < need) need = this.cost.have;
            this.tempId = this.curid;
            Proxy.rune.sendRuneLvlUp(this.roleSelect.nSlRole, need, this.cost.item);
        }
    }

    private lvlUpAnimate(): void {
        if (App.TimerManager.isExists(this.proAnimate, this)) {
            App.TimerManager.remove(this.proAnimate, this);
        }
        let data = GameCache.rune.runeData[this.roleSelect.roleId]
        let id = data.id;
        let tar = id == this.tempId ? data.exp : this.pro.maximum;
        let delta = (tar - this.pro.value) / 10;
        // let dur = 
        // App.TimerManager.addDelay(0, 1000, 0, this.proAnimate, this, null, null, tar, delta);
        App.TimerManager.addDelay(100, 100, 0, this.proAnimate, this, null, null, tar, delta)
    }

    private cleanAnimate(): void {
        if (App.TimerManager.isExists(this.proAnimate, this)) {
            App.TimerManager.remove(this.proAnimate, this);
        }
        this.pro.value = GameCache.rune.runeData[this.roleSelect.roleId].exp;
        // this.initData();
    }

    private proAnimate(tar, delta): void {
        if (this.pro.value < tar) {
            this.pro.value += delta
        } else {
            this.cleanAnimate();
        }
    }

    private redShow(): void {
        App.ViewManager.showRedPoint(this.pBtn, GameCache.rune.checkGrade(this.roleSelect.roleId));
    }
}