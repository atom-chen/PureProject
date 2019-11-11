/*
 * @Description: 技能系统
 * @Author: guolinsen
 * @Date: 2019-08-21 19:44:11
 * @LastEditTime: 2019-11-04 20:36:45
 */
class SkillProxy extends BaseProxy {
	public constructor() {
		super(PacketTypes.SKILL);

		this.regNetMsg(1, this.doQueryMySkill); //玩家拥有的技能
		this.regNetMsg(2, this.doHitTarget); //主角集中目标
		this.regNetMsg(3, this.doUpdateSkill); //升级或学习技能 返回
		this.regNetMsg(4, this.doSkillSort); //下发技能栏数据
		this.regNetMsg(5, this.doSkillCd); //下发技能栏cd

	}

	private doQueryMySkill(bytes: GameByteArray) {
		// let temp: UserSkill[] = [];
		let skillList = {};
		let id = GameCache.hero.transIdFromeServer(bytes.readUnsignedInt());
		let count: number = bytes.readByte();    //技能数量
		for (let i: number = 0; i < count; i++) {
			let data: UserSkill = new UserSkill();
			data.readAttr(bytes);
			skillList[data.nSkillId] = data;
		}
		GameCache.skill.addSKill(id, skillList);
		App.MessageCenter.dispatch(MsgConst.SKILL_INFO);
	}

	/**
	 * 升级或学习技能 返回
	 * @param pBytes
	 * 
	 */
	private doUpdateSkill(pBytes: GameByteArray): void {
		var id: number = GameCache.hero.transIdFromeServer(pBytes.readUnsignedInt());    //角色id
		var skillId: number = pBytes.readUnsignedShort();
		var newLevel: number = pBytes.readByte();
		GameCache.skill.updataSkill(id, skillId, newLevel);
		App.MessageCenter.dispatch(MsgConst.SKILL_INFO);
	}


	/**更新技能顺序列表 */
	public doSkillSort(pBytes: GameByteArray) {
		let temp = {};
		let id = GameCache.hero.transIdFromeServer(pBytes.readUnsignedInt());
		let count: number = pBytes.readByte();    //技能数量
		for (let i: number = 0; i < count; i++) {
			let index = pBytes.readByte();
			let skillId = pBytes.readUnsignedShort();
			temp[index] = skillId;
		}
		GameCache.skill.initSortSKill(id, temp);
		App.MessageCenter.dispatch(MsgConst.SKILL_SORT);
	}

	/**刷新技能CD */
	public doSkillCd(pBytes: GameByteArray) {
		let id = GameCache.hero.transIdFromeServer(pBytes.readUnsignedInt());
		let skillId: number = pBytes.readUnsignedShort();
		let cd :number = pBytes.readUnsignedInt();
		
		// let cd = pBytes.readInt();

		// let temp = {};
		// let id = GameCache.hero.transIdFromeServer(pBytes.readUnsignedInt());
		// let count: number = pBytes.readByte();    //技能数量
		// for (let i: number = 0; i < count; i++) {
		// 	let index = pBytes.readByte();
		// 	let skillId = pBytes.readUnsignedShort();
		// 	temp[index] = skillId;
		// }
		// GameCache.skill.initSortSKill(id, temp);
		// App.MessageCenter.dispatch(MsgConst.SKILL_SORT);
	}

	private doHitTarget(bytes: GameByteArray) {
		let recog = bytes.readDouble();
		let actor = App.ThingManager.getThing(recog);
		var damage: number = bytes.readInt();
		var soundId: number = bytes.readInt();
		var isBong: boolean = (bytes.readUnsignedByte() == 1);
		App.HurtTxtManager.play(recog, damage, isBong, bytes.readByte(), actor)
		return true;
	}

	/**查询我的技能列表*/
	public sendGetMySkill() {
		this.sendMsgId(1);
	}

	/**使用技能*/
	public sendUseSkill(id: number, skillId: number, target: number, x: number, y: number, dir: number) {
		let bytes: GameByteArray = this.getBytes(2);
		bytes.writeUnsignedInt(id);
		bytes.writeShort(skillId);
		bytes.writeDouble(target);
		bytes.writeShort(x);
		bytes.writeShort(y);
		bytes.writeByte(dir);
		this.sendToServer(bytes);
		//console.log(`使用技能, 角色${id}, 技能${skillId}, x:${x}, y${y}, dir${dir}`);

	}

	/**升级技能*/
	public sendUpSkillLv(roleId: number, skillId: number) {
		let bytes: GameByteArray = this.getBytes(3);
		bytes.writeUnsignedInt(roleId);
		bytes.writeShort(skillId);
		this.sendToServer(bytes);
	}

	/**获取技能栏数据*/
	public getSkillSort(roleId: number) {
		let bytes: GameByteArray = this.getBytes(4);
		bytes.writeUnsignedInt(roleId);
		this.sendToServer(bytes);
	}

	/**技能栏数据修改*/
	public chanegeSkillSort(roleId: number, newSortList: number[]) {
		let bytes: GameByteArray = this.getBytes(5);
		bytes.writeUnsignedInt(roleId);
		bytes.writeByte(newSortList.length);
		for (let i = 0; i < newSortList.length; i++) {
			bytes.writeByte(i);
			bytes.writeUnsignedShort(newSortList[i]);
		}
		this.sendToServer(bytes);
	}

	/**请求一键升级*/
	public setSkillAllUp(roleId: number) {
		let bytes: GameByteArray = this.getBytes(6);
		bytes.writeUnsignedInt(roleId);
		this.sendToServer(bytes);
	}

	/**升级技能*/
	public sendUpExSkillLv(roleId: number, skillId: number) {
		let bytes: GameByteArray = this.getBytes(7);
		bytes.writeUnsignedInt(roleId);
		bytes.writeShort(skillId);
		this.sendToServer(bytes);
	}



}