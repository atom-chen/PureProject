/*
 * @Description:技能特效播放
 * @Author: guolinsen
 * @Date: 2019-06-12 10:46:05
 * @LastEditTime: 2019-09-03 20:47:41
 */
class SkillPlayManager extends BaseClass {
	public constructor() {
		super();
	}
	public play(actor: AnimalThing, skill: UserSkill, x: number, y: number, tar: number) {
		let skillCon: StdSkill = GameConfig.skill[skill.nSkillId];
		this.playId(actor, skillCon.skilleff1, actor.cellXY.x, actor.cellXY.y, x, y, tar, skill);
	}
	private playId(actor: AnimalThing, id: any, sx: number, sy: number, ex: number, ey: number, tar: number, skill: UserSkill) {
		let stdEff: StdSkillEff = GameConfig.skillEff[id];
		if (stdEff) {
			if (stdEff.delay) {
				App.TimerManager.addDelay(stdEff.delay, 1, 1, this.useEff, this, null, null,
					actor, stdEff, skill, sx, sy, ex, ey, tar, GameCache.map.mapId);
			} else {
				this.useEff(actor, stdEff, skill, sx, sy, ex, ey, tar, GameCache.map.mapId);
			}
			if (stdEff.hiteff) {
				if (stdEff.type != 1) {
					this.postBeHit(actor, skill, tar, ex, ey);
				}
			}
		}
	}
	/**施法特效*/
	private useEff(actor: AnimalThing, stdEff: StdSkillEff, skill: UserSkill, sx: number, sy: number,
		ex: number, ey: number, tar: number, sceneId: number) {

		if (GameCache.map.mapId != sceneId) return;
		if (!actor.pro) return;
		if (stdEff.shake) {
			if (GameCache.hero.isMySelf(actor.pro.recog))
				App.gameWorld.shake();
		}
		let dir = 0;
		if (sx > ex) {
			dir = -1;
		} else if (sx < ex) {
			dir = 1;
		}
		let self = this;
		let mc: SkillMovieClip = self.createMc(stdEff, null, actor, sx, sy, false, 0, dir);
		if (mc) {
			if (stdEff.type == 1 || stdEff.type == 2) {
				if (stdEff.flyDis) {
					ex = sx + dir * (stdEff.flyDis);
				}
				let tx: number = (ex + 0.5) * GameCache.map.cellWidth + (stdEff.offsetX ? stdEff.offsetX : 0);
				let ty: number = (ey + 0.5) * GameCache.map.cellHeight + (stdEff.offsetY ? stdEff.offsetY : 0);
				let dis = MathUtils.getDistance(mc.x, mc.y, tx, ty);
				let angle = MathUtils.getAngle(MathUtils.getRadian2(mc.x, mc.y, tx, ty));
				mc.rotation = angle + 90;

				let t = egret.Tween.get(mc);
				t.to({ x: tx, y: ty }, dis / stdEff.flySpeed * 1000).call(() => {
					mc.dispose();
					if (GameCache.map.mapId != sceneId) return;
					if (stdEff.type == 1 && stdEff.hiteff) {
						self.postBeHit(actor, skill, tar, ex, ey);
					}
				});
			}
			if (stdEff.nextId) {
				self.playId(actor, stdEff.nextId, sx, sy, ex, ey, tar, skill);
			}
		} else {
			if (stdEff.type == 1) {
				if (stdEff.hiteff) {
					self.postBeHit(actor, skill, tar, ex, ey);
				}
			}
			if (stdEff.nextId) {
				self.playId(actor, stdEff.nextId, sx, sy, ex, ey, tar, skill);
			}
		}
	}

	/**攻击命中*/
	private postBeHit(actor: AnimalThing, skill: UserSkill, tar: number, x: number, y: number) {
		App.FightManager.postHitTarget(actor, skill, tar, x, y);
	}

	public playHitEff(attacker: AnimalThing, defender: AnimalThing, skillId: number) {
		let stdSkill: StdSkill = GameConfig.skill[skillId];
		if (stdSkill && stdSkill.skilleff2) {
			let eff: StdSkillEff = GameConfig.skillEff[stdSkill.skilleff2];
			if (eff) {
				if (eff.delay) {
					App.TimerManager.addDelay(eff.delay, 0, 1, this.createMc, this, null, null, eff, attacker, defender, defender.cellXY.x, defender.cellXY.y, true, skillId);
				} else {
					this.createMc(GameConfig.skillEff[stdSkill.skilleff2], attacker, defender, defender.cellXY.x, defender.cellXY.y, true, skillId);
				}
			}
		}
	}

	private createMc(stdEff: StdSkillEff, attacker: AnimalThing, actor: AnimalThing, x: number, y: number,
		beHit: boolean = false, skill: number = 0, dir: number = 0): SkillMovieClip {
		if (!actor.pro) return null;
		if (beHit && actor) {
			let std: StdSkill = GameConfig.skill[skill];
			if (std && std.action2) {
				if (!actor.isDie && !actor.disappear) {
					if (actor.action == ActionStandard.SA_IDLE) {
						actor.updateBodyDir(actor.cellXY.x, attacker.cellXY.x);
					}
					actor.playAction(std.action2, 1);
				}
			}
		}
		if (!stdEff || !stdEff.eff) return null;
		if (SkillMovieClip.num >= 12) {
			if (!GameCache.hero.isMySelf(actor.pro.recog)) {
				return null;
			}
		}
		if (stdEff.music) {
			App.SoundManager.playEffect(stdEff.music);
		}
		let mc = SkillMovieClip.create();
		mc.rotation = 0;
		mc.loadFile(RES_DIR_SKILLEFF + stdEff.eff, stdEff.playCount ? stdEff.playCount : 0);
		let layer = stdEff.layer
		if (layer == 3) {
			App.ThingManager.bottomLayer.addChild(mc);
			mc.x = (x + 0.5) * GameCache.map.cellWidth;
			mc.y = (y + 0.5) * GameCache.map.cellHeight;
		} else if (layer == 4) {
			App.ThingManager.titleLayer.addChild(mc);
			mc.x = (x + 0.5) * GameCache.map.cellWidth;
			mc.y = (y + 0.5) * GameCache.map.cellHeight;
		} else if (layer == 1) {
			if (actor) actor.addChildAt(mc, 0);
			mc.x = 0;
			mc.y = 0;
		} else {
			if (actor) actor.addChild(mc);
			mc.x = 0;
			mc.y = 0;
		}
		if (stdEff.hasDir) {
			if (dir) {
				mc.scaleX = dir;
			} else {
				mc.scaleX = actor.getBodyDir();
			}
		}
		let ox = stdEff.offsetX ? stdEff.offsetX : 0;
		let oy = stdEff.offsetY ? stdEff.offsetY : 0;
		if (oy == -1) {
			oy = -(actor.height >> 1);
		}
		mc.x += ox * mc.scaleX;
		mc.y += oy;
		return mc;
	}
}