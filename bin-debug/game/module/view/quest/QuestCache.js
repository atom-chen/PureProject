var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/*
 * @Description: 新的主线任务
 * @Author: guolinsen
 * @Date: 2019-06-27 10:52:55
 */
var QuestCache = (function (_super) {
    __extends(QuestCache, _super);
    function QuestCache() {
        return _super.call(this) || this;
    }
    QuestCache.prototype.clear = function () {
        this.npcId = null;
        this.questId = null;
    };
    QuestCache.prototype.update = function (id, state, progress) {
        this.questId = id;
        this.progress = progress;
        this.state = state;
        if (id >= 0) {
            var std = GameConfig.quest[id];
            this.npcId = std.comp;
        }
        else {
            this.npcId = 0;
        }
        GameCache.sysopen.initCheckList();
        App.MessageCenter.dispatch(MsgConst.QUEST_REFRESH_MAIN);
        App.FrameHandler.add(this.showMainView, this, true);
        App.FrameHandler.add(SysOpenMgr.checkOpen, SysOpenMgr, true);
    };
    QuestCache.prototype.showMainView = function () {
        var isShow = App.ViewManager.isShow(ViewConst.MAIN_QUEST);
        if (this.questId >= 0) {
            if (!isShow) {
                App.ViewManager.open(ViewConst.MAIN_QUEST);
            }
        }
        else {
            if (isShow) {
                App.ViewManager.close(ViewConst.MAIN_QUEST);
            }
        }
        App.MessageCenter.dispatch(MsgConst.QUEST_REFRESH_MAIN);
    };
    QuestCache.prototype.autoQuest = function () {
        if (this.questId >= 0) {
            var std = GameConfig.quest[this.questId];
            if (this.state == 2) {
                if (std.comp > 0) {
                    App.VisitManager.goToNpc(std.comp);
                }
                else {
                    Proxy.quest.sendSumitQuest();
                }
            }
            else {
                var tar = std.target;
                if (tar.type == TaskTargetType.enTask_KillMonster) {
                    App.VisitManager.goToMonster(tar.id, tar.scene, tar.x, tar.y);
                }
                else if (tar.type == TaskTargetType.enTask_Talk) {
                    App.VisitManager.goToNpc(tar.id);
                }
                else if (std.mod) {
                    TextFlowUtils.hrefType(std.mod);
                    if (std.GuideID) {
                        GameCache.novice.playGuide(std.GuideID);
                    }
                }
            }
        }
    };
    return QuestCache;
}(BaseCache));
__reflect(QuestCache.prototype, "QuestCache");
// class QuestCache extends BaseCache {
// 	private _doingDic: any = {};           //当前任务字典
// 	private _availableDic: any = {};       //可接任务字典		
// 	public mainQuest: UserQuest; //当前主线任务
// 	public npcId: number; //当前任务npcid
// 	public constructor() {
// 		super();
// 	}
// 	clear() {
// 		this._doingDic = {};
// 		this._availableDic = {};
// 		this.mainQuest = null;
// 		this.npcId = 0;
// 	}
// private checkMain() {
// 	let doing = this._doingDic[QuestTypes.MAIN];
// 	if (doing && doing.length > 0) {
// 		this.mainQuest = doing[0];
// 	} else {
// 		let ava = this._availableDic[QuestTypes.MAIN];
// 		if (ava && ava.length > 0) {
// 			this.mainQuest = ava[0];
// 		} else {
// 			this.mainQuest = null;
// 		}
// 	}
// 	if (this.mainQuest) {
// 		this.npcId = this.mainQuest.stdQuest.comp;
// 	} else {
// 		this.npcId = 0;
// 	}
// 	App.FrameHandler.add(this.showMainView, this, true);
// }
// private showMainView() {
// 	let isShow = App.ViewManager.isShow(ViewConst.MAIN_QUEST);
// 	if (this.mainQuest) {
// 		if (!isShow) {
// 			App.ViewManager.open(ViewConst.MAIN_QUEST);
// 		}
// 	} else {
// 		if (isShow) {
// 			App.ViewManager.close(ViewConst.MAIN_QUEST);
// 		}
// 	}
// 	App.MessageCenter.dispatch(MsgConst.QUEST_REFRESH_MAIN);
// }
// public autoQuest() {
// 	let quest: UserQuest = this.mainQuest;
// 	if (quest) {
// 		if (quest.isCompleted) {
// 			if (quest.stdQuest.comp > 0) {
// 				App.VisitManager.goToNpc(quest.stdQuest.comp);
// 			} else {
// 				Proxy.quest.sendSumitQuest(quest.stdQuest.id);
// 			}
// 		} else {
// 			let tar = quest.stdQuest.target[0];
// 			if (tar.type == QuestTarget.QT_MONSTER) {
// 				App.VisitManager.goToMonster(tar.id, tar.scene, tar.x, tar.y)
// 			} else if (tar.type == QuestTarget.QT_DIALOG) {
// 				App.VisitManager.goToNpc(tar.id);
// 			} else if (quest.stdQuest.mod) {
// 				TextFlowUtils.hrefType(quest.stdQuest.mod);
// 				if (quest.stdQuest.GuideID) {
// 					GameCache.novice.playGuide(quest.stdQuest.GuideID);
// 				}
// 			}
// 		}
// 	}
// }
// 	public setDoingList(questList: UserQuest[]): void {
// 		//把任务分类
// 		this._doingDic = {};
// 		for (let quest of questList) {
// 			this.addQuest(quest, false, false);
// 		}
// 		this.checkMain();
// 		App.MessageCenter.dispatch(MsgConst.QUEST_INIT_DOING);
// 		questList = null;
// 	}
// 	/**
// 	 * 从当前任务列表中删除指定id的任务，并返回该用户任务对象
// 	 * @param value
// 	 * @return 
// 	 * 
// 	 */
// 	public removeDoingQuestById(id: number): UserQuest {
// 		var quest: UserQuest;
// 		var i: number;
// 		for (let type in this._doingDic) {
// 			let list = this._doingDic[type];
// 			for (i = list.length - 1; i >= 0; i--) {
// 				quest = list[i];
// 				if (quest.stdQuest.id == id) {
// 					list.splice(i, 1);
// 					this.checkMain();
// 					App.MessageCenter.dispatch(MsgConst.QUEST_INIT_DOING, quest);
// 					return quest;
// 				}
// 			}
// 		}
// 		return quest;
// 	}
// 	/**
// 	 * 添加用户任务到当前任务列表
// 	 * @param value
// 	 * 
// 	 */
// 	public addQuest(value: UserQuest, needEvent: boolean = true, isShowTimeBox: boolean = true): void {
// 		var qid: number = value.stdQuest.id;
// 		//			checkBookmarkQuest(qid);			
// 		//如果任务不在当前任务列表时才添加进列表
// 		if (!this.getDoingQuestById(qid)) {
// 			var doQuest: UserQuest[] = this._doingDic[value.stdQuest.type];
// 			if (!doQuest) {
// 				doQuest = [];
// 				this._doingDic[value.stdQuest.type] = doQuest;
// 			}
// 			doQuest.push(value);
// 			if (needEvent) {
// 				this.checkMain();
// 				if (this.mainQuest && this.mainQuest.stdQuest.autoRun) {
// 					this.autoQuest();
// 				}
// 				App.MessageCenter.dispatch(MsgConst.QUEST_INIT_DOING);
// 			}
// 		}
// 	}
// 	/**
// 	 * 获取当前任务中指定id的任务
// 	 * @param id
// 	 * @return 找不到则返回null
// 	 * 
// 	 */
// 	public getDoingQuestById(id: number): UserQuest {
// 		let quest: UserQuest
// 		for (let type in this._doingDic) {
// 			let list = this._doingDic[type];
// 			for (quest of list) {
// 				if (quest.stdQuest.id == id) {
// 					return quest;
// 				}
// 			}
// 		}
// 		return null;
// 	}
// 	/**
//    * 更新可接任务列表数据(初始化可接任务列表)
//    * @param value
//    * 
//    */
// 	public setAvailableList(questList: UserQuest[]): void {
// 		var quest: UserQuest;
// 		this._availableDic = {}; //下发的可接任务列表要重置一下
// 		for (let quest of questList) {
// 			this.addAvailableQuest(quest, false);
// 		}
// 		this.checkMain();
// 		App.MessageCenter.dispatch(MsgConst.QUEST_INIT_AVAILABLE)
// 		questList = null;
// 	}
// 	/**
// 	 * 添加可接任务
// 	 * @param quest
// 	 * 
// 	 */
// 	public addAvailableQuest(value: UserQuest, needEvent: Boolean = true): void {
// 		var qid: number = value.stdQuest.id;
// 		var stdQ = value.stdQuest;
// 		//			checkBookmarkQuest(qid);			
// 		//如果任务不在当前任务列表时才添加进列表
// 		if (!this.getIndexOfAvailableQuest(qid) && stdQ.prom.npc) {
// 			var availableQuest: any[] = this._availableDic[value.stdQuest.type];
// 			if (!availableQuest) {
// 				availableQuest = [];
// 				this._availableDic[value.stdQuest.type] = availableQuest;
// 			}
// 			availableQuest.push(value);
// 			if (needEvent) {
// 				this.checkMain();
// 				App.MessageCenter.dispatch(MsgConst.QUEST_INIT_AVAILABLE, value);
// 			}
// 		}
// 	}
// 	/**
//    * 从可接任务列表删除指定id的任务
//    * @param id
//    * 
//    */
// 	public removeAvailableQuestById(value: number): void {
// 		var quest: UserQuest;
// 		var i: number;
// 		for (let type in this._availableDic) {
// 			let list = this._availableDic[type];
// 			for (i = list.length - 1; i >= 0; i--) {
// 				quest = list[i];
// 				if (quest.stdQuest.id == value) {
// 					list.splice(i, 1);
// 					this.checkMain();
// 					App.MessageCenter.dispatch(MsgConst.QUEST_DELETE_AVAILABLE, quest);
// 				}
// 			}
// 		}
// 	}
// 	/**
// 	 * 获取指定id的可接任务
// 	 * @param id
// 	 * @return 
// 	 * 
// 	 */
// 	public getIndexOfAvailableQuest(id: number): UserQuest {
// 		var quest: UserQuest;
// 		for (let type in this._availableDic) {
// 			let list = this._availableDic[type];
// 			for (quest of list) {
// 				if (quest.stdQuest.id == id) {
// 					return quest;
// 				}
// 			}
// 		}
// 		return null;
// 	}
// 	/**
// 	 * 更新任务的目标进度
// 	 * @param id 任务ID
// 	 * @param index 目标索引
// 	 * @param progress 进度
// 	 *  @param totalProgress 总进度(防止半途改任务 无法完成的情况)
// 	 */
// 	public updateQuestProgress(id: number, index: number, progress: number, totalProgress: number): void {
// 		var userQ: UserQuest = this.getDoingQuestById(id);
// 		if (userQ) {
// 			if (index >= userQ.progress.length)
// 				throw new RangeError("更新任务目标进度时索引超出范围：" + index);
// 			userQ.progress[index] = progress;
// 			var tQ = userQ.target[index];
// 			tQ.count = totalProgress;
// 			App.MessageCenter.dispatch(MsgConst.QUEST_PROGRESS, userQ, index);
// 			if (userQ.isCompleted) {
// 				//播放任务完成特效
// 			}
// 		}
// 	}
// } 
//# sourceMappingURL=QuestCache.js.map