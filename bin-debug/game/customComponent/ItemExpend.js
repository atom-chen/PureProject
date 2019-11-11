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
var ItemExpend = (function (_super) {
    __extends(ItemExpend, _super);
    function ItemExpend() {
        var _this = _super.call(this) || this;
        _this.label = "消耗：";
        _this.numColor_0 = 0x00a2ff;
        _this._item = 0;
        _this._needNum = 0;
        _this._packType = 0;
        _this._haveNum = 0;
        _this.showHaveNum = true;
        _this._dataItem = null;
        _this.skinName = "ItemExpendSkin";
        return _this;
        // if (GlobalVar.isWeXin) this.skinName = "ItemExpendSkin";
    }
    ItemExpend.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    ItemExpend.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.gainWay.textFlow = TextFlowUtils.generateTextFlow("<(u)" + this.gainWay.text + ">");
        this.update();
    };
    ItemExpend.prototype.$onAddToStage = function (stage, nestLevel) {
        _super.prototype.$onAddToStage.call(this, stage, nestLevel);
        App.MessageCenter.addListener(MsgConst.BAG_INFO, this.update, this);
        App.MessageCenter.addListener(MsgConst.BAG_ITEM_NUM, this.update, this);
        App.MessageCenter.addListener(MsgConst.PROPERTY + PropId.AP_COIN, this.update, this);
        App.MessageCenter.addListener(MsgConst.PROPERTY + PropId.AP_YUANBAO, this.update, this);
        this.gainWay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openTips, this);
        this.iconImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openTips, this);
        // App.MessageCenter.addProperty(this.update, this, ATTRIBUTE.GOLD, ATTRIBUTE.CONTRIBUTION, ATTRIBUTE.COIN, ATTRIBUTE.ZHENFA_RELIC);
        // this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.update();
    };
    ItemExpend.prototype.onTouch = function () {
        if (this._item) {
            // App.ViewManager.open(ViewConst.ITEMTIPSWIN, this._item);
        }
    };
    ItemExpend.prototype.openTips = function () {
        var item = GameConfig.item[this._item];
        var v = new ViewProp();
        v.itemData = item;
        App.ViewManager.open(ViewConst.ITEMTIPS, v);
    };
    ItemExpend.prototype.$onRemoveFromStage = function () {
        _super.prototype.$onRemoveFromStage.call(this);
        this.gainWay.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openTips, this);
        this.iconImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openTips, this);
        // this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        App.MessageCenter.removeAll(this);
    };
    Object.defineProperty(ItemExpend.prototype, "item", {
        get: function () {
            return this._item;
        },
        set: function (id) {
            this._item = id;
            this.update();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemExpend.prototype, "needNum", {
        get: function () {
            return this._needNum;
        },
        set: function (value) {
            this._needNum = value;
            this.update();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemExpend.prototype, "have", {
        get: function () {
            return this._haveNum;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemExpend.prototype, "isExpend", {
        get: function () {
            return this._haveNum >= this._needNum;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemExpend.prototype, "dataItem", {
        get: function () {
            return this._dataItem;
        },
        enumerable: true,
        configurable: true
    });
    ItemExpend.prototype.checkEnough = function () {
        if (this._haveNum < this._needNum) {
            if (this._item == GlobalVar.GOLD) {
                GlobalFun.gotoCharge();
            }
            else {
                this.openTips();
            }
        }
        return this._haveNum >= this._needNum;
        ;
    };
    ItemExpend.prototype.setData = function (item, needNum, packType) {
        if (needNum === void 0) { needNum = undefined; }
        if (packType === void 0) { packType = BagType.BAG_TYPE_OTHER; }
        this._item = item;
        this._needNum = needNum;
        this._packType = packType;
        this.update();
    };
    ItemExpend.prototype.setItemName = function () {
        if (this._item) {
            var item = GameConfig.item[this._item] ? GameConfig.item[this._item] : null;
            this.lab.text = item ? item.name + "：" : "";
        }
    };
    ItemExpend.prototype.update = function (msg) {
        if (!this.iconImg || !this._item)
            return;
        if (!GameConfig.item[this._item])
            return;
        this._dataItem = GameConfig.item[this._item];
        var item = GameConfig.item[this._item];
        var strImg = item ? item.icon : "";
        this.iconImg.source = RES_DIR_IMAGES_ITEM + strImg + ".png";
        this["stuffName"] && (this["stuffName"].text = item.name);
        if (this._needNum != undefined) {
            var str = GlobalFun + "";
            if (this.showHaveNum) {
                this._haveNum = this.haveNumber();
                var haveStr = GlobalFun.numCut(this._haveNum);
                // str = this._haveNum >= this._needNum ? TextFlowUtils.color(CommonUtils.overLength(this._haveNum) + "", "0x00FF00") : TextFlowUtils.color(this._haveNum + "", "0xFF0000");
                str = haveStr + "";
                str = str + " / " + this._needNum;
                str = this._haveNum >= this._needNum ? "<(c" + this.numColor_0 + ")" + str + ">" : "<(c0xFF0000)" + str + ">";
                if (this.currentState == "single")
                    str = "<(c" + this.numColor_0 + ")" + this._needNum + ">";
            }
            this.countTxt.textFlow = TextFlowUtils.generateTextFlow(str);
        }
        else {
            this.countTxt.textFlow = TextFlowUtils.generateTextFlow(this.haveNumber() + "");
        }
    };
    ItemExpend.prototype.haveNumber = function () {
        var num;
        return num = GameCache.bag.itemCount(this._item);
    };
    ItemExpend.prototype.cleanMsg = function () {
        App.MessageCenter.removeListener(MsgConst.BAG_INFO, this);
        App.MessageCenter.removeListener(MsgConst.BAG_ITEM_NUM, this);
    };
    ItemExpend.prototype.dispose = function () {
        if (this.iconImg) {
            this.iconImg.source = null;
        }
    };
    return ItemExpend;
}(eui.Component));
__reflect(ItemExpend.prototype, "ItemExpend", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=ItemExpend.js.map