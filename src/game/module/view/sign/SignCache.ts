/*
 * @Description: 签到
 * @Author: guolinsen
 * @Date: 2019-09-09 21:19:05
 * @LastEditTime: 2019-09-10 14:20:11
 */
class SignCache extends BaseCache {

	/**已签到次数*/
	public signCounts: number = 0;
	/**可签到次数*/
	public canSign: number = 0;

	private awardFlag: number = 0;

	/**每日奖励配置*/
	public dailyAwardList: StdDailysign[] = [];
	/**累积奖励配置*/
	public totalAwardList: StdDailysign[] = [];

	public constructor() {
		super();
		this.init();
	}
	clear() {
		this.signCounts = 0;
		this.canSign = 0;
		this.awardFlag = 0;
	}
	private init() {
		let con = GameConfig.sign;
		let i = GameConfig.globalConfig.signNeed;
		for (let id in con) {
			let std: StdDailysign = con[id];
			(std.need ? this.totalAwardList : this.dailyAwardList).push(std);
		}
	}
	public updateCounts(value: number) {
		this.signCounts = NumericUtils.LoWord(value);
		let total = NumericUtils.HiWord(value);
		this.canSign = total - this.signCounts;
	}
	public updateAwardState(value: number) {
		this.awardFlag = value;
	}

	/**
	 * return 是否已领取
	*/
	public getAwardState(index): boolean {
		let v = this.awardFlag ;
		return ((v >> index) & 1) == 1;
	}
}