/*
 * @Description: 任务系统
 * @Author: guolinsen
 * @Date: 2019-06-19 21:28:29
 */
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
var QuestProxy = (function (_super) {
    __extends(QuestProxy, _super);
    function QuestProxy() {
        var _this = _super.call(this, PacketTypes.QUEST) || this;
        _this.regNetMsg(1, _this.updateQuest); //请求任务列表
        return _this;
    }
    QuestProxy.prototype.updateQuest = function (bytes) {
        var id = bytes.readShort(); //-1 表示任务结束 >= 0为正常id
        var state = bytes.readByte();
        var progress = bytes.readInt();
        GameCache.quest.update(id, state, progress);
    };
    /**提交已完成任务*/
    QuestProxy.prototype.sendSumitQuest = function () {
        var bytes = this.getBytes(1);
        //bytes.writeUnsignedInt(id);
        this.sendToServer(bytes);
    };
    /**提交已完成任务*/
    QuestProxy.prototype.sendQuestProgress = function (id, count) {
        var bytes = this.getBytes(2);
        bytes.writeUnsignedInt(id);
        bytes.writeUnsignedInt(count);
        this.sendToServer(bytes);
    };
    return QuestProxy;
}(BaseProxy));
__reflect(QuestProxy.prototype, "QuestProxy");
// class QuestProxy extends BaseProxy {
// 	public constructor() {
// 		super(PacketTypes.QUEST);
// 		this.regNetMsg(1, this.doDoingList); //请求任务列表
// 		this.regNetMsg(2, this.doRequest); //接任务
// 		this.regNetMsg(3, this.doSubmit); //交任务
// 		this.regNetMsg(5, this.doAvailableList); //可接任务列表
// 		this.regNetMsg(8, this.doProgress); //任务进度变更
// 		this.regNetMsg(9, this.doAddAvailableQuest); //添加可接任务，一般在提交任务后服务端下发
// 	}
// 	/**
// 	 * 已接任务列表返回
// 	 * @param bytes
// 	 * 
// 	 */
// 	private doDoingList(bytes: GameByteArray): void {
// 		var result: number = bytes.readByte();
// 		if (!result) {
// 			var numQuest: number = bytes.readUnsignedShort();
// 			var userQ: UserQuest;
// 			//结果为0并且任务数量不为0，则可以读取列表
// 			if (numQuest) {
// 				var id: number;
// 				var numTarget: number;
// 				var numTargetStd: number;
// 				var targetId: number;
// 				var questLoop: number;
// 				var doingQuestList: UserQuest[] = [];
// 				while (bytes.bytesAvailable) {
// 					//读取任务ID
// 					id = bytes.readUnsignedShort();
// 					targetId = bytes.readInt();
// 					questLoop = bytes.readByte();
// 					//创建用户任务
// 					userQ = new UserQuest(id, targetId, questLoop);
// 					userQ.classType = QuestTypes.CLASS_DOING;
// 					numTargetStd = userQ.stdQuest.target.length;
// 					//读取任务目标数量
// 					numTarget = bytes.readUnsignedShort();
// 					//读取任务目标完成进度
// 					for (var i: number = 0; i < numTarget; i++) {
// 						userQ.progress[i] = bytes.readInt();
// 					}
// 					//如果为限时任务，则读取剩余时间
// 					if (userQ.stdQuest.timelimit > 0) {
// 						userQ.timeRemain = bytes.readInt();
// 					}
// 					// userQ.entrust = bytes.readUnsignedShort();
// 					// userQ.star = bytes.readByte();
// 					// userQ.moneyType = bytes.readByte();
// 					//把任务添加到当前任务列表
// 					doingQuestList.push(userQ);
// 				}
// 				//保存当前任务列表
// 				GameCache.quest.setDoingList(doingQuestList);
// 			}
// 			else {
// 				if (GameCache.hero.mainPro.pro(PropId.AP_LEVEL) == 1)
// 					Proxy.main.welcomeBoxCallBack();
// 			}
// 		}
// 		else {
// 			var msg: String = "请求任务列表失败：";
// 			console.log(msg, result);
// 		}
// 	}
// 	/**
// 	  * 接任务返回
// 	  * @param bytes
// 	  * 
// 	  */
// 	private doRequest(bytes: GameByteArray): void {
// 		//读取任务ID
// 		var questId: number = bytes.readUnsignedShort();
// 		var targetId: number = bytes.readInt();
// 		//当前任务做到几环
// 		var questLoop: number = bytes.readByte();
// 		//读取结果
// 		var result: number = bytes.readByte();
// 		//结果为0,则创建用户任务对象并添加到当前任务列表
// 		if (!result) {
// 			//创建用户任务
// 			var userQ: UserQuest = new UserQuest(questId, targetId, questLoop);
// 			userQ.classType = QuestTypes.CLASS_DOING;
// 			//添加到当前任务列表
// 			GameCache.quest.addQuest(userQ);
// 			//从可接任务列表删除
// 			GameCache.quest.removeAvailableQuestById(userQ.stdQuest.id);
// 			//播放任务完成特效
// 		}
// 		//结果为非0,则抛出错误
// 		else {
// 			console.log("接任务失败：" + result);
// 		}
// 		//			Debugger.traceMsg("接任务" + (result ? "失败" + result : "成功,任务ID：" + questId));
// 	}
// 	/**
// 	 * 提交任务返回
// 	 * @param bytes
// 	 * 
// 	 */
// 	private doSubmit(bytes: GameByteArray): void {
// 		var questId: number = bytes.readUnsignedShort();
// 		var result: number = bytes.readByte();
// 		if (!result) {
// 			GameCache.quest.removeDoingQuestById(questId);
// 		}
// 		else {
// 			console.log("提交任务失败：" + result);
// 		}
// 	}
// 	/**
// 	 * 接收服务端下发的可接任务列表
// 	 * 服务器主动定期下发
// 	 * @param bytes
// 	 * 
// 	 */
// 	private doAvailableList(bytes: GameByteArray): void {
// 		var id: number;
// 		var count: number = bytes.readShort();
// 		var availableQuestList: UserQuest[] = [];
// 		var usrQ: UserQuest;
// 		var targetId: number;  //任务目标
// 		var questLoop: number;  //当前的环数
// 		for (var i: number = 0; i < count; i++) {
// 			id = bytes.readUnsignedShort();
// 			targetId = bytes.readInt();
// 			questLoop = bytes.readByte();
// 			usrQ = new UserQuest(id, targetId, questLoop + 1);
// 			usrQ.classType = QuestTypes.CLASS_AVAILABLE;
// 			availableQuestList.push(usrQ);
// 		}
// 		if (availableQuestList.length > 0)
// 			GameCache.quest.setAvailableList(availableQuestList);
// 	}
// 	/**
// 	* 处理任务进度变更
// 	* @param bytes
// 	* 
// 	*/
// 	private doProgress(bytes: GameByteArray): void {
// 		//读取任务ID
// 		var id: number = bytes.readUnsignedShort();
// 		//读取目标索引
// 		var index: number = bytes.readUnsignedByte();
// 		//读取目标完成进度
// 		var progress: number = bytes.readUnsignedShort();
// 		//读总的进度
// 		var totalProgress: number = bytes.readUnsignedShort();
// 		var userQ: UserQuest = GameCache.quest.getDoingQuestById(id);
// 		if (userQ && userQ.stdQuest.randomTarget)
// 			index = 0;
// 		//更新任务数据
// 		GameCache.quest.updateQuestProgress(id, index, progress, totalProgress);
// 	}
// 	/**
//    * 处理提交任务后添加可接任务
//    * @param bytes
//    * 
//    */
// 	private doAddAvailableQuest(bytes: GameByteArray): void {
// 		var questModel: QuestCache = GameCache.quest;
// 		var count: number = bytes.readUnsignedShort();
// 		var id: number;
// 		var usrQ: UserQuest;
// 		var targetId: number;  //任务目标
// 		var questLoop: number;  //当前的环数
// 		for (var i: number = 0; i < count; i++) {
// 			id = bytes.readUnsignedShort();
// 			targetId = bytes.readInt();  //任务目标的id	
// 			questLoop = bytes.readByte(); //当前任务做到几环
// 			usrQ = new UserQuest(id, targetId, questLoop + 1);
// 			usrQ.classType = QuestTypes.CLASS_AVAILABLE;
// 			questModel.addAvailableQuest(usrQ);
// 		}
// 	}
// 	/***************************************************************************/
// 	/**提交已完成任务*/
// 	public sendSumitQuest(id: number) {
// 		let bytes = this.getBytes(2);
// 		bytes.writeUnsignedInt(id);
// 		this.sendToServer(bytes);
// 	}
// } 
//# sourceMappingURL=QuestProxy.js.map