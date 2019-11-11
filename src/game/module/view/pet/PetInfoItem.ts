/*
 * @Description: 宠物item内容
 * @Author: liangzhaowei
 * @Date: 2019-08-01 17:38:18
 * @LastEditTime: 2019-10-23 19:26:30
 */

class PetInfoItem extends BaseCustComponent {
    public constructor() {
        super();
        this.skinName = "PetInfoItemSkin";
    }


    public icon: eui.Image;
    public have: eui.Image;
    public imgBg: eui.Image;
    private mc: MovieClip;


    protected childrenCreated(): void {
        super.childrenCreated();
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (this.data.id) {
            let cfData: StdPet = this.data;
            let iconStr = RES_DIR_PET + this.data.icon + ".png";
            this.imgBg.source = "pet_json.pet_icon_bg" + this.data.petType + "_png";
            let haveState = false;
            let petDate: PetItem = GameCache.pet.petArray[this.data.id];

            if (this.itemIndex == this.data.select) {
                if (!this.mc) {
                    this.mc = App.DisplayUtils.addEffectToObj(this, "petselect_0_1", -1, 40, 40);
                }
                else {
                    this.mc.play(-1);
                    this.mc.visible = true;
                }
            }
            else {
                if (this.mc) {
                    this.mc.visible = false;
                    this.mc.stop();
                }
            }

            let imgHaveSource = null;
            if (petDate) {
                if (petDate.state == 1) {
                    imgHaveSource = "pet_json.pet_img_xiedai_png"
                }
            }
            else {
                if (GameCache.bag.getBagEnoughByCondtion(cfData.activationNeed)) {
                    imgHaveSource = "pet_json.pet_img_kejihuo_png"
                }
                iconStr = RES_DIR_PET + this.data.icon + "_ud.png";
            }
            this.have.source = imgHaveSource;
            this.icon.source = iconStr;
        }
    }


}
