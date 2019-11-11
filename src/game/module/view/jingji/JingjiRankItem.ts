/*
 * @Description: 竞技场排行榜条目
 * @Author: xiejunwei
 * @Date: 2019-09-05 19:14:06
 * @LastEditTime: 2019-10-26 15:22:00
 */
class JingjiRankItem extends BaseCustComponent {
    public constructor() {
        super();
    }

    public item_0: ItemBase;
    public item_1: ItemBase;
    public item_2: ItemBase;
    public icon: eui.Image;
    public mLvl: eui.Label;
    public mName: eui.Label;
    public point: eui.Label;
    public rIcon: eui.Image;
    public rank: NumberMC;


    protected childrenCreated(): void {
        super.childrenCreated();
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (this.data.rank) {
            this.initData();
        }
    }

    public dispose(): void {
        super.dispose();
    }

    private initData(): void {
        let conf = GameConfig.jingji[this.itemIndex];
        conf = conf ? conf : GameConfig.jingji["1"];
        this.item_0.data = conf.awardshow[0];
        this.item_1.data = conf.awardshow[1];
        this.item_2.data = conf.awardshow[2];

        this.mName.text = this.data.roleName;
        this.icon.source = GlobalFun.getRoleIcon(this.data.job);//RES_DIR_ROLE_ICON + "role_" + this.data.job + ".png";
        this.mLvl.text = this.data.lvl;

        if (this.data.rank <= 3) {
            this.rank.visible = false;
            this.rIcon.visible = true;
            this.rIcon.source = "jingji_json.jingji_medal_" + this.data.rank + "_png";
        } else {
            this.rank.visible = true;
            this.rIcon.visible = false;
            this.rank.value = this.data.rank;
        }

        let str = StringUtils.substitute(Language.lang.jingji_t7, this.data.winPoint);
        this.point.textFlow = TextFlowUtils.generateTextFlow(str);
    }

}