/*
 * @Description: 家族cache
 * @Author: moyusheng
 * @Date: 2019-10-29 10:41:02
 */
class FamilyCache extends BaseCache {

	public isInFamily: boolean; 		// 是否已经加入家族
	public fInfo: FamilyInfo; 			// 家族信息
	public isAuto: boolean;				// 是否勾选 满足条件自动加入
	public limitId: number; 			// 限制条件id	
	public mList: FamilyMemInfo[]; 		// 成员列表
	public applyList: FamilyApplyInfo[];	// 申请列表
	public fList: FamilyListInfo[];		// 家族列表

	clear(): void {
		this.isInFamily = false;
		this.fInfo = null;
		this.isAuto = false;
		this.limitId = null;
		this.mList = null;
		this.applyList = null;
		this.fList = null;
	}

	/**
	 * 解散
	 * @returns void
	 */
	public dismiss(): void {
		this.isInFamily = false;
		this.fInfo = null;
		this.mList = null;
		this.applyList = null;
		this.isAuto = false;
		GameCache.hero.focusPlayer.title.setFamilyName("");
	}

}

type FamilyInfo = {
	fName: string,			// 家族名称
	fLv: number,			// 家族等级
	position: number,		// 自己在家族中的位置
	lId: number,			// 族长id
	lName: string,			// 族长名称
	notice: string,			// 公告
	memNum: number,			// 成员数量
	fund: number,			// 家族资金
	fScore: number,			// 家族评分
	devote: number,			// 自己当前剩余贡献
	devoteTotal: number		// 历史总贡献
};
// 家族列表信息
type FamilyListInfo = {
	fId: number,			// 家族id
	memNum: number,			// 家族人数
	memMax: number,			// 家族人数上限
	fName: string, 			// 家族名称
	leadName: string,		// 族长名称
	fLv: number,			// 家族等级
	fScore: number,			// 家族评分
	limitId: number 		// 申请加入限制战力id
}
// 成员信息
type FamilyMemInfo = {
	memId: number,			// 成员id
	sex: number,			// 性别
	lv: number,				// 等级
	job: number,			// 职业
	position: number,		// 职位
	state: number,			// 1在线 0不在线
	lastLogin: number,		// 最后登录时间
	memName: string,		// 成员姓名
	score: number,			// 战力
	devote: number,			// 当前贡献
	devoteTotal: number		// 历史总贡献值
}
// 申请信息
type FamilyApplyInfo = {
	aid: number,			// 玩家id
	sex: number, 			// 性别
	job: number, 			// 职业
	lv: number,				// 等级
	name: string,			// 玩家名称
	score: number			// 战力
}