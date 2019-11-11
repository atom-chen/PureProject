/**
 * 龙骨动画管理，不使用 DragonBonesFactory
*/
class DBAvatarManager extends BaseClass {
	private averageUtils: AverageUtils;
	private isPlay: boolean;
	private clocks: Array<dragonBones.WorldClock>;
	private clocksLen: number;
	private files: any;
	private loadFiles: any;
	private advancedTime: number;
	private disposeTime: number = 0;
	private disposeList: string[] = [];

	public factory: dragonBones.EgretFactory;

	public constructor() {
		super();
		this.averageUtils = new AverageUtils();
		this.factory = new dragonBones.EgretFactory();
		this.clocks = new Array<dragonBones.WorldClock>();
		this.clocksLen = 0;
		this.files = {};
		this.loadFiles = {};
		//默认开启
		this.start();

	}

    /**
     * 初始化一个动画文件
     * @param skeletonData 动画描述文件
     * @param texture 动画资源
     * @param textureData 动画资源描述文件
     */
	private addArmatureFile(skeletonData: any, texture: egret.Texture, textureData: any, type: string): void {
		if (this.files[skeletonData.name]) return;
		this.factory.parseDragonBonesData(skeletonData);
		texture && this.factory.parseTextureAtlasData(textureData, texture);
		let file = new DBFile();
		file.name = skeletonData.name;
		file.ref = 0;
		file.type = type;
		this.files[skeletonData.name] = file;
	}

    /**
     * 移除动画文件
     * @param name
     */
	private removeArmatureFile(name: string): void {
		let file = this.files[name];
		if (file) {
			if (file.isNude) return;
			this.factory.removeDragonBonesData(name);
			this.factory.removeTextureAtlasData(name);
			if (RES.destroyRes(RES_DIR_DRAGON + file.name + "_ske.json")) {
				DEBUG && console.log("db delete :" + file.name + "_ske.json");
			}
			if (RES.destroyRes(RES_DIR_DRAGON + file.name + "_tex.json")) {
				DEBUG && console.log("db delete :" + file.name + "_tex.json");
			}
			if (RES.destroyRes(RES_DIR_DRAGON + file.name + "_tex.png")) {
				DEBUG && console.log("db delete :" + file.name + "_tex.png");
			}
			delete this.files[name];
		}
	}

	/**
	 * 创建一个动画
	 * @name 动画资源名称
	 * @tar  更新对象
	 * @playSpeed 播放速度
	 * @fast 使用急速模式
	 * isReplace 是否换装
	*/
	public loadArmature(name: string, tar: DBAvatar, isReplace: boolean = false, playSpeed: number = 1, fast: boolean = true, type: string = null) {
		if (this.files[name]) {
			this.makeArmature(name, tar, isReplace, playSpeed, fast);
		} else {
			let load: LoadFile = this.loadFiles[name];
			if (!load) {
				load = this.loadFiles[name] = new LoadFile();
				load.name = name;
				load.isReplace = isReplace;
				load.type = type;
			}
			load.tar.push(tar);
			if (!load.loading) {
				this.starLoad(load);
			}
		}
	}

	public unLoadArmature(name, tar: DBAvatar) {
		if (this.files[name]) {
			this.files[name].ref--;
		} else {
			let load: LoadFile = this.loadFiles[name];
			if (load) {
				let i = load.tar.indexOf(tar);
				if (i >= 0) {
					load.tar.splice(i, 1);
					if (load.tar.length <= 0) {

					}
				}
			}
		}
	}

	private starLoad(file: LoadFile) {
		file.loading = true;
		let ske, json, tx;
		let self = this;
		let complete = function () {
			if (!ske) return;
			if ((!json || !tx)) return;

			self.addArmatureFile(ske, tx, json, file.type);
			let i = 0;
			let a = file.tar.length;
			for (; i < a; i++) {
				self.makeArmature(file.name, file.tar[i], file.isReplace);
			}
			delete self.loadFiles[file.name];
		}

		RES.getResByUrl(RES_DIR_DRAGON + file.name + "_ske.json", (data) => {
			ske = data;
			complete();
		}, self, RES.ResourceItem.TYPE_JSON);

		//if (file.type != DBPart.NUDE) {
		RES.getResByUrl(RES_DIR_DRAGON + file.name + "_tex.json", (data) => {
			json = data;
			complete();
		}, self, RES.ResourceItem.TYPE_JSON);
		RES.getResByUrl(RES_DIR_DRAGON + file.name + "_tex.png", (data) => {
			tx = data;
			complete();
		}, self, RES.ResourceItem.TYPE_IMAGE);
		//}
	}

