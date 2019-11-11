/**
 * create by junwei on 07/29/2019
 *
 */
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
var FashionCache = (function (_super) {
    __extends(FashionCache, _super);
    function FashionCache() {
        var _this = _super.call(this) || this;
        _this.roleFashionData = {};
        _this.fashionBag = {};
        _this.dish = {};
        _this.timeLimitItem = {};
        return _this;
    }
    FashionCache.prototype.clear = function () {
        this.fashionBag = {};
        this.tempProp = null;
        this.dish = {};
        this.timeLimitItem = {};
        this.roleFashionData = {};
    };
    /**
     * 初始化人物时装列表
     */
    FashionCache.prototype.initRoleFashion = function (id, roleId) {
        var item = GameConfig.fashion[id];
        if (!item)
            return;
        if (!this.roleFashionData[roleId])
            this.roleFashionData[roleId] = {};
        var fashionData = this.roleFashionData[roleId];
        fashionData[item.part] = item;
    };
    /**
     * 清空对应角色的时装列表
     * @param  {} roleId
     * @returns void
     */
    FashionCache.prototype.cleanRoleFashion = function (roleId) {
        if (this.roleFashionData[roleId]) {
            this.roleFashionData[roleId] = {};
        }
    };
    /**
     * 添加时装
     */
    FashionCache.prototype.addFashionItem = function (roleId, type, id) {
        if (!this.fashionBag[roleId]) {
            this.fashionBag[roleId] = {};
            this.fashionBag[roleId][type] = [id];
        }
        else if (!this.fashionBag[roleId][type]) {
            this.fashionBag[roleId][type] = [id];
        }
        else {
            this.fashionBag[roleId][type].push(id);
        }
        App.MessageCenter.dispatch(MsgConst.FASHION_GET);
    };
    /**删除时装 */
    FashionCache.prototype.deleteFashionItem = function (roleId, type, id) {
        if (!this.fashionBag[roleId] || !this.fashionBag[roleId][type])
            return;
        var idx = this.fashionBag[roleId][type].indexOf(id);
        if (idx < 0)
            return;
        this.fashionBag[roleId][type].splice(idx, 1);
    };
    /**购买时装 */
    FashionCache.prototype.fashionBuy = function (itemArr) {
        if (!itemArr.length)
            return;
        Proxy.fashion.sendOneBuy(this.role, itemArr);
        if (App.ViewManager.isShow(ViewConst.ITEMTIPS))
            App.ViewManager.close(ViewConst.ITEMTIPS);
    };
    /**试穿时装*/
    FashionCache.prototype.tryFashion = function (itemArr) {
        var job = GameCache.hero.getProByIndex(this.role).job - 1;
        for (var _i = 0, itemArr_1 = itemArr; _i < itemArr_1.length; _i++) {
            var i = itemArr_1[_i];
            this.tempProp.pro(i.part, i.shape[job]);
            this.dish[i.part] = i;
        }
        App.MessageCenter.dispatch(MsgConst.FASHION_TRY, itemArr);
    };
    /**卸下时装 */
    FashionCache.prototype.takeOff = function (itemArr) {
        if (itemArr.length == 8) {
            Proxy.fashion.sendOneTakeOff(this.role);
            App.MessageCenter.dispatch(MsgConst.FASHION_TRY, itemArr, false);
        }
        else {
            for (var _i = 0, itemArr_2 = itemArr; _i < itemArr_2.length; _i++) {
                var i = itemArr_2[_i];
                this.tempProp.pro(i.part, "");
                delete this.dish[i.part];
                Proxy.fashion.sendTakeOff(this.role, i.part);
            }
        }
        App.MessageCenter.dispatch(MsgConst.FASHION_TRY, itemArr, false);
    };
    /**检查角色是否拥有该时装 */
    FashionCache.prototype.checkHave = function (item) {
        var roleId = GameCache.hero.getRoleIdByIndex(this.role);
        var bag = this.fashionBag[roleId] && this.fashionBag[roleId][item.part] ? this.fashionBag[roleId][item.part] : [];
        if (!bag)
            return false;
        return bag.indexOf(item.id) != -1;
    };
    /**根据时装外观ID、部位、职业查找时装 */
    FashionCache.prototype.checkFashionId = function (faceId, part, job) {
        for (var i in GameConfig.fashion) {
            var item = GameConfig.fashion[i];
            if (item.part == part && (item.conds[0].value == 0 || item.conds[0].value == job)) {
                if (item.shape.indexOf(faceId) != -1)
                    return item;
            }
        }
    };
    FashionCache.prototype.saveFunc = function (role) {
        var buyList = [];
        var eqList = [];
        for (var i in this.dish) {
            var item = this.dish[i];
            if (this.checkHave(item)) {
                eqList.push(item);
            }
            else {
                buyList.push(item);
            }
        }
        if (buyList.length) {
            var view = new ViewProp();
            view.exData1 = buyList;
            view.exData2 = role;
            App.ViewManager.open(ViewConst.FASHIONBUY, view);
        }
        if (eqList.length) {
            Proxy.fashion.sendOneWear(role, eqList);
        }
    };
    return FashionCache;
}(BaseCache));
__reflect(FashionCache.prototype, "FashionCache");
//# sourceMappingURL=FashionCache.js.map