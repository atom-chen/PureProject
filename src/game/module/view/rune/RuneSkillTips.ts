/*
 * @Description: 符碑技能提示 
 * @Author: xiejunwei
 * @Date: 2019-09-17 10:08:48
 */
class RuneSkillTips extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Tips);
        this.skinName = "WingSkillTipsSkin";
    }

    public skillIcon: eui.Image;
    public skillName: eui.Label;
    public t0: eui.Label;
    public t1: eui.Label;
    public desc: eui.Label;
    public condiTxt: eui.Label;

    public init(): void {
        super.init();
    }

    public open(param: ViewProp): void {
        super.open();
        this.t1.text = Language.lang.wingSkillEff;
        this.t0.text = Language.lang.wingActiCondition;
        this.initData(param.exData1, param.exData2, param.firData);
    }


    private initData(skillId, lvl, job): void {
        let skillConf: StdRuneskill = GameConfig.runeSkill[skillId[1]][skillId[0]];
        if (!skillConf) return;
        if (lvl < skillConf.conds) {
            this.skillIcon.filters = FilterUtils.DefaultGrayFilters;
            this.skillName.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.unActive, skillConf.name[job - 1]));
        } else {
            this.skillIcon.filters = null;
            this.skillName.text = skillConf.name[job - 1];
        }
        this.skillIcon.source = "rune_json.rune_skill_ico_" + job + "_" + skillConf.img + "_png";
        this.condiTxt.text = StringUtils.substitute(Language.lang.rune_1, skillConf.conds);
        this.desc.text = skillConf.dec;
    }


}