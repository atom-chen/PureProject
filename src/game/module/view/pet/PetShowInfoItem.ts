/*
 * @Description: 宠物展示item
 * @Author: liangzhaowei
 * @Date: 2019-09-18 10:30:22
 */

class PetShowInfoItem extends BaseCustComponent {
    public constructor() {
        super();
        this.skinName = "PetShowInfoItemSkin";
    }

    public imgBg: eui.Image;
    public icon: eui.Image;
    public imgLock: eui.Image;
    public lbNe: eui.Label;
    public lbstar: eui.Label;


    protected childrenCreated(): void {
        super.childrenCreated();
        this.addTouchEvent(this, this.onClick);
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (!this.data.id) {
            return;
        }
        this.imgBg.source = "pet_json.pet_icon_bg" + this.data.petType + "_png";
        let data: StdPet = this.data;
        this.lbNe.text = data.name;
        if (GameConfig.pet[0] && GameConfig.pet[0].typeToStar) {
            let star = GameConfig.pet[0].typeToStar[data.petType - 1];
            if (star) {
                this.lbstar.text = "X" + star;
            }
        }

        this.imgLock.visible = GameCache.pet.petArray[data.id] ? false : true;
        if (GameCache.pet.petArray[data.id]) {
            this.icon.source = RES_DIR_PET + this.data.icon + ".png";
        }
        else {
            this.icon.source = RES_DIR_PET + this.data.icon + "_ud.png";
        }

    }
    public onClick() {
        App.ViewManager.close(ViewConst.PETSHOWALL);
        let data = new ViewProp();
        data.exData1 = this.data;
        App.ViewManager.open(ViewConst.PETSIGLEINFOVIEW, data);
    }

}