/**
 * create by junwei on 07/03/2019
 * 属性模块
 */
class PurgatoryBag extends BaseEuiWindow {
    public constructor() {
        super();
        this.skinName = "PurgatoryBagSkin";
    }

    public btnDe: eui.Button;
    public list: eui.List;

    private equips: UserItem[];

    protected childrenCreated(): void {
        super.childrenCreated();
        this.list.itemRenderer = PurgatoryBagItem;
    }

    public dispose(): void {
        super.dispose();
        this.equips = null;
    }

    public open(param: ViewProp): void {
        super.open(param);
		this.message(MsgConst.BAG_RECYCLE, this.initData);
        this.addTouchEvent(this.btnDe, this.onBtnDeClick);
        this.initData();
    }

    private initData():void{
        this.equips = GameCache.bag.getBagByType(BagType.BAG_TYPE_PURGATORY);
        this.setListData(this.list, this.equips);
    }

    public onBtnDeClick(): void {
        Proxy.bag.sendEquipRecycleBagItem(BagType.BAG_TYPE_PURGATORY, this.equips);
    }

    public close(): void {
        super.close();
        this.dispose();
    }
}