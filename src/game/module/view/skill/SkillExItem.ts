/**
 * effect: 技能内容
 * author :lzw
 * data :2019.7.16 
 */

class SkillExItem extends BaseCustComponent {
    public constructor() {
        super();
        this.skinName = "SkillExItemSkin";
    }

    public select: eui.Image;
    public bg: eui.Image;
    public icon: eui.Image;
    public imgNe: eui.Image;




    protected childrenCreated(): void {
        super.childrenCreated();
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (this.data && this.data.skill) {
            let skill: UserSkill = this.data.skill;
            let skillCfg:StdSkill = GameConfig.skill[skill.nSkillId];
            this.select.visible = this.data.sl == this.itemIndex;
            if (skillCfg) {
                this.imgNe.source = `res/images/skillLb/${skillCfg.id}.png`;
                this.icon.source = RES_DIR_SKILL + skillCfg.icon + ".png";
            }
        }

    }



}