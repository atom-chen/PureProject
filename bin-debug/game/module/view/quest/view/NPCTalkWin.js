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
 * npc对话框
*/
var NPCTalkWin = (function (_super) {
    __extends(NPCTalkWin, _super);
    function NPCTalkWin() {
        var _this = _super.call(this, LayerManager.UI_Main2) || this;
        _this.skinName = "NPCTalkWinSkin";
        _this.horizontalCenter = 0;
        _this.verticalCenter = 0;
        return _this;
    }
    NPCTalkWin.prototype.open = function (param) {
        if (param === void 0) { param = null; }
        _super.prototype.open.call(this);
        this.recog = param.exData1;
        this.npcId = param.exData2;
        this.bubbles = ObjectPool.get(ThingBubbles);
        this.addChild(this.bubbles);
        this.message(MsgConst.QUEST_REFRESH_MAIN, this.update);
        this.addTouchEvent(this.submitBtn, this.submit);
        this.update();
    };
    NPCTalkWin.prototype.close = function () {
        _super.prototype.close.call(this);
        this.bubbles.dispose();
        this.bubbles = null;
    };
    NPCTalkWin.prototype.dispose = function () {
        this.itemList.dispose();
        _super.prototype.dispose.call(this);
    };
    NPCTalkWin.prototype.update = function () {
        var questId = GameCache.quest.questId;
        if (questId >= 0 && GameCache.quest.npcId != this.npcId) {
            questId = -1;
        }
        var con = GameConfig.npc[this.npcId];
        var talk = con["talk"][MathUtils.limitInteger(0, con["talk"].length)];
        this.submitBtn.visible = questId >= 0;
        if (questId >= 0) {
            var std = GameConfig.quest[questId];
            this.labTalk.text = std.npcTalk;
            this.setAward(std);
        }
        else {
            this.labTalk.text = talk;
            this.setAward(null);
        }
        this.npcBody.source = RES_DIR_NPC_BODY + con["modelid"] + ".png";
        this.npcBody.x = con["offx"] + 126;
        this.npcBody.y = con["offy"] + 294;
        this.bubbles.setData(talk, 0);
        this.bubbles.y = this.npcBody.y - 10;
        this.bubbles.x = this.npcBody.x + 24;
        this.npcName.source = RES_DIR_NPC_BODY + this.npcId + "n.png";
    };
    NPCTalkWin.prototype.submit = function () {
        Proxy.quest.sendSumitQuest();
        this.closeView();
    };
    NPCTalkWin.prototype.setAward = function (std) {
        if (std && std.awards) {
            if (!this.itemList) {
                this.itemList = ObjectPool.get(ItemList);
            }
            this.itemList.setData(std.awards, this.iG);
        }
        else {
            this.itemList.dispose();
        }
    };
    return NPCTalkWin;
}(BaseEuiWindow));
__reflect(NPCTalkWin.prototype, "NPCTalkWin");
//# sourceMappingURL=NPCTalkWin.js.map