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
 * 管理地图事物
*/
var ThingManager = (function (_super) {
    __extends(ThingManager, _super);
    function ThingManager() {
        var _this = _super.call(this) || this;
        _this.waitList = [];
        _this.thingList = [];
        _this.thingDic = {};
        _this.checkViewTime = 0;
        _this.dropList = [];
        _this.dropCellX = 0;
        _this.dropCellY = 0;
        _this.recog = -10;
        return _this;
        //App.MessageCenter.addListener(MsgConst.RECONNECTED, this.onReconnected, this);
    }
    ThingManager.prototype.clear = function () {
        this.removeAll();
        this.thingDic = {}; //
        GameCache.hero.clear();
    };
    ThingManager.prototype.addDrop = function (packetId, itemId, x, y, fly) {
        var item = ObjectPool.get(DropItem);
        if (!x && !y) {
            x = this.dropCellX;
            y = this.dropCellY;
        }
        if (!packetId) {
            packetId = this.createRecog();
        }
        item.initData1(packetId, itemId, x, y);
        this.titleLayer.addChild(item);
        this.dropList.push(item);
    };
    //添加一组掉落效果，非真实掉落
    ThingManager.prototype.addDropList = function (list) {
        if (!list || !list.length)
            return;
        var x = this.dropCellX;
        var y = this.dropCellY;
        if (!x && !y)
            return;
        var len = list.length;
        var starX = len >> 1;
        if (starX > 5)
            starX = 5;
        x = x - starX * 2;
        x < 1 && (x = 1);
        var i = 0;
        for (; i < len; i++) {
            var item = ObjectPool.get(DropItem);
            item.initData2(this.createRecog(), list[i].id, this.dropCellX, this.dropCellY, x + (i % 10) * 2, y);
            this.titleLayer.addChild(item);
            this.dropList.push(item);
        }
    };
    ThingManager.prototype.removeDrop = function (packetId) {
        var i = 0;
        var len = this.dropList.length;
        for (; i < len; i++) {
            var item = this.dropList[i];
            if (item.packetId == packetId) {
                this.dropList.splice(i, 1);
                item.dispose();
                break;
            }
        }
    };
    ThingManager.prototype.onUpdate = function () {
        if (GameCache.hero.list.length == 0)
            return;
        if (!GameCache.map.dataInit)
            return;
        var tick = App.TimerManager.getSyncTime();
        var chV = tick >= this.checkViewTime;
        if (chV) {
            this.checkViewTime = tick + 500;
        }
        var tx = GameCache.map.cameraX;
        var ty = GameCache.map.cameraY;
        var tw = App.StageUtils.getWidth();
        var th = App.StageUtils.getHeight();
        for (var _i = 0, _a = GameCache.hero.list; _i < _a.length; _i++) {
            var hero = _a[_i];
            hero.update(tick);
            chV && hero.checkInView(tx, ty, tw, th);
        }
        var i = 0;
        var list = this.thingList;
        var len = list.length;
        for (; i < len; i++) {
            var thing = list[i];
            if (thing.disappear) {
                delete this.thingDic[thing.pro.recog];
                list.splice(i, 1);
                i--;
                len--;
                thing.dispose();
                continue;
            }
            thing.update(tick);
            chV && thing.checkInView(tx, ty, tw, th);
        }
        var pro = this.waitList.shift();
        if (pro)
            this.createThing(pro);
    };
    /**
     * 添加一个等待创建的实体到队列
    */
    ThingManager.prototype.createThingToList = function (pro) {
        this.waitList.push(pro);
        return null;
    };
    /**
     * 创建一个实体
    */
    ThingManager.prototype.createThing = function (pro) {
        var cl = this.getThingCl(pro.kind);
        if (cl) {
            var thing = ObjectPool.get(cl);
            thing.init(pro);
            // thing.title.x = thing.x;
            // thing.title.y = thing.y;
            thing.checkInView(GameCache.map.cameraX, GameCache.map.cameraY, App.StageUtils.getWidth(), App.StageUtils.getHeight());
            if (!pro.isFlow) {
                if (pro.kind != ThingKind.Hero)
                    this.thingList.push(thing);
                this.thingDic[pro.recog] = thing;
            }
            return thing;
        }
        return null;
    };
    /**
     * 移除一个实体
     * 返回被移除的
    */
    ThingManager.prototype.removeThing = function (recog) {
        if (GameCache.hero.isMySelf(recog))
            return;
        var thing = this.thingDic[recog];
        if (thing) {
            thing.disappear = true;
            return thing;
        }
        else {
            var i = 0;
            var list = this.waitList;
            var len = list.length;
            for (; i < len; i++) {
                if (list[i].recog == recog) {
                    list.splice(i, 1);
                    break;
                }
            }
        }
    };
    ThingManager.prototype.removeAll = function () {
        var list = this.thingList;
        for (var i_1 = 0; i_1 < list.length; i_1++) {
            this.thingList[i_1].dispose();
        }
        this.thingList.length = 0;
        var dic = {};
        var hero = GameCache.hero.list;
        for (var index in hero) {
            (dic[hero[index].pro.recog] = hero[index]);
        }
        this.thingDic = dic;
        this.waitList.length = 0;
        var i = 0;
        var len = this.dropList.length;
        for (; i < len; i++) {
            var item = this.dropList[i];
            item.dispose();
        }
        this.dropList.length = 0;
    };
    ThingManager.prototype.updatePoseInWaite = function (reg, x, y) {
        var i = 0;
        var list = this.waitList;
        var len = list.length;
        for (; i < len; i++) {
            if (list[i].recog == reg) {
                list[i].pro(PropId.AP_X, x);
                list[i].pro(PropId.AP_Y, y);
                break;
            }
        }
    };
    ThingManager.prototype.getThing = function (recog, checkAlive) {
        if (checkAlive === void 0) { checkAlive = true; }
        var thing = this.thingDic[recog];
        if (checkAlive && thing && (thing.isDie || thing.disappear)) {
            return null;
        }
        return thing;
    };
    ThingManager.prototype.getNpcById = function (npcId) {
        var list = this.thingList;
        var i = 0;
        var a = list.length;
        for (; i < a; i++) {
            var thing = list[i];
            if (thing.npcid == npcId) {
                return thing;
            }
        }
    };
    ThingManager.prototype.getThingDic = function () {
        return this.thingDic;
    };
    ThingManager.prototype.getThingCl = function (kind) {
        if (kind == ThingKind.Human)
            return HumanThing;
        if (kind == ThingKind.Monster)
            return MonsterThing;
        if (kind == ThingKind.Hero)
            return HeroThing;
        if (kind == ThingKind.Transfer)
            return TransferThing;
        if (kind == ThingKind.Npc)
            return NPCThing;
        if (kind == ThingKind.HeroPet)
            return HumanThing;
        if (kind == ThingKind.Pet)
            return PetThing;
    };
    ThingManager.prototype.createRecog = function () {
        this.recog--;
        return this.recog;
    };
    return ThingManager;
}(BaseClass));
__reflect(ThingManager.prototype, "ThingManager");
//# sourceMappingURL=ThingManager.js.map