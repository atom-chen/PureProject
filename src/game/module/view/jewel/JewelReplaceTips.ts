/*
 * @Description: 宝石替换TIPS
 * @Author: xiejunwei
 * @Date: 2019-09-10 22:21:08
 * @LastEditTime: 2019-10-25 16:18:38
 */
class JewelReplaceTips extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Tips);
        this.skinName = "JewelRepalceTipsSkin";
    }

    public bg: BaseWinBg;
    public itemList: eui.List;
    public state: eui.Image;

    private roleIdx;
    private curType;
    private curPart;

    public init(): void {
        super.init();
        this.itemList.itemRenderer = JewelReplaceItem;
        this.setWinTitle("jewel");
    }

    public open(param: ViewProp): void {
        super.open();
        this.message(MsgConst.JEWEL_LIST, this.initList);
        this.curPart = param.exData1;   //选择孔位
        this.roleIdx = param.exData2;    //角色下标

        this.initList();

    }


    private initList(): void {
        let roleId = GameCache.hero.getRoleIdByIndex(this.roleIdx);
        let jewBag = GameCache.jewel.jewelBag;
        let jewList = GameCache.jewel.roleJewelList[roleId];
        jewList = jewList ? jewList : {};

        let gem = jewList[this.curPart];
        let gemItem = gem ? GameConfig.jewel[gem.id] : null;
        if (gem) {
            let dItem = GameConfig.item[gem.id];
            let po = ItemUtils.getItemZDL(dItem);
            this.currentState = "sp";
            this["cur"] && ((this["cur"] as JewelReplaceItem).data = { item: dItem, curType: -1, lvl: gem.lvl, power: po });
        } else {
            this.currentState = "nor";
        }

        let listData = [];
        let havedType = [];     //已装备类型
        let havedData = [];
        for (let i in jewList) {
            let item: StdGem = GameConfig.jewel[jewList[i].id];
            havedType.push(item.part);
        }
        for (let i in jewBag) {
            let have: boolean = havedType.indexOf(parseInt(i)) != -1;
            for (let j in jewBag[i]) {
                if (!jewBag[i][j][0]) continue;
                let item: StdItem = GameConfig.item[jewBag[i][j][0]];
                let gemConf = GameConfig.jewel[item.id];
                let power = ItemUtils.getZdlByProp(item.staitcAttrs);
                let obj = {
                    id: jewBag[i][j][0],                     //宝石ID
                    item: item,                            //宝石配置物品
                    curType: gemItem ? gemItem.part : 0,  //宝石类型
                    lvl: 1,
                    roleIdx: this.roleIdx,
                    part: this.curPart,                    //当前选择孔位
                    have: have,
                    power
                }
                if (!have || (gemItem && gemItem.part == gemConf.part))
                    listData.push(obj);
                else
                    havedData.push(obj);
            }
        }
        listData = listData.sort(this.sortFunc);
        listData = listData.concat(havedData);

        this.setListData(this.itemList, listData);
    }

    private sortFunc(a, b) {
        return a.power > b.power ? -1 : 1;
    }
}