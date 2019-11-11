/**
 *
 * @author
 *
 */
class CreateRoleScene extends BaseScene {
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

		this.addLayer(LayerManager.UI_Main);
		this.addLayer(LayerManager.UI_Win);
		this.addLayer(LayerManager.UI_Tips);

		App.ViewManager.open(ViewConst.CREATE_ROLE);
		if (window['showGame'])
			window['showGame']();
	}

	/**
	 * 退出Scene调用
	 */
	public onExit(): void {
		super.onExit();
	}
}
