/**
 * effect: 技能内容
 * author :lzw
 * data :2019.7.16 
 */

class SkillInfoSort extends BaseCustComponent {
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


    protected init(): void {
        this.currentState = "sort"
    }


    protected childrenCreated(): void {
        super.childrenCreated();
        this.touchChildren = false;
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
            let iconStr = "public_json.public_lock_1_png";
            this.gLv.visible = false;
            let skillBar: StdSkillbar = GameConfig.skillBar[this.itemIndex + 1];
            if (skillBar) {
                if (GlobalFun.getRoleLv() >= skillBar.level) {
                    this.lbName.text = skillBar.name;
                    iconStr = "public_json.public_add_1_png";
                } else {
                    this.lbName.text = StringUtils.substitute(Language.lang.lcn2, skillBar.level);
                }
            }
            else {
                this.lbName.text = "";
            }
            this.icon.source = iconStr;
        }
    }



}