/*
 * @Description: 新手流程
 * @Author: guolinsen
 * @Date: 2019-09-23 13:45:15
 */
class NoviceCache extends BaseCache {
	private _guideView: NoviceGuideStep;
	public guidId: number;
	public constructor() {
		super();
	}
	public playGuide(id) {
		this.guidId = id;
		if (!this._guideView) {
			this._guideView = new NoviceGuideStep(false);
		}
		this._guideView.start(GameConfig.noviceGuide[id]);
	}
	public get guideView(): NoviceGuideStep {
		return this._guideView;
	}
}