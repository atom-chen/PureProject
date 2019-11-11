/**
 * effect: 套装详情窗口
 * author :lzw
 * data :2019.7.24 
 */
class SuitPropertyWin extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Tips);
        this.skinName = "SuitPropertyWinSkin";
    }

    public bg: BaseWinBg;
    public imgItem: eui.Image;
    public imgZl0: eui.Image;
    public num: eui.Label;
    public list: eui.List;
    public cfg;//配表
    public serverRoleId;//后端角色id
    public roleId;//角色id
    public listData = [];//配表数据




    protected init(): void {
        super.init();
        this.cfg = GameConfig.equipAddition;
        this.list.itemRenderer = SuitPropertyItem;
        this.setWinTitleHold("suit_json.suit_title_tzfx_png");
    }

    public open(param: ViewProp): void {
        super.open();
        this.serverRoleId = param.exData1;
        this.roleId = param.exData2;

        this.message(MsgConst.SUIT_CHANGE, this.upList);
        this.message(MsgConst.SUIT_INFO, this.upCn);
        this.message(MsgConst.SUIT_INFO, this.upList);

        this.upList();
        Proxy.equip.sendQueryMyEquip();
        this.upCn();
    }

    public upCn() {
        this.num.text = GameCache.suit.roleSuit[this.roleId] ? GameCache.suit.roleSuit[this.roleId].fight + "" : "0";
    }

    /**更新列表数据 */
    public upList() {
        this.listData = [];
        for (let index in this.cfg) {
            let obj = CommonUtils.copyDataHandler(this.cfg[index]);
            obj.roleId = this.serverRoleId;
            let sortId = this.cfg[index].level;
            obj.sortId = sortId;
            let eqData: UserItem[] = GameCache.equip.roleEquipList[this.roleId];
            obj.eqLv = 0;
            obj.fight = GameCache.suit.roleSuit[this.roleId].fight || 0;
            if (eqData) {
                for (let eqIndex in eqData) {
                    let eq: UserItem = eqData[eqIndex];
                    if (eq && eq.stdItem && eq.stdItem.level && eq.stdItem.showQuality == 6) {
                        obj.eqLv = obj.eqLv + eq.stdItem.level;
                    }
                }
            }
            if (GameCache.suit.roleSuit[this.roleId] && GameCache.suit.roleSuit[this.roleId].lvList) {
                let passed = GameCache.suit.roleSuit[this.roleId].lvList.indexOf(obj.level);
                if (passed > -1) {
                    obj.sortId = obj.sortId + 1000;
                }
            }
            this.listData.push(obj);
        }

        /**根据战力影响排序 */
        this.listData.sort(this.sort);
        this.setListData(this.list, this.listData);
    }

    /**排序 */
    public sort(a, b) {
        return a.sortId - b.sortId;
    }

}