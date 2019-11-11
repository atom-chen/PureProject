/*
 * @Description: 世界boss信息展示
 * @Author: xiejunwei
 * @Date: 2019-08-01 15:15:12
 * @LastEditTime: 2019-09-30 14:53:16
 */
class WorldInfo extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Main);
        this.skinName = "WorldInfoSkin";
        this.verticalCenter = 10;
        this.horizontalCenter = 0;
        this.left = 5;
        this.right = 5;

    }

    public btnGroup: eui.Group;
    public btn_1: eui.Image;
    public itemList: eui.List;
    public mySelf: BossRankItem;

    public init(): void {
        super.init();
        this.itemList.itemRenderer = BossRankItem;
    }

    public open(): void {
        InfoViewController.customBtn(this.btnGroup);
        // this.message(MsgConst.HERO_DIE, this.initRevive);
        this.mySelf.data = null;
        this.message(MsgConst.BOSS_RANK_INFO, this.initRank);
        this.addTouchEvent(this.btn_1, this.buyBuff);
        this.mySelf.rName.text = GameCache.hero.mainPro.charName;
        this.mySelf.value.text = "0";
    }


    public close(): void {
        super.close();
        this.setListData(this.itemList, []);
        this.mySelf.data = null;
        GameCache.copy.buffBuy = [0, 0];
    }

    private initRevive(): void {
        // if (!this.rBtn.visible) this.rBtn.visible = true;
        // let roleList = GameCache.hero.list;
        // let autoOpen = true;
        // for (let i of roleList) {
        //     if (!i.isDie) autoOpen = false;
        // }
        // if (autoOpen) App.ViewManager.open(ViewConst.REVIVE);
    }

    private openRevive(): void {
        App.ViewManager.open(ViewConst.REVIVE);
    }

    private openStrength(): void {
        App.ViewManager.open(ViewConst.SHOPTIPS);
    }

    private buyBuff(): void {
        App.ViewManager.open(ViewConst.BUYBUFF);
    }

    private initRank(data): void {
        this.setListData(this.itemList, data[0]);
        if (data[0]) {
            let obj = {
                bossid: data[0],
                rank: data[1],
                roleId: GameCache.hero.mainPro.pro(PropId.AP_ACTOR_ID),
                value: data[2],
                roleName: GameCache.hero.mainPro.charName
            }
            this.initMyself(obj);
        } else {
            this.initMyself(null);
        }
    }

    private initMyself(obj): void {
        this.mySelf.data = obj;
    }
}