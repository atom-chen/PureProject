/*
 * @Description: 总属性提示
 * @Author: xiejunwei
 * @Date: 2019-08-27 11:48:35
 * @LastEditTime: 2019-08-27 11:54:48
 */
class PropTips extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Tips);
        this.skinName = "PropTipsSkin";
    }

    public title: eui.Image;
    public propList: PropPart;

    protected init(): void {

    }

    public open(param: ViewProp): void {
        super.open();
        if (param) {
            this.title.source = param.firData["src"];
            this.propList.setData(param.firData["prop"], []);
        }
    }


}