/*
 * @Description: 宠物展示界面
 * @Author: liangzhaowei
 * @Date: 2019-09-18 10:30:22
 */



class PetShowAllWin extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Tips);
        this.skinName = "PetShowAllWinSkin";
    }

    public bg: BaseWinBg;
    public list: eui.List;


    protected init(): void {
        super.init();
        this.list.itemRenderer = PetShowInfoItem;
        this.setWinTitle("petAll");
    }

    public open(param: ViewProp): void {
        super.open();
        this.upList();
    }

    public upList() {
        let tList = [];
        for (let index in GameConfig.pet) {
            if (GameConfig.pet[index].id) {
                tList.push(GameConfig.pet[index]);
            }
        }
        this.setListData(this.list, tList);
    }


}