class ActivityCatalogueItem extends BaseCustComponent {
	public banner: eui.Image;
	public labTime: eui.Label;

	public cfg: StdActivitycata;

	protected childrenCreated(): void {
		super.childrenCreated();
	}

	protected dataChanged(): void {
		super.dataChanged();
 		this.cfg = this.data;
		this.banner.source = `${RES_DIR_IMAGES_BANNE_ACTIVITY}/catalogue/${this.cfg.image}`;
		// 临时写成永久，因方案还没确定
		this.labTime.text = StringUtils.substitute(Language.lang.activityCatalogueTime, "永久");
		let red = false;
		window[this.cfg.pannel] && window[this.cfg.pannel]["red"] && (red = window[this.cfg.pannel]["red"]());
		App.ViewManager.showRedPoint(this, red);
	}

	public dispose(): void {
		super.dispose();
		this.cfg = null;
	}
}