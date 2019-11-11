/**
 * Created by yangsong on 15-4-21.
 * 单一资源通过版本号加载管理类
 */
class ResVersionManager extends BaseClass {
	private resVersionData: any;
	private resVersionData2: any;
	private complateFunc: Function;
	private complateFuncTarget: any;

	public static ins(): ResVersionManager {
		return super.ins() as ResVersionManager;
	}

	public has(url: string): boolean {
		return this.resVersionData.hasOwnProperty(url);
	}

	// public getDir(url: string): number {
	// 	return this.resVersionData[url] & 0xff;
	// }

	public getVer(url: string): number {
		return this.resVersionData ? this.resVersionData[url] : null;
	}

	public getVer2(url: string): number {
		return this.resVersionData2 ? this.resVersionData2[url] : null;
	}

	// public hasVer(): boolean {
	// 	return !isNaN(LocationProperty.v);
	// }

	/**
	 * 构造函数
	 */
	public constructor() {
		super();
		// this.res_loadByVersion();
		this.resVersionData = window[`verData`];
	}

	// /**
	//  * Res加载使用版本号的形式
	//  */
	// private res_loadByVersion(): void {
	// 	RES.web.Html5VersionController.prototype.getVirtualUrl = function (url) {
	// 		if (url.lastIndexOf("http") == -1) {
	// 			let manager = ResVersionManager.ins();
	// 			if (manager.hasVer()) {
	// 				if (manager.has(url)) {
	// 					let dir: number = manager.getDir(url);
	// 					let v: number = manager.getVer(url);
	// 					url = `${LocationProperty.resAdd}${dir}/${url}?v=${v}`;
	// 				}
	// 				else
	// 					url = `${LocationProperty.resAdd}0/${url}`;
	// 			}
	// 			else
	// 				url = `${LocationProperty.resAdd}${url}`;
	// 		}
	// 		return url;
	// 	}
	// }


	/**
	 * 加载资源版本号配置文件
	 * @param url 配置文件路径
	 * @param complateFunc 加载完成执行函数
	 * @param complateFuncTarget 加载完成执行函数所属对象
	 */
	public loadConfig(url: string, complateFunc: Function, complateFuncTarget: any): void {
		this.complateFunc = complateFunc;
		this.complateFuncTarget = complateFuncTarget;
		RES.getResByUrl(url, (data) => {
			this.resVersionData = data;
			this.complateFunc.call(this.complateFuncTarget);
		}, this, RES.ResourceItem.TYPE_JSON);
	}

	/**
	 * 加载资源版本号配置文件2
	 * @param url 配置文件路径
	 * @param complateFunc 加载完成执行函数
	 * @param complateFuncTarget 加载完成执行函数所属对象
	 */
	public loadConfig2(url: string, complateFunc: Function, complateFuncTarget: any): void {
		this.complateFunc = complateFunc;
		this.complateFuncTarget = complateFuncTarget;
		RES.getResByUrl(url, (data) => {
			this.resVersionData2 = data;
			this.complateFunc.call(this.complateFuncTarget);
		}, this, RES.ResourceItem.TYPE_JSON);
	}
}
