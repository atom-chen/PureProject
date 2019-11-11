/*
    author:lzw
    date:2019/7/24 16:10
    explain:套装内容
*/
class SuitView extends BaseSpriteView {
    public constructor($parent: egret.DisplayObjectContainer = null) {
        super($parent);
        this.skinName = "SuitViewSkin";
    }


    public roleSelect: RoleSelect;
    public imgInfo: eui.Image;
    public list: eui.List;
    public imgItem: eui.Image;
    public lbNum: eui.Label;
    public imgProperty: eui.Image;
    public imgResolve: eui.Image;
    public gProperty: eui.Group;
    public gResolve: eui.Group;

    public nSlRole = 0;//当前选择角色
    public listSuitInfo = [];//套装兑换列表数据

    //初始化
    public init() {
        this.list.itemRenderer = SuitItem;
        this.roleSelect.setHandler(this, this.roleClick)
        this.imgItem.source = GlobalFun.getItemSourceById(GameCache.suit.nResolveId);
    }

    /**模块红点函数 不需要计算的写在前面 */
    static red() {
        if (!GameCache.suit) {
            return false;
        }

        if (GameCache.suit.sortResolveList().length > 0) {
            return true
        }

        for (let index in GameCache.hero.list) {
            let roleData: HeroThing = GameCache.hero.list[index];
            if (GameCache.suit.suitPropertyList(roleData.id)) {
                return true
            }
            if (GameCache.suit.suitChangeListRed(roleData.pro.job, roleData.id)) {
                return true
            }
        }

        return false;
    }

    /** roleId 为角色id*/
    public roleRed(roleId) {
        if (GameCache.suit.suitPropertyList(roleId)) {
            return true
        }
        if (GameCache.suit.suitChangeListRed(GameCache.hero.getJobByRoleId(roleId), roleId)) {
            return true
        }

        return false;
    }

    /**需要刷新是红点消息列表 */
    static changeMsg() {
        return [MsgConst.SUIT_CHANGE, MsgConst.SUIT_RESOLVE, MsgConst.SUIT_INFO];
    }


    /**界面内循环刷新红点函数 */
    public refreshRed() {
        super.refreshRed();

        if (!GameCache.suit) {
            return;
        }

        App.ViewManager.showRedPoint(this.gResolve, GameCache.suit.sortResolveRed());
        App.ViewManager.showRedPoint(this.gProperty, GameCache.suit.suitPropertyList(this.roleSelect.roleId));
    }

    public open(param: ViewProp = null) {
        this.addTouchEvent(this.imgProperty, this.onClick);
        this.addTouchEvent(this.imgResolve, this.onClick);
        // this.addItemClick(this.list, this.itemClick);
        this.message(MsgConst.BAG_ITEM_NUM + GameCache.suit.nResolveId, this.updateHaveItem);
        this.message(MsgConst.SUIT_CHANGE, this.upList);
        this.message(MsgConst.EQUIP_INFO, this.upList);
        this.upList();
        this.updateHaveItem();
    }

    /**更新列表内容 */
    public upList() {
        this.listSuitInfo = GameCache.suit.suitChangeList(this.roleSelect.job, this.roleSelect.serverId, this.roleSelect.roleId);
        this.setListData(this.list, this.listSuitInfo);
    }



    public onClick(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.imgProperty:
                let param = new ViewProp();
                param.exData1 = this.roleSelect.serverId;
                param.exData2 = this.roleSelect.roleId;
                App.ViewManager.open(ViewConst.SUITPROPERTY, param);
                break;
            case this.imgResolve:
                /**后端需要主角色id寻找数据 */
                let param1 = new ViewProp();
                param1.exData1 = GameCache.hero.getServerIdByIndex(0);
                App.ViewManager.open(ViewConst.SUITRESOLVE, param1);
                break;
            default:
                break;
        }
    }


    /**更新拥有物品 */
    public updateHaveItem() {
        this.lbNum.text = GameCache.bag.itemCount(GameCache.suit.nResolveId) + "";
        this.upList();
    }


    /**角色选择回调 */
    public roleClick(param) {
        this.nSlRole = param;
        this.upList();
    }



}




