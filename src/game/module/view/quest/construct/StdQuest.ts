class StdQuest {
	public id: number;//任务id，任务ID值是唯一的
	public name: string;//任务名称
	public parentid: number;//父任务ID，如果值为0则表示没有父任务，否则必须在做完父任务后才能接此任务
	public type: number;//任务类型
	public level: number;//任务品级, 普通、中级、高级、特级（品级越高，奖励越大）
	public cangiveup: boolean;//是否可以放弃
	public content: string;//任务描述，用于再客户端的任务面板中显示的简短描述，可使用HTML语法、寻路指令
	public prom: any;//接任务NPC配置，如果值为null则表示这个任务不需要通过NPC接受，在满足接受条件时自动接受
	public comp: any;//交任务NPC配置，如果值为null则表示这个任务不需要通过NPC交任务，在满足需求条件时自动完成并获得奖励
	public target: QuestTarget;//目标列表, 元素类型为QuestTarget
	public awards: any[];//奖励列表, 元素类型为QuestAward
	public conds: any[];//条件列表, 元素类型为QuestCond
	public timelimit: number;//任务时间限制，单位是秒钟，从接任务后开始计时，必须在时间归零前完成任务，否则任务自动注销，0表示不限制时间；
	public interval: number;//任务周期，单位是秒。0表示不限制。任务周期表示从当天0点开始，进行任务后的多长时间后才能再次接任务。
	public maxcount: number;//每个任务周期内，可以做多少次，0表示不限制；
	public excludetree: Boolean;//如果接了此任务的子任务，则不能再接此任务；
	public autoRun: Boolean;//接到任务以后是否自动寻路，默认false是不自动寻路的，true表示自动寻路
	public circle: number;//用来显示环任务处在第几环
	public maxcir: number;//最大环
	public entrust: number;//说明本任务可以委托，委托时间为60秒
	public star: number;//说明本任务可以刷星，最高能刷星到5星
	public GuideID: number;//引导窗口的ID，0表示默认，不配置
	public showTimerBox: boolean = false;   //是否弹出不需要飞天鞋的速传框
	public speedYb: number;    //任务是否可以快速完成（可以完成就表示需要的元宝数量）
	public npcTalk: string;
	public mod: string;

	//客户端用
	public randomTarget: boolean; //是否是循环任务
	public questLoop: number; 	//当前是第几环
	public loopAwardId: number; //环id

	public constructor() {
	}

	// /**
	//  *  根据任务目标索引取到相应的任务目标
	//  *   index 任务目标的索引
	//  */
	// public static getTarget(std: StdQuest, index: number): QuestTarget[] {
	// 	var targetArr = [];
	// 	if (index > std.target.length)
	// 		throw new RangeError("获取任务目标配置时索引" + index + "超出范围1 - " + target.length);
	// 	targetArr.push(std.target[index]);
	// 	return targetArr;
	// }

	// /**
	//  * 根据任务目标的索引取出相关的任务奖励   奖励的id 任务环数
	//  */
	// public static getAwards(std: StdQuest, index: number = 0): any[] {
	// 	if (index > std.awards.length)
	// 		throw new RangeError("获取任务目标奖励配置时索引" + index + "超出范围1 - " + awards.length);
	// 	return this.AwardAmendments(std, index);
	// }

	// /**
	//  *  任务奖励的修正 
	//  * 
	//  */
	// public static AwardAmendments(std:StdQuest, index: number = 0, level: number = 0): Array {

	// 	var awds = [];
	// 	var data = std.awards[index];
	// 	var awardsData;
	// 	if (data) {
	// 		for(var Qaward of data)
	// 		{
	// 			awardsData = Qaward.clone();
	// 			awardsData.count = Calculate(Qaward, level);
	// 			awds.push(awardsData);
	// 		}
	// 	}
	// }

}