/*
 * @Description: BUFFITEM
 * @Author: guolinsen
 * @Date: 2019-09-03 10:57:50
 * @LastEditTime: 2019-09-03 20:07:25
 */
class BuffItem extends BaseCustComponent {

	public icon: eui.Image;
	public nameTx: eui.Label;
	public attrTx: eui.Label;
	public timeTx: eui.Label;

	public constructor() {
		super();
	}

	//用于子类继承
	protected init(): void {

	}

	protected dataChanged(): void {
		super.dataChanged();
		let buff = this.data as BuffVo;
		this.icon.source = RES_DIR_BUFF_ICON + buff.icon + ".png";
		this.nameTx.text = buff.name;
		App.TimerManager.removeAll(this);
		if (buff.restTime > 0) {
			App.TimerManager.add(1000, this.onTimer, this);
			this.onTimer();
		} else {
			this.timeTx.text = "";
		}
		this.showAttr();
	}

	private showAttr() {
		let attrs: BuffValue[] = this.data.attr;
		let i = 0;
		let a = attrs.length;
		let strs: string[] = [];
		for (; i < a; i++) {
			let attr = attrs[i];
			let obj = GameConfig.buffId[attr.type] as StdAttributebuffid;
			if (!obj) continue;
			let str: string;
			let valueStr: string;
			if (!isNaN(attr.value)) {
				valueStr = AttrBufId.formatValue(obj.buffShowType, attr.value);
			}
			if (obj.specialBuff) {
				strs.push(StringUtils.substitute(obj.specialBuff, TextFlowUtils.color(valueStr, ColorUtil.C_BLUE),
					TextFlowUtils.color(attr.interval, ColorUtil.C_BLUE)));
			} else {
				strs.push(obj.attname + TextFlowUtils.color("+" + valueStr, ColorUtil.C_BLUE));
			}
		}
		this.attrTx.textFlow = TextFlowUtils.generateTextFlow(strs.join(", "));
	}

	private onTimer() {
		let rest = this.data.restTime - App.TimerManager.getSyncTime();
		rest < 0 && (rest = 0);
		this.timeTx.text = StringUtils.substitute(Language.lang.restTime, App.DateUtils.getFormatBySecond(rest / 1000, DateUtils.TIME_FORMAT_1));
	}

	$onRemoveFromStage() {
		super.$onRemoveFromStage();
		App.TimerManager.removeAll(this);
	}
}