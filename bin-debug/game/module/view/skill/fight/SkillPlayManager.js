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
 * @Description:技能特效播放
 * @Author: guolinsen
 * @Date: 2019-06-12 10:46:05
 * @LastEditTime: 2019-09-03 20:47:41
 */
var SkillPlayManager = (function (_super) {
    __extends(SkillPlayManager, _super);
    function SkillPlayManager() {
        return _super.call(this) || this;
    }
    SkillPlayManager.prototype.play = function (actor, skill, x, y, tar) {
        var skillCon = GameConfig.skill[skill.nSkillId];
        this.playId(actor, skillCon.skilleff1, actor.cellXY.x, actor.cellXY.y, x, y, tar, skill);
    };
    SkillPlayManager.prototype.playId = function (actor, id, sx, sy, ex, ey, tar, skill) {
        var stdEff = GameConfig.skillEff[id];
        if (stdEff) {
            if (stdEff.delay) {
                App.TimerManager.addDelay(stdEff.delay, 1, 1, this.useEff, this, null, null, actor, stdEff, skill, sx, sy, ex, ey, tar, GameCache.map.mapId);
            }
            else {
                this.useEff(actor, stdEff, skill, sx, sy, ex, ey, tar, GameCache.map.mapId);
            }
            if (stdEff.hiteff) {
                if (stdEff.type != 1) {
                    this.postBeHit(actor, skill, tar, ex, ey);
                }
            }
        }
    };
    /**施法特效*/
    SkillPlayManager.prototype.useEff = function (actor, stdEff, skill, sx, sy, ex, ey, tar, sceneId) {
        if (GameCache.map.mapId != sceneId)
            return;
        if (!actor.pro)
            return;
        if (stdEff.shake) {
            if (GameCache.hero.isMySelf(actor.pro.recog))
                App.gameWorld.shake();
        }
        var dir = 0;
        if (sx > ex) {
            dir = -1;
        }
        else if (sx < ex) {
            dir = 1;
        }
        var self = this;
        var mc = self.createMc(stdEff, null, actor, sx, sy, false, 0, dir);
        if (mc) {
            if (stdEff.type == 1 || stdEff.type == 2) {
                if (stdEff.flyDis) {
                    ex = sx + dir * (stdEff.flyDis);
                }
                var tx = (ex + 0.5) * GameCache.map.cellWidth + (stdEff.offsetX ? stdEff.offsetX : 0);
                var ty = (ey + 0.5) * GameCache.map.cellHeight + (stdEff.offsetY ? stdEff.offsetY : 0);
                var dis = MathUtils.getDistance(mc.x, mc.y, tx, ty);
                var angle = MathUtils.getAngle(MathUtils.getRadian2(mc.x, mc.y, tx, ty));
                mc.rotation = angle + 90;
                var t = egret.Tween.get(mc);
                t.to({ x: tx, y: ty }, dis / stdEff.flySpeed * 1000).call(function () {
                    mc.dispose();
                    if (GameCache.map.mapId != sceneId)
                        return;
                    if (stdEff.type == 1 && stdEff.hiteff) {
                        self.postBeHit(actor, skill, tar, ex, ey);
                    }
                });
            }
            if (stdEff.nextId) {
                self.playId(actor, stdEff.nextId, sx, sy, ex, ey, tar, skill);
            }
        }
        else {
            if (stdEff.type == 1) {
                if (stdEff.hiteff) {
                    self.postBeHit(actor, skill, tar, ex, ey);
                }
            }
            if (stdEff.nextId) {
                self.playId(actor, stdEff.nextId, sx, sy, ex, ey, tar, skill);
            }
        }
    };
    /**攻击命中*/
    SkillPlayManager.prototype.postBeHit = function (actor, skill, tar, x, y) {
        App.FightManager.postHitTarget(actor, skill, tar, x, y);
    };
    SkillPlayManager.prototype.playHitEff = function (attacker, defender, skillId) {
        var stdSkill = GameConfig.skill[skillId];
        if (stdSkill && stdSkill.skilleff2) {
            var eff = GameConfig.skillEff[stdSkill.skilleff2];
            if (eff) {
                if (eff.delay) {
                    App.TimerManager.addDelay(eff.delay, 0, 1, this.createMc, this, null, null, eff, attacker, defender, defender.cellXY.x, defender.cellXY.y, true, skillId);
                }
                else {
                    this.createMc(GameConfig.skillEff[stdSkill.skilleff2], attacker, defender, defender.cellXY.x, defender.cellXY.y, true, skillId);
                }
            }
        }
    };
    SkillPlayManager.prototype.createMc = function (stdEff, attacker, actor, x, y, beHit, skill, dir) {
        if (beHit === void 0) { beHit = false; }
        if (skill === void 0) { skill = 0; }
        if (dir === void 0) { dir = 0; }
        if (!actor.pro)
            return null;
        if (beHit && actor) {
            var std = GameConfig.skill[skill];
            if (std && std.action2) {
                if (!actor.isDie && !actor.disappear) {
                    if (actor.action == ActionStandard.SA_IDLE) {
                        actor.updateBodyDir(actor.cellXY.x, attacker.cellXY.x);
                    }
                    actor.playAction(std.action2, 1);
                }
            }
        }
        if (!stdEff || !stdEff.eff)
            return null;
        if (SkillMovieClip.num >= 12) {
            if (!GameCache.hero.isMySelf(actor.pro.recog)) {
                return null;
            }
        }
        if (stdEff.music) {
            App.SoundManager.playEffect(stdEff.music);
        }
        var mc = SkillMovieClip.create();
        mc.rotation = 0;
        mc.loadFile(RES_DIR_SKILLEFF + stdEff.eff, stdEff.playCount ? stdEff.playCount : 0);
        var layer = stdEff.layer;
        if (layer == 3) {
            App.ThingManager.bottomLayer.addChild(mc);
            mc.x = (x + 0.5) * GameCache.map.cellWidth;
            mc.y = (y + 0.5) * GameCache.map.cellHeight;
        }
        else if (layer == 4) {
            App.ThingManager.titleLayer.addChild(mc);
            mc.x = (x + 0.5) * GameCache.map.cellWidth;
            mc.y = (y + 0.5) * GameCache.map.cellHeight;
        }
        else if (layer == 1) {
            if (actor)
                actor.addChildAt(mc, 0);
            mc.x = 0;
            mc.y = 0;
        }
        else {
            if (actor)
                actor.addChild(mc);
            mc.x = 0;
            mc.y = 0;
        }
        if (stdEff.hasDir) {
            if (dir) {
                mc.scaleX = dir;
            }
            else {
                mc.scaleX = actor.getBodyDir();
            }
        }
        var ox = stdEff.offsetX ? stdEff.offsetX : 0;
        var oy = stdEff.offsetY ? stdEff.offsetY : 0;
        if (oy == -1) {
            oy = -(actor.height >> 1);
        }
        mc.x += ox * mc.scaleX;
        mc.y += oy;
        return mc;
    };
    return SkillPlayManager;
}(BaseClass));
__reflect(SkillPlayManager.prototype, "SkillPlayManager");
//# sourceMappingURL=SkillPlayManager.js.map