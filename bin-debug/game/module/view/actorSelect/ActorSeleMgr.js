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
// TypeScript file
var ActorSeleMgr = (function (_super) {
    __extends(ActorSeleMgr, _super);
    function ActorSeleMgr() {
        return _super.call(this) || this;
    }
    ActorSeleMgr.onSele = function (thing) {
        if (!thing) {
            // this.offSele();
            return;
        }
        var view = App.ViewManager.getView(ViewConst.MAIN_UI);
        var actorHp = view.getChildByName("SELEHP");
        //过滤非BOSS的怪
        if (thing instanceof MonsterThing) {
            var mConfig = GameConfig.monster[thing.id];
            if (!mConfig || mConfig.monsterType != MonsterType.BOSS) {
                this.offSele();
                return;
            }
            ;
        }
        if (!actorHp) {
            actorHp = ObjectPool.get(ActorHp);
            actorHp.name = "SELEHP";
            view.addChild(actorHp);
        }
        actorHp.visible = true;
        actorHp.data = thing;
        this.actorHp = actorHp;
        this.thing = thing;
        actorHp.top = 110;
        actorHp.horizontalCenter = 1;
    };
    ActorSeleMgr.offSele = function () {
        var view = App.ViewManager.getView(ViewConst.MAIN_UI);
        var actorHp = view.getChildByName("SELEHP");
        if (actorHp) {
            view.removeChild(actorHp);
            ObjectPool.push(actorHp);
            actorHp = null;
        }
        this.actorHp = null;
        this.thing = null;
    };
    ActorSeleMgr.hpChange = function (thing) {
        if (thing != this.thing)
            return;
        if (this.actorHp) {
            var hp = thing.isDie ? 0 : thing.pro.pro(PropId.AP_HP);
            this.actorHp.hpChange(hp);
        }
    };
    return ActorSeleMgr;
}(BaseClass));
__reflect(ActorSeleMgr.prototype, "ActorSeleMgr");
//# sourceMappingURL=ActorSeleMgr.js.map