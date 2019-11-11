class DragonTestActionItem extends BaseCustComponent {
	public actionName: eui.Label;
	public inText: eui.TextInput;
	public play: eui.Image;

	public constructor() {
		super();
	}

	init() {
		super.init();
		this.addTouchEvent(this.play, this.onPlay);
	}

	onPlay() {
		let hero = GameCache.hero.focusPlayer;
		hero.playAction(this.data.actionIndex, parseInt(this.inText.text));
	}
}