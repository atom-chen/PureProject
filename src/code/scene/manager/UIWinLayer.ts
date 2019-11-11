/*
 * @Description: 窗口层
 * @Author: guolinsen
 * @Date: 2019-09-18 20:08:06
 */
class UIWinLayer extends BaseEuiLayer {
	private bg: eui.Image;
	public constructor(param?: any) {
		if (DeviceUtils.IsPC) {
			super(param);
		} else {
			super();
			this.numShow++;
			this.bg = new eui.Image();
			this.bg.source = RES_DIR_IMAGES + "phoneUIBg.jpg";
			this.bg.width = App.StageUtils.getWidth();
			this.bg.height = App.StageUtils.getHeight();
			this.addChild(this.bg);
			this.visible = false;
		}
	}
}