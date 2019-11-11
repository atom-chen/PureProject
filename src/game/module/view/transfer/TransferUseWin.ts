/*
 * @Description: 转职预览窗口
 * @Author: liangzhaowei
 * @Date: 2019-10-29 17:26:55
 */

class TransferUseWin extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Tips);
        this.skinName = "TransferUseWinSkin";
    }

    public bg: BaseWinBg;
    public list: eui.List;
    public slRoleId: number = 0;


    protected init(): void {
        super.init();
        this.list.itemRenderer = TransferUseItem;
        this.setWinTitle("expChange");

    }

    public open(param: ViewProp): void {
        super.open();
        this.slRoleId = param.exData1 ? param.exData1 : 0;
        this.upList()
        this.message(MsgConst.TRANSFER_INFO,this.upList)
    }

    public upList() {
        let list = []
        if (GameConfig.transferconfig) {
            for (let index in GameConfig.transferconfig) {
                let obj = { item: [], slRoleId: 0 }
                obj.slRoleId = this.slRoleId;
                obj.item = GameConfig.transferconfig[index];
                list.push(obj);
            }

        }
        this.setListData(this.list, list);
    }



}