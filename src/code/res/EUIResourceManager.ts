class EUIResourceManager extends BaseClass{
	private resHash: Object = {};	//正在使用的池
	private disposeHash: Object = {};	//引用数已经是0的池

	/**增加一个资源引用
	 * @param url:资源名字
	 * @param dir:是否带有方向
	 */
	public add(url: string, dir?: boolean): number {
		let isSheet: string = this.getSheetName(url);
		if (isSheet) {
			url = isSheet;
		}
		if (!this.resHash[url]) {
			this.resHash[url] = ObjectPool.get(EUIResourceItem);
			this.resHash[url].dir = dir;
		}
		this.resHash[url].count++;
		delete this.disposeHash[url];
		return this.resHash[url].count;
	}
	/**减少一个资源引用
	 * @param url:资源名字
	 * @param dir:是否带有方向
	 */
	public remove(url: string): number {
		let isSheet: string = this.getSheetName(url);
		if (isSheet) {
			url = isSheet;
		}
		if (!this.resHash[url])
			return 0;
		this.resHash[url].count--;
		if (this.resHash[url].count == 0) {
			this.disposeHash[url] = 1;
		}
		return this.resHash[url].count;
	}
	public has(url: string): number {
		return this.resHash[url] == null ? 0 : this.resHash[url];
	}

	private getSheetName(url: string): string {
		if (typeof url != "string") {
			return null;
		}
		let i: number = url.indexOf("_json");
		if (i > -1) {
			return url.substr(0, i) + "_json";
		}
		return null;
	}

	public log(){
		let dic = this.resHash;
		let count = 0;
		for(let k in dic){
			count ++;
			console.log("texture ", k);
		}
		console.log("total ", count);
	}
	public init(): void {
		App.TimerManager.add(10000, this.doTime, this);
	}
	private doTime(): void {
		let t = App.TimerManager.getSyncTime();
		let count = 0;
		for (let s in this.disposeHash) {
			let item: EUIResourceItem = this.resHash[s];
			if (item.destroyTime > 0 && t > item.destroyTime) {
				let dir: boolean = this.resHash[s].dir;
				if (dir) {
					//DEBUG && console.log("texture dir " + s);
				} else {
					if (RES.destroyRes(s)) {
						item.dispose();
						delete this.resHash[s];
						delete this.disposeHash[s];
						//console.log("delete texture", s, count);
						
						count ++;
						if(count >= 15) {
							return;
						}
					} else {
						item.times++;
						if (item.times > 0) {
							item.dispose();
							delete this.resHash[s];
							delete this.disposeHash[s];
						}
					}
				}
			}
		}
	}
}



class EUIResourceItem {
	private _count: number;
	public destroyTime: number;
	public dir: boolean;
	public times: number = 0;
	public constructor() {
		this._count = 0;
	}
	public set count(value) {
		this._count = value;
		this.destroyTime = this._count > 0 ? 0 : App.TimerManager.getSyncTime() + 10000;
	}
	public get count(): number {
		return this._count < 0 ? 0 : this._count;
	}

	public dispose():void{
		this._count = 0;
		this.destroyTime = 0;
		this.times = 0;
		ObjectPool.push(this);
	}
}