/**
 * Created by Saco on 2014/12/1.
 */
class LocationProperty {

	public static urlParam: any;

	public static init(): void {
		this.urlParam = {};
		let str: string = window['paraUrl'] || location.href;
		if (str) {
			let whIndex: number = str.indexOf("?");
			if (whIndex != -1) {

				let param: string[] = str.slice(whIndex + 1).split("&");
				let strArr: string[];
				for (let i: number = 0; i < param.length; i++) {
					strArr = param[i].split("=");
					this.urlParam[strArr[0]] = strArr[1];
				}
			}
		}
	}

	public static roots: string[];

	/**资源路径 */
	static get resAdd(): string {
		return this.urlParam['hosts'] || "http://192.168.1.114:5479/client/";
	}
	/**资源路径 */
	static set resAdd(str: string) {
		this.urlParam['hosts'] = str;
	}
	/**账号 */
	static get user(): string {
		// return this.urlParam['user'] || "weixin";
		return "fgafddff";
	}
	/**账号 */
	static set user(str: string) {
		this.urlParam['user'] = str;
	}
	/**服务器ID */
	static get srvid(): number {
		return 1;
		// return parseInt(this.urlParam['srvid']);
	}
	/**服务器ID */
	static set srvid(v: number) {
		this.urlParam['srvid'] = v;
	}
	static set srvName(v) {
		this.urlParam['srvName'] = v;
	}
	static get srvName() {
		return this.urlParam['srvName'];
	}
	/**服务器IP */
	static get serverIP(): string {
		return "152.136.19.57";
		// return this.urlParam['srvaddr'];
	}
	/**服务器IP */
	static set serverIP(str: string) {
		this.urlParam['srvaddr'] = str;
	}
	/**服务器端口 */
	static get serverPort(): number {
		return 13001;
		// return this.urlParam['srvport'];
	}
	/**服务器端口 */
	static set serverPort(v: number) {
		this.urlParam['srvport'] = v;
	}

	static get pfid(): string {
		return this.urlParam['pfid'] || "";
	}
	static get appid(): string {
		return this.urlParam['appid'] || "";
	}

	static isCanLogin(): boolean {
		return this.user != null &&
			this.srvid != null &&
			this.serverIP != null &&
			this.serverPort != null;
	}

	/**
	 * 设置加载进度 & 描述
	 */
	static setLoadProgress(n: number, str: string): void {
		console.log(n, str);

		if (window['showLoadProgress']) {
			window['showLoadProgress'](n, str);
		}
	}

	static isEnter: boolean = false;
	static enterGame(): void {
		if (this.isEnter) return;
		this.isEnter = true;
		if (window['showGame']) {
			window['showGame']();
		}
	}
}
