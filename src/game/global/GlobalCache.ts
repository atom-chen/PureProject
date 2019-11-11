/*
 * @Description: 存放一些不包含在独立系统的数据，切换服务器时需要清理的
 * @Author: guolinsen
 * @Date: 2019-07-31 14:26:55
 * @LastEditTime: 2019-10-25 16:05:20
 */
class GlobalCache extends BaseCache {

	oldPower: number = 0;
	/**0下线 1顶号 2封号*/
	disconnectedType: number = -1;

	public constructor() {
		super();
	}
	clear() {
		this.oldPower = 0;
		this.disconnectedType = -1;
	}
}