class App {
	/**游戏主舞台 */
	static get stage(): egret.Stage {
		return App.StageUtils.getStage();
	}

	/**游戏主舞台工具 */
	static get StageUtils(): StageUtils {
		return StageUtils.ins();
	}

	/**整个游戏主Socket 万一要继承它改呢 */
	static get Socket(): GameSocket {
		return GameSocket.ins();
	}

	/**时间管理器 */
	static get TimerManager(): TimerManager {
		return TimerManager.ins();
	}

	/**界面管理器 */
	static get ViewManager(): ViewManager {
		return ViewManager.ins();
	}

	/**内部信息通知中心 */
	static get MessageCenter(): MessageCenter {
		return MessageCenter.ins();
	}


	/**聊天管理器 */
	public static get ChatMgr(): ChatMgr {
		return ChatMgr.ins();
	}


	/**Display工具 */
	static get DisplayUtils(): DisplayUtils {
		return DisplayUtils.ins();
	}

	static get DateUtils(): DateUtils {
		return DateUtils.ins();
	}

	static get FrameHandler(): FrameHandler {
		return FrameHandler.ins();
	}

	public static get DBAvatarManager(): DBAvatarManager {
		return DBAvatarManager.ins();
	}

	public static get ThingManager(): ThingManager {
		return ThingManager.ins();
	}

	public static get HurtTxtManager(): HurtTxtManager {
		return HurtTxtManager.ins();
	}

	public static get RedPoint(): RedPointManager {
		return RedPointManager.ins();
	}

	public static get FightManager(): FightManager {
		return FightManager.ins();
	}

	public static get BattleManager(): BattleManager {
		return BattleManager.ins();
	}

	public static get VisitManager(): VisitThingManager {
		return VisitThingManager.ins();
	}

	public static get skillPlay(): SkillPlayManager {
		return SkillPlayManager.ins();
	}

	public static get SoundManager():SoundManager{
		return SoundManager.getIns();
	}


	/**判断是否一个正确的json格式 */
	public static isJSON(str: string) {
		try {
			var obj = JSON.parse(str);
			if (typeof obj == 'object' && obj) {
				return true;
			} else {
				return false;
			}

		} catch (e) {
			return false;
		}
	}

	static get gameWorld(): GameWorld {
		return App.ViewManager.getView(ViewConst.GAME_WORLD) as GameWorld;
	}

}