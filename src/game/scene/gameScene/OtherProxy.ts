/**
 * 其他子系统，具体是什么由后端定
*/
class OtherProxy extends BaseProxy {
	public constructor() {
		super(PacketTypes.OTHER);

		this.regNetMsg(8, this.doGetServicerTime);
		this.regNetMsg(28, this.doServerOpenTime);
		this.regNetMsg(31, this.doGetSystemData);
		this.regNetMsg(80, this.doAwardInfo);
		this.regNetMsg(82, this.doJingjiData);		//竞技场个人数据
		this.regNetMsg(83, this.doTargetList);		//竞技场挑战列表
		this.regNetMsg(84, this.doTargetDetal);		//竞技场挑战目标详细数据
		this.regNetMsg(85, this.doJingjiRankData) 	//竞技场积分榜数据
	}

	/**
	 * 服务器时间返回
	 * @param bytes
	 * 
	 */
	private doGetServicerTime(bytes: GameByteArray): void {
		let serCache = GameCache.server;
		//保存成功进入游戏的服务器时间
		serCache.serverTimeBase = GlobalFun.formatMiniDateTime(bytes.readUnsignedInt()) - egret.getTimer();
		//计算并保存服务器的开区时间
		//serCache.serverOpenTime = GlobalFun.formatMiniDateTime(bytes.readUnsignedInt());

		let d = new Date();
		d.setTime(serCache.serverTime);
		console.log("当前时间：", d.toString());
		//d.setTime(serCache.serverOpenTime);
		//console.log("开服时间：", d.toString());
		//console.log("开服天数：", serCache.serverOpenDay);
		//App.MessageCenter.dispatch(MsgConst.SERVER_TIME_CHANGE);
	}

	/**
	 * 服务器开服时间/合服时间
	*/
	private doServerOpenTime(bytes: GameByteArray) {
		let serCache = GameCache.server;
		serCache.serverOpenDay = bytes.readUnsignedInt();
		serCache.serverOpenTime = GlobalFun.formatMiniDateTime(bytes.readUnsignedInt());
		serCache.serverCombineDay = bytes.readUnsignedInt();
		serCache.serverCombineTime = GlobalFun.formatMiniDateTime(bytes.readUnsignedInt());

		console.log("开服天数：", serCache.serverOpenDay);
		console.log("合服天数：", serCache.serverCombineDay);
		App.MessageCenter.dispatch(MsgConst.SERVER_TIME_CHANGE);
	}

	private doGetSystemData(bytes: GameByteArray): void {
		GameCache.settings.init();
		let count = bytes.readInt();
		for (let i = 0; i < count; i++) {
			let index = bytes.readByte();
			let value = bytes.readUnsignedInt();
			GameCache.settings.update(index, value, false);
		}
	}

	private doJingjiData(bytes: GameByteArray): void {
		let winNum = bytes.readUnsignedInt();  			//胜场次数
		let winPoint = bytes.readUnsignedInt();			//胜场积分
		let remain = bytes.readByte();					//剩余挑战次数
		let bought = bytes.readByte();					//已购买次数
		let recoverTime = GlobalFun.formatMiniDateTime(bytes.readUnsignedInt());		//恢复挑战次数时间戳
		let refreshTime = GlobalFun.formatMiniDateTime(bytes.readUnsignedInt());		//可刷新时间戳
		let pointRank = bytes.readUnsignedShort();		//个人积分排名
		GameCache.jingji.initJingjiData(winNum, winPoint, remain, bought, recoverTime, refreshTime, pointRank);
	}

	private doTargetList(bytes: GameByteArray): void {
		let len = bytes.readByte();
		let arr = [];
		for (let i = 0; i < len; i++) {
			let icon = bytes.readUnsignedInt();
			let lvl = bytes.readUnsignedInt();
			let power = bytes.readUnsignedInt();
			let roleName = bytes.readCustomBytes();
			let obj = {
				icon: icon,
				lvl: lvl,
				power: power,
				roleName: roleName
			}
			arr.push(obj);
		}
		GameCache.jingji.jingjiList = arr.concat();
		App.MessageCenter.dispatch(MsgConst.JINGJI_LIST);
	}

