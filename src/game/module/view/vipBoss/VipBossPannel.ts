/*
 * @Description: VIPBOSS面板
 * @Author: xiejunwei
 * @Date: 2019-09-20 11:35:23
 */
class VipBossPannel extends BaseSpriteView {

    public constructor($parent: egret.DisplayObjectContainer = null) {
        super($parent);
        this.skinName = "VipBossPannelSkin";
    }

    public tabBar: eui.TabBar;
    public sc: eui.Scroller;
    public itemList: eui.List;
    public sweepBtn: eui.Button;


    protected init(): void {
        super.init();
        this.itemList.itemRenderer = VipBossItem;
        this.tabBar.dataProvider = new eui.ArrayCollection([{ icon: "worldBoss_json.worldBoss_map_0_png" }, { icon: "worldBoss_json.worldBoss_map_1_png" }, { icon: "worldBoss_json.worldBoss_map_2_png" }]);
    }

    public open(param: ViewProp): void {
        this.tabBar.selectedIndex = param && param.secIndex || 0;
        this.message(MsgConst.BOSS_INFO, this.onTabTouche);

        Proxy.boss.sendBossInfo();
        this.addTouchEvent(this.sweepBtn, this.openVipTips);
        this.addTouchEvent(this.tabBar, this.onTabTouche);
        App.TimerManager.addDelay(50, 50, 1, this.onTabTouche, this);
    }

    private onTabTouche(): void {
        let tar = this.tabBar.selectedIndex + 1;
        let arr = [];
        let bossData = GameCache.boss.bossData[BossType.VIPBOSS]
        for (let i in bossData) {
            let bossItem = bossData[i];
            if (bossItem.conf.page == tar) arr.push(bossItem);
        }
        this.setListData(this.itemList, arr);
    }

    private sortFuncByLvl(aItem, bItem) {
        if (aItem.conf.conds < bItem.conf.conds) {
            return -1;
        } else {
            return 1;
        }
    }

    private exitFunc(): void {
        Proxy.boss.sendBossFubenOpt(2, GameCache.boss.currentBossId);
    }

    private openVipTips(): void {
        // GlobalFun.gotoCharge();
        let view = new ViewProp();
        view.firIndex = 0;
        App.ViewManager.open(ViewConst.VIP, view);
    }
}