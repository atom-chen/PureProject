/**
 * effect: 技能内容
 * author :lzw
 * data :2019.7.16 
 */

class SkillInfo extends BaseCustComponent {
    public constructor() {
        super();
        this.skinName = "SkillInfoSkin";
    }


    public bg: eui.Image;
    public icon: eui.Image;
    public lbName: eui.Label;
    public lv: eui.Label;
    public select: eui.Image;
    public gLv: eui.Group;



    protected childrenCreated(): void {
        super.childrenCreated();
        this.touchChildren = false;
        this.currentState = "info"
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (this.data && this.data.skill) {
            let skill: UserSkill = this.data.skill;
            let skillCfg = GameConfig.skill[skill.nSkillId];
            this.select.visible = this.data.sl == this.itemIndex;
            if (skillCfg) {
                this.lbName.text = skillCfg.name;
                this.lv.text = skill.nLevel + "";
                this.icon.source = RES_DIR_SKILL + skillCfg.icon + ".png";
            }
            this.gLv.visible = true;
        }
        else {
            this.gLv.visible = false;
            if (this.data.cfg) {
                this.icon.source = RES_DIR_SKILL + this.data.cfg.icon + "_s.png";
                this.lbName.text = StringUtils.substitute(Language.lang.lcn2, this.data.cfg.uselevel);
            }

        }
    }



}