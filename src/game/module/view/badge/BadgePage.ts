/*
 * @Description: 徽章页面
 * @Author: xiejunwei
 * @Date: 2019-08-27 17:25:50
 * @LastEditTime: 2019-11-01 14:36:19
 */
class BadgePage extends BaseSpriteView {

    public constructor($parent: egret.DisplayObjectContainer = null) {
        super($parent);
        this.skinName = "BadgePageSkin";
    }

    // public sImg: eui.Image;
    public cg: eui.Group;
    public condi: eui.Label;
    public propList: PropPart;
    public btn0: eui.Button;
    public lvlMax: eui.Image;
    public img_1: eui.Image;
    public icon: eui.Image;
    public title: eui.Image;
    public lNum: NumberMC;
    public itemGroup: eui.Group;

    protected init(): void {
        super.init();
        let layout: eui.TileLayout = new eui.TileLayout();
        layout.orientation = "row";
        layout.requestedRowCount = 2;
        layout.horizontalGap = 0;
        layout.verticalGap = 10;
        layout.paddingLeft = 12;
        this.propList.pG.layout = layout;
        this.lNum.gap = 23;
    }

    static red() {
        return GameCache.badge.checkGrade();
    }

    static changeMsg() {
        return [MsgConst.PROPERTY + PropId.AP_BADGE_LVL, MsgConst.PROPERTY + PropId.AP_CHKPOINT_LV];
    }

    public refreshRed() {
        this.redShow();
    }

    public open(param: ViewProp): void {
        this.message(MsgConst.PROPERTY + PropId.AP_BADGE_LVL, this.initData);
        this.message(MsgConst.PROPERTY + PropId.AP_BADGE_LVL, this.showEff);
        this.addTouchEvent(this.btn0, this.upGradeFunc);
        this.initData();
    }

    private initData(): void {
        let passLvl = GameCache.hero.mainPro.pro(PropId.AP_CHKPOINT_LV);
        let badgeLvl = GameCache.hero.mainPro.pro(PropId.AP_BADGE_LVL);  // 当前徽章等级
        // let badgeLvl = 1;
        let conf = GameConfig.badge[badgeLvl];
        let nextConf = GameConfig.badge[badgeLvl + 1];
        // if (!conf) return;
        if (nextConf) {
            this.propList.setData(conf ? conf.attrs : [], nextConf.attrs, 0, 0xffc600, 0xffffff, 0x00ff0c, [], "PropItem3Skin");
            this.btn0.visible = true;
            this.cg.visible = true;
            let idx = passLvl > nextConf.Checkpoint ? 1 : 0;
            this.condi.textColor = passLvl > nextConf.Checkpoint ? 0x3ee822 : 0xff0000;
            this.condi.text = StringUtils.substitute(Language.lang.badge_0[idx], nextConf.Checkpoint);
            // this.sImg.visible = passLvl > nextConf.Checkpoint;
            this.lvlMax.visible = false;
        } else {
            this.btn0.visible = false;
            this.lvlMax.visible = true;
            this.cg.visible = false;
            this.img_1.visible = false;
            // this.sImg.visible = false;
        }
        this.initProgress(badgeLvl);
    }

    private initProgress(lvl): void {
        let conf = GameConfig.badge[lvl];
        let jLvl = conf ? conf.classLevel : 0;
        let tar = conf ? conf.starLevel : 0;
        for (let i = 0; i < 8; i++) {
            (this[`item_${i}`] as eui.Image).source = i <= tar - 1 ? "badge_json.badge_item_sele_png" : "badge_json.badge_item_unsele_png";
        }
        this.icon.source = RES_DIR_BADGE + jLvl + ".png";
        this.lNum.value = jLvl + "j";
        this.title.source = RES_DIR_BADGE + "n" + jLvl + ".png";
    }

    private upGradeFunc(): void {
        let passLvl = GameCache.hero.mainPro.pro(PropId.AP_CHKPOINT_LV);
        let badgeLvl = GameCache.hero.mainPro.pro(PropId.AP_BADGE_LVL); // 当前徽章等级
        // this.showEff();
        // let badgeLvl = 1;
        let conf = GameConfig.badge[badgeLvl + 1];
        if (conf && conf.Checkpoint) {
            if (passLvl > conf.Checkpoint) {
                Proxy.badge.sendBadgeUpGrade();
            } else {
                GlobalFun.SysMsg(Language.lang.badgeNotEnough);
            }
        } else {
            GlobalFun.SysMsg(Language.lang.badgeMaxLvl);

        }
    }

    private redShow(): void {
        App.ViewManager.showRedPoint(this.btn0, GameCache.badge.checkGrade());
    }

    private showEff() {
        let badgeLvl = GameCache.hero.mainPro.pro(PropId.AP_BADGE_LVL);  // 当前徽章等级
        let conf = GameConfig.badge[badgeLvl];
        let tar = conf ? conf.starLevel : 1;
        // let tar = Math.floor(Math.random() * 9) + 1;
        let item = (this[`item_${(tar - 1)}`] as eui.Image);
        let mc = App.DisplayUtils.addEffectToObj(this.itemGroup, "point2_0_1", 1, item.x + 30, item.y + 30);
    }
}