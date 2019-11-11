/*
 * @Description: buff窗口
 * @Author: guolinsen
 * @Date: 2019-09-03 10:56:47
 * @LastEditTime: 2019-09-03 11:46:50
 */
class BuffWin extends BaseEuiWindow {

	public bg: BaseWinBg;
	public roleSelect: RoleSelect;
	public list: eui.List;

	public constructor() {
		super();
		this.skinName = "BuffViewSkin";
	}

	public init() {
		this.list.itemRenderer = BuffItem;
		this.roleSelect.setHandler(this, this.roleClick);
		this.setWinTitle("buff");
	}
	public open(param: ViewProp = null) {
		super.open(param);
		this.message(MsgConst.BUFF_UPDATE, this.onUpdate);
		this.onUpdate();
	}
	private roleClick() {
		this.onUpdate();
	}
	private onUpdate(recog?: number) {
		let role = this.roleSelect.selectPro;
		if (recog) {
			if (role.recog != recog) return;
		}
		this.setListData(this.list, GameCache.buff.getBuffList(role.recog));
	}
}