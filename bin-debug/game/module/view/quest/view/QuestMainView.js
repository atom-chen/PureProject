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
 * 主界面上的任务面板
*/
var QuestMainView = (function (_super) {
    __extends(QuestMainView, _super);
    function QuestMainView() {
        var _this = _super.call(this, LayerManager.UI_Main) || this;
        _this.skinName = "QuestMainViewSkin";
        _this.left = 12;
        _this.bottom = 210;
        _this.touchChildren = false;
        _this.touchEnabled = true;
        return _this;
    }
    QuestMainView.prototype.init = function () {
        _super.prototype.init.call(this);
    };
    QuestMainView.prototype.open = function (param) {
        if (param === void 0) { param = null; }
        _super.prototype.open.call(this);
        this.message(MsgConst.QUEST_REFRESH_MAIN, this.onUpdate);
        this.message(MsgConst.ENTER_SCENE, this.visitToggle);
        this.addTouchEvent(this, this.onTouch);
        this.onUpdate();
    };
    QuestMainView.prototype.onTouch = function () {
        GameCache.quest.autoQuest();
    };
    QuestMainView.prototype.onUpdate = function () {
        var id = GameCache.quest.questId;
        if (id >= 0) {
            var std = GameConfig.quest[id];
            var title = std.name;
            var prog = "";
            if (GameCache.quest.state == 2) {
                prog = "<(c0x36ff00)（完成）>";
                this.showEff();
            }
            else {
                var curValue = GameCache.quest.progress;
                var count = std.target.count;
                if (std.target.type == TaskTargetType.enTask_ChkToLvl) {
                    curValue--;
                    count--;
                }
                prog = "<(c0xff0000)\uFF08" + curValue + "/" + count + "\uFF09>";
                this.hideEff();
            }
            this.labTitle.textFlow = TextFlowUtils.generateTextFlow(title + prog);
            this.labDes.textFlow = TextFlowUtils.generateTextFlow(std.content);
            //this.progress.textFlow = TextFlowUtils.generateTextFlow(prog);
            //this.imgRect.width = this.labTitle.textWidth + 8;
            //this.progress.x = this.imgRect.x + this.imgRect.width + 6;
        }
        else {
            this.closeView();
        }
    };
    QuestMainView.prototype.showEff = function () {
        if (!this.mc) {
            var mc = App.DisplayUtils.addEffectToObj(this, "newquest_0_1", -1, 120, 33);
            this.mc = mc;
        }
        this.mc.play(-1);
        this.mc.visible = true;
    };
    QuestMainView.prototype.hideEff = function () {
        if (this.mc) {
            this.mc.visible = false;
            this.mc.stop();
        }
    };
    QuestMainView.prototype.visitToggle = function () {
        this.visible = GameCache.map.mapConfig.task == 1 ? true : false;
    };
    return QuestMainView;
}(BaseEuiWindow));
__reflect(QuestMainView.prototype, "QuestMainView");
//# sourceMappingURL=QuestMainView.js.map