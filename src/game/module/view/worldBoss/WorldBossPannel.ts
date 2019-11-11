/*
 * @Description: 世界BOSS面板
 * @Author: xiejunwei
 * @Date: 2019-07-30 15:33:28
 * @LastEditTime: 2019-10-28 15:27:13
 */
class WorldBossPannel extends BaseSpriteView {
    public constructor($parent: egret.DisplayObjectContainer = null) {
        super($parent);
        this.skinName = "WorldBossPannelSkin";

        this.bossListData = {};
    }

    public instruction: InstructionPart;
    public itemList: eui.List;
    public buyBtn: eui.Image;
    public count: eui.Label;
    public cTime: eui.Label;
    public sc: eui.Scroller;
    public tabBar: eui.TabBar;
    // public lsc: LiveScroll;

    private bossListData: any;

    protected init(): void {
        super.init();
        this.itemList.itemRenderer = WorldBossItem;
        this.tabBar.dataProvider = new eui.ArrayCollection([{ icon: "worldBoss_json.worldBoss_map_0_png" }, { icon: "worldBoss_json.worldBoss_map_1_png" }, { icon: "worldBoss_json.worldBoss_map_2_png" }]);
        // this.initList();
    }

    static red() {
        return GameCache.boss.getEnableEnterWB();
    }

    static changeMsg() {
        return [MsgConst.WORLDBOSS_COUNT];
    }

    public refreshRed() {

    }

    public open(param: ViewProp): void {
        this.tabBar.selectedIndex = param && param.secIndex || 0;
        this.message(MsgConst.BOSS_INFO, this.onTabTouche);
        this.message(MsgConst.WORLDBOSS_COUNT, this.initTime);

        Proxy.boss.sendBossInfo();

        this.addTouchEvent(this.buyBtn, this.openBuy);
        this.addTouchEvent(this.tabBar, this.onTabTouche);
        this.initTime();
        // App.TimerManager.addDelay(50, 50, 1, this.onTabTouche, this);
    }

    public close(param: ViewProp): void {
        super.close();
    }


    private onTabTouche(): void {
        let tar = this.tabBar.selectedIndex + 1;
        let arr = [];
        let bossData = GameCache.boss.bossData[BossType.WORLDBOSS];
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

    private time;
    private initTime(): void {
        let data = GameCache.boss.worldEnterCount;
        let c = data && data.count ? data.count : 0;
        let a = GameConfig.globalConfig.worldBossNum;
        let remain = a + data.buyCount - c;
        this.count.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.remain, remain + "/" + a));
        if (data.timeChkPoint) {
            this.cTime.visible = true;
            this.time = 3600 - Math.floor((GameCache.server.serverTime - data.timeChkPoint) / 1000);
            if (this.time >= 0) {
                if (!App.TimerManager.isExists(this.timeCount, this))
                    App.TimerManager.addDelay(0, 1000, 0, this.timeCount, this);
            }
        } else {
            this.cTime.visible = false;
            if (App.TimerManager.isExists(this.timeCount, this))
                App.TimerManager.remove(this.timeCount, this);
        }
    }

    private timeCount(): void {
        if (this.time < 0) {
            App.TimerManager.remove(this.timeCount, this);
            this.time = 0;
            return;
        }
        this.cTime.text = StringUtils.substitute(Language.lang.resetTime, App.DateUtils.getFormatBySecond(this.time, DateUtils.TIME_FORMAT_1));


        this.time--;
    }


    private openBuy(): void {
        // App.ViewManager.open(ViewConst.WBBUY);
        GlobalFun.openEnterBuy("wboss");
    }

}