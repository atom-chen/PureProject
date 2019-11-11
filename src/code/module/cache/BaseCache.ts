/**
 * Created by linsen on 2019/5/30.
 * 数据保存
 */
class BaseCache extends egret.HashObject{
	/**返回重选服务器时，是否需要清理数据，需要清理数据的，在clear()中按需求实现*/
	needClear: boolean;
	public constructor(needClear = true) {
		super();
		this.needClear = needClear;
		CacheManager.reg(this);
	}

	clear() {

	}
}