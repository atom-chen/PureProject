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
 * @Description: 聊天管理器
 * @Author: guolinsen
 * @Date: 2019-08-13 10:06:31
 * @LastEditTime: 2019-10-31 15:23:58
 */
var ChatMgr = (function (_super) {
    __extends(ChatMgr, _super);
    function ChatMgr() {
        var _this = _super.call(this) || this;
        /**系统轮播*/
        _this.carouselIndex = 0;
        _this.sceneCenter = new SystemTextTips();
        _this.tipsPopupMgr = new TipsPopupMgr();
        _this.barrageTips = new BarrageTips();
        return _this;
    }
    ChatMgr.prototype.init = function () {
        App.TimerManager.removeAll(this);
        this.playCarousel(true);
    };
    ChatMgr.prototype.playCarousel = function (init) {
        if (init === void 0) { init = false; }
        this.carouselIndex++;
        var iv = GameConfig.carousel[1][init ? "first" : "interval"];
        if (!iv)
            iv = [10, 10];
        var time = MathUtils.limitInteger(iv[0], iv[1]) * 1000;
        App.TimerManager.addDelay(time, 1, 1, this.playCarousel, this);
        if (init)
            return;
        var con = GameConfig.carousel[this.carouselIndex];
        if (!con) {
            this.carouselIndex = 1;
            con = GameConfig.carousel[this.carouselIndex];
        }
        if (!con)
            return;
        this.doMessage(con["dec"], SysMessageType.SYSTEM_BARRAGE);
    };
    /**处理信息
     * @param mes 信息
     * @param type类型,参考ChatType
     */
    ChatMgr.prototype.doMessage = function (mes, type) {
        switch (type) {
            case SysMessageType.CHAT_PANEL_RIGHT:
                this.tipsPopupMgr.pushStr(mes);
                //GameCache.chat.addSysMsg(mes);
                break;
            case SysMessageType.SYSTEM_SCENE_CENTER:
                this.sceneCenter.text = mes;
                (!this.sceneCenter.parent) && LayerManager.UI_Message.addChild(this.sceneCenter);
                break;
            case SysMessageType.SYSTEM_BARRAGE:
                this.barrageTips.push(mes);
                GameCache.chat.addSysMsg(mes);
                break;
            case SysMessageType.SYSTEM_BARRAGE_NOW:
                this.barrageTips.push(mes, true);
                GameCache.chat.addSysMsg(mes);
                break;
        }
    };
    ChatMgr.chechIsGMMsg = function (cmd) {
        var isGM = true;
        var strArr = cmd.split(" ");
        switch (strArr[0]) {
            case "@@":
                App.ViewManager.open(ViewConst.DEBUG);
                break;
            case "@openWin"://根据ID打开窗口
                // let openObj = {key:"ROLE",firIndex:2,secIndex:2}
                // let openObj = new ViewProp();
                // openObj.key = strArr[1];
                // openObj.firIndex = 2;
                // openObj.secIndex = 2;
                App.ViewManager.toggle(strArr[1]);
                break;
            case "@AddItem"://添加道具
                Proxy.chat.sendChatMessage(1, cmd, false);
                break;
            case "@change":
                break;
            case "@herosay":
                var hero = GameCache.hero.focusPlayer;
                hero.say(strArr[1], 50000);
                break;
            case "@barrage":
                GlobalFun.SysMsg(strArr[1], SysMessageType.SYSTEM_BARRAGE);
                break;
            case "@SkillEdit":
                DeBugMgr.skillEffEdit();
                GlobalVar.testSkill = true;
                App.gameWorld.drawCell();
                App.ViewManager.close(ViewConst.DEBUG);
                break;
            case "@hz":
                var pro = GameCache.hero.mainPro;
                pro.pro(parseInt(strArr[1]), parseInt(strArr[2]), GameCache.hero.focusPlayer);
                break;
            case "@action":
                hero = GameCache.hero.focusPlayer;
                hero.playAction(parseInt(strArr[1]), parseInt(strArr[2]));
                break;
            case "@root":
                // GameCache.map.isAIMap = true;
                // let count = parseInt(strArr[1]);
                // while (count > 0) {
                //     count--;
                //     let propSet: PropertySet = new PropertySet();
                //     let charName: string = "机器人" + count + "号";
                //     propSet.recog = App.ThingManager.createRecog();
                //     propSet.setRoleName(charName);
                //     propSet.kind = ThingKind.Human;
                //     propSet.aiCamp = AICampType.ROOT;
                //     propSet.fightAi = true;
                //     let x = GameCache.hero.focusPlayer.cellXY.x;
                //     let y = GameCache.hero.focusPlayer.cellXY.y;
                //     propSet.pro(PropId.AP_HP, 10000000000);
                //     propSet.pro(PropId.AP_MAX_HP, 10000000000);
                //     propSet.pro(PropId.AP_JOB, 1);
                //     propSet.pro(PropId.AP_SEX, 1);
                //     propSet.pro(PropId.AP_X, x);
                //     propSet.pro(PropId.AP_Y, y);
                //     propSet.pro(PropId.AP_MOVE_SPEED, 150);
                //     propSet.pro(PropId.AP_ATTACK_SPEED, 750);
                //     App.ThingManager.createThingToList(propSet);
                // }
                App.BattleManager.test();
                break;
            case "@usSkill":
                App.FightManager.setUseSKill(parseInt(strArr[1]), true);
                break;
            case "@drop":
                App.ThingManager.addDropList([{ id: 15 }, { id: 16 }, { id: 17 }, { id: 18 }, { id: 19 }]);
                break;
            case "@setCellXY":
                GameCache.hero.setPosition(parseInt(strArr[1]), parseInt(strArr[2]));
                break;
            case "@AddEqSet":
                for (var i = 110; i <= 119; i++) {
                    Proxy.chat.sendChatMessage(1, "@AddItem " + i + " 1", false);
                }
                break;
            case "@AddAESet":
                for (var i = 940; i <= 949; i++) {
                    Proxy.chat.sendChatMessage(1, "@AddItem " + i + " 1", false);
                }
                break;
            case "@oneWearOn":
                break;
            case "@guide":
                GameCache.novice.playGuide(strArr[1]);
                break;
            case "@debugDragon":
                App.ViewManager.open(ViewConst.DEBUGDRAGON);
                break;
            case "@emojiSize":
                GlobalVar.EMOJI_SIZE = parseInt(strArr[1]);
                GlobalFun.SysMsg("DONE！");
                break;
            case "@copyUrl":
                SysUtils.copyToPasteBoard(OperatorEgret.urlList.join(","));
            case "@winCon":
                GlobalVar.OPEN_ALL_WIN = !GlobalVar.OPEN_ALL_WIN;
                App.MessageCenter.dispatch(MsgConst.SERVER_TIME_CHANGE);
                break;
            default:
                if (cmd.indexOf("@") >= 0) {
                    Proxy.chat.sendChatMessage(1, cmd, false);
                }
                else {
                    isGM = false;
                }
                break;
        }
        return isGM;
    };
    return ChatMgr;
}(BaseClass));
__reflect(ChatMgr.prototype, "ChatMgr");
//# sourceMappingURL=ChatMgr.js.map