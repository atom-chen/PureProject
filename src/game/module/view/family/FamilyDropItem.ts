class FamilyDropItem extends BaseCustComponent {
	public labLimit: eui.Label;


	protected childrenCreated(): void {
		super.childrenCreated();
	}

	protected dataChanged(): void {
		super.dataChanged();
		this.labLimit.text = StringUtils.substitute(Language.lang.familyApplyCondition, this.data.sc);
	}

}