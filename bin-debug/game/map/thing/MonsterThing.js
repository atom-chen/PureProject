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
var MonsterThing = (function (_super) {
    __extends(MonsterThing, _super);
    function MonsterThing() {
        return _super.call(this) || this;
    }
    MonsterThing.prototype.init = function (pro) {
        var mConfig = GameConfig.monster[pro.pro(PropId.AP_ACTOR_ID)];
        if (mConfig) {
            this.monsterType = mConfig.monsterType;
            App.ThingManager.dropCellX = pro.pro(PropId.AP_X);
            App.ThingManager.dropCellY = pro.pro(PropId.AP_Y);
        }
        else {
            this.monsterType = 1;
        }
        _super.prototype.init.call(this, pro);
        this.pro.aiCamp = AICampType.MONSTER;
        this.title.visible = false;
    };
    /**
   * 处理HP变更
   * @param value
   *
   */
    MonsterThing.prototype.changeHp = function (value) {
        _super.prototype.changeHp.call(this, value);
        // if (value > 0) {
        // 	this.title.visible = value < this.pro.pro(PropId.AP_MAX_HP);
        // } else {
        // 	this.title.visible = false;
        // }
        ActorSeleMgr.hpChange(this);
    };
    MonsterThing.prototype.showHp = function () {
        if (this.monsterType == MonsterType.BOSS)
            return;
        _super.prototype.showHp.call(this);
        this.title.visible = true;
    };
    MonsterThing.prototype.die = function () {
        _super.prototype.die.call(this);
        App.ThingManager.dropCellX = this.cellXY.x;
        App.ThingManager.dropCellY = this.cellXY.y;
        ActorSeleMgr.hpChange(this);
        egret.Tween.get(this).wait(1000).to({ aplha: 0 }, 600).call(this.onRemove, this);
    };
    MonsterThing.prototype.onRemove = function () {
        this.disappear = true;
    };
    MonsterThing.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.alpha = 1;
    };
    Object.defineProperty(MonsterThing.prototype, "configId", {
        get: function () {
            return this.pro.pro(PropId.AP_ACTOR_ID);
        },
        enumerable: true,
        configurable: true
    });
    return MonsterThing;
}(AnimalThing));
__reflect(MonsterThing.prototype, "MonsterThing");
//# sourceMappingURL=MonsterThing.js.map