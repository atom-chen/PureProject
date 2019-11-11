/**
 * 龙骨动画封装，外部调用唯一接口
*/
class DBAvatar {
	private _root: egret.DisplayObjectContainer;
	private _armature: dragonBones.Armature;
	private _clock: dragonBones.WorldClock;

	// private _completeCalls: Array<any>;
	// private _frameCalls: Array<any>;

	private _armatureName: string;
	private _partName: any;
	private _partArmature: any;
	private _isPlay: boolean;
	private _playName: string;
	private _playNum: number;
	private _dir: number = 1;

	private _completeHandler: Handler;
	private pro: PropertySet;

	public constructor() {

	}

	/**有其他部位的，通过设置人物属性更新*/
	public set rolePro(pro: PropertySet) {
		this.unload();
		this.pro = pro;
		this._partName = {};
		this._partArmature = {};
		let partId = DBPart.PartId;
		let partName = this._partName;
		for (let k in partId) {
			partName[k] = 0;
		}
	}

	public setRoot(root: egret.DisplayObjectContainer, completeHandler: Handler) {
		this._root = root;
		this._completeHandler = completeHandler;
	}

	public load(name: string, unLoad: boolean = false, isNude: boolean = false) {
		unLoad && this.unload();
		this._armatureName = name;
		App.DBAvatarManager.loadArmature(name, this, false, 1, true, isNude ? DBPart.NUDE : name);
	}

	public unload() {
		if (this._armatureName) {
			if (this._armature) {
				this.stop();
				App.DisplayUtils.removeFromParent(this._armature.display);
				this._armature.dispose();
				this._armature = null;
			}
			App.DBAvatarManager.unLoadArmature(this._armatureName, this);
			this._armatureName = null;
			let partName = this._partName;
			for (let k in partName) {
				if (partName[k]) {
					this.unLoadPart(k, partName[k]);
				}
			}
			this._partName = null;
			this._partArmature = null;
		}
	}

	private unLoadPart(partName, fileName) {
		let nameList = DBPart.getPartNameList(partName);
		if (!nameList) return;
		let arDic = this._partArmature;

		let i = 0;
		let a = nameList.length;
		for (; i < a; i++) {
			let arName = partName + nameList[i];
			if (arDic[arName]) {
				arDic[arName].dispose();
				delete arDic[arName];
			}
			if (this._armature) {
				let slot = this._armature.getSlot(arName);
				slot.childArmature = null;
			}
		}
		App.DBAvatarManager.unLoadArmature(fileName, this);
	}


	/**更新检测是否需要换装*/
	public updateSkin() {
		if (!this._armature || !this.pro) return;
		if (!ThingKind.isHumanModel(this.pro.kind)) {
			return;
		}
		let pro = this.pro;
		let partId = DBPart.PartId;
		let partName = this._partName;
		//let arDic = this._partArmature;
		let job = pro.pro(PropId.AP_JOB);
		let sex = pro.pro(PropId.AP_SEX);
		for (let k in partId) {
			let proid = partId[k];
			let needId = pro.pro(proid);
			if (proid == PropId.AP_PANTS) {
				let armourId = pro.pro(PropId.AP_BODY_ID);
				let obj = GameConfig.dress[armourId];
				if(obj) needId = obj.pantsID;
			}
			let fileName = needId ? (needId + "" + sex) : DBPart.getDefault(job, sex, k);
			if(DEBUG && DeBugMgr.dragonTest){
				let str:string = DeBugMgr.dragonTest[proid];
				if(str && str.length) fileName = str;
			}
			if (fileName != partName[k]) {
				let old = partName[k];
				if (old) {
					this.unLoadPart(k, old);
				}
				partName[k] = fileName;
				fileName && App.DBAvatarManager.loadArmature(fileName, this, true);
			}
		}
	}

	/**加载后回调*/
	public create(armature: dragonBones.Armature, clock: dragonBones.WorldClock) {
		this._armature = armature;
		this._clock = clock;
		this._root.addChild(<egret.DisplayObject>this._armature.display);
		this.play(this._playName, this._playNum);
		this.setDir(this._dir);
		this.updateSkin();
	}

	/**加载后回调*/
	public relaceSkin(id: string) {
		if (!this._armature) return;
		let partName = this._partName;
		for (let k in partName) {
			if (partName[k] == id) {
				let nameList = DBPart.getPartNameList(k);
				if (nameList) {
					let i = 0;
					let a = nameList.length;
					for (; i < a; i++) {
						let slotName = k + nameList[i];
						let arName = id + nameList[i];
						let armature: dragonBones.Armature = App.DBAvatarManager.factory.buildArmature(arName);
						if (!armature) {
							DEBUG && console.log("没有找到部件：" + arName);
							continue;
						}
						armature.cacheFrameRate = DBPart.CACHE;
						let slot = this._armature.getSlot(slotName);
						if (!slot) {
							DEBUG && console.log("缺少插槽：" + arName);
							continue;
						}
						slot.childArmature = armature;
						this._partArmature[slotName] = armature;
						if (!this._playNum) {
							this.play(this._playName, this._playNum);
						}
					}
				}
				break;
			}
		}
	}

	/**1向右 -1 向左*/
	public setDir(dir: number) {
		this._dir = dir;
		if (this._armature) {
			if (this._armature.display.scaleX != dir) this._armature.display.scaleX = dir;
		}
	}

	/**
     * 播放名为name的动作
     * @param name 名称
     * @param playNum 指定播放次数，默认走动画配置
     */
	public play(name: string, playNum: number = 0, playNow: boolean = true) {
		let armature = this._armature;
		this._playName = name;
		this._playNum = playNum;
		if (!armature || !this._playName || !playNow) {
			return;
		}
		this.start();
		armature.animation.play(name, playNum);
		if (!playNum) {
			for (let k in this._partArmature) {
				this._partArmature[k].animation.play(name, playNum);
			}
		}
	}

	public playTempAction(name: string) {
		if (this._armature && this._playName) {
			this.start();
			this._armature.animation.play(name, 1);
		}
	}

	public recoverPlay() {
		this.play(this._playName, this._playNum);
	}

	/**
     * 添加事件监听
     */
	private addListeners(): void {
		this._armature.eventDispatcher.addEvent(dragonBones.EventObject.COMPLETE, this.playComplete, this);
	}

    /**
     * 移除事件监听
     */
	private removeListeners(): void {
		this._armature.eventDispatcher.removeEvent(dragonBones.EventObject.COMPLETE, this.playComplete, this);
	}

	private resetParam() {
		this._armatureName = null;
		this._isPlay = false;
		this._playName = null;
		this._playNum = 0;
	}

    /**
     * 事件完成执行函数
     * @param e
     */
	private playComplete(e: dragonBones.EgretEvent): void {
		if (this._completeHandler) {
			this._completeHandler.args = [this._playName];
			this._completeHandler.run();
		}
	}

	/**
     * 恢复播放
     */
	private start(): void {
		if (!this._isPlay) {
			this._clock.add(this._armature);
			this._isPlay = true;
			this.addListeners();
		}
	}

    /**
     * 停止播放
     */
	private stop(): void {
		if (this._isPlay) {
			this._clock.remove(this._armature);
			this._isPlay = false;
			this._playName = null;
			this.removeListeners();
		}
	}

	public onRemove() {
		this.unload();
		this.resetParam();
		this.pro = null;
	}

	public dispose() {
		this.onRemove();
		this._root = null;
		this._completeHandler = null;
	}
}