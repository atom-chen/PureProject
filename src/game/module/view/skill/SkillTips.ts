/*
 * @Description: 转职预览窗口
 * @Author: liangzhaowei
 * @Date: 2019-10-29 17:26:55
 */

class SkillTips extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Tips);
        this.skinName = "SkillTipsSkin";
    }

    public itemName: eui.Label;
    public lv: eui.Label;
    public desc: eui.Label;
    public icon: eui.Image;



    protected init(): void {
        super.init();
    }

    public open(param: ViewProp): void {
        super.open();

        if (param&&param.exData1) {
            let skill: StdSkill = GameConfig.skill[param.exData1]
            if (skill) {
                this.itemName.text = skill.name;
                this.lv.text = Language.lang.lcn20;
                this.icon.source = RES_DIR_SKILL + skill.icon + ".png";
                /**描述 */
                let valueList = []
                for (let index in skill.valuedec) {
                    valueList.push(skill.valuedec[index] * 1);
                }
                this.desc.text = StringUtils.substitute(skill.desc, valueList);
            }

        }
    }


}