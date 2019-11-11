/**
 * 对象池类
 */
class ObjectPool {
	static max: number = 100;
	static PoolObj: Object = {};

	static get(cla: any, ...par: any[]): any {
		var claName: string = egret.getQualifiedClassName(cla);
		if (ObjectPool.PoolObj[claName] == null)
			ObjectPool.PoolObj[claName] = [];
		let obj = ObjectPool.PoolObj[claName].pop();
		if (obj) {
			//暂时这里特殊处理下eui.imae
			if (obj instanceof eui.Image) {
				obj.x = obj.y = 0;
				obj.scaleX = obj.scaleY = 1;
				obj.width = obj.height = NaN;
				obj.alpha = 1;
			}
			return obj;
		}
		if (ObjectPool.PoolObj[claName].length == 0) {
			switch (par.length) {
				case 1:
					return new cla(par[0]);
				case 2:
					return new cla(par[0], par[1]);
				case 3:
					return new cla(par[0], par[1], par[2]);
				case 4:
					return new cla(par[0], par[1], par[2], par[3]);
				case 5:
					return new cla(par[0], par[1], par[2], par[3], par[4]);
				default:
					return new cla();
			}
		}
	}

	/**
	 * 回池
	 * @param obj:需要回池的对象
	 * @param check:是否需要检测,防止重复入池,默认需要
	 */
	static push(obj: any) {
		var claName: string = obj["__class__"];
		if (ObjectPool.PoolObj[claName]) {
			if (ObjectPool.PoolObj[claName].indexOf(obj) > -1) {
				DEBUG && egret.log(`重复入池：` + claName);
				return;
			}
			if (ObjectPool.PoolObj[claName].length >= ObjectPool.max)
				DEBUG && console.log(claName + ":对象池过大");
			else
				ObjectPool.PoolObj[claName].push(obj);
		}
	}
}