/**
* 用户任务
* @author linsen
* 
*/
class UserQuest {
	public stdQuest: StdQuest;//任务配置
	public timeRemain: number;//限时任务剩余的秒数
	public progress: number[];//任务目标完成的进度，元素为int
	public entrust: number;//说明本任务可以委托，委托时间
	private _star: number = 1;//说明本任务可以刷星，最高能刷星到5星
	public moneyType: number;//元宝类型
	public target: any[];  //任务目标
	public award: any[];   //任务奖励
	public refCount: number;  //刷星次数
	public bangYb: number; 	//绑定元宝
	public yBao: number;		//元宝
	public classType: number; //是当前任务还是可接任务
	//                           任务id			随机目标Id		当前任务环数
	public constructor(questId: number = -1, targetId: number = -1, questLoop: number = 1) {

		if (questId > -1) {
			this.target = [];
			this.award = [];
			//获取任务配置
			this.stdQuest = GameConfig.quest[questId];
			if (!this.stdQuest)
				throw new Error("找不到任务ID为" + questId + "的任务");
			let stdQuest = this.stdQuest;
			if (stdQuest.randomTarget)//如果是随机任务
			{

				// stdQuest.questLoop = questLoop;
				// if (stdQuest.target.length > targetId)	//是随机任务
				// {

				// 	this.target = stdQuest.getTarget(targetId);
				// 	var t = (stdQuest.target[targetId]);//从库里面选需要的任务目标					
				// 	stdQuest.loopAwardId = t.rewardId;
				// 	this.award = stdQuest.getAwards(t.rewardId);//从库里面选需要的任务奖励,和当前的环数


				// }
				// else//当数据不对的时候默认为0的下标
				// {
				// 	throw new Error("服务器下发随机任务目标错误，配置里面任务目标数量：" + stdQuest.target.length + "下发的任务目标id:" + targetId + "当前下发任务ID：" + questId);

				// }
			}
			else //普通任务
			{
				this.target = [stdQuest.target];
				stdQuest.loopAwardId = 0;
				this.award = stdQuest.awards[0];
			}

			//配置为空，则抛出错误

			//获取任务目标数量
			var numTarget: number = this.target.length;
			//创建任务目标完成进度
			if (stdQuest.randomTarget) numTarget = 1;

			this.progress = [];
			//初始化任务目标完成进度
			for (var i: number = 0; i < numTarget; i++) {
				this.progress[i] = 0;
			}
		}
	}
	/**
	 * 任务是否完成
	 * @return 
	 * 
	 */
	public get isCompleted(): Boolean {
		if (!this.progress)
			return false;

		var tQ;
		for (var i: number = this.progress.length - 1; i > -1; i--) {
			tQ = this.target[i];
			if (!tQ)
				return false;
			if (this.progress[i] < tQ.count)
				return false;
		}
		return true;
	}

	public get star(): number {
		return this._star;
	}

	public set star(value: number) {
		this._star = value == 0 ? 1 : value;
	}

}