/*
 * @Description: 图腾图片
 * @Author: xiejunwei
 * @Date: 2019-08-26 16:59:05
 * @LastEditTime: 2019-09-06 10:53:34
 */
class TotemsImgItem extends BaseCustComponent {
    public constructor() {
        super();
        this.skinName = "TotemsImgItemSkin";
    }

    public img: eui.Image;
    public nImg: eui.Image;
    public lNum: NumberMC;

    private saveData;

    protected childrenCreated(): void {
        super.childrenCreated();
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (!this.data) return;
        this.saveData = this.data;

        let conf = GameConfig.totems[this.saveData[0]][this.saveData[1]];
        this.img.source = this.saveData[1] > 1 ? RES_DIR_TOTEMS_ICON + "b" + this.saveData[0] + ".png" : RES_DIR_TOTEMS_ICON + "b" + this.saveData[0] + "u.png";
        this.nImg.source = this.saveData[1] > 1 ? RES_DIR_TOTEMS_NAME + "n" + this.saveData[0] + ".png" : RES_DIR_TOTEMS_NAME + "n" + this.saveData[0] + "u.png";
        this.lNum.visible = true;
        this.lNum.value = StringUtils.substitute(Language.lang.jie_j, conf.classLvl);
    }

    public dispose(): void {
        super.dispose();
    }

}