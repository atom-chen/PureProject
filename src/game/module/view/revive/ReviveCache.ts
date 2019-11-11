/*
 * @Description: 复活数据
 * @Author: liangzhaowei
 * @Date: 2019-09-11 20:11:44
 */

class ReviveCache extends BaseCache {

	/**倒计时剩余时间 */
	public leftTime = 0;

	/**复活数据列表 */
	public reveiveList  = []

	public constructor() {
		super();
	}


	clear() {
		this.leftTime = 0;
		this.reveiveList = [];
	}




}