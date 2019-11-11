/*
 * @Description: 翅膀技能提示
 * @Author: xiejunwei
 * @Date: 2019-08-19 16:32:08
 * @LastEditTime: 2019-08-19 21:01:59
 */
class WingSkillTips extends BaseEuiWindow {
    public constructor() {
        super();
        this.skinName = "WingSkillTipsSkin";
    }

    public skillIcon: eui.Image;
    public skillName: eui.Label;
    public t0: eui.Label;
    public t1: eui.Label;
    public desc: eui.Label;
    public condiTxt: eui.Label;

    protected init(): void {
        super.init();
        this.t0.text = Language.lang.wingActiCondition;
        this.t1.text = Language.lang.wingSkillEff;
    }

    public open(param: ViewProp): void {
        super.open();
        this.initData(param.exData1, param.exData2);
    }

    public close(param: ViewProp): void {
    }

    private initData(idx, lvl): void {
        let conf = GameConfig.wingSkill[idx];
        this.condiTxt.text = StringUtils.substitute(Language.lang.conditionText, idx);
        this.skillIcon.source = "wing_json.wing_skill_" + conf.img + "_png";
        this.desc.text = conf.dec;
        let str = conf.id > lvl ? StringUtils.substitute(Language.lang.unActive, conf.name) : conf.name;
        this.skillName.textFlow = TextFlowUtils.generateTextFlow(str);
    }
}