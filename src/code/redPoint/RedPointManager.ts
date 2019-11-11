/*
 * @Description: 红点管理器
 * @Author: liangzhaowei
 * @Date: 2019-09-06 15:54:31
 * @LastEditTime: 2019-09-10 20:42:37
 */

class RedPointManager extends BaseClass {

	/**记录每次刷新view对应的结果 */
	public redViewResult = {};

	/**记录每次刷新周期view对应的结果 避免刷新周期内重复刷新 */
	public redViewCycleResult = {};
	/**
	 * 构造函数
	 */
	public constructor() {
		super();
		this.redViewResult = {};
	}

	/**清理*/
	public clear(): void {

	}
}