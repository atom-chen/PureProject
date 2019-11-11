/*
 * @Description: 个人boss面板
 * @Author: xiejunwei
 * @Date: 2019-08-19 14:00:11
 * @LastEditTime: 2019-10-18 15:32:57
 */
class GRBossPannel extends BaseSpriteView {

    public constructor($parent: egret.DisplayObjectContainer = null) {
        super($parent);
        this.skinName = "GRBossPannelSkin";

        this.grBossData = {};
    }

    public tabBar: eui.TabBar;
    public instruction: InstructionPart;
    public sc: eui.Scroller;
    public itemList: eui.List;
    public sweepBtn: eui.Button;

    private grBossData: any;

    protected init(): void {
        super.init();
        this.initListData();
        this.itemList.itemRenderer = GRBossItem;
        this.tabBar.dataProvider = new eui.ArrayCollection([{ icon: "worldBoss_json.worldBoss_map_0_png" }, { icon: "worldBoss_json.worldBoss_map_1_png" }, { icon: "worldBoss_json.worldBoss_map_2_png" }]);
    }

    public open(param: ViewProp): void {
        this.message(MsgConst.COPY_COUNT, this.onTabTouche);
        this.message(MsgConst.PROPERTY + PropId.AP_LEVEL,this.sweetBtnVisible);
        this.addTouchEvent(this.tabBar, this.onTabTouche);
        this.addTouchEvent(this.sweepBtn, this.sweepFunc);
        this.tabBar.selectedIndex = 0;
        App.TimerManager.addDelay(50, 50, 1, this.initList, this);
        this.sweetBtnVisible();
    }



    public dispose(): void {
        super.dispose();
        this.grBossData = {};
    }

    private onTabTouche(): void {
        // let tar = this.tabBar.selectedIndex || 0;
        this.initList();
    }

    private initList(): void {
        let tar = this.tabBar.selectedIndex || 0;
        this.setListData(this.itemList, this.grBossData[tar + 1].concat());
    }

    private initListData(): void {
        let conf = GameConfig.grBoss;
        for (let i in conf) {
            let bossData = conf[i];
            if (!this.grBossData[bossData.page]) this.grBossData[bossData.page] = [];
            this.grBossData[bossData.page].push(bossData);
        }
    }

    private sweepFunc(): void {
        let conf = this.grBossData[1][0];
        Proxy.copy.sendSweep(conf.fubenid, 0);
    }

    private sweetBtnVisible(): void {
        let roleLvl = GameCache.hero.mainPro.pro(PropId.AP_LEVEL);
        this.sweepBtn.visible = roleLvl >= GameConfig.globalConfig.personalBossLimit;
    }

}