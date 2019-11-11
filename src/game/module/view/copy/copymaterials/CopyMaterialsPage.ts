/*
 * @Description: 材料副本页面
 * @Author: xiejunwei
 * @Date: 2019-08-21 15:50:38
 * @LastEditTime: 2019-10-28 19:17:36
 */
class CopyMaterialpage extends BaseSpriteView {

    public constructor($parent: egret.DisplayObjectContainer = null) {
        super($parent);
        this.skinName = "CopyMaterialsPageSkin";
    }

    public instruction: InstructionPart;
    public actiTxt: eui.Image;
    public itemList: eui.List;


    protected init(): void {
        super.init();
        this.itemList.itemRenderer = CopyMaterialsItem;
    }

    public open(param: ViewProp): void {
        this.message(MsgConst.COPY_COUNT, this.initList);
        this.initList();
    }

    static red() {
        return GameCache.copy.checkMaterial();
    }

    static changeMsg() {
        return [MsgConst.COPY_COUNT];
    }

    private initList(): void {
        let conf = GameConfig.copyMaterials;
        let arr = [];
        for (let i in conf) {
            arr.push(conf[i]);
        }
        arr = arr.sort(this.sortList);
        this.setListData(this.itemList, arr);
    }

    private sortList(a, b) {
        return a.order > b.order ? 1 : -1;
    }
}