	private doTargetDetal(bytes: GameByteArray): void {
		let len = bytes.readByte();
		let pro = [];
		for (let i = 0; i < len; i++) {
			let proSet: PropertySet = new PropertySet();
			bytes.readUnsignedInt();
			proSet.pro(PropId.AP_ACTOR_ID, bytes.readInt());
			proSet.pro(PropId.AP_JOB, bytes.readUnsignedInt());
			proSet.pro(PropId.AP_LEVEL, bytes.readUnsignedInt());
			proSet.pro(PropId.AP_SEX, bytes.readUnsignedInt());
			let hp = bytes.readUnsignedInt();
			proSet.pro(PropId.AP_MAX_HP, hp);
			proSet.pro(PropId.AP_HP, hp);
			proSet.pro(PropId.AP_ATTACK, bytes.readUnsignedInt());
			//proSet.pro(PropId.AP_MAGIC_ATTACK_MAX, bytes.readUnsignedInt());
			proSet.pro(PropId.AP_DEFENCE, bytes.readUnsignedInt());
			//proSet.pro(PropId.AP_MAGIC_DEFENCE_MAX, bytes.readUnsignedInt());
			proSet.pro(PropId.AP_HITVALUE, bytes.readUnsignedInt());
			proSet.pro(PropId.AP_DOGVALUE, bytes.readUnsignedInt());
			proSet.pro(PropId.AP_MOVE_SPEED, bytes.readUnsignedInt());
			proSet.pro(PropId.AP_ATTACK_SPEED, bytes.readUnsignedInt());
			proSet.pro(PropId.AP_CRIT, bytes.readUnsignedInt());
			proSet.pro(PropId.AP_CRIT_HURT, bytes.readUnsignedInt()); //16

			proSet.skillList = [];
			for (let i = 0; i < 5; i++) {
				let skillId = bytes.readUnsignedShort();
				let skillLvl = bytes.readUnsignedInt();
				if (skillId == 0) {
					// proSet.skillList.push([0, 0]);
					continue;
				} else {
					proSet.skillList.push([skillId, skillLvl]);
				}
			}  	//24

			let roleName = bytes.readCustomBytes(); //25
			proSet.setRoleName(roleName);
			pro.push(proSet);
		}
		GameCache.jingji.targetDetail = pro;
		App.MessageCenter.dispatch(MsgConst.JINGJI_DETAIL);
	}

	private doJingjiRankData(bytes: GameByteArray): void {
		let len = bytes.readByte();
		let arr = [];
		for (let i = 0; i < len; i++) {
			let rank = bytes.readUnsignedInt();
			let job = bytes.readUnsignedInt();
			let lvl = bytes.readUnsignedInt();
			let winPoint = bytes.readUnsignedInt();
			let roleName = bytes.readCustomBytes();
			let obj = {
				rank: rank,
				job: job,
				lvl: lvl,
				winPoint: winPoint,
				roleName: roleName
			}
			arr.push(obj);
		}
		App.MessageCenter.dispatch(MsgConst.JINGJI_RANK, arr);
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////

	/**
	 *保存系统设置到服务器 
	 * @param systemSaveDate
	 * @param count    为0的时候到数组结束位置
	 */
	public sendSystemConfigSave(data: any): void {
		var bytes = this.getBytes(30);
		let count = Object.keys(data).length;
		bytes.writeInt(count); 				  //类型总数量
		for (let k in data) {
			bytes.writeByte(parseInt(k));	  //类型
			bytes.writeInt(data[k]);		 //值
		}
		this.sendToServer(bytes);
	}


	/**
 	 * 领取奖励通知
	 */
	private doAwardInfo(bytes: GameByteArray): void {
		let len = bytes.readUnsignedShort();
		let arr = [];
		for (let i = 0; i < len; i++) {
			let type = bytes.readByte();
			let id = bytes.readUnsignedShort();
			let count = bytes.readUnsignedInt();
			arr.push([id, count]);
		}
		//场景为世界BOSS时，奖励为归属奖励
		if (GameCache.map.mapConfig.type == SceneType.WORLD_BOSS || GameCache.map.mapConfig.type == SceneType.VIP_BOSS) {
			GameCache.award.openAwardTips(arr, AwardSourceType.BOSS_PLUS);
		} else if (GameCache.map.mapConfig.type == SceneType.FASHION) {
			GameCache.copy.recordItemArr = GameCache.copy.recordItemArr.concat(arr);
		} else {
			//判断该场景是否显示掉落奖励面板
			if (GameCache.map.mapConfig.awardPanel)
				GameCache.award.openAwardTips(arr, AwardSourceType.OTHER);
		}
	}

	/**
	 * 竞技场个人数据请求
	 */
	public sendJingjiDataRequest(): void {
		let bytes: GameByteArray = this.getBytes(48);
		this.sendToServer(bytes);
	}

	/**
	 * 刷新竞技场列表 或 请求下发
	 * @param option 1为刷新 0为请求下发列表
	 */
	public sendListRefresh(option = 0): void {
		let bytes: GameByteArray = this.getBytes(49);
		bytes.writeByte(option);
		this.sendToServer(bytes);
	}

	/**
	 * 购买竞技场挑战次数
	 */
	public sendBuyChance(): void {
		let bytes: GameByteArray = this.getBytes(50);
		this.sendToServer(bytes);
	}

	/**
	 * 竞技场挑战
	 * @param idx条目下标
	 */
	public sendChallenge(idx): void {
		let bytes: GameByteArray = this.getBytes(51);
		bytes.writeByte(idx);
		this.sendToServer(bytes);
	}

	/**
	 * 上传挑战结果
	 * @param result 0 为失败 1为胜利
	 */
	public sendResult(result): void {
		let bytes: GameByteArray = this.getBytes(52);
		bytes.writeByte(result);
		this.sendToServer(bytes);
	}

	/**
	 * 积分榜数据请求
	 */
	public sendPointRank(len): void {
		let bytes: GameByteArray = this.getBytes(53);
		bytes.writeByte(len);
		this.sendToServer(bytes);
	}
}