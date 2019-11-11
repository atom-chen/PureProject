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
 * 寻路至目标实体，除了攻击对象之外
*/
var VisitThingManager = (function (_super) {
    __extends(VisitThingManager, _super);
    function VisitThingManager() {
        var _this = _super.call(this) || this;
        _this.m_FindMapLinkExpectList = []; //查找地图连接的排除地图列表，用于优化性能
        _this.target = new VisitTarget();
        return _this;
    }
    VisitThingManager.prototype.goToNpc = function (npcId) {
        var target = this.target;
        target.clear();
        var con = GameConfig.npc[npcId];
        if (!con) {
            throw new Error("找不到npc配置 " + npcId);
        }
        target.tarX = con["posx"];
        target.tarY = con["posy"];
        target.tarScene = con["scene"];
        target.npcId = npcId;
        this.continue();
    };
    VisitThingManager.prototype.goToMonster = function (monsterId, sceneId, x, y) {
        var target = this.target;
        target.clear();
        target.tarX = x;
        target.tarY = y;
        target.tarScene = sceneId;
        target.monsterId = monsterId;
        this.continue();
    };
    VisitThingManager.prototype.goToThing = function (thing) {
        this.target.clear();
        //this.target.tarThing = thing;
        if (thing instanceof BaseThing) {
            var tx = thing.cellXY.x;
            var ty = thing.cellXY.y;
            var kind = thing.pro.kind;
            if (kind == ThingKind.Transfer) {
                this.goToPos(tx, ty);
            }
            else if (kind == ThingKind.Npc) {
                this.goToNpc(thing.npcid);
            }
        }
        else if (thing instanceof DropItem) {
            this.target.tarThing = thing;
            this.goToPos(thing.cellX, thing.cellY);
        }
    };
    VisitThingManager.prototype.clear = function () {
        this.target.clear();
    };
    VisitThingManager.prototype.checkArrived = function () {
        var hero = GameCache.hero.focusPlayer;
        var target = this.target;
        if (target.tarScene == 0) {
            return;
        }
        if (target.tarScene == GameCache.map.mapId) {
            if (target.tarX == hero.cellXY.x && target.tarY == hero.cellXY.y) {
                this.doArrived();
                this.clear();
                return true;
            }
        }
        return false;
    };
    VisitThingManager.prototype.continue = function () {
        if (this.target.tarScene == 0) {
            return;
        }
        if (!GameCache.map.dataInit)
            return;
        if (!this.checkArrived())
            this.onGo();
    };
    VisitThingManager.prototype.onGo = function () {
        App.FightManager.heroStart(false);
        var tar = this.target;
        if (GameCache.map.mapId != tar.tarScene) {
            var pos = this.findLinkPos(this.getStdById(GameCache.map.mapId), this.getStdById(tar.tarScene));
            if (pos) {
                this.goToPos(pos.x, pos.y);
            }
        }
        else {
            if (tar.npcId > 0) {
                var tx = tar.tarX + (Math.random() > 0.5 ? 1 : -1);
                if (GameCache.map.canStand(tx, tar.tarY)) {
                    tar.tarX = tx;
                    if (this.checkArrived())
                        return;
                }
            }
            this.goToPos(tar.tarX, tar.tarY);
        }
    };
    VisitThingManager.prototype.doArrived = function () {
        var tar = this.target;
        if (tar.npcId > 0) {
            var npc = App.ThingManager.getNpcById(tar.npcId);
            if (npc) {
                this.arrivedNPC(npc.pro.recog, tar.npcId);
            }
        }
        else if (tar.monsterId != 0) {
            App.FightManager.heroStart(true, tar.monsterId > 0 ? tar.monsterId : 0);
        }
        else if (tar.tarThing) {
            if (tar.tarThing instanceof DropItem) {
                tar.tarThing.pick();
            }
        }
    };
    VisitThingManager.prototype.arrivedNPC = function (recog, id) {
        if (GameCache.quest.npcId == id) {
            Proxy.main.sendTalkToNPC(recog);
            var viewPorn = new ViewProp();
            viewPorn.exData1 = recog;
            viewPorn.exData2 = id;
            App.ViewManager.open(ViewConst.NPCTALK, viewPorn);
        }
        else {
            var con = GameConfig.npc[id];
            if (con && con["window"]) {
                TextFlowUtils.hrefType(con["window"]);
            }
            else {
                //App.ViewManager.open(ViewConst.NPCTALK, recog, id);
                var npc = App.ThingManager.getThing(recog);
                if (npc) {
                    var con_1 = GameConfig.npc[id];
                    npc.say(con_1["talk"][MathUtils.limitInteger(0, con_1["talk"].length)]);
                }
            }
        }
    };
    VisitThingManager.prototype.goToPos = function (x, y) {
        var hero = GameCache.hero.focusPlayer;
        hero.moveTo(x, y);
    };
    VisitThingManager.prototype.getStdById = function (id) {
        return GameConfig.scene[id];
    };
    /**
     * 从起始地图中查找通往目标地图的链接点坐标
     * @param source 起始地图
     * @param target 目标地图
     * @return
     *
     */
    VisitThingManager.prototype.findLinkPos = function (source, target) {
        if (source == target) {
            return null;
        }
        this.m_FindMapLinkExpectList.length = 0;
        if (source.teleport) {
            var linkDesc;
            linkDesc = this.findNearestLinkPosInEnvir(source, target, this.m_FindMapLinkExpectList);
            if (linkDesc)
                return new XY(linkDesc.lnk.posx, linkDesc.lnk.posy);
        }
        return null;
    };
    /**
     * 从地图连接数种递归查找通往目标地图的链接点 对象
     * @param envir 起始地图
     * @param target 目标地图
     * @param expectList 排除地图列表，用于避免递归查找的重复查找造成的死递归和栈溢出
     * @return
     *
     */
    VisitThingManager.prototype.findLinkPosInEnvir = function (envir, target, expectList) {
        var lnkList = envir.teleport;
        var lnk;
        var lnkEnvir;
        var i, j;
        //添加到排除地图列表中
        expectList.push(envir);
        for (i = 0; i < lnkList.length; ++i) {
            lnk = lnkList[i];
            //找到!
            if (lnk.toSceneid == target.scenceid)
                return lnk;
            lnkEnvir = this.getStdById(lnk.toSceneid);
            if (lnkEnvir && lnkEnvir.teleport) {
                //如果地图存在于已搜索的地图列表中则不检查此地图
                for (j = 0; j < expectList.length; ++j) {
                    if (expectList[j] == lnkEnvir) {
                        lnkEnvir = null; //置为null以便进行下次循环
                        break;
                    }
                }
                if (!lnkEnvir)
                    continue;
                //从此地图中查找
                if (this.findLinkPosInEnvir(lnkEnvir, target, expectList))
                    return lnk;
            }
        }
        return null;
    };
    /**
     * 从地图连接数种递归查找通往目标地图的链接点 对象
     * @param envir 起始地图
     * @param target 目标地图
     * @param expectList 排除地图列表，用于避免递归查找的重复查找造成的死递归和栈溢出
     * @return
     *
     */
    VisitThingManager.prototype.findNearestLinkPosInEnvir = function (envir, target, expectList) {
        var lnkList = envir.teleport;
        var lnk;
        var lnkEnvir;
        var i, j;
        var lnkPos, nearestPos;
        //添加到排除地图列表中
        expectList.push(envir);
        for (i = 0; i < lnkList.length; ++i) {
            lnk = lnkList[i];
            //找到!
            if (lnk.toSceneid == target.scenceid) {
                nearestPos = new LinkPosDesc(lnk, 0);
                break;
            }
            lnkEnvir = this.getStdById(lnk.toSceneid);
            if (lnkEnvir && lnkEnvir.teleport) {
                //如果地图存在于已搜索的地图列表中则不检查此地图
                for (j = 0; j < expectList.length; ++j) {
                    if (expectList[j] == lnkEnvir) {
                        lnkEnvir = null; //置为null以便进行下次循环
                        break;
                    }
                }
                if (!lnkEnvir)
                    continue;
                //从此地图中查找
                lnkPos = this.findNearestLinkPosInEnvir(lnkEnvir, target, expectList);
                if (lnkPos) {
                    if (!nearestPos || nearestPos.dist > lnkPos.dist) {
                        nearestPos = lnkPos;
                        nearestPos.lnk = lnk;
                    }
                }
            }
        }
        //从排除地图列表中移除
        expectList.pop();
        if (nearestPos) {
            nearestPos.dist++;
            return nearestPos;
        }
        return null;
    };
    /**
     * 用于二分查找的都地图id对比函数
     * @param id
     * @param envir
     * @return
     *
     */
    VisitThingManager.prototype.searchEnvirIdCompare = function (id, envir) {
        if (id < envir.scenceid)
            return -1;
        if (id > envir.scenceid)
            return 1;
        return 0;
    };
    /**
     * 用于二分查找的都地图名称对比函数
     * @param id
     * @param envir
     * @return
     *
     */
    VisitThingManager.prototype.searchEnvirNameCompare = function (name, envir) {
        return name.localeCompare(envir.scencename);
    };
    return VisitThingManager;
}(BaseClass));
__reflect(VisitThingManager.prototype, "VisitThingManager");
var LinkPosDesc = (function () {
    function LinkPosDesc(lnk, dist) {
        this.lnk = lnk;
        this.dist = dist;
    }
    return LinkPosDesc;
}());
__reflect(LinkPosDesc.prototype, "LinkPosDesc");
var VisitTarget = (function () {
    function VisitTarget() {
        this.tarScene = 0;
    }
    VisitTarget.prototype.clear = function () {
        this.tarX = 0;
        this.tarY = 0;
        this.tarScene = 0;
        this.tarThing = null;
        this.npcId = 0;
        this.monsterId = 0;
    };
    return VisitTarget;
}());
__reflect(VisitTarget.prototype, "VisitTarget");
//# sourceMappingURL=VisitThingManager.js.map