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
 * 人物
*/
var HumanThing = (function (_super) {
    __extends(HumanThing, _super);
    function HumanThing() {
        var _this = _super.call(this) || this;
        _this.pet = [];
        _this.flowUpdateTime = 0;
        return _this;
        //this.bodyContainer.scaleX = this.bodyContainer.scaleY = 0.67;
    }
    HumanThing.prototype.init = function (pro) {
        _super.prototype.init.call(this, pro);
        this.removePet();
        for (var index in pro.petId) {
            this.updatePet(pro.petId[index], pro.petName[index], pro.petStar[index]);
        }
    };
    HumanThing.prototype.changeHp = function (value) {
        _super.prototype.changeHp.call(this, value);
        ActorSeleMgr.hpChange(this);
    };
    HumanThing.prototype.updateProperty = function (propType, propValue) {
        _super.prototype.updateProperty.call(this, propType, propValue);
        //称号与徽章预留
        switch (propType) {
            case PropId.AP_BADGE_LVL:
                this.title.setBadge(propValue);
                break;
            case PropId.AP_HP:
                this.changeHp(propValue);
                break;
        }
    };
    HumanThing.prototype.updatePet = function (id, name, wStep) {
        if (id) {
            var con = GameConfig.pet[id];
            if (!con)
                return;
            var pro = this.pro;
            var p = new PropertySet();
            p.kind = ThingKind.Pet;
            p.pro(PropId.AP_ACTOR_ID, id);
            p.pro(PropId.AP_BODY_ID, GameCache.pet.getModelId(wStep, id));
            p.pro(PropId.AP_X, this.cellXY.x);
            p.pro(PropId.AP_Y, this.cellXY.y);
            p.masterName = this.pro.charName;
            p.isFlow = true;
            var strName = name;
            if (strName == "") {
                strName = con["name"];
            }
            p.charName = StringUtils.substitute(Language.lang.de, pro.charName, strName);
            p.recog = App.ThingManager.createRecog();
            var pet = App.ThingManager.createThing(p);
            this.pet.push(pet);
        }
    };
    HumanThing.prototype.removePet = function () {
        for (var index in this.pet) {
            var pet = this.pet[index];
            if (pet) {
                pet.dispose();
                pet = null;
            }
        }
        this.pet.length = 0;
    };
    HumanThing.prototype.update = function (tick) {
        _super.prototype.update.call(this, tick);
        var cv = this.flowUpdateTime <= tick;
        cv && (this.flowUpdateTime = tick + 500);
        var xy = this.cellXY;
        var dis = 6 - this.pet.length;
        for (var _i = 0, _a = this.pet; _i < _a.length; _i++) {
            var ani = _a[_i];
            if (cv && !ani.isMove) {
                if (!GameCache.map.canStand(ani.cellXY.x, ani.cellXY.y)) {
                    ani.setCellXY(xy.x, xy.y, false);
                    continue;
                }
                var needMove = Math.abs(ani.cellXY.x - xy.x) > dis || Math.abs(ani.cellXY.y - xy.y) > dis;
                if (needMove) {
                    if (!ani.isfollow) {
                        ani.moveSpeed = GlobalVar.DEFAULT_MOVE_SPEED;
                        if (ani.cellXY.y == xy.y && ani.moveTo(xy.x, xy.y - this.getBodyDir()))
                            ani.isfollow = true;
                        else {
                            var count = 2;
                            var dir = this.getBodyDir();
                            while (count > 0) {
                                var _x = xy.x - dir * count;
                                if (GameCache.map.canStand(_x, xy.y)) {
                                    ani.setCellXY(_x, xy.y, false);
                                    ani.updateBodyDir(ani.cellXY.x, xy.x);
                                    break;
                                }
                                count--;
                            }
                            ani.isfollow = false;
                        }
                    }
                }
                else {
                    ani.clearPath();
                    ani.isfollow = false;
                }
                if (xy.x == ani.cellXY.x && xy.y == ani.cellXY.y) {
                    var count = 2;
                    var dir = this.getBodyDir();
                    while (count > 0) {
                        var _x = xy.x - dir * count;
                        if (GameCache.map.canStand(_x, xy.y)) {
                            ani.moveSpeed = GlobalVar.DEFAULT_MOVE_SPEED << 1;
                            ani.moveTo(_x, xy.y);
                            break;
                        }
                        count--;
                    }
                }
                dis++;
                ani.setOnView(this.isInView);
            }
            ani.update(tick);
        }
    };
    HumanThing.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.removePet();
    };
    return HumanThing;
}(AnimalThing));
__reflect(HumanThing.prototype, "HumanThing");
//# sourceMappingURL=HumanThing.js.map