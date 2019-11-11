/**
 * Created by linsen on 2019/5/30.
 * 管理所有模块数据类，
*/
class CacheManager {
	static cacheList: BaseCache[] = [];
	public constructor() {
	}
	static reg(cache: BaseCache) {
		this.cacheList.push(cache);
	}
	static clearAll() {
		let i = 0;
		let len = this.cacheList.length;
		for (; i < len; i++) {
			this.cacheList[i].needClear && this.cacheList[i].clear();
		}
	}
}