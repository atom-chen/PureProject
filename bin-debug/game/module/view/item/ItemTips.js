var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 物品提示窗口
 */
var ItemTips = (function (_super) {
    __extends(ItemTips, _super);
    function ItemTips() {
        var _this = _super.call(this, LayerManager.UI_Tips) || this;
        _this.baCount = 0;
        _this.reCount = 0;
        // 控件展示顺序
        _this.comIdx = [
            "zdlPart",
            "timePart",
            "descPart",
            "propPart",
            "propPartExtr1",
            "propPartExtr2",
            "gainway",
            "numSele",
            "pricePart",
            "btnPart",
            "customBtnpart",
        ];
        _this.skinName = "ItemTipsSkin";
        _this.closeDispose = false;
        return _this;
    }
    ItemTips.prototype.initUI = function () {
    };
    ItemTips.prototype.open = function (param) {
        if (param === void 0) { param = null; }
        _super.prototype.open.call(this);
        this.itemData = param.itemData;
        this.itemName.textFlow = TextFlowUtils.generateTextFlow(ItemUtils.getItemNamewithColor(this.itemData));
        if (param.exData1)
            this.userItem = param.exData1;
        if (param.exData2)
            this.plusData = param.exData2;
        if (param.firData)
            this.otherData = param.firData;
        this.item.data = this.userItem ? this.userItem : param.itemData;
        this.item.strengthLvl = this.userItem ? [this.userItem.btStrong] : [0];
        if (this.itemData["type"] == -1) {
            this.initFashion();
        }
        else {
            this.recycleCustomBtnPart();
            this.initLayout();
        }
        this.createTimePart();
        this.addTouchEvent(this.itemName, this.uuddlrlrbaba);
        this.addTouchEvent(this.reRect, this.deleItemDeBug);
    };
    ItemTips.prototype.close = function (param) {
        if (param === void 0) { param = null; }
        // this.recycle();
        _super.prototype.close.call(this);
        if (this.userItem)
            this.userItem = null;
        if (this.plusData)
            this.plusData = null;
        if (this.otherData)
            this.otherData = null;
        this.userItem = null;
        this.itemData = null;
        this.baCount = 0;
        this.reCount = 0;
    };
    //初始化布局
    ItemTips.prototype.initLayout = function () {
        this.recycleDesc();
        this.recycleNumSele();
        if (this.itemData.staitcAttrs && this.itemData.staitcAttrs.length) {
            this.createZdl(); //创建战力显示
            this.createPropPart();
        }
        else {
            this.recycleZDL();
            this.recyclePropPart();
            if (this.itemData.desc) {
                this.createDesc();
            }
        }
        if (this.itemData.jump && this.itemData.jump.length) {
            this.createWayPart();
        }
        else {
            this.recycleGainWay();
        }
        this.createBtnPart();
        if (this.itemData.conds || (this.userItem && this.userItem.stdItem.type === ItemType.itNormal)) {
            this.createDetail();
        }
        else {
            this.recycleDetail();
        }
        this.createPrice();
        this.sortComs();
    };
    //初始化时装布局
    ItemTips.prototype.initFashion = function () {
        this.recycleBtn();
        this.recycleNumSele();
        if (this.itemData.desc) {
            this.createDesc();
        }
        else {
            this.recycleDesc();
        }
        if (this.itemData.staitcAttrs) {
            this.createZdl(); //创建战力显示
            this.createPropPart();
        }
        else {
            this.recycleZDL();
            this.recyclePropPart();
        }
        if (this.itemData.conds) {
            this.createDetail();
        }
        else {
            this.recycleDetail();
        }
        if (this.otherData) {
            this.createCustomBtnPart();
        }
        else {
            this.recycleCustomBtnPart();
        }
        this.createPrice();
        this.sortComs();
    };
    ItemTips.prototype.sortComs = function () {
        for (var idx in this.comIdx) {
            var com = this.contentG.getChildByName(this.comIdx[idx]);
            if (com) {
                this.contentG.setChildIndex(com, Number(idx));
            }
        }
    };
    ItemTips.prototype.uuddlrlrbaba = function () {
        this.baCount++;
        if (true && this.baCount >= 5) {
            var obj = new ViewProp();
            if (this.itemData.id == GlobalVar.COIN || this.itemData.id == GlobalVar.GOLD) {
                var type = this.itemData.id == GlobalVar.COIN ? 1 : 3;
                obj.exData1 = "@AddMoney " + type + " ";
            }
            else {
                obj.exData1 = "@AddItem " + this.itemData.id + " ";
            }
            App.ViewManager.open(ViewConst.DEBUG, obj);
            this.baCount = 0;
        }
    };
    ItemTips.prototype.deleItemDeBug = function () {
        this.reCount++;
        if (true && this.reCount >= 1) {
            this.userItem && (GameCache.bag.recycleArr[this.userItem.series.toString()] = this.userItem);
            this.reCount = 0;
        }
    };
    //插入等级配置模块
    ItemTips.prototype.createDetail = function () {
        if (!this.detailPart) {
            this.detailPart = ObjectPool.get(DetailPart);
            this.detailG.addChild(this.detailPart);
        }
        var data = [];
        if (this.itemData.conds) {
            data = this.itemData.conds.concat();
            if (this.itemData.part || this.itemData.part == 0) {
                var cond = this.itemData.type != -1 ? StdItemCondition.part : StdItemCondition.fashionPart;
                data.push({ cond: cond, value: this.itemData.part });
            }
        }
        this.detailPart.data = data;
        if (this.userItem && this.userItem.stdItem.type === ItemType.itNormal) {
            this.detailPart.setItemDetail({ type: 200, num: this.userItem.btCount });
        }
    };
    //清除等级配置模块
    ItemTips.prototype.recycleDetail = function () {
        if (this.detailPart) {
            App.DisplayUtils.removeFromParent(this.detailPart);
            ObjectPool.push(this.detailPart);
            this.detailPart = null;
        }
    };
    //插入物品描述
    ItemTips.prototype.createDesc = function () {
        if (!this.descPart) {
            this.descPart = ObjectPool.get(ItemDesc);
            this.descPart.name = "descPart";
            this.contentG.addChildAt(this.descPart, this.comIdx.indexOf("descPart"));
        }
        this.descPart.data = this.itemData.desc;
    };
    //回收物品描述
    ItemTips.prototype.recycleDesc = function () {
        if (this.descPart) {
            this.descPart.desc.text = "";
            App.DisplayUtils.removeFromParent(this.descPart);
            ObjectPool.push(this.descPart);
            this.descPart = null;
        }
    };
    //插入战斗力显示
    ItemTips.prototype.createZdl = function () {
        if (!this.zdlPart) {
            this.zdlPart = ObjectPool.get(ZdlPart);
            this.zdlPart.name = "zdlPart";
            // let idx = this.descPart ? 2 : 0;
            this.contentG.addChildAt(this.zdlPart, this.comIdx.indexOf("zdlPart"));
        }
        this.zdlPart.data = this.itemData.staitcAttrs;
    };
    //回收战力显示
    ItemTips.prototype.recycleZDL = function () {
        if (this.zdlPart) {
            App.DisplayUtils.removeFromParent(this.zdlPart);
            ObjectPool.push(this.zdlPart);
            this.zdlPart = null;
        }
    };
    //插入属性模块
    ItemTips.prototype.createPropPart = function () {
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
        }
        else {
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
        }
        else {
            this.recyclePropPartExtr2();
        }
    };
    //回收属性模块
    ItemTips.prototype.recyclePropPart = function () {
        if (this.propPart) {
            this.propPart.data = null;
            App.DisplayUtils.removeFromParent(this.propPart);
        }
        this.recyclePropPartExtr1();
        this.recyclePropPartExtr2();
    };
    ItemTips.prototype.recyclePropPartExtr1 = function () {
        if (this.propPartExtr1) {
            this.propPartExtr1.data = null;
            App.DisplayUtils.removeFromParent(this.propPartExtr1);
        }
    };
    ItemTips.prototype.recyclePropPartExtr2 = function () {
        if (this.propPartExtr2) {
            this.propPartExtr2.data = null;
            App.DisplayUtils.removeFromParent(this.propPartExtr2);
        }
    };
    //插入获取途径模块
    ItemTips.prototype.createWayPart = function () {
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
    };
    ItemTips.prototype.onLink = function (e) {
        TextFlowUtils.hrefType(e.text);
    };
    //回收获取方式
    ItemTips.prototype.recycleGainWay = function () {
        if (this.gainway) {
            this.gainway.data = null;
            App.DisplayUtils.removeFromParent(this.gainway);
            ObjectPool.push(this.gainway);
            this.gainway = null;
        }
    };
    //插入按钮模块 以及 数量选择
    ItemTips.prototype.createBtnPart = function () {
        if (this.userItem) {
            if (!this.btnPart) {
                this.btnPart = ObjectPool.get(BtnPart);
                this.btnPart.name = "btnPart";
                this.contentG.addChildAt(this.btnPart, this.comIdx.indexOf("btnPart"));
            }
            this.btnPart.data = this.userItem;
        }
        else {
            this.recycleBtn();
        }
        if (this.itemData.type > ItemType.itEquipMax) {
            this.createNumUse();
        }
        else {
            this.recycleNumSele();
        }
    };
    //使用按钮回收
    ItemTips.prototype.recycleBtn = function () {
        if (this.btnPart) {
            App.DisplayUtils.removeFromParent(this.btnPart);
            this.btnPart = null;
        }
    };
    //插入自定义方法函数按钮模块
    ItemTips.prototype.createCustomBtnPart = function () {
        if (!this.customBtnpart) {
            this.customBtnpart = new CustomBtnpart();
            this.customBtnpart.name = "customBtnpart";
            this.contentG.addChildAt(this.customBtnpart, this.comIdx.indexOf("customBtnpart"));
        }
        this.customBtnpart.initPart(this.otherData["thisc"], this.otherData["func"], this.otherData["icon"], this.itemData);
    };
    //回收自定义按钮
    ItemTips.prototype.recycleCustomBtnPart = function () {
        if (this.customBtnpart) {
            App.DisplayUtils.removeFromParent(this.customBtnpart);
            this.customBtnpart = null;
        }
    };
    ItemTips.prototype.createNumUse = function () {
        if (!this.btnPart)
            return;
        if (!this.numSele) {
            this.numSele = ObjectPool.get(NumSelect);
            this.numSele.name = "numSele";
            // let idx = this.contentG.getChildIndex(this.btnPart);
            // idx = idx < 0 ? 0 : idx;
            this.numSele.skinName = "NumSelectSkin";
            this.contentG.addChildAt(this.numSele, this.comIdx.indexOf("numSele"));
        }
        this.userItem && this.numSele.initData(this.userItem.btCount, 1, 1);
    };
    //数量选择回收
    ItemTips.prototype.recycleNumSele = function () {
        if (this.numSele) {
            App.DisplayUtils.removeFromParent(this.numSele);
            ObjectPool.push(this.numSele);
            this.numSele = null;
        }
    };
    //价格模块
    ItemTips.prototype.createPrice = function () {
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
        }
        else {
            this.pricePart.cost.setData(this.itemData["needNum"][0].id, this.itemData["needNum"][0].count);
        }
    };
    ItemTips.prototype.recyclePrice = function () {
        if (this.pricePart) {
            App.DisplayUtils.removeFromParent(this.pricePart);
            this.pricePart = null;
        }
    };
    //时限模块
    ItemTips.prototype.createTimePart = function () {
        if (this.itemData.type == -1) {
            var roleId = GameCache.hero.getRoleIdByIndex(GameCache.fashion.role);
            if (!GameCache.fashion.timeLimitItem[roleId] || !GameCache.fashion.timeLimitItem[roleId][this.itemData.id]) {
                this.recycleTimePart();
                return;
            }
            var time = 0;
            time = GameCache.fashion.timeLimitItem[roleId][this.itemData.id];
            if (!time) {
                this.recycleTimePart();
                return;
            }
            if (!this.timePart) {
                this.timePart = new TimePart();
                this.timePart.name = "timePart";
                this.contentG.addChildAt(this.timePart, this.comIdx.indexOf("timePart"));
            }
            this.timePart.setData(time);
        }
    };
    //时限模块回收
    ItemTips.prototype.recycleTimePart = function () {
        if (this.timePart) {
            this.timePart.cleanTime();
            App.DisplayUtils.removeFromParent(this.timePart);
            this.timePart = null;
        }
    };
    //回收
    ItemTips.prototype.recycle = function () {
        this.recyclePropPart();
        this.recycleGainWay();
        this.recycleZDL();
        this.recycleNumSele();
        this.recycleBtn();
        this.recycleDesc();
        this.recycleDetail();
        this.recycleCustomBtnPart();
        this.recyclePrice();
    };
    //销毁
    ItemTips.prototype.dispose = function () {
        this.recycle();
        _super.prototype.dispose.call(this);
    };
    return ItemTips;
}(BaseEuiWindow));
__reflect(ItemTips.prototype, "ItemTips");
//# sourceMappingURL=ItemTips.js.map