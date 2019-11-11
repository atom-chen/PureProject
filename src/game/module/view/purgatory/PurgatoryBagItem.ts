/*
 * @Description: 炼狱背包item
 * @Author: moyusheng
 * @Date: 2019-10-18 13:44:09
 */
class PurgatoryBagItem extends BaseCustComponent {

    public btnDe: eui.Button;
    public icon: eui.Image;
    public num: eui.Label;
    public eqName: eui.Label;
    public item: ItemBase;

    public constructor() {
        super();
    }

    public prop: eui.Label;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.addTouchEvent(this.btnDe, this.onBtnDeClick);
    }

    /** 分解 */
    private onBtnDeClick(): void {
        Proxy.bag.sendEquipRecycleBagItem(BagType.BAG_TYPE_PURGATORY, [this.data]);
    }

    protected dataChanged(): void {
        super.dataChanged();
        this.initData();
    }

    public dispose(): void {
        super.dispose();
    }

    private initData(): void {
        let equip = this.data as UserItem;
        if (!equip) {
            return;
        }
        this.item.data = equip.stdItem;
        this.eqName.text = equip.stdItem.name;
        let cfg: StdEquippurgatoryresolve = GameConfig.purgatoryResolve[equip.stdItem.id];
        let [{type, id, count}] = cfg.re_item;
        let itemCfg: StdItem = GameConfig.item[id];
        this.icon.source = `${RES_DIR_IMAGES_ITEM}${itemCfg.icon}.png`;
        this.num.text = StringUtils.substitute(Language.lang.purgatoryDecomeNum, count);
    }

}