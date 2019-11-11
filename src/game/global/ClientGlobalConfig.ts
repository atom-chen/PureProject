/**
 * 全局配置
*/
class ClientGlobalConfig extends BaseClass {
	maptips: string[];
	/**需要指引的关卡数 <=*/
	barrierGuide: number;
	/**指引进入关卡挑战的指引id*/
	barrierGuideID: number;
	/**指引挑战关卡boss的指引id*/
	barrierBOSSGuideID: number;
	/**主线闯关任务id*/
	passQuestID: number[] = [];
	/**技能指引id*/
	skillGuideID: number;

	public constructor() {
		super();
		this.init();
	}

	private init() {
		let con = ConfigCache.getConfig("clientGlobal");
		for (let k in con) {
			this[k] = con[k]["value"];
		}
	}
}