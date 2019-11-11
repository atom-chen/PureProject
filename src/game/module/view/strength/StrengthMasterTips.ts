/**
 * create by junwei on 07/25/2019
 * 强化大师窗口
 */
class StrengthMasterTips extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Tips);
        this.skinName = "StrengthMasterTipsSkin";
    }

    public mPro: eui.Label;
    public mLvl: eui.Label;
    public zdl_0: eui.Label;
    public zdl_1: eui.Label;
    public prop_0: PropPart;
    public prop_1: PropPart;
    public icon:eui.Image;
    public num:NumberMC;

    protected init(): void {

    }

    public open(param: ViewProp): void {
        this.initData(param.exData1, param.exData2);
    }



    private initData(role, type): void {
        let lvlList;
        let conf;
        switch (type) {
            case 1:
                lvlList = GameCache.hero.getDataByIndex(role, GameCache.equip.roleStrengthList);
                conf = GameConfig.strengthProp["Master"];
                this.icon.source = "strength_json.strength_master_png";
                break;
            case 2:
                lvlList = GameCache.hero.getDataByIndex(role, GameCache.equip.roleRefineList);
                conf = GameConfig.refine["ReMaster"];
                this.icon.source = "strength_json.strength_refineMaster_png";
                break;
        }
        let totalLvl = 0;
        if (lvlList) {
            totalLvl = lvlList[lvlList.length - 1];
        }
        let curJie = Math.floor(totalLvl / 10);
        let nextLvl = curJie + 1;
        this.currentState = conf[nextLvl] ? "s1" : "s2";
        this.prop_0.setData(conf[curJie].attrs, [], 0, 0x826f76, 0x826f76, 0x826f76, ["+", ""]);
        this.zdl_0.text = "+" + ItemUtils.getZdlByProp(conf[curJie].attrs);
        if (conf[nextLvl]) {
            this.prop_1.setData(conf[nextLvl].attrs, [], 0, 0xffffff, 0xffffff, 0xffffff, ["+", ""]);
            this.zdl_1.text = "+" + ItemUtils.getZdlByProp(conf[nextLvl].attrs);
        } else {
            nextLvl = curJie;
        }

        for (let i in conf) {
            if (conf[i].level > totalLvl) {
                this.mPro.text = totalLvl + "/" + conf[i].level;
                break;
            }
            this.mLvl.text = StringUtils.substitute(Language.lang.jie, i);
            this.num.value = i;
        }

    }
}