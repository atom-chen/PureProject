/*
 * @Description: 遭遇战
 * @Author: guolinsen
 * @Date: 2019-08-19 19:17:40
 * @LastEditTime: 2019-09-09 17:39:24
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
var BattleManager = (function (_super) {
    __extends(BattleManager, _super);
    function BattleManager() {
        return _super.call(this) || this;
    }
    BattleManager.prototype.test = function () {
        var hero = GameCache.hero.list;
        var pro = [];
        for (var _i = 0, hero_1 = hero; _i < hero_1.length; _i++) {
            var h = hero_1[_i];
            var p = h.pro.clone();
            var skillList = GameCache.skill.getFightSkilList(p.pro(PropId.AP_ACTOR_ID));
            p.skillList = [];
            for (var _a = 0, skillList_1 = skillList; _a < skillList_1.length; _a++) {
                var skill = skillList_1[_a];
                p.skillList.push([skill.nSkillId, skill.nLevel]);
            }
            p.charName = "目标";
            p.kind = ThingKind.Human;
            p.pro(PropId.AP_X, h.cellXY.x + 12);
            p.pro(PropId.AP_Y, h.cellXY.y);
            p.pro(PropId.AP_HP, p.pro(PropId.AP_HP) * 100);
            p.pro(PropId.AP_MAX_HP, p.pro(PropId.AP_MAX_HP) * 100);
            pro.push(p);
        }
        this.start(pro, null, null);
    };
    /**
     * pro：目标属性集列表
     * call：每一个实体被击杀的回调，回调参数：call(本方剩余人员，地方剩余人员)
     * callObj：this
    */
    BattleManager.prototype.start = function (pro, call, callObj) {
        this.countDic = { 1: 0, 2: 0 };
        for (var _i = 0, _a = GameCache.hero.list; _i < _a.length; _i++) {
            var h = _a[_i];
            h.pro.aiCamp = AICampType.BATTLE1;
            this.countDic[1]++;
        }
        var cellXY = GameCache.hero.mainPlayer.cellXY;
        for (var _b = 0, pro_1 = pro; _b < pro_1.length; _b++) {
            var p = pro_1[_b];
            p.pro(PropId.AP_X, cellXY.x + 8);
            p.pro(PropId.AP_Y, cellXY.y);
            p.kind = ThingKind.Human;
            p.recog = App.ThingManager.createRecog();
            p.aiCamp = AICampType.BATTLE2;
            p.hpType = null;
            p.fightAi = true;
            App.ThingManager.createThing(p);
            this.countDic[2]++;
        }
        if (call && callObj) {
            this.handler = Handler.create(callObj, call, null, false);
        }
        GameCache.map.isAIMap = true;
        App.FightManager.starAllAI(true);
        App.MessageCenter.addListener(MsgConst.BATTLE_KILL, this.onKill, this);
    };
    BattleManager.prototype.exit = function () {
        GameCache.map.isAIMap = false;
        App.MessageCenter.removeAll(this);
        App.FightManager.starAllAI(false);
        // for (let h of GameCache.hero.list) {
        // 	h.pro.aiCamp = AICampType.SELF;
        // 	if (h.isDie) {
        // 		h.reAlive();
        // 	}
        // 	h.pro.pro(PropId.AP_HP, h.pro.pro(PropId.AP_MAX_HP), h);
        // }
        if (this.handler) {
            this.handler.dispose();
            this.handler = null;
        }
    };
    /**外部调用，重置角色人物状态*/
    BattleManager.prototype.resetState = function () {
        for (var _i = 0, _a = GameCache.hero.list; _i < _a.length; _i++) {
            var h = _a[_i];
            h.pro.aiCamp = AICampType.SELF;
            if (h.isDie) {
                h.reAlive();
            }
            h.pro.pro(PropId.AP_HP, h.pro.pro(PropId.AP_MAX_HP), h);
        }
    };
    BattleManager.prototype.onKill = function (user) {
        if (user.pro.aiCamp == AICampType.BATTLE1) {
            this.countDic[1]--;
        }
        else if (user.pro.aiCamp == AICampType.BATTLE2) {
            this.countDic[2]--;
        }
        if (this.handler) {
            this.handler.args = [this.countDic[1], this.countDic[2]];
            this.handler.run();
        }
        for (var k in this.countDic) {
            if (this.countDic[k] == 0) {
                this.exit();
                return;
            }
        }
    };
    return BattleManager;
}(BaseClass));
__reflect(BattleManager.prototype, "BattleManager");
//# sourceMappingURL=BattleManager.js.map