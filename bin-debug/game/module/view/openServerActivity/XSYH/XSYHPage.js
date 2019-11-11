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
 * @Description: 限时优惠页面
 * @Author: xiejunwei
 * @Date: 2019-10-14 10:07:09
 */
var XSYHPage = (function (_super) {
    __extends(XSYHPage, _super);
    function XSYHPage($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.lTime = 0;
        _this.skinName = "XSYHPageSkin";
        return _this;
    }
    XSYHPage.prototype.init = function () {
        _super.prototype.init.call(this);
        this.itemList.itemRenderer = XSYHItem;
    };
    XSYHPage.prototype.open = function (param) {
        _super.prototype.open.call(this);
        this.message(MsgConst.XSYH_BUY_SUCCESS, this.initList);
        this.message(MsgConst.XSYH_BUY_SUCCESS, this.initCount);
        this.message(MsgConst.XSYH_INFO, this.initList);
        // !this.lTime && (this.lTime = App.DateUtils.DayEndTimeSe(servertime));
        this.initCount();
    };
    XSYHPage.prototype.close = function (param) {
        _super.prototype.close.call(this);
        if (App.TimerManager.isExists(this.countDown, this)) {
            App.TimerManager.remove(this.countDown, this);
            this.lTime = 0;
        }
    };
    XSYHPage.prototype.initCount = function () {
        var servertime = GameCache.server.serverTime;
        this.lTime = App.DateUtils.DayEndTimeSe(servertime);
        this.initList();
        if (!App.TimerManager.isExists(this.countDown, this)) {
            App.TimerManager.addDelay(0, 1000, 0, this.countDown, this);
        }
    };
    XSYHPage.prototype.initList = function () {
        var maxLength = Object.keys(GameConfig.xsyh).length;
        var day = GameCache.activity.serverOpen > maxLength ? maxLength : GameCache.activity.serverOpen;
        var data = GameCache.activity.xsyhData;
        day = day ? day : 1;
        var conf = GameConfig.xsyh[day];
        var arr = [];
        for (var i in conf) {
            var item = {
                state: data && data[day] && data[day][conf[i].id] >= 1 ? false : true,
                id: conf[i].id,
                item: conf[i].item,
                price: [conf[i].price.id, conf[i].price.count],
                originalprice: conf[i].originalprice,
                vip: conf[i].vipLimit,
                discount: conf[i].discount
            };
            arr.push(item);
        }
        this.setListData(this.itemList, arr);
    };
    XSYHPage.prototype.countDown = function () {
        if (this.lTime < 0) {
            App.TimerManager.remove(this.countDown, this);
            this.lTime = 0;
        }
        else {
            this.lTime--;
            var str = App.DateUtils.getFormatBySecond(this.lTime, DateUtils.TIME_FORMAT_1);
            str = str.replace(/:/g, "s");
            this.num.value = str;
        }
    };
    return XSYHPage;
}(BaseSpriteView));
__reflect(XSYHPage.prototype, "XSYHPage");
//# sourceMappingURL=XSYHPage.js.map