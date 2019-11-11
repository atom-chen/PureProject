/**
 * 界面上显示龙骨模型
*/
class UIAvatar extends BaseCustComponent {
	private body: ThingBody;
	private pro: PropertySet;
	public constructor() {
		super();
		this.body = new ThingBody(this);
		// if (!DeviceUtils.IsMobile) {
		// 	this.scaleX = this.scaleY = 1.1;
		// }
	}
	public showMonster(id: number) {
		if (this.pro == null) {
			this.pro = new PropertySet();
		}
		this.pro.kind = ThingKind.Monster;
		this.pro.pro(PropId.AP_BODY_ID, id);
		this.setData(this.pro);
	}
	public updatePart(pPart: number, id: number) {
		// let pro = DBPart.PartId[pName];
		this.pro.pro(pPart, id);
		this.refresh();

	}
	public setData(pro: PropertySet) {
		this.pro = pro;
		this.body.init(pro);
		this.body.setStage(true);
		this.body.playAction(ActionStandard.getSpine(ActionStandard.SA_IDLE));
	}
	public refresh() {
		this.body.changeSkin();
	}
	public dispose() {
		super.dispose();
		this.body.onRemove();
	}
	$onAddToStage(stage, lv) {
		super.$onAddToStage(stage, lv);
		this.body.setStage(true);
	}
	$onRemoveFromStage() {
		super.$onRemoveFromStage();
		if (this.body) {
			this.body.setStage(false);
		}
	}
}