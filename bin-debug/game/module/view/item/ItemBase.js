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
/*
 * @Description:  物品基本条目
 * @Author: xiejunwei
 * @Date: 2019-08-15 22:02:37
 */
var ItemBase = (function (_super) {
    __extends(ItemBase, _super);
    function ItemBase() {
        var _this = _super.call(this) || this;
        /**ItemBase类型 */
        _this.typeItem = 0;
        _this.showArrow = true;
        _this.showColor = true;
        _this.count = 1;
        return _this;
    }
    ItemBase.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.enabled = true;
        // this.addEvent(egret.TouchEvent.TOUCH_BEGIN, this.ico, () => {
        //     this.ico.scaleX = 0.9;
        //     this.ico.scaleY = 0.9;
        // });
        // this.addEvent(egret.TouchEvent.TOUCH_END, this.ico, () => {
        //     this.ico.scaleX = 1;
        //     this.ico.scaleY = 1;
        // });
    };
    ItemBase.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.count = 1;
        if (this.data) {
            this.initData();
        }
        ;
        App.DisplayUtils.addClickEff(this.ico);
        this.showZLflag();
        this.showJob();
        this.showEff();
        this.showLv();
    };
    ItemBase.prototype.initData = function () {
        var data;
        this._userItem = null;
        if (this.data instanceof StdItem || this.data["type"] == -1) {
            data = this.data;
        }
        else if (this.data instanceof UserItem) {
            data = this.data.stdItem;
            this._userItem = this.data;
            this.count = this.data.btCount;
        }
        else if (typeof (this.data) == "number") {
            data = this.getItemById(this.data);
        }
        else if (this.data["length"]) {
            this.count = this.data[1];
            data = this.getItemById(this.data[0]);
        }
        else if (this.data["id"]) {
            this.count = this.data.count ? this.data.count : 1;
            data = this.getItemById(this.data["id"]);
        }
        this._itemData = data;
        this.initLayout();
    };
    ItemBase.prototype.initLayout = function () {
        if (!this._itemData)
            return;
        this.ico.source = RES_DIR_IMAGES_ITEM + this._itemData.icon + ".png";
        if (this.itemName) {
            this.itemName.textFlow = TextFlowUtils.generateTextFlow(ItemUtils.getItemNamewithColor(this._itemData));
        }
        this.num.text = this.count + "";
        this.num.visible = this.count > 1;
        if (this.showColor)
            this.color.source = this._itemData.showQuality <= 1 ? null : "public_json.public_item_color_" + this._itemData.showQuality + "_png";
    };
    ItemBase.prototype.showEff = function () {
        if (this._itemData && this._itemData.eff) {
            if (!this.eff) {
                this.eff = MovieClip.create();
                this.addChild(this.eff);
                this.eff.x = 40;
                this.eff.y = 40;
            }
            this.eff.loadFile(RES_DIR_EFF + this._itemData.eff, -1);
        }
        else {
            if (this.eff) {
                this.eff.dispose();
                this.eff = null;
            }
        }
    };
    ItemBase.prototype.showZLflag = function () {
        if (!this.zlflag || !this.showArrow)
            return;
        if (!this.data || !this._itemData) {
            this.zlflag.visible = false;
            return;
        }
        var hide = !ItemUtils.isEquip(this._itemData);
        if (!hide) {
            if (!this._userItem || this._userItem.sourceType != ItemSourceType.BAG) {
                hide = true;
            }
            if (!hide) {
                var ref = GameCache.equip.compartPower(this._itemData);
                if (ref == 0)
                    hide = true;
                else if (ref > 0)
                    this.zlflag.source = "public_json.public_g_allow_png";
                else
                    hide = true; //this.zlflag.source = "public_json.public_r_allow_png";
            }
        }
        this.zlflag.visible = !hide;
    };
    ItemBase.prototype.showJob = function () {
        if (!this.jobImg)
            return;
        var job;
        if (this._userItem &&
            (this._userItem.sourceType == ItemSourceType.ROLEEQUIP || this._userItem.sourceType == ItemSourceType.OTHER_ROLEEQUIP)) {
            job = 0;
        }
        else {
            job = this._itemData && ItemUtils.isEquip(this._itemData) && ItemUtils.getEquipJob(this._itemData);
        }
        if (job) {
            this.jobImg.source = "public_itemjob" + job + "_png";
        }
        else {
            this.jobImg.source = null;
        }
    };
    ItemBase.prototype.showLv = function () {
        if (!this.usLevel)
            return;
        var lv;
        if (this._userItem &&
            (this._userItem.sourceType == ItemSourceType.ROLEEQUIP || this._userItem.sourceType == ItemSourceType.OTHER_ROLEEQUIP)) {
            lv = 0;
        }
        else {
            lv = this._itemData && ItemUtils.isEquip(this._itemData) && ItemUtils.getUsLv(this._itemData);
        }
        if (lv) {
            this.usLevel.text = StringUtils.substitute(Language.lang.usLv, lv);
        }
        else {
            this.usLevel.text = "";
        }
    };
    Object.defineProperty(ItemBase.prototype, "partSource", {
        set: function (value) {
            if (!this.part) {
                this.part = new eui.Image();
                this.part.x = 5;
                this.part.y = 54;
                this.addChild(this.part);
            }
            this.part.source = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemBase.prototype, "itemData", {
        get: function () {
            return this._itemData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemBase.prototype, "userItem", {
        get: function () {
            return this._userItem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemBase.prototype, "enabled", {
        set: function (value) {
            _super.prototype.$setEnabled = value;
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            value && this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        },
        enumerable: true,
        configurable: true
    });
    ItemBase.prototype.setHandler = function (thisc, func, args) {
        if (this.handler) {
            this.handler.dispose();
        }
        this.handler = Handler.create(thisc, func, args, false);
    };
    ItemBase.prototype.getItemById = function (id) {
        for (var i in GameConfig.item) {
            if (GameConfig.item[i].id == id) {
                return GameConfig.item[i];
            }
        }
        return null;
    };
    ItemBase.prototype.onTouch = function () {
        if (App.ViewManager.isShow(ViewConst.ITEMTIPS))
            return;
        if (this.handler) {
            this.handler.run();
        }
        else {
            if (this._itemData) {
                GlobalFun.itemTips(this._userItem || this._itemData);
            }
        }
    };
    ItemBase.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        App.DisplayUtils.removeClickEff(this.ico);
        this.enabled = false;
        if (!this.data) {
            //图片Ico置空
            this.ico.source = null;
        }
        this.disposeHandler();
    };
    /**重置 */
    ItemBase.prototype.reSet = function () {
        this.data = null;
        this._itemData = null;
        this.num.text = "";
        this.color.source = null;
        this.ico.source = null;
        if (this.eff) {
            this.eff.dispose();
            this.eff = null;
        }
        if (this.itemName)
            this.itemName.text = "";
    };
    /**设置item 图片 */
    ItemBase.prototype.setIconImg = function (str) {
        if (str) {
            this.ico.source = str;
        }
    };
    /**品质框 */
    ItemBase.prototype.setColorImg = function (str) {
        if (str === void 0) { str = null; }
        this.color.source = str;
    };
    /**设置背景*/
    ItemBase.prototype.setBgImg = function (str) {
        this.bg.source = str;
    };
    /** 设置数量 */
    ItemBase.prototype.setCount = function (val) {
        if (!val || val < 0) {
            this.count = 1;
        }
        this.count = val;
    };
    Object.defineProperty(ItemBase.prototype, "select", {
        get: function () {
            return this.sele.visible;
        },
        set: function (value) {
            this.sele.visible = value;
        },
        enumerable: true,
        configurable: true
    });
    ItemBase.prototype.disposeHandler = function () {
        if (this.handler) {
            this.handler.dispose();
            this.handler = null;
        }
    };
    return ItemBase;
}(BaseCustComponent));
__reflect(ItemBase.prototype, "ItemBase");
//# sourceMappingURL=ItemBase.js.map