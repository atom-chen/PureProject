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
 * @Description: 保存主角数据
 * @Author: guolinsen
 * @Date: 2019-07-18 13:45:49
 * @LastEditTime: 2019-10-31 17:24:13
 */
var HeroCache = (function (_super) {
    __extends(HeroCache, _super);
    function HeroCache() {
        var _this = _super.call(this) || this;
        _this.list = [];
        _this.pet = [];
        App.TimerManager.add(200, _this.onFollow, _this);
        return _this;
    }
    HeroCache.prototype.clear = function () {
        this._focus = null;
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var hero = _a[_i];
            hero.dispose();
        }
        this.list = [];
        this.mainPro = null;
    };
    HeroCache.prototype.onFollow = function () {
        if (App.FightManager.onHook)
            return;
        if (!this._focus)
            return;
        var xy = this._focus.cellXY;
        var dis = 5 - this.list.length;
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var hero = _a[_i];
            if (hero == this._focus)
                continue;
            if (hero.isDie)
                continue;
            if (hero.isFighting)
                continue;
            var needMove = Math.abs(hero.cellXY.x - xy.x) > dis || Math.abs(hero.cellXY.y - xy.y) > dis;
            if (needMove) {
                if (!hero.isfollow) {
                    hero.isfollow = hero.moveTo(xy.x, xy.y);
                }
            }
            else {
                hero.clearPath();
                hero.isfollow = false;
            }
            dis++;
        }
    };
    HeroCache.prototype.exitScene = function () {
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var hero = _a[_i];
            hero.clearPath();
        }
    };
    HeroCache.prototype.addHero = function (hero) {
        if (hero.pro.isMainPlayer) {
            this.list.unshift(hero);
            this.focusPlayer = hero;
        }
        else {
            for (var i = 0; i < this.list.length; i++) {
                if (this.list[i].pro.isMainPlayer)
                    continue;
                if (hero.pro.pro(PropId.AP_ACTOR_ID) < this.list[i].pro.pro(PropId.AP_ACTOR_ID)) {
                    this.list.splice(i, 0, hero);
                    return;
                }
            }
            this.list.push(hero);
        }
        App.MessageCenter.dispatch(MsgConst.NEW_HERO);
    };
    HeroCache.prototype.clearJump = function () {
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var hero = _a[_i];
            hero.clearJump();
        }
    };
    HeroCache.prototype.setPosition = function (x, y) {
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var hero = _a[_i];
            hero.setCellXY(x, y, true);
        }
    };
    Object.defineProperty(HeroCache.prototype, "focusPlayer", {
        /**当前操作实体*/
        get: function () {
            return this._focus;
        },
        set: function (p) {
            this._focus = p;
            App.MessageCenter.dispatch(MsgConst.FOCUS_CHANGE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeroCache.prototype, "mainPlayer", {
        /**主角实体*/
        get: function () {
            return this.list[0];
        },
        enumerable: true,
        configurable: true
    });
    HeroCache.prototype.isMySelf = function (recog) {
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var thing = _a[_i];
            if (thing.pro.recog == recog)
                return true;
        }
    };
    HeroCache.prototype.getThing = function (recog) {
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var thing = _a[_i];
            if (thing.pro.recog == recog)
                return thing;
        }
    };
    HeroCache.prototype.resetFocus = function () {
        for (var i = 0; i < this.list.length; i++) {
            var h = this.list[i];
            if (!h.isDie) {
                if (h != this._focus) {
                    this.focusPlayer = h;
                }
                break;
            }
        }
    };
    /**根据职业获取角色实体*/
    HeroCache.prototype.getHeroByJob = function (job) {
        for (var i = 0; i < this.list.length; i++) {
            var h = this.list[i];
            if (h.pro.pro(PropId.AP_JOB) == job)
                return h;
        }
    };
    /**根据职业获取角色属性集*/
    HeroCache.prototype.getProByJob = function (job) {
        for (var i = 0; i < this.list.length; i++) {
            var h = this.list[i];
            if (h.pro.pro(PropId.AP_JOB) == job)
                return h.pro;
        }
    };
    /**根据索引获取角色属性集*/
    HeroCache.prototype.getProByIndex = function (index) {
        return this.list[index] && this.list[index].pro;
    };
    /**根据职业获取角色id，发送给后端时使用，-1未创角该职业的角色*/
    HeroCache.prototype.getServerIdByJob = function (job) {
        var pro = this.getProByJob(job);
        if (!pro)
            return -1;
        if (pro == this.mainPro)
            return 0;
        return pro.pro(PropId.AP_ACTOR_ID);
    };
    /**根据索引获取角色id，发送给后端时使用*/
    HeroCache.prototype.getServerIdByIndex = function (index) {
        var pro = this.getProByIndex(index);
        if (pro == this.mainPro)
            return 0;
        return pro.pro(PropId.AP_ACTOR_ID);
    };
    /**收到到的id转化为实体id*/
    HeroCache.prototype.transIdFromeServer = function (id) {
        if (id == 0)
            return this.mainPro.pro(PropId.AP_ACTOR_ID);
        return id;
    };
    /**根据索引获取对应的数据*/
    HeroCache.prototype.getDataByIndex = function (index, data) {
        var pro = this.getProByIndex(index);
        if (pro) {
            return data[pro.pro(PropId.AP_ACTOR_ID)];
        }
        return null;
    };
    /**根据职业获取对应的数据*/
    HeroCache.prototype.getDataByJob = function (job, data) {
        var pro = this.getProByJob(job);
        if (pro) {
            return data[pro.pro(PropId.AP_ACTOR_ID)];
        }
        return null;
    };
    /**根据索引获取对应的角色id*/
    HeroCache.prototype.getRoleIdByIndex = function (index) {
        var pro = this.getProByIndex(index);
        if (pro) {
            return pro.pro(PropId.AP_ACTOR_ID);
        }
        return null;
    };
    /**根据角色id获取职业*/
    HeroCache.prototype.getJobByRoleId = function (id) {
        for (var i = 0; i < this.list.length; i++) {
            var h = this.list[i];
            if (h.id == id)
                return h.pro.job;
        }
    };
    /**收到的实体id转化为serverid*/
    HeroCache.prototype.transServerFromeId = function (id) {
        if (id == this.mainPro.pro(PropId.AP_ACTOR_ID))
            return 0;
        return id;
    };
    /**根据索引获取角色开启状态 index为 0/1/2 */
    /**0为未解锁,1未开启已解锁,2为已开启 */
    HeroCache.prototype.getRoleStateByIndex = function (index) {
        /**已有角色 */
        if (GameCache.hero.list[index]) {
            return 2;
        }
        else {
            //需要判断是否开启/解锁
            var adCache = GameCache.adventure;
            var award = adCache.topAward;
            if (!award)
                return 0;
            var isRole = adCache.topAward.type == AwardType.CREATE_HERO;
            if (!isRole) {
                return 0;
            }
            else {
                return adCache.taskList.length == adCache.topProgress ? 1 : 0;
            }
        }
    };
    return HeroCache;
}(BaseCache));
__reflect(HeroCache.prototype, "HeroCache");
//# sourceMappingURL=HeroCache.js.map