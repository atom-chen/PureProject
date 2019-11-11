/**
 * create by junwei on 07/15/2019
 * 选中血条
 */
class ActorHp extends BaseCustComponent {
    public constructor() {
        super();
        this.skinName = "ActorHpSkin";
    }

    public headIcon: eui.Image;
    public hpG: eui.Group;
    public og: eui.Group;
    public hp_0: eui.Image;
    public hp_1: eui.Image;
    public mName: eui.Label;
    public owner: eui.Label;
    public hpLab: eui.Label;

    private thing: any;
    private maxHP: number;
    private hp: number;
    private each: number;

    private barNum: number = 5;
    private hpArr: eui.Image[] = [];

    //血条宽度区间
    private hpInterval: number[] = [20, 284];
    //血条数量
    private hpCounts: number = 1;
    //每条血条的血量
    private perHp: number;

    protected childrenCreated(): void {
        super.childrenCreated();
        // App.MessageCenter.addListener(MsgConst.ENTER_SCENE, this.changeScene, this);
        // App.MessageCenter.addListener(MsgConst.BOSS_RANK_INFO, this.onBossRankChange, this);
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (this.data instanceof BaseThing) {
            this.initData();
            App.MessageCenter.removeListener(MsgConst.ENTER_SCENE, this);
            App.MessageCenter.addListener(MsgConst.ENTER_SCENE, this.changeScene, this);
            App.MessageCenter.removeListener(MsgConst.BOSS_RANK_INFO, this);
            App.MessageCenter.addListener(MsgConst.BOSS_RANK_INFO, this.onBossRankChange, this);
        }
    }

    public dispose(): void {
        super.dispose();

    }

    private initData(): void {
        this.thing = this.data;
        this.maxHP = this.data.pro.pro(PropId.AP_MAX_HP);
        this.hp = this.data.pro.pro(PropId.AP_HP);
        let mstCfg = GameConfig.monster[(this.data as BaseThing).pro.pro(PropId.AP_ACTOR_ID)];
        if (mstCfg) {
            this.mName.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.bossHpName, mstCfg.level.toString(), this.data.pro.charName));
            mstCfg.icon && (this.headIcon.source = `${RES_DIR_MONSTERICON}${mstCfg.icon}.png`);
            this.og.visible = false;
            this.headIcon.x = 103;
            this.headIcon.y = -34;
            this.hpCounts = mstCfg.hpCounts ? mstCfg.hpCounts : 1;
        } else {
            let job = this.data.pro.pro(PropId.AP_JOB);
            let sex = this.data.pro.pro(PropId.AP_SEX);
            this.mName.text = this.data.pro.charName;
            this.headIcon.source = GlobalFun.getRoleIcon(job, sex);
            this.og.visible = false;
            this.headIcon.x = 143;
            this.headIcon.y = 9;
            this.hpCounts = 1;
        }
        this.perHp = this.maxHP / this.hpCounts;
        this.hpChange(this.hp);
    }

    // private initHpBar(): void {
    //     this.each = this.maxHP / this.barNum;
    //     let circle = this.barNum > 5 ? 5 : this.barNum;
    //     for (let i = 0; i < circle; i++) {
    //         let img: eui.Image;
    //         if (!this.hpArr[i]) {
    //             img = ObjectPool.get(eui.Image);
    //             this.hpG.addChild(img);
    //             this.hpArr.push(img);
    //         } else {
    //             img = this.hpArr[i];
    //         }
    //         img.left = 0;
    //         img.top = 0;
    //         let rect: egret.Rectangle = new egret.Rectangle(6, 2, 233, 13);
    //         img.scale9Grid = rect;
    //         img.source = "hp_json.hp_" + (i + 1) + "_png";
    //         img.width = this.hpInterval[1];
    //     }
    //     let mark = circle;
    //     while (circle < this.hpArr.length) {
    //         this.hpArr[circle].scale9Grid = null;
    //         this.hpArr[circle].source = null;
    //         App.DisplayUtils.removeFromParent(this.hpArr[circle]);
    //         ObjectPool.push(this.hpArr[circle]);
    //         mark++
    //     }
    //     if (mark < this.hpArr.length) this.hpArr = this.hpArr.slice(0, mark);
    // }

    public hpChange(value): void {
        // let delta = (this.hpInterval[1] - this.hpInterval[0]);
        // value = value <= 0 ? 0 : value;
        // this.hp_0.width = Math.floor((value / this.maxHP) * delta) + this.hpInterval[0];
        // if (value <= 0) {
        //     this.visible = false;
        // }
        if (value <= 0) {
            this.visible = false;
        } else {
            let index = Math.ceil(value / this.perHp);
            let color = index % 5;
            color = color == 0 ? 5 : color;
            this.hp_0.source = `hp_json.hp_${color}_png`
            if (index == 1 || index == 0) {
                this.hp_1.visible = false;
            } else {
                color--;
                color = color == 0 ? 5 : color;
                this.hp_1.source = `hp_json.hp_${color}_png`
                this.hp_1.visible = true;
            }
            let curValue = this.perHp - (index * this.perHp - value);

            let delta = (this.hpInterval[1] - this.hpInterval[0]);
            curValue = curValue <= 0 ? 0 : curValue;
            this.hp_0.width = Math.floor((curValue / this.perHp) * delta) + this.hpInterval[0];

            this.hpLab.text = this.hpCounts <= 0 ? "" : `x${index}`;
        }
    }

    private changeScene(): void {
        App.MessageCenter.removeListener(MsgConst.ENTER_SCENE, this);
        App.MessageCenter.removeListener(MsgConst.BOSS_RANK_INFO, this);
        ActorSeleMgr.offSele();
    }

    // public change(): void {
    //     let value;// 残余HP
    //     let barNum = Math.ceil(value / this.each); //剩余血条数
    //     let residue = value % this.each; //余数

    //     let cSrc = "hp_json.hp_" + (barNum % 5) + "_png";  //当前血条颜色
    //     let nSrc = "hp_json.hp_" + ((barNum + 1) % 5) + "_png"; // 下一血条颜色
    //     nSrc = barNum == 1 ? "" : nSrc;

    //     let lost = this.barNum - barNum; //已失去的血条

    // }

    /** boss排行信息更新 */
    private onBossRankChange([arr]): void {
        if (!arr || arr.length == 0) {
            this.og.visible = false;
            return;
        }
        if (!this.data || !this.data.pro || this.data.pro.pro(PropId.AP_ACTOR_ID) != arr[0].bossid) {
            return;
        }
        this.og.visible = true;
        let gsName = arr[0].roleName;
        this.owner.text = StringUtils.substitute(Language.lang.gsName, gsName);
    }

    //扣血缓动
}