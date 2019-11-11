/*
 * @Description: 转职预览窗口
 * @Author: liangzhaowei
 * @Date: 2019-10-29 17:26:55
 */

class TransferShowWin extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Tips);
        this.skinName = "TransferShowWinSkin";
    }

    public bg: BaseWinBg;
    public list: eui.List;

    public job: number = 0;


    protected init(): void {
        super.init();
        this.list.itemRenderer = TransferShowItem;
        this.setWinTitle("jobShow");
    }

    public open(param: ViewProp): void {
        super.open();
        this.job = param.exData1 ? param.exData1 : 0;

        let cfg: StdTransfertotal = GameConfig.transfertotal[this.job];
        if (cfg && cfg.describe) {
            let list = []
            for (let index in cfg.describe) {
                let obj = { des: "", job: 0 }
                obj.job = this.job;
                obj.des = cfg.describe[index];
                list.push(obj);
            }

            this.setListData(this.list, list);
        }

    }



}