/*
 * @Description: 其它角色信息
 * @Author: liangzhaowei
 * @Date: 2019-09-27 19:23:01
 */

class RoleOtherPannelInfoWin extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Tips);
        this.skinName = "RoleOtherPannelInfoWinSkin";
    }

    public bg: BaseWinBg;
    public viewContent: eui.Group;
    public cn: RoleOtherPannelInfo;


    public init(): void {
        this.bg.setNameImg("otherRole");
    }

    public open(param: ViewProp): void {
        super.open();
        this.cn.open()
    }

}