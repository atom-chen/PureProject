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
 * create by junwei on 07/16/2019
 * 奖励提示窗
 */
var AwardTips = (function (_super) {
    __extends(AwardTips, _super);
    function AwardTips() {
        var _this = _super.call(this, LayerManager.UI_Tips) || this;
        _this.outSt = 0;
        _this.skinName = "AwardTipsSkin";
        _this.closeDispose = false;
        return _this;
    }
    AwardTips.prototype.init = function () {
        _super.prototype.init.call(this);
        this.itemList.itemRenderer = AwardItem;
        this.itemList_1.itemRenderer = AwardItem;
    };
    AwardTips.prototype.open = function (param) {
        if (!param || param == null)
            return;
        this.outSt = 0;
        this.firstData = param.firData;
        if (param.firData["state"]) {
            this.currentState = param.firData["state"];
        }
        else {
            this.currentState = "pass";
        }
        if (param.firData["func"]) {
            this.hander = Handler.create(param.firData["funcObj"], param.firData["func"], null, false);
        }
        if (param.firData["out"]) {
            this.outSt = 1;
        }
        this.countDown.text = StringUtils.substitute(Language.lang.autoTime, 7);
        App.DisplayUtils.buttonDownTime(this.recvBtn, 7, [this.countDown, Language.lang.autoTime]);
        this.addTouchEvent(this.recvBtn, this.closeView);
        this.addTouchEvent(this.actiBtn, this.out);
        this.initList(param.firData["itemArr"]);
        this.initState(param.firData);
    };
    AwardTips.prototype.close = function (param) {
        _super.prototype.close.call(this);
        if (this.outSt != 2) {
            this.recvFunc();
        }
        if (this.hander) {
            this.hander.dispose();
            this.hander = null;
        }
    };
    AwardTips.prototype.initList = function (itemArr) {
        this.setListData(this.itemList, itemArr);
    };
    /**直接退出 */
    AwardTips.prototype.out = function () {
        if (this.currentState == "copyTower") {
            if (this.outSt == 1) {
                this.outSt = 2;
            }
            Proxy.copy.sendQuit(GameCache.map.fbId);
            this.closeView();
            App.ViewManager.openTab(ViewConst.COPY, 1, 0);
        }
    };
    AwardTips.prototype.initState = function (firData) {
        if (this.currentState == "boss") {
            this.gsImg.visible = true;
            if (firData["itemArr1"]) {
                this.itemList_1.visible = true;
                this.setListData(this.itemList_1, firData["itemArr1"]);
                // this.gsImg.visible = false;
            }
            else {
                this.itemList_1.visible = false;
                // this.gsImg.visible = true;
            }
        }
        else if (this.currentState == "copy") {
            //材料副本评分
            var eva = GameCache.copy.copyEvaData[this.firstData["fbid"]];
            this["eva"].source = "awardTips_json.awardTips_l_" + eva + "_png";
        }
    };
    AwardTips.prototype.setList = function (type, arr) {
        this.gsImg.visible = false;
        if (type == 1) {
            this.setListData(this.itemList_1, arr);
        }
        else {
            this.setListData(this.itemList, arr);
        }
    };
    AwardTips.prototype.recvFunc = function () {
        if (this.hander) {
            this.hander.args = [this.firstData["fbid"], 0];
            this.hander.run();
        }
    };
    AwardTips.prototype.resetHandler = function (thisc, func) {
        if (this.hander) {
            // this.hander.args = [this.firstData["fbid"], 0];
            // this.hander.run();
            this.hander.dispose();
        }
        this.hander = Handler.create(thisc, func);
    };
    AwardTips.prototype.setCopyId = function (id) {
        this.firstData["fbid"] = id;
    };
    return AwardTips;
}(BaseEuiWindow));
__reflect(AwardTips.prototype, "AwardTips");
//# sourceMappingURL=AwardTips.js.map