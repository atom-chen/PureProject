/**
 * effect: 套装详情窗口
 * author :lzw
 * data :2019.7.24 
 */


class SuitResolveWin extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Tips);
        this.skinName = "SuitResolveWinSkin";
    }

    public bg: BaseWinBg;
    public list: eui.List;
    public btn: eui.Button;
    /**角色id */
    public roleId;
    /**分解列表 */
    public resolveList: StdItem[] = [];

    protected init(): void {
        super.init();
        this.list.itemRenderer = SuitResolveItem;
        this.setWinTitleHold("suit_json.suit_title_tzfj_png");
    }

    public open(param: ViewProp): void {
        super.open();
        this.roleId = param.exData1;
        this.upList();
        this.addTouchEvent(this.btn, this.onclick)
        this.message(MsgConst.SUIT_RESOLVE, this.upList);
        this.message(MsgConst.BAG_ITEM_NUM, this.upList);
        this.message(MsgConst.SUIT_INFO, this.upList);

    }

    public upList() {
        this.resolveList = GameCache.suit.sortResolveList();
        this.setListData(this.list, this.resolveList);
    }

    /**一键分解 */
    public onclick() {
        Proxy.suit.sendSuitAllResolve(this.roleId, this.resolveList);
    }

}