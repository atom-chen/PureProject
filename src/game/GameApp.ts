/*
 * @Description: GameApp
 * @Author: guolinsen
 * @Date: 2019-07-19 11:27:08
 * @LastEditTime: 2019-10-26 10:55:16
 */
class GameApp extends egret.HashObject {

	private resOk: boolean = false;
	private configOk: boolean = false;

	public constructor() {
		super();
	}

	public start() {
		if (!this.configOk) {
			this.loadConfig();
		}
		else if (!this.resOk) {
			this.loadRes();
		}
	}

	private loadConfig() {
		LocationProperty.setLoadProgress(20, "(加载游戏配置)");
		let groupName = "config";
		ResourceUtils.ins().loadGroup(groupName, this.readConfig, null, this);
	}

	private readConfig() {
		ConfigCache.read(RES.getRes("config_data"));
		RES.destroyRes("config_data");

		let list = ConfigCache.getFileList();
		App.TimerManager.addFrame(1,
			() => {
				let t = egret.getTimer();
				let iv = 0;
				while (iv < 32) {
					let f = list.shift();
					if (f) {
						ConfigCache.parseFile(f);
					}
					else {
						break;
					}
					iv = egret.getTimer() - t;
				}
				if (list.length == 0) {
					App.TimerManager.removeAll(this);
					this.configOk = true;
					console.log("配置解析完毕");
					this.loadServer();
				}
			}
			, this);
		this.loadRes();
	}

	private loadRes() {
		let groupName = "all";
		ResourceUtils.ins().loadGroup(groupName, this.onResourceLoadComplete, this.onResourceLoadProgress, this);
	}

	/**
	 * 资源组加载完成
	 */
	private onResourceLoadComplete(): void {
		this.resOk = true;
		this.loadServer();
	}

	private loadServer() {
		if (this.resOk && this.configOk) {
			LocationProperty.setLoadProgress(90, "(登录游戏)");
			
			ModuleManager.init();
			GameCache.map.readXML(RES.getRes("map_data"));
			RES.destroyRes("map_data");
			ServerMgr.loadingDispose();
			App.Socket.login(
				LocationProperty.user,
				"e10adc3949ba59abbe56e057f20f883e",
				LocationProperty.srvid,
				LocationProperty.serverIP,
				LocationProperty.serverPort);
		}
		console.log("服务器IP：" + LocationProperty.serverIP + "用户名" + LocationProperty.user);
	}


	/**
	 * 资源组加载进度
	 */
	private onResourceLoadProgress(itemsLoaded: number, itemsTotal: number): void {
		LocationProperty.setLoadProgress(25 + (itemsLoaded / itemsTotal * 60), "(加载必要资源)");
	}
}
