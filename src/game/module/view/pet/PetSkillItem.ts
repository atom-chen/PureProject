/*
 * @Description: 宠物技能内容
 * @Author: liangzhaowei
 * @Date: 2019-09-18 10:45:18
 */


class PetSkillItem extends BaseCustComponent {
    public constructor() {
        super();
        this.skinName = "PetSkillItemSkin";
    }


    public icon: eui.Image;
    public lbNe: eui.Label;


    protected childrenCreated(): void {
        super.childrenCreated();
    }

    protected dataChanged(): void {
        super.dataChanged();
    }


    public setData(data, star: number) {
        if (!data) {
            return;
        }
        let datacf: StdPetskill = GameConfig.petskill[data.skill];

        if (datacf) {
            /**已解锁 */
            if (star >= data.star) {
                this.lbNe.text = datacf.name;
                this.icon.source = RES_DIR_PET_SKILL + datacf.icon + ".png";
                this.lbNe.textColor = ColorUtil.C_YELLOW;
            }
            else {
                this.lbNe.text = StringUtils.substitute(Language.lang.lcn16, data.star);
                this.lbNe.textColor = 0xBCBCBC;
                this.icon.source = RES_DIR_PET_SKILL + datacf.icon + "_s.png";
            }
        }
    }


}
