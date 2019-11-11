/*
 * @Description:
 * @Author: xiejunwei
 * @Date: 2019-09-27 19:33:32
 */
/**
 * Debug窗口
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
var DeBugWin = (function (_super) {
    __extends(DeBugWin, _super);
    function DeBugWin() {
        var _this = _super.call(this, LayerManager.UI_Message) || this;
        _this.cmArr = [
            ["@AddItem ", "加道具"],
            ["@openWin ", "打开窗口"],
            ["@SkillEdit", "打开技能特效调试"],
            ["@debugDragon", "龙骨测试"],
            ["@guide 1", "引导"],
            ["@usSkill 2", "强制使用技能"],
            ["@setCellXY", "设置人物格子坐标"],
            ["@AddEqSet", "勇士装备全家桶"],
            ["@AddAESet", "冒险者全家桶"],
            ["@AddMoney ", "添加金钱"],
            ["@Level ", "升级"],
            ["@AddHero ", "添加副角色"],
            ["@setSysTime ", "设置服务器时间"],
            ["@textFlow", "富文本格式测试"],
            ["@emojiSize ", "表情大小"],
            ["@winCon", "功能开启限制"]
        ];
        _this.skinName = "DebugWinSkin";
        _this.left = 0;
        _this.top = 0;
        return _this;
    }
    DeBugWin.prototype.initUI = function () {
    };
    DeBugWin.prototype.open = function (param) {
        if (param === void 0) { param = null; }
        _super.prototype.open.call(this);
        if (param && param.exData1) {
            this.inText.text = param.exData1;
        }
        this.addEvent(egret.TouchEvent.TOUCH_TAP, this.sBtn, this.sendFunc);
        this.addEvent(eui.ItemTapEvent.ITEM_TAP, this.itemList, this.listTouche);
        this.addEvent(egret.TextEvent.LINK, this.lText, this.onLink);
        this.addTouchEvent(this.closeBtn, this.closeView);
        this.initList();
        // GameCache.hero.focusPlayer.cellXY
        this.pixXY.text = "像素坐标：X" + GameCache.hero.focusPlayer.x + ",Y" + GameCache.hero.focusPlayer.y;
        this.gridXY.text = "格子坐标：X" + GameCache.hero.focusPlayer.cellXY.x + ",Y" + GameCache.hero.focusPlayer.cellXY.y;
        // this.message(egret.Event.ENTER_FRAME, this.printXY);
    };
    DeBugWin.prototype.printXY = function () {
    };
    DeBugWin.prototype.close = function (param) {
        if (param === void 0) { param = null; }
        _super.prototype.close.call(this);
        // this.removeAllEvent();
    };
    DeBugWin.prototype.listTouche = function (e) {
        if (e.item.text == "@setSysTime ") {
            var time = GameCache.server.serverTime / 1000;
            var str = App.DateUtils.getFormatBySecond(time, DateUtils.TIME_FORMAT_15);
            str = str.replace(" ", "-");
            this.inText.text = e.item.text + str;
            return;
        }
        if (e.item.text == "@textFlow") {
            this.currentState = "note";
        }
        if (e.item.text) {
            this.inText.text = e.item.text;
        }
    };
    DeBugWin.prototype.sendFunc = function () {
        if (!ChatMgr.chechIsGMMsg(this.inText.text)) {
            if (this.inText.text == "reset") {
                this.currentState = "nor";
            }
            if (this.currentState == "note") {
                this.labelTextFlow();
                return;
            }
            console.log("非GM命令");
        }
        else {
            console.log("done");
        }
    };
    DeBugWin.prototype.initList = function () {
        var dataArr = [];
        for (var _i = 0, _a = this.cmArr; _i < _a.length; _i++) {
            var i = _a[_i];
            var obj = {};
            obj["text"] = i[0];
            obj["des"] = i[1];
            dataArr.push(obj);
        }
        this.setListData(this.itemList, dataArr);
    };
    DeBugWin.prototype.addXYonMainUI = function () {
    };
    DeBugWin.prototype.labelTextFlow = function () {
        this.lText.textFlow = TextFlowUtils.generateTextFlow(this.inText.text);
        // console.log(this.lText["linesArr"]);
        // egret.callLater(, this);
        // App.TimerManager.addFrame(1,()=>{TextFlowUtils.generateEmoji(this.lText, this.g,true)},this,1);
        TextFlowUtils.generateEmoji(this.lText, this.g, true);
    };
    DeBugWin.prototype.onLink = function (e) {
        var text = e.text;
        TextFlowUtils.hrefType(text);
    };
    return DeBugWin;
}(BaseEuiWindow));
__reflect(DeBugWin.prototype, "DeBugWin");
//# sourceMappingURL=DeBugWin.js.map