    /**
     * 创建一个动画
     * @param name 动作名称
     * @param fromDragonBonesDataName 动画文件名称
     * @returns {Armature}
     */
	private makeArmature(name: string, tar: DBAvatar, isRelace: boolean, playSpeed: number = 1, fast: boolean = true) {
		let file: DBFile = this.files[name];
		if (!file) {
			return;
		}
		file.ref++;
		if (!isRelace) {
			let armature: dragonBones.Armature = this.factory.buildArmature(name);
			if (armature == null) {
				return;
			}
			if (fast) {
				armature.cacheFrameRate = DBPart.CACHE;
			}
			let clock: dragonBones.WorldClock = this.createWorldClock(playSpeed);
			tar.create(armature, clock);
		} else {
			tar.relaceSkin(name);
		}

	}

    /**
     * 创建WorldClock
     * @param playSpeed
     * @returns {dragonBones.WorldClock}
     */
	private createWorldClock(playSpeed: number): dragonBones.WorldClock {
		for (var i: number = 0; i < this.clocksLen; i++) {
			if (this.clocks[i].timeScale == playSpeed) {
				return this.clocks[i];
			}
		}
		var newClock: dragonBones.WorldClock = new dragonBones.WorldClock();
		newClock.timeScale = playSpeed;
		this.clocks.push(newClock);
		this.clocksLen = this.clocks.length;
		return newClock;
	}

    /**
     * dragonBones体系的每帧刷新
     * @param advancedTime
     */
	private onEnterFrame(): void {
		let curTime = this.advancedTime;
		curTime = App.TimerManager.getSyncTime() - curTime;
		this.averageUtils.push(curTime);
		this.advancedTime = App.TimerManager.getSyncTime();
		var time: number = this.averageUtils.getValue() * 0.001;
		for (var i: number = 0; i < this.clocksLen; i++) {
			var clock: dragonBones.WorldClock = this.clocks[i];
			clock.advanceTime(time);
		}

		curTime = this.advancedTime;
		if (curTime >= this.disposeTime) {
			this.disposeTime = curTime + 60000;
			let fn = this.disposeList.shift();
			if (fn) {
				let f = this.files[fn];
				if (!f || f.ref > 0) return;
				this.removeArmatureFile(fn);
			}
		}
	}

	public onScengChange() {
		let curTime = App.TimerManager.getSyncTime();
		this.disposeTime = curTime + 60000;
		this.disposeList.length = 0;
		for (let k in this.files) {
			let f: DBFile = this.files[k];
			if (f.ref <= 0) {
				this.disposeList.push(f.name);
			}
		}
	}

	/**
	 * 替换插槽
	 */
	public replaceSoltDisplay(proName: string, elName: string, slotName: string, reName: string, slot): void {
		this.factory.replaceSlotDisplay(proName, elName, slotName, reName, slot);
	}

    /**
     * 停止
     */
	public stop(): void {
		if (this.isPlay) {
			App.TimerManager.remove(this.onEnterFrame, this);
			this.isPlay = false;
		}
	}

    /**
     * 开启
     */
	public start(): void {
		if (!this.isPlay) {
			this.isPlay = true;
			this.disposeTime = this.advancedTime = App.TimerManager.getSyncTime();
			App.TimerManager.addFrame(2, this.onEnterFrame, this);
		}
	}
}
class DBFile {
	name: string;
	type: string;

	private _ref: number = 0;

	set ref(value) {
		this._ref = value;
	}

	get ref(): number {
		return this._ref;
	}
}
class LoadFile {
	name: string;
	tar: DBAvatar[] = [];
	isReplace: boolean;
	loading: boolean = false;
	type: string;
}