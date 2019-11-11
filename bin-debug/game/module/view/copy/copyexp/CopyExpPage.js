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
 * @Description: 经验副本面板
 * @Author: xiejunwei
 * @Date: 2019-09-02 15:09:12
 * @LastEditTime: 2019-10-28 19:35:09
 */
var CopyExpPage = (function (_super) {
    __extends(CopyExpPage, _super);
    function CopyExpPage($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.enterCount = 0;
        _this.skinName = "CopyExpPageSkin";
        return _this;
    }
    CopyExpPage.prototype.init = function () {
        _super.prototype.init.call(this);
    };
    CopyExpPage.red = function () {
        return GameCache.copy.checkCopyExp();
    };
    CopyExpPage.changeMsg = function () {
        return [MsgConst.COPY_COUNT];
    };
    CopyExpPage.prototype.open = function (param) {
        this.addTouchEvent(this.btn_0, this.enterCopy);
        this.addTouchEvent(this.buyBtn, this.countBuy);
        this.message(MsgConst.COPY_COUNT, this.initData);
        this.initData();
    };
    CopyExpPage.prototype.initData = function () {
        var dataArr = GameCache.copy.getCopyExpId();
        var conf = GameConfig.copyExp[dataArr[0]];
        this.item_0.data = conf.consume[0];
        this.cost.setData(conf.consume[0].id, conf.consume[0].count);
        var fbid = GameCache.copy.getCopyExpId()[1];
        var expConf = GameConfig.fuben[fbid];
        // let count = GameCache.copy.copyData[39] ? GameCache.copy.copyData[39].enter : 0;
        // count = 3 - count < 0 ? 0 : 3 - count;
        // this.enterCount = count;
        var data = GameCache.copy.copyExpBuyData ? GameCache.copy.copyExpBuyData : null;
        var boughtCount = data && data.boughtCount ? data.boughtCount : 0;
        var enterCount = data && data.enterCount ? data.enterCount : 0;
        var count = boughtCount + expConf.enterCfg[0].freeTimes - enterCount;
        this.enterCount = count;
        var str = StringUtils.substitute(Language.lang.remain, count + "/3");
        this.count.textFlow = TextFlowUtils.generateTextFlow(str);
    };
    CopyExpPage.prototype.enterCopy = function () {
        // if (this.enterCount == 1) {
        //     let gold = GameCache.hero.mainPro.pro(PropId.AP_YUANBAO);
        //     if (gold < 100) {
        //         GlobalFun.SysMsg("钻石不足");
        //         return;
        //     }
        // }
        if (this.enterCount == 0) {
            GlobalFun.SysMsg(Language.lang.jingji_t5);
            this.countBuy();
            return;
        }
        if (!this.cost.checkEnough()) {
            return;
        }
        GameCache.copy.enterCopyExp();
        App.ViewManager.close(ViewConst.COPY);
    };
    CopyExpPage.prototype.countBuy = function () {
        GlobalFun.openEnterBuy("exp");
    };
    return CopyExpPage;
}(BaseSpriteView));
__reflect(CopyExpPage.prototype, "CopyExpPage");
//# sourceMappingURL=CopyExpPage.js.map