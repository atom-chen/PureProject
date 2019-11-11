/*
 * @Description: 个人boss条目
 * @Author: xiejunwei
 * @Date: 2019-08-19 14:00:22
 * @LastEditTime: 2019-08-22 21:35:32
 */
class GRBossItem extends BaseCustComponent {
    public constructor() {
        super();
    }

    public icon: eui.Image;
    public item_0: ItemBase;
    public item_1: ItemBase;
    public item_2: ItemBase;
    public lImg: eui.Image;
    public enterBtn: eui.Button;
    public mLvl: eui.Label;
    public lLvl: eui.Label;
    public mImg: eui.Image;
    public mName: eui.Label;
    public killed: eui.Image;


    protected childrenCreated(): void {
        super.childrenCreated();
        this.addTouchEvent(this.enterBtn, this.enterFunc);
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (!this.data.fubenid) return;
        this.initData();
    }

    public dispose(): void {
        super.dispose();
    }

    private initData(): void {
        this.item_0.data = this.data.reward_show[0];
        this.item_1.data = this.data.reward_show[1];
        this.item_2.data = this.data.reward_show[2];

        let bossConfig = GameConfig.monster[this.data.entityid];
        this.mImg.source = RES_DIR_MONSTERICON + bossConfig.icon + ".png";
        this.mName.text = bossConfig.name;
        this.mLvl.text = bossConfig.level;

        this.initState();
    }

    private initState(): void {
        let roleLvl = GameCache.hero.mainPro.pro(PropId.AP_LEVEL);
        if (roleLvl < this.data.conds) {
            this.enterBtn.visible = false;
            this.killed.visible = false;
            this.lLvl.visible = true;
            this.lImg.visible = true;
            this.lLvl.text = StringUtils.substitute(Language.lang.lvlCondition, this.data.conds);
        } else {
            this.lLvl.visible = false;
            this.lImg.visible = false;
            let data = GameCache.copy.getCopyData(this.data.fubenid);
            let enable = data && data.free ? true : false;
            // let enable = true;
            if (enable) {
                this.enterBtn.visible = true;
                this.killed.visible = false;
            } else {
                this.enterBtn.visible = false;
                this.killed.visible = true;
            }
        }
    }

    private enterFunc(): void {
        Proxy.copy.sendEnterFB(this.data.fubenid);
        App.ViewManager.close(ViewConst.BOSS);
    }
}