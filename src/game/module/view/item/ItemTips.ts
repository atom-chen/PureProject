/**
 * 物品提示窗口
 */
class ItemTips extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Tips);
        this.skinName = "ItemTipsSkin";
        this.closeDispose = false;
    }

    public item: ItemBase;
    public contentG: eui.Group;
    public itemName: eui.Label;
    public detailG: eui.Group;
    public reRect: eui.Rect;


    private btnPart: BtnPart;
    private propPart: PropPart;
    private propPartExtr1: PropPartExtr;
    private propPartExtr2: PropPartExtr;
    private gainway: GainWay;
    private zdlPart: ZdlPart;
    private descPart: ItemDesc;
    private detailPart: DetailPart;
    private customBtnpart: CustomBtnpart;
    private pricePart: PricePart;
    private timePart: TimePart;
    //插入数量选择模块
    private numSele: NumSelect;

    private userItem: UserItem;
    private itemData: StdItem;
    private plusData;
    private otherData;

    private baCount = 0;
    private reCount = 0;

    // 控件展示顺序
    private comIdx = [
        "zdlPart",// 战斗力
        "timePart", // 时限
        "descPart",// 道具描述
        "propPart", // 属性
        "propPartExtr1", // 强化属性
        "propPartExtr2", // 精练属性
        "gainway", // 获取方式
        "numSele", // 数量选择
        "pricePart", // 价格
        "btnPart", // 按钮组
        "customBtnpart", // 自定义按钮组
    ];

    protected initUI(): void {

    }

    public open(param: ViewProp = null): void {

        super.open();
        this.itemData = param.itemData;
        this.itemName.textFlow = TextFlowUtils.generateTextFlow(ItemUtils.getItemNamewithColor(this.itemData));
        if (param.exData1) this.userItem = param.exData1;
        if (param.exData2) this.plusData = param.exData2;
        if (param.firData) this.otherData = param.firData;
        this.item.data = this.userItem ? this.userItem : param.itemData;
        (this.item as EquipItem).strengthLvl = this.userItem ? [this.userItem.btStrong] : [0];
        if (this.itemData["type"] == -1) {
            this.initFashion();
        } else {
            this.recycleCustomBtnPart();
            this.initLayout();
        }
        this.createTimePart();

        this.addTouchEvent(this.itemName, this.uuddlrlrbaba);
        this.addTouchEvent(this.reRect, this.deleItemDeBug);
    }

    public close(param: ViewProp = null): void {
        // this.recycle();
        super.close();
        if (this.userItem) this.userItem = null;
        if (this.plusData) this.plusData = null;
        if (this.otherData) this.otherData = null;
        this.userItem = null;
        this.itemData = null;

        this.baCount = 0;
        this.reCount = 0;
    }

    //初始化布局
    private initLayout(): void {
        this.recycleDesc();
        this.recycleNumSele();
        if (this.itemData.staitcAttrs && this.itemData.staitcAttrs.length) {
            this.createZdl();  //创建战力显示
            this.createPropPart();
        } else {
            this.recycleZDL();
            this.recyclePropPart();
            if (this.itemData.desc) {
                this.createDesc();
            }
        }

        if (this.itemData.jump && this.itemData.jump.length) {
            this.createWayPart();
        } else {
            this.recycleGainWay();
        }
        this.createBtnPart();
        if (this.itemData.conds || (this.userItem && this.userItem.stdItem.type === ItemType.itNormal)) {
            this.createDetail();
        } else {
            this.recycleDetail();
        }
        this.createPrice();
        this.sortComs();
    }

    //初始化时装布局
    private initFashion(): void {
        this.recycleBtn();
        this.recycleNumSele();
        if (this.itemData.desc) {
            this.createDesc();
        } else {
            this.recycleDesc();
        }
        if (this.itemData.staitcAttrs) {
            this.createZdl();  //创建战力显示
            this.createPropPart();
        } else {
            this.recycleZDL();
            this.recyclePropPart();
        }
        if (this.itemData.conds) {
            this.createDetail();
        } else {
            this.recycleDetail();
        }
        if (this.otherData) {
            this.createCustomBtnPart();
        } else {
            this.recycleCustomBtnPart();
        }
        this.createPrice();
        this.sortComs();
    }

    private sortComs(): void {
        for (let idx in this.comIdx) {
            let com = this.contentG.getChildByName(this.comIdx[idx]);
            if (com) {
                this.contentG.setChildIndex(com, Number(idx));
            }
        }
    }

    private uuddlrlrbaba(): void {
        this.baCount++;
        if (DEBUG && this.baCount >= 5) {
            let obj: ViewProp = new ViewProp();
            if (this.itemData.id == GlobalVar.COIN || this.itemData.id == GlobalVar.GOLD) {
                let type = this.itemData.id == GlobalVar.COIN ? 1 : 3;
                obj.exData1 = `@AddMoney ${type} `;
            } else {
                obj.exData1 = `@AddItem ${this.itemData.id} `;
            }
            App.ViewManager.open(ViewConst.DEBUG, obj);
            this.baCount = 0;
        }
    }

    private deleItemDeBug(): void {
        this.reCount++;
        if (DEBUG && this.reCount >= 1) {
            this.userItem && (GameCache.bag.recycleArr[this.userItem.series.toString()] = this.userItem);
            this.reCount = 0;
        }
    }

    //插入等级配置模块
    private createDetail(): void {
        if (!this.detailPart) {
            this.detailPart = ObjectPool.get(DetailPart);
            this.detailG.addChild(this.detailPart);
        }
        let data = [];
        if (this.itemData.conds) {
            data = this.itemData.conds.concat();
            if (this.itemData.part || this.itemData.part == 0) {
                let cond = this.itemData.type != -1 ? StdItemCondition.part : StdItemCondition.fashionPart;
                data.push({ cond: cond, value: this.itemData.part });
            }
        }
        this.detailPart.data = data;
        if (this.userItem && this.userItem.stdItem.type === ItemType.itNormal) {
            this.detailPart.setItemDetail({ type: 200, num: this.userItem.btCount });
        }
    }

    //清除等级配置模块
    private recycleDetail(): void {
        if (this.detailPart) {
            App.DisplayUtils.removeFromParent(this.detailPart);
            ObjectPool.push(this.detailPart);
            this.detailPart = null;
        }
    }


    //插入物品描述
    private createDesc(): void {
        if (!this.descPart) {
            this.descPart = ObjectPool.get(ItemDesc);
            this.descPart.name = "descPart";
            this.contentG.addChildAt(this.descPart, this.comIdx.indexOf("descPart"));
        }
        this.descPart.data = this.itemData.desc;
    }

    //回收物品描述
    private recycleDesc(): void {
        if (this.descPart) {
            this.descPart.desc.text = "";
            App.DisplayUtils.removeFromParent(this.descPart);
            ObjectPool.push(this.descPart);
            this.descPart = null;
        }
    }

    //插入战斗力显示
    private createZdl(): void {
        if (!this.zdlPart) {
            this.zdlPart = ObjectPool.get(ZdlPart);
            this.zdlPart.name = "zdlPart";
            // let idx = this.descPart ? 2 : 0;
            this.contentG.addChildAt(this.zdlPart, this.comIdx.indexOf("zdlPart"));
        }
        this.zdlPart.data = this.itemData.staitcAttrs;
    }

    //回收战力显示
    private recycleZDL(): void {
        if (this.zdlPart) {
            App.DisplayUtils.removeFromParent(this.zdlPart);
            ObjectPool.push(this.zdlPart);
            this.zdlPart = null;
        }
    }



    //插入属性模块
    private createPropPart(): void {
        if (!this.propPart) {
            this.propPart = ObjectPool.get(PropPart);
            this.propPart.name = "propPart";
            this.propPart.skinName = "PropPart2Skin";
        }
        // let idx = this.zdlPart ? this.contentG.getChildIndex(this.zdlPart) + 1 : 0;
        this.contentG.addChildAt(this.propPart, this.comIdx.indexOf("propPart"));
        this.propPart.setData(this.itemData.staitcAttrs, undefined);
        // 强化属性显示
        if (this.plusData && this.plusData[0]) {
            if (!this.propPartExtr1) {
                this.propPartExtr1 = ObjectPool.get(PropPartExtr);
                this.propPartExtr1.name = "propPartExtr1";
                this.propPartExtr1.title.text = Language.lang.strengProTtl;
            }
            this.propPartExtr1 && this.contentG.addChildAt(this.propPartExtr1, this.comIdx.indexOf("propPartExtr1"));
            this.propPartExtr1.setData(this.plusData[0], undefined);
        } else {
            this.recyclePropPartExtr1();
        }
        // 精炼属性
        if (this.plusData && this.plusData[1]) {
            if (!this.propPartExtr2) {
                this.propPartExtr2 = ObjectPool.get(PropPartExtr);
                this.propPartExtr2.name = "propPartExtr2";
                this.propPartExtr2.title.text = Language.lang.refineProTtl;
            }
            this.propPartExtr2 && this.contentG.addChildAt(this.propPartExtr2, this.comIdx.indexOf("propPartExtr2"));
            this.propPartExtr2.setData(this.plusData[1], undefined);
        } else {
            this.recyclePropPartExtr2();
        }
    }

    //回收属性模块
    private recyclePropPart(): void {
        if (this.propPart) {
            this.propPart.data = null;
            App.DisplayUtils.removeFromParent(this.propPart);
        }
        this.recyclePropPartExtr1();
        this.recyclePropPartExtr2();
    }

    private recyclePropPartExtr1(): void {
        if (this.propPartExtr1) {
            this.propPartExtr1.data = null;
            App.DisplayUtils.removeFromParent(this.propPartExtr1);
        }
    }

    private recyclePropPartExtr2(): void {
        if (this.propPartExtr2) {
            this.propPartExtr2.data = null;
            App.DisplayUtils.removeFromParent(this.propPartExtr2);
        }
    }

    //插入获取途径模块
    private createWayPart(): void {
        if (!this.gainway) {
            this.gainway = ObjectPool.get(GainWay);
            this.gainway.name = "gainway";
            // let idx = 0;
            // if (this.descPart) idx = this.contentG.getChildIndex(this.descPart) + 1;
            // if (this.propPart) idx = this.contentG.getChildIndex(this.propPart) + 1;
            // if (this.propPartExtr1) idx = this.contentG.getChildIndex(this.propPartExtr1) + 1;
            // if (this.propPartExtr2) idx = this.contentG.getChildIndex(this.propPartExtr2) + 1;
            this.contentG.addChildAt(this.gainway, this.comIdx.indexOf("gainway"));
        }
        this.gainway.data = this.itemData.jump;
    }

    private onLink(e: egret.TextEvent): void {
        TextFlowUtils.hrefType(e.text);
    }

    //回收获取方式
    private recycleGainWay(): void {
        if (this.gainway) {
            this.gainway.data = null;
            App.DisplayUtils.removeFromParent(this.gainway);
            ObjectPool.push(this.gainway);
            this.gainway = null;
        }
    }



    //插入按钮模块 以及 数量选择
    private createBtnPart(): void {
        if (this.userItem) {
            if (!this.btnPart) {
                this.btnPart = ObjectPool.get(BtnPart);
                this.btnPart.name = "btnPart";
                this.contentG.addChildAt(this.btnPart, this.comIdx.indexOf("btnPart"));
            }
            this.btnPart.data = this.userItem;
        } else {
            this.recycleBtn();
        }
        if (this.itemData.type > ItemType.itEquipMax) {
            this.createNumUse();
        } else {
            this.recycleNumSele();
        }
    }

    //使用按钮回收
    private recycleBtn(): void {
        if (this.btnPart) {
            App.DisplayUtils.removeFromParent(this.btnPart);
            this.btnPart = null;
        }
    }

    //插入自定义方法函数按钮模块
    private createCustomBtnPart(): void {
        if (!this.customBtnpart) {
            this.customBtnpart = new CustomBtnpart();
            this.customBtnpart.name = "customBtnpart";
            this.contentG.addChildAt(this.customBtnpart, this.comIdx.indexOf("customBtnpart"));
        }
        this.customBtnpart.initPart(this.otherData["thisc"], this.otherData["func"], this.otherData["icon"], this.itemData);
    }

    //回收自定义按钮
    private recycleCustomBtnPart(): void {
        if (this.customBtnpart) {
            App.DisplayUtils.removeFromParent(this.customBtnpart);
            this.customBtnpart = null;
        }
    }


    private createNumUse(): void {
        if (!this.btnPart) return;
        if (!this.numSele) {
            this.numSele = ObjectPool.get(NumSelect);
            this.numSele.name = "numSele";
            // let idx = this.contentG.getChildIndex(this.btnPart);
            // idx = idx < 0 ? 0 : idx;
            this.numSele.skinName = "NumSelectSkin";
            this.contentG.addChildAt(this.numSele, this.comIdx.indexOf("numSele"));
        }
        this.userItem && this.numSele.initData(this.userItem.btCount, 1, 1);
    }

    //数量选择回收
    private recycleNumSele(): void {
        if (this.numSele) {
            App.DisplayUtils.removeFromParent(this.numSele);
            ObjectPool.push(this.numSele);
            this.numSele = null;
        }
    }

    //价格模块
    private createPrice(): void {
        if (!this.itemData.dealPrice && !this.itemData["needNum"]) {
            this.recyclePrice();
            return;
        }
        if (!this.pricePart) {
            this.pricePart = new PricePart();
            this.pricePart.name = "pricePart";
            // let idx = 0;
            // if (this.btnPart) idx = this.contentG.getChildIndex(this.btnPart);
            // if (this.customBtnpart) idx = this.contentG.getChildIndex(this.customBtnpart);
            this.contentG.addChildAt(this.pricePart, this.comIdx.indexOf("pricePart"));
        }
        this.pricePart.cost.numColor_0 = ColorUtil.C_WHITE;
        if (this.itemData.dealPrice) {
            this.pricePart.cost.setData(this.itemData.dealType, this.itemData.dealPrice);
        } else {
            this.pricePart.cost.setData(this.itemData["needNum"][0].id, this.itemData["needNum"][0].count);
        }
    }

    private recyclePrice(): void {
        if (this.pricePart) {
            App.DisplayUtils.removeFromParent(this.pricePart);
            this.pricePart = null;
        }
    }

    //时限模块
    private createTimePart(): void {
        if (this.itemData.type == -1) {
            let roleId = GameCache.hero.getRoleIdByIndex(GameCache.fashion.role);
            if (!GameCache.fashion.timeLimitItem[roleId] || !GameCache.fashion.timeLimitItem[roleId][this.itemData.id]) {
                this.recycleTimePart();
                return
            }
            let time = 0;
            time = GameCache.fashion.timeLimitItem[roleId][this.itemData.id];
            if (!time) {
                this.recycleTimePart();
                return
            }
            if (!this.timePart) {
                this.timePart = new TimePart();
                this.timePart.name = "timePart";
                this.contentG.addChildAt(this.timePart, this.comIdx.indexOf("timePart"));
            }
            this.timePart.setData(time);
        }
    }

    //时限模块回收
    private recycleTimePart(): void {
        if (this.timePart) {
            this.timePart.cleanTime();
            App.DisplayUtils.removeFromParent(this.timePart);
            this.timePart = null
        }
    }


    //回收
    private recycle(): void {
        this.recyclePropPart();
        this.recycleGainWay();
        this.recycleZDL();
        this.recycleNumSele();
        this.recycleBtn();
        this.recycleDesc();
        this.recycleDetail();
        this.recycleCustomBtnPart();
        this.recyclePrice();

    }

    //销毁
    public dispose(): void {
        this.recycle();
        super.dispose();

    }
}