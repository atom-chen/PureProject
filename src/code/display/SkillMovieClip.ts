class SkillMovieClip extends MovieClip {
	static num: number = 0;
	public constructor() {
		super();
	}

	public dispose(): void {
		super.dispose();
		SkillMovieClip.num--;
	}

	public static create(): SkillMovieClip {
		SkillMovieClip.num++;
		return ObjectPool.get(SkillMovieClip);
	}
}