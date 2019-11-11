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
 * @Description: 闯关、关卡
 * @Author: guolinsen
 * @Date: 2019-07-26 16:32:55
 * @LastEditTime: 2019-10-31 11:31:10
 */
var PassCache = (function (_super) {
    __extends(PassCache, _super);
    function PassCache() {
        var _this = _super.call(this) || this;
        _this.isOpen = false;
        _this.level = 0;
        _this.killNum = 0;
        _this.total = 0;
        /****************************************************************************************************/
        /*****************************************下面是逻辑操作**********************************************/
        /****************************************************************************************************/
        _this.monsterNum = 0;
        _this.posIndex = 0;
        _this.recog = 0; //生成怪物的句柄
        _this.effs = [];
        return _this;
    }
    PassCache.prototype.clear = function () {
        this.isOpen = false;
        this.level = 0;
        this.monConfig = null;
        this.killNum = 0;
        this.total = 0;
        this.lastMonsterTime = 0;
    };
    PassCache.prototype.updateLv = function (lv) {
        this.level = lv > 0 ? lv : 1;
        this.monConfig = this.getMonsterConfig(this.level);
        this.killNum = 0;
    };
    PassCache.prototype.getMapFile = function () {
        return this.monConfig["mapFile"];
    };
    PassCache.prototype.getMonsterConfig = function (num) {
        if (!num)
            return null;
        var tier = num; //当前最高多少层
        var config = this.getMonsterConfig2(tier);
        if (config.circle) {
            var start = config.circle;
            var end = config.id;
            var la = (tier - start) % (end - start) + start;
            config = this.getMonsterConfig2(la);
        }
        return config;
    };
    PassCache.prototype.getMonsterConfig2 = function (tier) {
        var config = GameConfig.passMonster;
        for (tier; tier >= 0; tier--) {
            if (config[tier]) {
                return config[tier];
            }
        }
    };
    PassCache.prototype.open = function () {
        if (this.isOpen)
            return;
        this.isOpen = true;
        App.MessageCenter.addListener(MsgConst.BATTLE_KILL, this.onMonsterKill, this);
        App.TimerManager.add(1000, this.onTimer, this);
        this.monsterNum = 0;
        this.posIndex = 0;
        this.total = PassMgr.guajiTotal();
        this.createMonster();
        PassMgr.guajiProgress();
    };
    PassCache.prototype.close = function () {
        if (!this.isOpen)
            return;
        this.isOpen = false;
        this.killNum = this.total = 0;
        App.MessageCenter.removeAll(this);
        App.TimerManager.remove(this.onTimer, this);
    };
    PassCache.prototype.onTimer = function () {
        if (this.monsterNum <= 3) {
            this.createMonster();
        }
    };
    PassCache.prototype.onMonsterKill = function () {
        this.monsterNum--;
        var cur = egret.getTimer();
        this.killNum++;
        PassMgr.guajiProgress();
        if (this.lastMonsterTime == 0 || cur - this.lastMonsterTime >= 2000) {
            //发送击杀
            this.lastMonsterTime = cur;
        }
        if (GameCache.quest.questId >= 0 && GameConfig.clientGlobal.passQuestID.indexOf(GameCache.quest.questId) > -1) {
            Proxy.quest.sendQuestProgress(GameCache.quest.questId, 1);
        }
    };
    PassCache.prototype.createMonster = function () {
        var con = this.monConfig;
        var mon = con["monster"];
        mon = mon[MathUtils.limitInteger(0, mon.length)];
        var hp = con["hp"];
        var count = con["count"];
        while (count > 0) {
            count--;
            var pos = this.randomPos();
            var propSet = new PropertySet();
            var charName = mon["name"];
            propSet.recog = App.ThingManager.createRecog();
            propSet.setRoleName(charName);
            propSet.kind = ThingKind.Monster;
            propSet.fightAi = true;
            propSet.skillList = GlobalVar.MONSTER_DEFAULTSKILL;
            var x = pos[0] + (Math.random() > 0.5 ? 1 : -1) * (MathUtils.limitInteger(0, pos[2]));
            var y = pos[1];
            propSet.pro(PropId.AP_HP, hp);
            propSet.pro(PropId.AP_MAX_HP, hp);
            propSet.pro(PropId.AP_X, x);
            propSet.pro(PropId.AP_Y, y);
            propSet.pro(PropId.AP_MOVE_SPEED, 600);
            propSet.pro(PropId.AP_ATTACK_SPEED, 2000);
            propSet.pro(PropId.AP_BODY_ID, mon["modelid"]);
            propSet.pro(PropId.AP_ACTOR_ID, 0);
            App.ThingManager.createThingToList(propSet);
            this.monsterNum++;
        }
    };
    PassCache.prototype.randomPos = function () {
        var con = this.monConfig;
        var posList = con["pos"];
        var len = posList.length;
        var idx = Math.floor(Math.random() * len);
        if (idx == this.posIndex) {
            idx = this.posIndex - 1 < 0 ? len - 1 : this.posIndex - 1;
        }
        this.posIndex = idx;
        return posList[idx];
    };
    PassCache.prototype.playBossEffect = function () {
        var effs = this.effs;
        for (var i = 0; i < 5; i++) {
            var img = effs[i];
            if (!img) {
                img = new eui.Image();
                img.source = RES_DIR_BG + "passEff.png";
                img.anchorOffsetX = 345;
                img.anchorOffsetY = 150;
                effs[i] = img;
            }
            img.alpha = 0;
            img.scaleX = 1.6;
            img.scaleY = 1.6;
            LayerManager.UI_Message.addChild(img);
            img.x = App.StageUtils.getWidth() >> 1;
            img.y = 260;
            egret.Tween.removeTweens(this);
            egret.Tween.get(img).wait(i * 60).to({ alpha: 1, scaleX: 0.8, scaleY: 0.8 }, 400, egret.Ease.bounceIn)
                .call(this.removeBossEff, this, [img, i]);
        }
    };
    PassCache.prototype.removeBossEff = function (img, i) {
        if (i == this.effs.length - 1) {
            egret.Tween.get(img).wait(800).to({ scaleX: 0.5, scaleY: 0.5, alpha: 0 }, 200, egret.Ease.cubicInOut)
                .call(this.removeBossEff, this, [img, 0]);
        }
        else {
            App.DisplayUtils.removeFromParent(img);
        }
    };
    return PassCache;
}(BaseCache));
__reflect(PassCache.prototype, "PassCache");
//# sourceMappingURL=PassCache.js.map