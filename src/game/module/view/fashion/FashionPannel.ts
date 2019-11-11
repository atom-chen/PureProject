/**
 * create by junwei on 07/29/2019
 *  时装面板
 */
class FashionPannel extends BaseSpriteView {
    public constructor($parent: egret.DisplayObjectContainer = null) {
        super($parent);
        this.skinName = "FashionPannelSkin";

    }

    public roleSelect: RoleSelect;
    public itemList: eui.List;
    public mModel: UIAvatar;
    public sc: eui.Scroller;
    public tabBtn_0: eui.TabBar;
    public tabBtn_1: eui.TabBar;
    public sBtn: eui.Button;

    private fashionBag = {};

    private tabIndex_0 = 0;
    private tabindex_1 = 0;

    private arr = [["AP_HAT", "AP_HAIR", "AP_EYE", "AP_GLASSES"],
    ["AP_BODY_ID", "AP_PANTS", "AP_WEAPON", "AP_ASSIST"],
    ["AP_SWING", "AP_BACK"]];

    protected init(): void {
        this.itemList.itemRenderer = FashionItem;
        let hander = Handler.create(this, this.onCLick, [], false);
        this.roleSelect.handler = hander;
        this.initTypeData();
    }

    public open(viewProp: ViewProp): void {
        this.message(MsgConst.FASHION_TRY, this.initTab);
        this.message(MsgConst.FASHION_GET, this.onCLick);
        this.message(MsgConst.EQUIP_ATTR_CHANGE, this.onCLick);
        this.message(MsgConst.FASHION_INFO, this.onCLick);
        this.message(MsgConst.FASHION_DELETE, this.onCLick);

        this.addTouchEvent(this.tabBtn_0, this.initTab);
        this.addTouchEvent(this.tabBtn_1, this.initList);
        this.addTouchEvent(this.sBtn, this.saveFunc);

        this.tabBtn_0.selectedIndex = this.tabBtn_1.selectedIndex = 0;

        this.onCLick();

    }



    private onCLick(): void {
        GameCache.fashion.role = this.roleSelect.nSlRole;
        GameCache.fashion.dish = {}; // 切换角色清空试穿列表
        this.intiRole();
        this.initTab();
    }

    //初始化TAB栏
    private tabData: eui.ArrayCollection;
    private initTab(): void {
        this.tabIndex_0 = this.tabBtn_0.selectedIndex;
        let type = this.arr[this.tabIndex_0];
        let arr = [];
        for (let i = 0; i < type.length; i++) {
            let data = {
                icon: "fashion_json.fashion_" + type[i] + "_png",
                icon2: "fashion_json.fashion_" + type[i] + "_s_png",
            }
            arr.push(data);
        }
        this.tabBtn_1.dataProvider = new eui.ArrayCollection(arr);
        this.initList();
        this.initFashion();
    }

    // 初始化类型数据
    private initTypeData(): void {
        let conf = GameConfig.fashion;
        for (let i in conf) {
            let item: StdFashionequip = conf[i];
            if (!this.fashionBag[item.part]) this.fashionBag[item.part] = [];
            this.fashionBag[item.part].push(item);
        }
    }

    //初始化时装列表
    private initList(): void {
        let type_0 = this.tabBtn_0.selectedIndex;
        let type_1 = this.tabBtn_1.selectedIndex > this.arr[type_0].length - 1 ? 0 : this.tabBtn_1.selectedIndex;
        let type = PropId[this.arr[type_0][type_1]];
        let arr = this.fashionBag[type] ? this.fashionBag[type] : [];
        let arr_0 = [];
        for (let i = 0; i < arr.length; i++) {
            let item: StdFashionequip = arr[i];
            if (item.conds[0].value == this.roleSelect.job || item.conds[0].value == 0)
                arr_0.push(item);
        }
        this.setListData(this.itemList, arr_0);
    }

    //显示角色已装备时装item
    private initFashion(): void {
        let type_0 = this.tabBtn_0.selectedIndex;
        let arr = this.arr[type_0];
        let fashionData = GameCache.fashion.roleFashionData[this.roleSelect.roleId];
        let pro = GameCache.fashion.tempProp;
        this.mModel.refresh();
        for (let i = 0; i < 4; i++) {
            if (arr[i]) {
                let type = PropId[arr[i]];
                (this[`item_${i}`] as FashionEquipItem).visible = true;
                let item = GameCache.fashion.dish[type];
                !item && (item = fashionData && fashionData[type] ? fashionData[type] : null);
                if (item) {
                    (this[`item_${i}`] as FashionEquipItem).data = item;
                } else {
                    (this[`item_${i}`] as FashionEquipItem).reSet();
                    (this[`item_${i}`] as FashionEquipItem).initPartImg(arr[i]);
                }
            } else {
                (this[`item_${i}`] as FashionEquipItem).visible = false;
            }
        }
    }

    private intiRole(): void {
        GameCache.fashion.tempProp = GameCache.hero.list[this.roleSelect.nSlRole].pro.clone();
        this.mModel.setData(GameCache.fashion.tempProp);
    }


    private saveFunc(): void {
        GameCache.fashion.saveFunc(this.roleSelect.nSlRole);
    }

    private openCoordinate(): void {
        let view = new ViewProp();
        view.exData1 = this.roleSelect.job;
        App.ViewManager.open(ViewConst.COORDINATE, view);
    }
}