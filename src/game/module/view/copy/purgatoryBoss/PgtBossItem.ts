class PgtBossItem extends BaseCustComponent {

	public labLv: eui.Label;
	public labName: eui.Label;

	public bossid: number;

	protected childrenCreated(): void {
		super.childrenCreated();
		this.once(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
	}

	protected dataChanged(): void {
		super.dataChanged();
		this.initData();
	}

	private initData(): void {
		this.bossid = this.data;
		let cfg: StdPurgatoryboss = GameConfig.purgatoryBoss[this.data];
		let mstCfg: StdMonster = GameConfig.monster[cfg.entityid];
		this.labLv.text = StringUtils.substitute(Language.lang.pgtBossLv, cfg.level);
		this.labName.text = mstCfg.name;
	}

	private onRemove(): void {
		this.bossid = null;
	}
}