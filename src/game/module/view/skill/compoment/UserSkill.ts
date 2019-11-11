/*
 * @Description: 一个可使用的技能结构
 * @Author: guolinsen
 * @Date: 2019-06-11 20:13:47
 * @LastEditTime: 2019-08-27 16:36:41
 */
class UserSkill {
	public mjs: number;     //秘籍
	public nSkillId: number;//技能ID
	public nLevel: number;//技能等级
	public dwResumeTick: number;//技能的冷却结束时间
	public exp: number;        //技能的经验
	public mjOutTime: number;  //秘籍过期时间
	public active: Boolean = true;  //此技能是否能用

	public constructor() {
	}

	/**
	 * 读取数据 
	 * @param pBytes
	 * 
	 */
	public readAttr(pBytes: GameByteArray): void {
		this.nSkillId = pBytes.readUnsignedShort();
		this.nLevel = pBytes.readUnsignedByte();
		//	this.mjs = pBytes.readUnsignedShort();
		this.dwResumeTick = App.TimerManager.getSyncTime() + pBytes.readUnsignedInt();
		this.exp = pBytes.readUnsignedInt();
		//	this.mjOutTime = pBytes.readUnsignedInt();
		pBytes.readByte();
		//this.active = pBytes.readByte() == 0 ? true : false;   //0能用
	}

	public get canUse(): boolean {
		return this.active && this.dwResumeTick <= App.TimerManager.getSyncTime();
	}

	public dispose(){
		UserSkill._pool.push(this);
	}

	private static _pool: UserSkill[] = [];
	static create(id: number, lv: number): UserSkill {
		let skill = this._pool.shift();
		(!skill) && (skill = new UserSkill());
		skill.nSkillId = id;
		skill.nLevel = lv;
		skill.dwResumeTick = 0;
		return skill;
	}

}