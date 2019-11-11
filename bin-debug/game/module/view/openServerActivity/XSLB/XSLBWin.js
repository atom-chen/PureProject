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
 * @Description: 限时礼包窗口
 * @Author: xiejunwei
 * @Date: 2019-10-21 11:29:31
 */
var XSLBWin = (function (_super) {
    __extends(XSLBWin, _super);
    function XSLBWin() {
        var _this = _super.call(this, LayerManager.UI_Tips) || this;
        _this.lTime = 0;
        _this.day = 0;
        _this.skinName = "XSLBWinSkin";
        return _this;
    }
    XSLBWin.prototype.init = function () {
        _super.prototype.init.call(this);
        this.cost_0.numColor_0 = this.cost_0.lab.textColor = 0xffffff;
        this.cost_1.numColor_0 = this.cost_1.lab.textColor = 0xffffff;
    };
    XSLBWin.prototype.open = function (param) {
        _super.prototype.open.call(this);
        this.addTouchEvent(this.tabBtn, this.onTouche);
        this.addTouchEvent(this.buyBtn, this.buyFunc);
        this.message(MsgConst.XSYH_BUY_SUCCESS, this.onTouche);
        this.message(MsgConst.XSYH_BUY_SUCCESS, this.initCount);
        this.message(MsgConst.XSYH_INFO, this.onTouche);
        LayerManager.UI_Tips.setRectAlpha(0.7);
        App.DisplayUtils.addClickEff(this.tabBtn);
        this.tabBtn.selectedIndex = 0;
        this.initCount();
        this.initData();
        this.onTouche();
    };
    XSLBWin.prototype.close = function (param) {
        _super.prototype.close.call(this);
        LayerManager.UI_Tips.resetAlpha();
        this.confData = null;
        if (App.TimerManager.isExists(this.countDown, this)) {
            App.TimerManager.remove(this.countDown, this);
            this.lTime = 0;
        }
    };
    XSLBWin.prototype.dispose = function () {
        this.itemList.dispose();
        _super.prototype.dispose.call(this);
    };
    XSLBWin.prototype.initCount = function () {
        var servertime = GameCache.server.serverTime;
        this.lTime = App.DateUtils.DayEndTimeSe(servertime);
        if (!App.TimerManager.isExists(this.countDown, this)) {
            App.TimerManager.addDelay(0, 1000, 0, this.countDown, this);
        }
    };
    XSLBWin.prototype.countDown = function () {
        if (this.lTime < 0) {
            App.TimerManager.remove(this.countDown, this);
            this.lTime = 0;
        }
        else {
            this.lTime--;
            var str = App.DateUtils.getFormatBySecond(this.lTime, DateUtils.TIME_FORMAT_1);
            this.buyTime.text = StringUtils.substitute(Language.lang.restTime, str);
        }
    };
    XSLBWin.prototype.initData = function () {
        var day = GameCache.activity.serverOpen;
        var conf = GameConfig.xslb;
        var maxDay = Object.keys(conf).length;
        this.day = day > 0 && day < maxDay ? day : Object.keys(conf).length;
        this.confData = conf[this.day];
    };
    XSLBWin.prototype.onTouche = function () {
        var tar = this.tabBtn.selectedIndex + 1;
        var data = this.confData[tar];
        this.setAward(data);
        this.cost_0.setData(data.price.id, data.price.count);
        this.cost_1.setData(data.price.id, data.originalprice);
        var xslbData = GameCache.activity.xslbData[this.day];
        xslbData = xslbData ? xslbData : {};
        this.buyBtn.visible = xslbData[this.tabBtn.selectedIndex + 1] ? false : true;
        this.soldOut.visible = !this.buyBtn.visible;
    };
    XSLBWin.prototype.setAward = function (std) {
        if (std && std.showItem) {
            if (!this.itemList) {
                this.itemList = ObjectPool.get(ItemList);
            }
            this.itemList.setData(std.showItem, this.iG);
        }
        else {
            this.itemList.dispose();
        }
    };
    XSLBWin.prototype.buyFunc = function () {
        if (this.cost_0.checkEnough()) {
            Proxy.script.sendXSLBBuy(this.tabBtn.selectedIndex + 1);
        }
        else {
            this.closeView();
        }
    };
    return XSLBWin;
}(BaseEuiWindow));
__reflect(XSLBWin.prototype, "XSLBWin");
//# sourceMappingURL=XSLBWin.js.map