/**
 * 游戏场景
 */
class MainScene extends BaseScene {
	/**
	 * 构造函数
	 */
	public constructor() {
		super();
	}

	/**
	 * 进入Scene调用
	 */
	public onEnter(): void {
		super.onEnter();

		this.addLayerAt(LayerManager.Game_Main, 0);
		this.addLayer(LayerManager.UI_Main);
		this.addLayer(LayerManager.UI_Win);
		this.addLayer(LayerManager.UI_Main2);
		this.addLayer(LayerManager.UI_TipsNoClick);
		this.addLayer(LayerManager.UI_Tips);
		this.addLayer(LayerManager.UI_Message);
		this.addLayer(LayerManager.UI_Guide);

		App.ViewManager.open(ViewConst.GAME_WORLD);
		App.ViewManager.open(ViewConst.MAIN_UI);
		App.ViewManager.open(ViewConst.MAIN_UI_COCER);
		App.ViewManager.open(ViewConst.MAPLOADING);

	}

	/**
	 * 退出Scene调用
	 */
	public onExit(): void {
		super.onExit();
	}

}
