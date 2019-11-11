/*
 * @Description:技能的配置格式
 * @Author: guolinsen
 * @Date: 2019-06-12 10:47:44
 * @LastEditTime: 2019-11-04 19:32:43
 */
class StdSkill {
	id: number;
	name: string;
	desc: string;

	/**职业
	 * 1战士2法师 3道士 4怪物 5英雄
	*/
	vocation: number;

	/**
	 * 技能的类型(从技能的功能上划分,物理、魔法、毒物主要用于区分命中、闪避)：
		0.物理攻击技能
		1.被动技能
		2.魔法攻击技能
		3.毒物攻击技能
		4.生活技能
		5.其他特殊技能，比如队伍buff，通过技能实现的(比如光环类)
	*/
	skillType: number;

	/**
	 * 技能的分类(从系统上做区分的技能的分类)：
    	1.职业基本技能
    	2.怪物技能
    	3.必杀  
    	4.挖矿技能
    	5.开门技能，类似沙巴克城门
		6.兵魂技能
	*/
	skillClass: number;

	/**
	 * 0.表示直接释放，如果选择了目标将直接释放
	 *	1.表示点击了技能图标以后，还需要选择一个目标才会释放
	 *	2.表示点击技能图标以后,在鼠标位置释放,(类似法师的火墙术),方向是当前与鼠标的方向
     *	3.表示仅对自己使用，这时将忽略选中的目标，上发的坐标是当前面向的1格的坐标,方向上发的面向的方向
	 *	4.直接释放（类似战士的野蛮冲撞，坐标是当前玩家的坐标，朝向是当前玩家的朝向，目标发个0）
	 *	5.直接在鼠标指向点释放（忽略鼠标指向是否有目标）
	*/
	skillSpellType: number;

	/**技能范围*/
	actRange: StdSkillRange[];

	/**cd*/
	cooldownTime: number;

	/**施法特效*/
	skilleff1: number;

	/**受击特效*/
	skilleff2: number;

	/**施法距离*/
	skilldis: number;

	/*施法动作*/
	action1: number;

	/**受击动作*/
	action2: number;

	/**音效*/
	music: string;
	/**图标*/
	icon: string;

	need: any[];

	useLevel: number;
	
	/**技能类型,区别奥义与普通技能 */
	skillsort: number;

	valuedec: number[];

	/**转生配置索引 */
	transferlevel:number;

	public constructor() {
	}
}

class StdSkillRange {
	xStart: number = 0;    //相对于中心点x左边的相对坐标
	xEnd: number = 0;      //相对于中心点x右边的相对坐标
	yStart: number = 0;    //相对于中心点y上边的相对坐标
	yEnd: number = 0;      //相对于中心点y下边的相对坐标

	/**范围的类型
	   0:无范围，仅针对目标的单体技能(单体)
	   1:线性旋转(单体)（弹道效果）
	   2:线性范围(群体)
	   3:范围(群体)
	   4:以中心点与鼠标的位置的连线作为旋转轴旋转，比线性旋转更精确，用于法师的火球术
	   5:以施法点为中心的范围
   */
	rangeType: number = 0;

	/** 范围中心类型
		0:目标
		1:施法者自己
		2:施法点（鼠标落点）
		3:施法者的瞬时坐标和方向
	*/
	rangeCenter: number = 0;

	/**释放条件*/
	spellConds: any[];

	/**效果*/
	acts: any[];
}

/**
 * 特效配置
*/
class StdSkillEff {
	/**资源名字*/
	eff: string;
	/**type 0 默认 1弹道*/
	type: number;
	/**图层 1.目标脚底 2目标身上 3无目标地板 4无目标悬空*/
	layer: number;
	/**延时出现*/
	delay: number;
	/**是否要计算方向*/
	hasDir: number;
	/**震屏*/
	shake: number;
	/**播放次数*/
	playCount: number;
	/**播放时间*/
	playTime: number;
	/**飞行速度*/
	flySpeed: number;
	/**飞行距离*/
	flyDis: number;
	/**下个特效*/
	nextId: number;
	/**受击特效*/
	hiteff: number;
	/**x坐标偏移*/
	offsetX: number;
	/**y坐标偏移*/
	offsetY: number;

	music: string;
}