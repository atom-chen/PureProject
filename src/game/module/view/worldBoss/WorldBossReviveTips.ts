/*
 * @Description: 世界BOSS复活提示
 * @Author: xiejunwei
 * @Date: 2019-08-05 16:31:06
 * @LastEditTime: 2019-09-25 17:46:45
 */
class WorldBossReviveTips extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Message);
        this.skinName = "WorldBossReviveTipsSkin";

        this.right = 10;
        this.bottom = 200;
    }

    public cBtn: eui.Image;
    public winTitle: eui.Image;
    public enterBtn: eui.Button;
    public bName: eui.Label;
    public icon: eui.Image;

    private bossId;

    public init(): void {
        super.init();
    }

    public open(param: ViewProp): void {
        super.open();
        this.addTouchEvent(this.cBtn, this.closeFunc);
        this.addTouchEvent(this.enterBtn, this.enterFunc);
        this.initLabel();
    }



    private initLabel(): void {
        let id = GameCache.boss.bossHintGroup.shift();
        let conf = GameConfig.monster[id];
        if (!id || !conf) {
            this.closeView();
            return;
        };
        // this.bName.text = "ID:" + conf.id + " " + conf.name;
        this.bName.text = StringUtils.substitute(Language.lang.wbName, conf.level, conf.name);
        this.bossId = id;
        this.icon.source = RES_DIR_MONSTERICON + conf.icon + ".png"
    }

    private closeFunc(): void {
        this.initLabel();
    }

    private enterFunc(): void {
        let bossData;
        for (let i in GameCache.boss.bossData) {
            if (GameCache.boss.bossData[i][this.bossId]) {
                bossData = GameCache.boss.bossData[i][this.bossId];
                break;
            }
        }
        let view = new ViewProp();
        switch (bossData.type) {
            case BossType.WORLDBOSS:
                view.firIndex = 0;
                break;
            case BossType.VIPBOSS:
                view.firIndex = 2
                break;;
        }
        view.secIndex = bossData.conf.page - 1;
        App.ViewManager.open(ViewConst.BOSS, view);
        // Proxy.boss.sendBossFubenOpt(1, parseInt(this.bossId));
        this.closeView();
    }
}