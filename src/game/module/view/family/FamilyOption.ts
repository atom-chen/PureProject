class FamilyOption extends BaseCustComponent {

	public icon: eui.Image;
	public labName: eui.Label;

	protected childrenCreated(): void {
		super.childrenCreated();
	}

	protected dataChanged(): void {
		super.dataChanged();
		this.icon.source = `family_json.${this.data.icon}_png`;
		this.labName.text = this.data.name;
	}

}