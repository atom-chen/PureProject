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
 * @Description: 时装物品条目
 * @Author: xiejunwei
 * @Date: 2019-08-02 14:54:32
 * @LastEditTime: 2019-10-08 16:45:19
 */
var FashionItem = (function (_super) {
    __extends(FashionItem, _super);
    function FashionItem() {
        return _super.call(this) || this;
    }
    FashionItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    FashionItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (!this.data)
            return;
        this.initState();
        this.initHandler();
    };
    FashionItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    FashionItem.prototype.initState = function () {
        if (!GameCache.fashion.tempProp)
            return;
        var roleId = GameCache.hero.getRoleIdByIndex(GameCache.fashion.role);
        var item = GameCache.fashion.dish ? GameCache.fashion.dish[this.itemData.part] : null; //先检查试穿
        !item && (item = GameCache.fashion.roleFashionData[roleId] ? GameCache.fashion.roleFashionData[roleId][this.itemData.part] : null); //后检查人物身上时装
        if (item && item.id == this.itemData.id) {
            if (!this.onImg) {
                this.onImg = new eui.Image();
                this.onImg.source = "public_json.public_equip_tag2_png";
                this.onImg.x = -7;
                this.onImg.y = -5;
                this.addChild(this.onImg);
            }
            this.onImg.visible = true;
        }
        else {
            if (this.onImg)
                this.onImg.visible = false;
        }
        this.checkHave();
    };
    FashionItem.prototype.checkHave = function () {
        if (!this.itemData)
            return;
        if (!GameCache.fashion.checkHave(this.itemData)) {
            if (!this.lock) {
                this.lock = ObjectPool.get(eui.Image);
                this.lock.source = "public_json.public_lock_2_png";
                this.lock.x = 53;
                this.lock.y = 48;
                this.addChild(this.lock);
            }
            this.ico.filters = FilterUtils.DefaultGrayFilters;
            this.color.filters = FilterUtils.DefaultGrayFilters;
        }
        else {
            this.ico.filters = null;
            this.color.filters = null;
            if (this.lock) {
                this.lock.source = null;
                ObjectPool.push(this.lock);
                this.removeChild(this.lock);
                this.lock = null;
            }
        }
    };
    FashionItem.prototype.initHandler = function () {
        this.setHandler(this, this.openTips);
    };
    FashionItem.prototype.openTips = function () {
        var btnSrc = "";
        var func = [];
        var buy = GameCache.fashion.checkHave(this.itemData);
        var buystr = buy ? "res/btn/share.png" : "res/btn/buy.png";
        if (this.onImg && this.onImg.visible) {
            btnSrc = "res/btn/takeOff.png";
            func = [this.takeOff, this.buyFashion];
        }
        else {
            btnSrc = buy ? "res/btn/wear.png" : "res/btn/fashion_try.png";
            func = [this.sendMsg, this.buyFashion];
        }
        var view = new ViewProp();
        view.itemData = this.itemData;
        var obj = {
            thisc: this,
            func: func,
            icon: [btnSrc, buystr]
        };
        view.firData = obj;
        App.ViewManager.open(ViewConst.ITEMTIPS, view);
    };
    FashionItem.prototype.sendMsg = function () {
        GameCache.fashion.tryFashion([this.itemData]);
        App.ViewManager.close(ViewConst.ITEMTIPS);
    };
    FashionItem.prototype.buyFashion = function () {
        var item = GameConfig.item[this.itemData["needNum"][0].id];
        var need = this.itemData["needNum"][0].count;
        var have = GameCache.bag.itemCount(this.itemData["needNum"][0].id);
        var buy = GameCache.fashion.checkHave(this.itemData);
        if (!buy) {
            if (need <= have) {
                GameCache.fashion.fashionBuy([this.itemData]);
            }
            else {
                var str = StringUtils.substitute(Language.lang.notEnought, item.name);
                GlobalFun.SysMsg(str);
            }
        }
        else {
            GameCache.chat.showOffItem(this.itemData);
        }
        App.ViewManager.close(ViewConst.ITEMTIPS);
    };
    FashionItem.prototype.takeOff = function () {
        GameCache.fashion.takeOff([this.itemData]);
        App.ViewManager.close(ViewConst.ITEMTIPS);
    };
    return FashionItem;
}(ItemBase));
__reflect(FashionItem.prototype, "FashionItem");
//# sourceMappingURL=FashionItem.js.map